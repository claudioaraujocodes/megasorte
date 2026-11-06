// Estado global para armazenar os números sorteados de cada categoria
const state = {
    megasena: [],
    quina: [],
    lotofacil: [],
    lotomania: []
};

//arrays de objetos contendo "tipoJogo", que será um parametro.
const numeroMaximo = {
    quina: 80,
    lotofacil: 25,
    megasena: 60,
    lotomania: 100,
};

const quantidadeNumeros = {  //aqui é um objeto, e os nomes dos jogos são valores
    quina: 5,
    lotofacil: 15,
    megasena: 6,
    lotomania: 50,
};

// Função para gerar um número aleatório entre 1 e o número máximo de cada jogo
function gerarNumeroAleatorio(tipoJogo) {
    return Math.floor(Math.random() * numeroMaximo[tipoJogo]) + 1;
    // Aqui é definido o tamanho do array que o math.random vai percorrer, 
    //que corresponde ao numero maximo de dezenas de cada aposta. ex.: Se tipoJogo for quina, o numeroMaximo[quina],
    //conferindo no array de objetos acima, será 80.
    //Então o math vai percorrer de 0 a 80 (com acerscimo de mais 1 para poder incluir o 80) 5 vezes, 
    //pois "let numeroAleatorio = gerarNumeroAleatorio(tipoJogo);" abaixo, é callback desta função gerarNumeroAleatorio(...), 
    //e recebe como parametro o valor de tipoJogo.
}

// Inicializador de Accordions (Dropdowns)
function inicializarAccordions() {
    const accordions = document.querySelectorAll('.accordion-header');
    
    accordions.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const content = item.querySelector('.accordion-content');
            
            // Alterna a classe active no elemento pai
            item.classList.toggle('active');
            
            // Controla a altura máxima para a animação CSS fluida de deslizamento
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0px';
            }
        });
    });
}

// Função auxiliar para atualizar dinamicamente a altura do accordion quando o conteúdo muda
function atualizarAlturaAccordion(game) {
    const item = document.getElementById(`game-${game}`);
    if (item && item.classList.contains('active')) {
        const content = item.querySelector('.accordion-content');
        content.style.maxHeight = content.scrollHeight + 'px';
    }
}

// Função de sorteio de números associada aos botões
function sortearNumeros(tipoJogo) {
    // Array para armazenar os números sorteados
    const numerosSorteados = [];

    // Loop para gerar a quantidade de números necessária
    // Correção: Alterado para 'while' para garantir que sempre tenhamos a quantidade exata de números sem duplicatas
    while (numerosSorteados.length < quantidadeNumeros[tipoJogo]) {
        let numeroAleatorio = gerarNumeroAleatorio(tipoJogo);  //este codigo vai rodar o numero de vezes do loop, que é a quantidade de numeros por tipo de jogo.
        //O valor de tipoJogo é um argumento, que remete a cada valor do objeto quantidadeNumeros 
        //e será enviado como parametro para a função gerarNumeroAleatorio(tipoJogo). 
        //(tipoJogo) aqui é enviado por callback para a função gerarNumeroAleatorio(tipoJogo) acima.
        // tipoJogo por sua vez, é o valor escolhido.

        // Verifica se o número já está no array
        if (numerosSorteados.indexOf(numeroAleatorio) === -1) {
            // Adiciona o número ao array
            numerosSorteados.push(numeroAleatorio);
        }
    }

    // Ordenação ascendente para melhor visualização (usabilidade premium)
    numerosSorteados.sort((a, b) => a - b);

    // Salva no estado
    state[tipoJogo] = numerosSorteados;

    // Exibe os números sorteados na div correspondente, criando elementos individuais do DOM
    const divNumerosSorteados = document.getElementById(`numbers-${tipoJogo}`);
    divNumerosSorteados.innerHTML = ""; // Limpa o estado vazio ou anterior

    // Regra: Criar cada elemento individualmente no DOM em vez de mapeamento dinâmico
    for (let i = 0; i < numerosSorteados.length; i++) {
        const num = numerosSorteados[i];
        const ball = document.createElement("span");
        ball.className = `lottery-ball ${tipoJogo}`;
        ball.innerText = String(num).padStart(2, "0");
        divNumerosSorteados.appendChild(ball);
    }

    // Atualiza a altura do painel para refletir o novo conteúdo
    atualizarAlturaAccordion(tipoJogo);
}

