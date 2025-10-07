# KPI Meta Atingida – Power BI Custom Visual

Visual personalizado que compara o valor atual com a meta e apresenta a diferença percentual e absoluta.

## Campos Necessários

- **Valor Atual** (`currentValue`): medida numérica com o resultado atingido.
- **Meta** (`targetValue`): medida numérica com o objetivo desejado.

## Principais Funcionalidades

- **Valor Atual centralizado** com fonte `DIN` e formatação configurável.
- **Meta formatada** com prefixo "Meta:" e opções de fonte/unidades.
- **Porcentagem atingida** calculada automaticamente.
- **Diferença (Meta − Valor Atual)** exibida abaixo do cabeçalho.
- Formatação numérica com **unidades (Auto, None, K, M, B)** e **casas decimais personalizáveis**.

## Desenvolvimento

```bash
npm start          # Inicia o servidor de desenvolvimento
```

### Build para Produção

```bash
npm run package    # Gera o arquivo .pbiviz em dist/
```

### Parar o Servidor

```bash
# Pressione Ctrl+C no terminal em execução
# Ou use: pkill -f "pbiviz start"
```

## Configurações Disponíveis (Painel de Formatação)

- **Configurações do Valor**
  - Tamanho da fonte (padrão 24px)
  - Cor da fonte (#000000)
  - Família da fonte (DIN, sans-serif)
  - Unidades de exibição (Auto, None, K, M, B)
  - Casas decimais (padrão 0)

- **Configurações da Meta**
  - Tamanho da fonte (padrão 16px)
  - Cor da fonte (#000000)
  - Família da fonte (DIN, sans-serif)
  - Unidades de exibição (Auto, None, K, M, B)
  - Casas decimais (padrão 0)

- **Configurações da Porcentagem**
  - Tamanho da fonte (padrão 16px)
  - Cor da fonte (#F59E0B)
  - Família da fonte (Segoe UI, sans-serif)

## Estrutura do Projeto

```
kpi_meta_atingida/
├── src/
│   ├── visual.ts          # Lógica principal do visual
│   └── settings.ts        # Definição e parsing das configurações
├── style/
│   └── visual.less        # Estilos do visual
├── capabilities.json      # Funções, campos e opções de formatação
├── pbiviz.json            # Metadados do visual
└── package.json           # Dependências e scripts
```

## Tecnologias Utilizadas

- **TypeScript**
- **D3.js**
- **Power BI Visuals API 5.3.0**
- **LESS**

## Requisitos

- Node.js 14+
- Power BI Visuals Tools (`pbiviz`)
- Power BI Desktop para testes

## Licença

MIT
