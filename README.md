# n8n Custom Node: Random

## Descrição
Node customizado para o **n8n** que gera números aleatórios via **Random.org**, recebendo como input os valores mínimos e máximos (inteiros).

---

## Sumário
- Pré-requisitos  
- Por que Docker Compose?  
- Como rodar o projeto  
- Estrutura do Projeto  
- Como usar o node Random  
- Dificuldades e Desafios 
- Prints e exemplos  

---

## Pré-requisitos
- Docker Desktop 
- Git 
- OBS: Para rodar o projeto, **não é necessário** instalar Node.js ou TypeScript se você não for alterar o código do node. 

---

## Por que Docker Compose?

Apesar da abordagem para rodar nodes customizados localmente usando `npm link` e o n8n instalado via `npm`, optei por usar **Docker Compose** pelos seguintes motivos:

- Docker Compose é o método mais simples e padronizado para rodar o n8n localmente.
- Com Docker Compose, garanto que o ambiente será idêntico para qualquer pessoa que rodar o projeto, sem depender de versões específicas de Node.js, npm ou configurações locais do sistema operacional.  
- Não é preciso instalar o n8n globalmente, nem se preocupar com links simbólicos (`npm link`). Basta rodar `docker compose up` e tudo está pronto para uso.  

---

## Como rodar o projeto
1. Clone o repositório:

2. Suba o Docker Compose:
docker compose up

3. Acesse o n8n: http://localhost:5678
O node Random já estará disponível no painel do n8n.

## Estrutura do Projeto
```
.n8n/
└── custom/
    └── nodes/
        └── Random/
            ├── Random.node.js # Código JavaScript compilado do node
            ├── Random.node.ts # Código TypeScript do node
            └── random.svg # Ícone SVG customizado
docker-compose.yml # Arquivo de configuração do Docker Compose
README.md # Documentação
tsconfig.json # Configuração do TypeScript
```


## Como usar o node Random
1. Crie um novo workflow no n8n.
2. Adicione o node Random.
3. Preencha os campos Min e Max (apenas inteiros).
4. Execute o node para obter um número aleatório entre os valores informados.

---

### Dificuldades e Desafios

#### WSL
Tive dificuldades para rodar o Docker no Windows devido a limitações e erros do WSL. Inicialmente, estava usando o Debian na versão 1 do WSL, o que gerou incompatibilidades, erros de input/output e até corrupção da distribuição. A solução foi migrar do Debian para o Ubuntu e atualizar o WSL para a versão 2. Com isso, consegui rodar o Docker Compose de forma estável e compatível.

#### Minha primeira experiência com Docker
Este projeto marcou minha primeira experiência prática com Docker e Docker Compose. Precisei aprender os conceitos básicos de containers, entender como o Docker isola o ambiente do sistema operacional e perceber na prática as vantagens desse isolamento para o desenvolvimento e a replicação de ambientes.

#### Cache de SVG no n8n
Durante o projeto, ao substituir o ícone SVG do node, percebi que o n8n continuava exibindo o ícone antigo. Após diversas tentativas de solução, identifiquei que o procedimento correto era limpar o cache do navegador e reiniciar os containers, garantindo assim que o novo SVG fosse devidamente carregado pela interface do n8n.

#### Compreensão das tabelas do Postgres
Como nunca tinha explorado o banco de dados do n8n, tive dificuldade para entender o que era salvo em cada tabela (workflows, execuções, credenciais, etc). Portanto, configurei o PGAdmin 4 para acessar o banco Postgres do ambiente Docker Compose do n8n e usei comandos SQL para listar tabelas, consultar registros e analisar a estrutura dos dados.  
Isso me ajudou a validar o funcionamento do node Random e a entender melhor o fluxo de dados do n8n.

---

## Demonstração