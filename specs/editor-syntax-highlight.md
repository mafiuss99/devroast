# Especificação: Editor com Syntax Highlight

## Decisões Confirmadas

- **Detecção:** Automática ao colar código
- **Linguagens:** Todas as 200+ suportadas pelo Shiki
- **Tema:** Apenas escuro (dark)

---

## 1. Resumo da Pesquisa

### Opções Analisadas

| Biblioteca | Uso no ray.so | Destaques |
|------------|---------------|-----------|
| **Shiki** | ✅ Sim | Mesma engine do VS Code (TextMate grammars), server-side rendering, zero client JS, ~200+ linguagens |
| Monaco Editor | ❌ Não | Editor completo como VS Code, autocomplete, IntelliSense, mais pesado (~3MB) |
| CodeMirror | ❌ Não | Extensível, leve, bom para editores editáveis |
| highlight.js | ✅ Sim (dependência) | Auto-detecção de linguagem, 190+ linguagens, client-side |

### Fonte: ray.so (GitHub)

O ray.so usa **Shiki** como biblioteca principal de syntax highlighting (já verificado no `package.json` - `"shiki": "^1.0.0"`). O projeto também tem `highlight.js` como dependência, mas Shiki é usado para o rendering principal.

---

## 2. Recomendação

**Usar Shiki** (já instalado no projeto) + detecção automática de linguagem.

### Por que Shiki?

- ✅ Mesma qualidade de highlight do VS Code
- ✅ Server-side rendering (SSR) - performance superior
- ✅ Zero JavaScript client-side para highlighting
- ✅ Suporta 200+ linguagens
- ✅ Temas VS Code nativos
- ✅ Já está instalado no projeto (`shiki: ^4.0.2`)

### Para detecção automática de linguagem

Usar **highlight.js** (`highlightAuto`) - já disponível no projeto, fácil integração.

> **Nota:** Shiki NÃO oferece detecção automática de linguagem nativamente.

---

## 3. Especificação Técnica

### 3.1 Stack

- **Highlighting:** Shiki (já instalado)
- **Detecção de linguagem:** highlight.js (já instalado)
- **Framework:** Next.js Pages Router
- **Styling:** Tailwind CSS (já em uso)

### 3.2 Componentes

```
src/
├── components/
│   └── CodeEditor/
│       ├── CodeEditor.tsx       # Componente principal
│       ├── LanguageSelector.tsx # Dropdown de seleção de linguagem
│       └── useCodeHighlight.ts  # Hook para highlight
```

### 3.3 Funcionalidades

1. **Campo de texto para colar código**
   - Textarea para input
   - Suporte a paste de código

2. **Detecção automática de linguagem**
   - Usar `highlight.js.highlightAuto()` ao colar código
   - Fallback: análise de primeira linha (shebang, imports, etc.)

3. **Seleção manual de linguagem**
   - Dropdown com todas as linguagens do Shiki
   - Usuário pode sobrescrever a detecção automática

4. **Preview com Syntax Highlight**
   - Renderização em tempo real usando Shiki
   - Tema escuro (github-dark)

---

## 4. To-Dos

- [ ] **T1** - Revisar esta especificação e confirmar direção
- [ ] **T2** - Criar componente `CodeEditor.tsx` com textarea + preview
- [ ] **T3** - Implementar detecção automática de linguagem com highlight.js (ao colar)
- [ ] **T4** - Carregar todas as linguagens do Shiki (200+)
- [ ] **T5** - Adicionar seletor manual de linguagem (dropdown)
- [ ] **T6** - Renderizar preview com Shiki em tempo real
- [ ] **T7** - Adicionar estilos visuais (UI do editor estilo ray.so)
- [ ] **T8** - Testar com diferentes linguagens

---

## 5. Detalhes de Implementação

### 5.1 Detecção Automática (ao colar)

```typescript
// Usar highlight.js para detecção
import hljs from 'highlight.js'

function detectLanguage(code: string): string {
  const result = hljs.highlightAuto(code)
  return result.language || 'plaintext'
}
```

### 5.2 Shiki - Carregar Todas Linguagens

```typescript
import { createHighlighter } from 'shiki'

const highlighter = await createHighlighter({
  themes: ['github-dark'],
  langs: 'all' // ou array específico de linguagens
})
```

### 5.3 Fluxo do Componente

1. Usuário cola código na textarea
2. Evento `onPaste` detecta o código
3. `highlight.js` identifica a linguagem
4. Shiki renderiza o preview com syntax highlight
5. Usuário pode sobrescrever a linguagem via seletor manual

---

## 6. Referências

- [Shiki Docs](https://shiki.style)
- [Shiki + Next.js](https://shiki.style/packages/next)
- [highlight.js auto-detection](https://highlightjs.org/)
- [ray-so GitHub](https://github.com/raycast/ray-so)
