---
name: desenvolvendo-frontend
description: Cria e otimiza interfaces de usuário (front-end) responsivas, com design premium, excelente usabilidade e alinhadas com as melhores práticas de design contemporâneo e repertório artístico avançado. Ative sempre que houver solicitações de design de UI/UX, criação ou estilização de páginas web, layouts responsivos, e otimização de interfaces.
---

# Desenvolvendo Frontend Premium

## Quando usar esta skill
- Quando houver necessidade de criar ou modificar interfaces de usuário (HTML/CSS/JS).
- Ao projetar novos layouts, definir paletas de cores, tipografia, espaçamentos e transições.
- Ao aplicar designs premium (como Glassmorphism, Bento Grid, Minimalismo Suíço e Neo-brutalismo).
- Ao otimizar a responsividade de telas e acessibilidade (WCAG).

## Fluxo de Trabalho (Workflow)

- [ ] **Definir a Linha Estética (Design School):** Escolher a escola de design mais apropriada para o projeto (ex: Glassmorphism/Dark Mode moderno, Bento Grid para dashboards, Minimalismo Suíço para conteúdo institucional).
- [ ] **Configurar o Design System (CSS Variables):** Definir a paleta de cores harmoniosa baseada em HSL, tipografia fluida com `clamp()`, espaçamento consistente e raios de borda (`border-radius`) na folha de estilos (`index.css`).
- [ ] **Estruturar com HTML5 Semântico:** Criar uma hierarquia lógica com `<header>`, `<main>`, `<section>`, `<article>`, `<footer>` e garantir apenas um elemento `<h1>` por página.
- [ ] **Implementar Responsividade Mobile-First:** Desenhar a interface pensando nos dispositivos móveis primeiro e adicionar `@media` queries para telas maiores (`768px`, `1024px`, `1200px`).
- [ ] **Aplicar Usabilidade e Acessibilidade:** Garantir contraste de texto suficiente, tamanhos de toque mínimos de `48px`, suporte a navegação por teclado e estados focais visíveis.
- [ ] **Adicionar Micro-interações e Transições:** Utilizar efeitos suaves de hover, active e focus usando transições curtas (`transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`).
- [ ] **Escrever Código Limpo e Comentado:** Seguir o padrão de desenvolvimento do projeto, mantendo os comentários existentes e adicionando notas explicativas sobre decisões de design e usabilidade.

---

## Princípios de Design & Escolas Contemporâneas

### 1. Minimalismo & Escola Suíça (Swiss Style)
Foco na clareza, ordem e legibilidade. Ideal para interfaces limpas e profissionais.
- **Tipografia Dominante:** Uso de fontes sem serifa modernas (ex: Inter, Roboto, Outfit) com pesos contrastantes fortes (ex: extra-bold para títulos, regular para corpo).
- **Espaçamento Negativo (Whitespace):** Uso generoso de margens e paddings para dar "respiro" aos elementos.
- **Grelhas Rígidas:** Alinhamento perfeito em colunas para criar ordem visual natural.

### 2. Glassmorphism & Neon Dark (Moderna Alta Tecnologia)
Interface com efeito de vidro fosco sobre fundos vibrantes e gradientes sutis. Muito premium para aplicações web modernas.
- **Translucidez:** `background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);`
- **Borda Fina de Vidro:** `border: 1px solid rgba(255, 255, 255, 0.1);`
- **Profundidade (Sombras):** `box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);`
- **Gradientes Suaves:** Fundos escuros profundos (como `#0a0b10`, `#0f172a`) com globos de cores ou degradês neon no fundo.

### 3. Bento Grid (Layout em Grade Funcional)
Visual inspirado em caixas Bento japonesas. Perfeito para organizar painéis, dashboards e portfólios.
- **Containers Individuais:** Cada bloco tem sua própria borda, sombra e cor de fundo levemente diferenciada.
- **CSS Grid Flexível:** Uso de `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` para ajuste automático ao tamanho da tela.
- **Variabilidade:** Blocos de diferentes tamanhos (`grid-column: span 2` ou `grid-row: span 2`) para criar interesse visual.