// Função para limpar o conteúdo da div
function limparResultados(tipoJogo) {
    // Limpa do estado
    state[tipoJogo] = [];

    const divNumerosSorteados = document.getElementById(`numbers-${tipoJogo}`);
    divNumerosSorteados.innerHTML = "";
    
    // Cria elemento de texto padrão para sinalizar vazio
    const noNumbersSpan = document.createElement("span");
    noNumbersSpan.className = "no-numbers";
    noNumbersSpan.innerText = "Nenhum número sorteado ainda.";
    divNumerosSorteados.appendChild(noNumbersSpan);

    // Atualiza altura do accordion
    atualizarAlturaAccordion(tipoJogo);
}

// Copiar números de uma categoria específica para o clipboard com feedback visual
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

// Função auxiliar para exibir tooltip temporário de feedback
function exibirFeedback(tipoJogo, mensagem) {
    const container = document.getElementById(`numbers-${tipoJogo}`).parentElement;
    
    // Remove tooltip anterior se existir
    const anterior = container.querySelector(".tooltip-feedback");
    if (anterior) {
        anterior.remove();
    }

    const tooltip = document.createElement("span");
    tooltip.className = "tooltip-feedback";
    tooltip.innerText = mensagem;
    container.appendChild(tooltip);

    // Remove automaticamente após o fim da animação
    setTimeout(() => {
        tooltip.remove();
    }, 1500);
}

