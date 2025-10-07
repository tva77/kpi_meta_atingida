# KPI Meta Atingida - Power BI Custom Visual

✅ **Visual criado com sucesso e rodando!**

Visual personalizado do Power BI que exibe o progresso em relação a uma meta de vendas, incluindo:

- Título configurável
- Valor atual em destaque (R$ 425.000,00)
- Meta definida (R$ 500.000,00)
- Barra de progresso visual
- Porcentagem de conclusão (85%)
- Valor restante para atingir a meta (R$ 75.000,00)

## Status Atual

🟢 **Servidor de desenvolvimento rodando em http://localhost:8080**

O visual está compilado e pronto para ser testado no Power BI Desktop.

## Como Testar no Power BI Desktop

1. Abra o Power BI Desktop
2. Vá em **Visualizações** > **...** (mais opções) > **Importar um visual de um arquivo**
3. Ative o modo de desenvolvedor:
   - Vá em **Arquivo** > **Opções e configurações** > **Opções**
   - Em **Visualizações personalizadas**, marque **Habilitar visuais de desenvolvedor**
4. Adicione o visual de desenvolvedor ao relatório (ícone com símbolo de desenvolvedor)
5. Configure os campos de dados:
   - **Título**: Campo de categoria para o título do card (ex: "Meta de Vendas Q4")
   - **Valor Atual**: Medida com o valor atual (ex: 425000)
   - **Meta**: Medida com o valor da meta (ex: 500000)

## Estrutura de Dados

O visual espera os seguintes campos:

1. **Título** (opcional): Campo de categoria para o título do card
2. **Valor Atual**: Medida com o valor atual
3. **Meta**: Medida com o valor da meta

## Comandos Disponíveis

### Desenvolvimento
```bash
npm start          # Inicia o servidor de desenvolvimento (já rodando!)
```

### Build para Produção
```bash
npm run package    # Cria o arquivo .pbiviz na pasta dist/
```

### Parar o Servidor
```bash
# Pressione Ctrl+C no terminal onde o servidor está rodando
# Ou use: pkill -f "pbiviz start"
```

## Configurações Disponíveis

O visual oferece as seguintes opções de personalização no painel de formatação do Power BI:

### Configurações do Card
- Cor de fundo (#FFFFFF)
- Raio da borda (12px)
- Espaçamento interno (24px)

### Configurações do Título
- Tamanho da fonte (14px)
- Cor da fonte (#666666)
- Família da fonte

### Configurações do Valor
- Tamanho da fonte (36px)
- Cor da fonte (#000000)
- Família da fonte

### Configurações da Barra de Progresso
- Cor de preenchimento (#000000)
- Cor de fundo (#E0E0E0)
- Altura (8px)
- Raio da borda (4px)

### Configurações da Porcentagem
- Tamanho da fonte (16px)
- Cor da fonte (#F59E0B - laranja)
- Família da fonte

## Arquitetura do Projeto

```
kpi_meta_atingida/
├── src/
│   ├── visual.ts          # Lógica principal do visual
│   └── settings.ts        # Configurações personalizáveis
├── style/
│   └── visual.less        # Estilos CSS
├── capabilities.json      # Define campos de dados e configurações
├── pbiviz.json           # Metadados do visual
└── package.json          # Dependências do projeto
```

## Tecnologias Utilizadas

- **TypeScript**: Linguagem principal
- **D3.js**: Manipulação do DOM e criação de elementos
- **Power BI Visuals API 5.3.0**: Interface com o Power BI
- **LESS**: Pré-processador CSS

## Licença

MIT
