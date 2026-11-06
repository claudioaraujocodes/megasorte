// Configurações e estado dos jogos
const state = {
    megasena: [],
    quina: [],
    lotofacil: [],
    lotomania: []
};

const numeroMaximo = {
    quina: 80,
    lotofacil: 25,
    megasena: 60,
    lotomania: 100,
};

const quantidadeNumeros = {
    quina: 5,
    lotofacil: 15,
    megasena: 6,
    lotomania: 50,
};

// Sorteio de número individual
function gerarNumeroAleatorio(tipoJogo) {
    return Math.floor(Math.random() * numeroMaximo[tipoJogo]) + 1;
}

// Painéis retráteis
function inicializarAccordions() {
    const accordions = document.querySelectorAll('.accordion-header');
    
    accordions.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const content = item.querySelector('.accordion-content');
            
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0px';
            }
        });
    });
}

// Ajuste de altura dos painéis
function atualizarAlturaAccordion(game) {
    const item = document.getElementById(`game-${game}`);
    if (item && item.classList.contains('active')) {
        const content = item.querySelector('.accordion-content');
        content.style.maxHeight = content.scrollHeight + 'px';
    }
}

// Lógica dos sorteios
function sortearNumeros(tipoJogo) {
    const numerosSorteados = [];

    while (numerosSorteados.length < quantidadeNumeros[tipoJogo]) {
        let numeroAleatorio = gerarNumeroAleatorio(tipoJogo);

        if (numerosSorteados.indexOf(numeroAleatorio) === -1) {
            numerosSorteados.push(numeroAleatorio);
        }
    }

    numerosSorteados.sort((a, b) => a - b);

    state[tipoJogo] = numerosSorteados;

    const divNumerosSorteados = document.getElementById(`numbers-${tipoJogo}`);
    divNumerosSorteados.innerHTML = "";

    for (let i = 0; i < numerosSorteados.length; i++) {
        const num = numerosSorteados[i];
        const ball = document.createElement("span");
        ball.className = `lottery-ball ${tipoJogo}`;
        ball.innerText = String(num).padStart(2, "0");
        divNumerosSorteados.appendChild(ball);
    }

    atualizarAlturaAccordion(tipoJogo);
}

// Limpeza dos resultados
function limparResultados(tipoJogo) {
    state[tipoJogo] = [];

    const divNumerosSorteados = document.getElementById(`numbers-${tipoJogo}`);
    divNumerosSorteados.innerHTML = "";
    
    const noNumbersSpan = document.createElement("span");
    noNumbersSpan.className = "no-numbers";
    noNumbersSpan.innerText = "Nenhum número sorteado ainda.";
    divNumerosSorteados.appendChild(noNumbersSpan);

    atualizarAlturaAccordion(tipoJogo);
}

// Cópia individual dos números
function copiarNumerosIndividuais(tipoJogo) {
    const numeros = state[tipoJogo];
    
    if (numeros.length === 0) {
        exibirFeedback(tipoJogo, "Nenhum número para copiar!");
        return;
    }

    const textoCopia = numeros.map(n => String(n).padStart(2, "0")).join(" - ");
    navigator.clipboard.writeText(textoCopia).then(() => {
        exibirFeedback(tipoJogo, "Números copiados!");
    }).catch(err => {
        console.error("Erro ao copiar: ", err);
    });
}

// Mensagem de aviso na tela
function exibirFeedback(tipoJogo, mensagem) {
    const container = document.getElementById(`numbers-${tipoJogo}`).parentElement;
    
    const anterior = container.querySelector(".tooltip-feedback");
    if (anterior) {
        anterior.remove();
    }

    const tooltip = document.createElement("span");
    tooltip.className = "tooltip-feedback";
    tooltip.innerText = mensagem;
    container.appendChild(tooltip);

    setTimeout(() => {
        tooltip.remove();
    }, 1500);
}