// Função para gerar o arquivo PDF formatado com todos os números sorteados
function gerarPDFNumeros() {
    // Obter o construtor correto do jsPDF (suporte resiliente a v1 e v2 UMD/global)
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

    // Instancia o gerador de PDF
    const doc = new jsPDFConstructor({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    // Cores em RGB baseadas na identidade visual do projeto (Verde Esmeralda e Vermelho Escuro)
    const corVerde = [0, 158, 115];
    const corVermelho = [155, 34, 38];
    const corCinzaEscuro = [30, 41, 59];

    // Verificar se há pelo menos um jogo sorteado
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

    // --- CABEÇALHO DO PDF ---
    // Desenhar Clover Logo no topo usando a imagem pré-carregada do HTML
    const imgLogo = document.getElementById("pdf-logo");
    if (imgLogo) {
        const imgWidth = 20;
        const imgHeight = 20;
        doc.addImage(imgLogo, "PNG", 105 - (imgWidth / 2), 15, imgWidth, imgHeight);
    }

    // Título Principal
    doc.setTextColor(corVermelho[0], corVermelho[1], corVermelho[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.text("GERADOR MEGA SORTE", 105, 43, { align: "center" });

    // Subtítulo descritivo
    doc.setTextColor(corVerde[0], corVerde[1], corVerde[2]);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Os seus números da sorte gerados instantaneamente", 105, 49, { align: "center" });

    // Linha divisória decorativa
    doc.setDrawColor(corVerde[0], corVerde[1], corVerde[2]);
    doc.setLineWidth(0.5);
    doc.line(20, 55, 190, 55);

    // Metadata (Data e Hora)
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString("pt-BR");
    const horaFormatada = agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(9);
    doc.text(`Gerado em: ${dataFormatada} às ${horaFormatada}`, 105, 61, { align: "center" });

    // --- CONTEÚDO DOS JOGOS SORTEADOS ---
    let yPos = 72; // Posição vertical inicial do conteúdo

    // Nomes legíveis para as apostas
    const nomesJogos = {
        megasena: "Mega-Sena",
        quina: "Quina",
        lotofacil: "Lotofácil",
        lotomania: "Lotomania"
    };

    for (const jogo in state) {
        const dezenas = state[jogo];
        
        if (dezenas.length > 0) {
            // Formata o conjunto de números com 3 espaços de separação para exibição limpa
            const numerosTexto = dezenas.map(num => String(num).padStart(2, "0")).join("   ");
            
            // Largura máxima utilizável dentro do container (170mm total - margens de segurança internas)
            const maxTextWidth = 158;
            
            // Define fonte temporária para realizar o cálculo preciso do split
            doc.setFont("Courier", "bold");
            doc.setFontSize(13);
            
            // Quebra o texto das dezenas em linhas caso exceda a largura máxima
            const lines = doc.splitTextToSize(numerosTexto, maxTextWidth);
            
            // Calcula a altura dinâmica do container baseada no número de linhas obtidas
            const lineSpacing = 6;
            const containerHeight = 16 + (lines.length * lineSpacing);

            // Container do jogo (fundo sutil cinza claro)
            doc.setFillColor(248, 250, 252);
            doc.rect(20, yPos - 6, 170, containerHeight, "F");
            // Borda do container
            doc.setDrawColor(226, 232, 240);
            doc.setLineWidth(0.3);
            doc.rect(20, yPos - 6, 170, containerHeight, "D");

            // Nome do jogo
            doc.setTextColor(corCinzaEscuro[0], corCinzaEscuro[1], corCinzaEscuro[2]);
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(12);
            doc.text(`${nomesJogos[jogo]} (${dezenas.length} números):`, 25, yPos);

            // Desenha os números sorteados em suas respectivas linhas calculadas
            doc.setTextColor(corVerde[0], corVerde[1], corVerde[2]);
            doc.setFont("Courier", "bold");
            doc.setFontSize(13);
            
            let currentTextY = yPos + 8;
            for (let j = 0; j < lines.length; j++) {
                doc.text(lines[j], 25, currentTextY);
                currentTextY += lineSpacing;
            }

            // Incrementa a posição de ancoragem vertical para o próximo cartão de jogo
            yPos += containerHeight + 6;
        }
    }

    // --- RODAPÉ DO PDF ---
    doc.setTextColor(148, 163, 184);
    doc.setFont("Helvetica", "oblique");
    doc.setFontSize(9);
    doc.text("Boa sorte com a sua aposta!", 105, 272, { align: "center" });
    doc.text("A sua sorte pode estar a apenas um clique de distância.", 105, 277, { align: "center" });

    // --- DOWNLOAD SEGURO VIA BLOB E LINK COM ATRIBUTO DOWNLOAD ---
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
        // Fallback caso o Blob ou URL falhe em navegadores antigos
        doc.save("MegaSorte_Numeros.pdf");
    }
}

// Inicializador de todos os componentes da página
document.addEventListener("DOMContentLoaded", () => {
    // Inicializa o comportamento dos dropdowns/accordions
    inicializarAccordions();

    // Event listeners para os botões "Sortear Números" dos dropdowns
    document.querySelectorAll(".btn-draw").forEach(btn => {
        btn.addEventListener("click", function() {
            const game = this.getAttribute("data-game");
            sortearNumeros(game);
        });
    });

    // Event listeners para os botões "Limpar Resultados" dos dropdowns
    document.querySelectorAll(".btn-clear").forEach(btn => {
        btn.addEventListener("click", function() {
            const game = this.getAttribute("data-game");
            limparResultados(game);
        });
    });

    // Event listeners para os botões de cópia individuais
    document.querySelectorAll(".btn-copy-individual").forEach(btn => {
        btn.addEventListener("click", function() {
            const game = this.getAttribute("data-game");
            copiarNumerosIndividuais(game);
        });
    });

    // Event listener para o botão global de cópia (gerar PDF)
    const btnExportPdf = document.getElementById("btn-export-pdf");
    if (btnExportPdf) {
        btnExportPdf.addEventListener("click", gerarPDFNumeros);
    }
});