### 4. Neo-brutalismo (Impacto e Contraste)
Estilo moderno que resgata a crueza e o contraste com bordas grossas e cores saturadas.
- **Contornos Fortes:** `border: 3px solid #000000;`
- **Sombras Sólidas (Sem Blur):** `box-shadow: 4px 4px 0px 0px #000000;`
- **Cores Planas e Negrito:** Fundos brilhantes, sem gradientes complicados, e fontes pesadas.

---

## Melhores Práticas de Desenvolvimento

### Diretrizes de Código e Estrutura
1. **Legibilidade e Simplicidade:** Escreva códigos fáceis de ler e entender. Evite abstrações excessivas.
2. **Sem Mapeamento Dinâmico Complexo (DOM):** Ao criar elementos repetidos na interface (como menus ou botões fixos), declare cada elemento individualmente no HTML ou JavaScript em vez de gerá-los dinamicamente via arrays/maps sempre que possível. Isso facilita a manutenção e leitura.
3. **Comentários Explicativos:** Sempre documente o propósito de trechos de código CSS/JS importantes, explicando a lógica das regras e dos efeitos aplicados.
4. **Preservação de Estilo:** Mantenha a formatação e a estrutura de estilos existentes no projeto. Nunca remova ou sobrescreva comentários existentes sem um motivo claro aprovado pelo usuário.

### Responsividade Fluida (Tabela de Referência)
| Dispositivo | Breakpoint (Largura Máxima/Mínima) | Técnica Recomendada |
| :--- | :--- | :--- |
| **Mobile** | `< 480px` | Layout em coluna única, fonte base `16px`, elementos ocupando `100%` da largura. |
| **Tablet** | `481px a 768px` | Grades de 2 colunas, menus colapsáveis em hambúrguer ou barras inferiores. |
| **Desktop Pequeno** | `769px a 1024px` | Grades de 3 colunas, navegação lateral ou superior exposta. |
| **Desktop Grande** | `> 1024px` | Máxima largura controlada (ex: `max-width: 1200px`), grades detalhadas e efeitos ricos de hover. |

Use tipografia fluida para evitar excesso de media-queries para tamanhos de texto:
```css
/* Tamanho de fonte que escala de forma ideal entre dispositivos */
h1 {
  font-size: clamp(2rem, 4vw + 1rem, 3.5rem);
  line-height: 1.2;
}
```

---

## Exemplos de Implementação

### Cartão Premium com Efeito Glassmorphism (Exemplo de Referência)
```html
<!-- Cartão Individual Premium -->
<div class="glass-card">
  <div class="card-icon">
    <!-- Ícone decorativo ou funcional -->
    <span class="icon-pulse"></span>
  </div>
  <h3 class="card-title">Título do Recurso</h3>
  <p class="card-description">Descrição curta detalhando a funcionalidade, mantendo uma tipografia limpa e espaçamento harmonioso.</p>
  <button class="card-btn" id="btn-card-recurso">Acessar Recurso</button>
</div>
```

```css
/* Estilos para o efeito Glassmorphism Premium */
.glass-card {
  background: rgba(255, 255, 255, 0.03); /* Fundo sutil translúcido */
  backdrop-filter: blur(16px); /* Efeito de desfoque de fundo */
  -webkit-backdrop-filter: blur(16px); /* Compatibilidade Safari */
  border: 1px solid rgba(255, 255, 255, 0.08); /* Borda fina simulando vidro */
  border-radius: 20px; /* Cantos arredondados e modernos */
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* Efeito interativo premium no hover */
.glass-card:hover {
  transform: translateY(-5px); /* Efeito de elevação leve */
  border-color: rgba(255, 255, 255, 0.2); /* Borda brilha sutilmente */
}

/* Animação de pulso para feedback visual moderno */
.icon-pulse {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: #38bdf8; /* Azul cyan moderno */
  border-radius: 50%;
  position: relative;
}

.icon-pulse::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: inherit;
  border-radius: 50%;
  animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(0.95); opacity: 0.8; }
  100% { transform: scale(2.5); opacity: 0; }
}
```