// Geração e download do relatório em PDF
function gerarPDFNumeros() {
    let jsPDFConstructor = null;
    if (window.jspdf && window.jspdf.jsPDF) {
        jsPDFConstructor = window.jspdf.jsPDF;
    } else if (window.jsPDF) {
        jsPDFConstructor = window.jsPDF;
    }

    if (!jsPDFConstructor) {
        alert("Erro: A biblioteca jsPDF não pôde ser carregada. Verifique sua conexão com a internet.");
        return;
    }

    const doc = new jsPDFConstructor({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    const corVerde = [0, 158, 115];
    const corVermelho = [155, 34, 38];
    const corCinzaEscuro = [30, 41, 59];

    let temSorteio = false;
    for (const jogo in state) {
        if (state[jogo].length > 0) {
            temSorteio = true;
            break;
        }
    }

    if (!temSorteio) {
        alert("Por favor, sorteie números de pelo menos um jogo antes de copiar!");
        return;
    }

    // Cabeçalho do PDF
    const imgLogo = document.getElementById("pdf-logo");
    if (imgLogo) {
        const imgWidth = 20;
        const imgHeight = 20;
        doc.addImage(imgLogo, "PNG", 105 - (imgWidth / 2), 15, imgWidth, imgHeight);
    }

    doc.setTextColor(corVermelho[0], corVermelho[1], corVermelho[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.text("GERADOR MEGA SORTE", 105, 43, { align: "center" });

    doc.setTextColor(corVerde[0], corVerde[1], corVerde[2]);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Os seus números da sorte gerados instantaneamente", 105, 49, { align: "center" });

    doc.setDrawColor(corVerde[0], corVerde[1], corVerde[2]);
    doc.setLineWidth(0.5);
    doc.line(20, 55, 190, 55);

    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString("pt-BR");
    const horaFormatada = agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(9);
    doc.text(`Gerado em: ${dataFormatada} às ${horaFormatada}`, 105, 61, { align: "center" });

    // Lista de jogos no PDF
    let yPos = 72;

    const nomesJogos = {
        megasena: "Mega-Sena",
        quina: "Quina",
        lotofacil: "Lotofácil",
        lotomania: "Lotomania"
    };

    for (const jogo in state) {
        const dezenas = state[jogo];
        
        if (dezenas.length > 0) {
            const numerosTexto = dezenas.map(num => String(num).padStart(2, "0")).join("   ");
            const maxTextWidth = 158;
            
            doc.setFont("Courier", "bold");
            doc.setFontSize(13);
            
            const lines = doc.splitTextToSize(numerosTexto, maxTextWidth);
            const lineSpacing = 6;
            const containerHeight = 16 + (lines.length * lineSpacing);

            doc.setFillColor(248, 250, 252);
            doc.rect(20, yPos - 6, 170, containerHeight, "F");
            doc.setDrawColor(226, 232, 240);
            doc.setLineWidth(0.3);
            doc.rect(20, yPos - 6, 170, containerHeight, "D");

            doc.setTextColor(corCinzaEscuro[0], corCinzaEscuro[1], corCinzaEscuro[2]);
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(12);
            doc.text(`${nomesJogos[jogo]} (${dezenas.length} números):`, 25, yPos);

            doc.setTextColor(corVerde[0], corVerde[1], corVerde[2]);
            doc.setFont("Courier", "bold");
            doc.setFontSize(13);
            
            let currentTextY = yPos + 8;
            for (let j = 0; j < lines.length; j++) {
                doc.text(lines[j], 25, currentTextY);
                currentTextY += lineSpacing;
            }

            yPos += containerHeight + 6;
        }
    }

    // Rodapé do PDF
    doc.setTextColor(148, 163, 184);
    doc.setFont("Helvetica", "oblique");
    doc.setFontSize(9);
    doc.text("Boa sorte com a sua aposta!", 105, 272, { align: "center" });
    doc.text("A sua sorte pode estar a apenas um clique de distância.", 105, 277, { align: "center" });

    // Download do arquivo PDF
    try {
        const blob = doc.output("blob");
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "MegaSorte_Numeros.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (e) {
        console.error("Erro ao gerar PDF via Blob, usando fallback clássico: ", e);
        doc.save("MegaSorte_Numeros.pdf");
    }
}

// Inicialização e eventos da página
document.addEventListener("DOMContentLoaded", () => {
    inicializarAccordions();

    document.querySelectorAll(".btn-draw").forEach(btn => {
        btn.addEventListener("click", function() {
            const game = this.getAttribute("data-game");
            sortearNumeros(game);
        });
    });

    document.querySelectorAll(".btn-clear").forEach(btn => {
        btn.addEventListener("click", function() {
            const game = this.getAttribute("data-game");
            limparResultados(game);
        });
    });

    document.querySelectorAll(".btn-copy-individual").forEach(btn => {
        btn.addEventListener("click", function() {
            const game = this.getAttribute("data-game");
            copiarNumerosIndividuais(game);
        });
    });

    const btnExportPdf = document.getElementById("btn-export-pdf");
    if (btnExportPdf) {
        btnExportPdf.addEventListener("click", gerarPDFNumeros);
    }
});