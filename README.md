# Gerador Mega Sorte

**Gerador Mega Sorte** é um simulador e gerador matemático de dezenas para apostas lotéricas desenvolvido com foco em design moderno, responsividade fluida e usabilidade premium.

---

## 📌 Visão Geral

O **Gerador Mega Sorte** é uma aplicação web estática projetada com o objetivo de estudos e práticas de desenvolvimento de software front-end. A ferramenta permite aos usuários gerarem sequências numéricas aleatórias para as principais loterias da Caixa Econômica Federal de forma limpa, dinâmica e interativa.


**Aviso de Isenção:** Este projeto foi desenvolvido estritamente com propósitos educativos e de portfólio. Não possui qualquer vínculo, parceria ou afiliação oficial com a Caixa Econômica Federal ou com nenhuma outra instituição oficial de apostas e loterias.

---

## Arquitetura do Projeto

O projeto segue as diretrizes modernas de desenvolvimento front-end sem frameworks, organizando o código de forma simples, legível e com clara separação de responsabilidades em arquivos separados:

```
MEGAMONEY/
├── img/                  # Ativos de imagens (logos do trevo, banners e esboço)
├── index.html            # Estrutura principal da página do gerador
├── sobre.html            # Página de autoria, tecnologias e jogo responsável
├── style.css             # Folha de estilo e design system responsivo
├── script.js             # Lógica de controle do DOM, sorteios e geração de PDF
└── README.md             # Arquivo de documentação técnica
```

---

## Funcionalidades Principais

1. **Interface Accordion Interativa:** Cada modalidade de aposta (Mega-Sena, Quina, Lotofácil e Lotomania) é isolada dentro de um painel dropdown animado. Clicar na barra do jogo abre ou fecha o painel de forma suave.
2. **Persistência Visual de Sorteios:** Os números gerados para cada jogo são salvos em memória. O usuário pode fechar e reabrir os painéis sem perder as dezenas sorteadas na tela.
3. **Exibição 3D em Esferas de Sorteio:** Os números são ordenados em ordem crescente e formatados individualmente como bolas de sorteio tridimensionais, coloridas de acordo com a modalidade de jogo.
4. **Brilho Otimizado (Legibilidade):** Os gradientes das esferas foram desenhados para balancear o efeito tridimensional brilhante com excelente contraste, permitindo a perfeita leitura do texto branco.
5. **Cópia Rápida Individual:** Cada painel conta com um ícone de cópia individualizada que envia a sequência de dezenas gerada (formatada com hifens) diretamente para a área de transferência do dispositivo com um tooltip de feedback visual ("Números copiados!").
6. **Exportação de Relatório PDF Customizado:** Um botão global ("Baixar números da sorte") cria e baixa na hora um arquivo `.pdf` formatado contendo o logotipo do trevo, a data, a hora do sorteio e todos os jogos ativos, aplicando quebra de linha inteligente para dezenas longas de modo a evitar cortes ou vazamentos.

---

## 📖 Instruções de Uso

### Como Gerar e Limpar Jogos
* Abra a modalidade desejada clicando na barra correspondente (ex: **Mega-Sena**).
* Clique no botão **"Sortear Números"** para gerar a quantidade exata de dezenas daquela aposta sem duplicatas (obtidas de forma aleatória matemática).
* Clique em **"Limpar Resultados"** se desejar apagar a exibição daquele jogo e resetar o painel para o estado padrão.

### Como Copiar
* Para copiar os números de apenas um jogo, clique no ícone de dois papéis no lado direito do painel de números.
* Para baixar um relatório consolidado com todos os jogos ativos em PDF, clique no botão **"Baixar números da sorte"** localizado na base da seção de dropdowns.

---

## 💻 Especificações Técnicas

* **Estrutura:** HTML5 semântico estruturado para SEO e acessibilidade (com elementos `<header>`, `<main>`, `<section>`, etc., e uso correto de cabeçalhos e tags de imagens).
* **Estilização (CSS3):**
  - Variáveis globais de cores, espaçamentos, sombras e transições no `:root`.
  - Design Responsivo Mobile-First configurado com media queries específicas para celulares menores de `480px` (exibindo botões lado a lado e ajustando a tipografia com `clamp()`).
  - Utilização da fonte moderna **Outfit** do Google Fonts.
* **Comportamento (JavaScript Vanilla ES6+):**
  - Estrutura de dados modular que controla os números máximos, quantidade de dezenas e o estado atual dos sorteios em tempo real.
  - Renderização dinâmica adicionando nós individuais ao DOM por loops, em conformidade com as regras de evitar mapeamentos complexos que dificultem a leitura do código.
* **Bibliotecas Externas:**
  - **jsPDF (v2.5.1):** Carregada de forma resiliente via CDN (suportando construtores legados e UMD), gerando o download através de uma URL do tipo blob segura temporária, garantindo compatibilidade total e download correto da extensão `.pdf` tanto via servidor local quanto executado diretamente pelo arquivo físico (`file://`).

---

## ⚖️ Termos de Jogo Responsável e Isenção

* **Fins de Entretenimento:** 
O Gerador Mega Sorte é um simulador matemático aleatório baseado em probabilidades. Esta ferramenta foi desenvolvida estritamente com o propósito de estudos e práticas de desenvolvimento de software front-end, não possuindo qualquer vínculo, parceria ou afiliação com nenhuma instituição oficial de apostas e loterias. Este site gera apenas sugestões de dezenas
para entretenimento e estudo, não garantindo de forma alguma a vitória, premiações ou acertos nas apostas reais. As apostas baseadas nos números gerados são de inteira e exclusiva responsabilidade do jogador.

* **Responsabilidade:** Toda e qualquer aposta realizada utilizando os números fornecidos por esta ferramenta é de responsabilidade única e exclusiva do usuário.

* **Jogo Saudável:** Jogue com responsabilidade e controle. Estimulamos as apostas estritamente como forma de lazer recreativo e não apoiamos ou incentivamos o hábito compulsivo. Menores de 18 anos são expressamente desencorajados a utilizar ferramentas de simulação de apostas.
