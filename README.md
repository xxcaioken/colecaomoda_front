# To-Do List - Front-end React

Este é o front-end da aplicação To-Do List que desenvolvi para o teste técnico, utilizando React 18 com TypeScript.

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação e execução
```bash
# Instalar dependências
npm install

# Rodar em modo de desenvolvimento
npm start

# Fazer build para produção
npm run build
```

A aplicação estará disponível em `http://localhost:3000`.

## 📋 Funcionalidades implementadas

Desenvolvi todas as funcionalidades solicitadas no teste:

- ✅ **Criar tarefa**: Modal com formulário para adicionar título e descrição
- ✅ **Listar tarefas**: Exibição de todas as tarefas com data de criação
- ✅ **Deletar tarefa**: Botão de exclusão com confirmação via modal
- ✅ **Atualizar tarefa**: Edição inline ou via modal
- ✅ **Concluir tarefa**: Marcação visual diferenciada para tarefas concluídas
- ✅ **Seleção múltipla**: Sistema de checkboxes para ações em lote
- ✅ **Interface responsiva**: Design adaptativo para mobile e desktop

## 🏗️ Arquitetura e escolhas técnicas

### Estrutura do projeto
Organizei o código seguindo boas práticas do React moderno:

```
src/
├── api/           # Comunicação com backend
├── components/    # Componentes reutilizáveis
├── hooks/         # Custom hooks
├── pages/         # Páginas da aplicação
├── types/         # Definições TypeScript
└── utils/         # Funções utilitárias
```

### Principais decisões técnicas

#### 1. **TypeScript**
Escolhi usar TypeScript para ter tipagem estática, o que me ajuda a:
- Evitar bugs durante o desenvolvimento
- Ter melhor IntelliSense no editor
- Facilitar manutenção futura do código

#### 2. **Custom Hooks**
Criei o hook `useTasks` para centralizar toda a lógica de estado das tarefas:
- Separação clara entre lógica de negócio e UI
- Reutilização em diferentes componentes
- Facilita testes unitários

#### 3. **Floating Action Buttons (FABs)**
Implementei FABs para as ações principais seguindo padrões de Material Design:
- Interface mais limpa e moderna
- Melhor experiência em dispositivos móveis
- Ações contextuais baseadas na seleção

#### 4. **Sistema de modais**
Todos os formulários utilizam modais para:
- Manter o contexto da lista sempre visível
- Validação de dados antes do envio
- Confirmação de ações destrutivas (delete)

#### 5. **Formatação de datas**
Criei utilitários para formato brasileiro (DD/MM/YY):
- Melhor experiência para usuários brasileiros
- Funções reutilizáveis para toda a aplicação

#### 6. **Design responsivo com viewport units**
Utilizei vh/vw para todas as medidas CSS:
- Interface verdadeiramente responsiva
- Melhor adaptação a diferentes tamanhos de tela
- Experiência consistente entre dispositivos

#### 7. **PWA (Progressive Web App)**
Configurei manifest.json para tornar a aplicação instalável(inicialmente uma necessidade para remover erros do console e acabou se tornando uma "pré-funcionalidade):
- Funciona offline (quando implementado service worker)
- Pode ser "instalada" no dispositivo
- Experiência similar a app nativo

## 🔧 Comunicação com Backend

A aplicação está configurada para se comunicar com o backend Elixir através de:

- **Base URL**: `http://localhost:4000/api` (configurável via proxy)
- **Endpoints utilizados**:
  - `GET /tasks` - Listar tarefas
  - `POST /tasks` - Criar tarefa
  - `PUT /tasks/:id` - Atualizar tarefa
  - `DELETE /tasks/:id` - Deletar tarefa
  - `PATCH /tasks/:id/complete` - Marcar como concluída

### Tratamento de erros
Implementei tratamento robusto de erros da API:
- Mensagens específicas para cada tipo de erro
- Fallbacks para problemas de conexão
- Feedback visual para o usuário

## 🎨 Interface e UX

Priorizei uma interface moderna e intuitiva:

- **Design clean**: Foco no conteúdo principal
- **Feedback visual**: Estados de loading e erro
- **Acessibilidade**: Contraste adequado e navegação por teclado
- **Mobile-first**: Desenvolvido pensando primeiro em dispositivos móveis

## 📝 Considerações sobre o desenvolvimento

Durante o desenvolvimento, enfrentei alguns desafios interessantes:

1. **Gestão de estado complexo**: Com múltiplas seleções e modais, precisei estruturar bem o estado
2. **Responsividade**: Usar viewport units foi uma escolha ousada que resultou em melhor adaptação
3. **Comunicação com API**: Implementei retry automático e tratamento específico para cada erro

## 🚀 Melhorias futuras

Se tivesse mais tempo, implementaria:

- Testes unitários com Jest e React Testing Library
- Service Worker para funcionamento offline
- Drag & drop para reordenar tarefas
- Filtros e categorias
- Sincronização em tempo real com WebSockets

---

*Desenvolvido com ❤️ para o teste técnico*