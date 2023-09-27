<h1>Vídeo de demonstração</h1>

https://github.com/Lemos1347/Atividade-4-Modulo-7-Inteli/assets/99190347/2bb72bfc-226c-4be0-be3b-17ecdf0d16b9

# 📁 Estrutura do Projeto

🌐 **Root Directory**  
│  
├─ 📂 **backend/** - _Backend da aplicação contendo toda a lógica e processamento._  
│  
├─ 📂 **frontend/** - _Frontend da aplicação com a interface do usuário._  
│  
├─ 📜 **docker_postgres_init.sql** - _Dump do banco de dados PostgreSQL contendo a estrutura e dados iniciais(para desenvolvimento)._  
│  
├─ 📜 **docker-compose.yml** - _Arquivo de configuração do Docker Compose para orquestrar os contêineres._  
│  
└─ 📜 **README.md** - _Documentação e informações gerais sobre o projeto._

# 🐳 Containers

Essa aplicação foi construída utilizando o Docker Compose para orquestrar os contêineres. Há 3 contêineres:

- **backend** - _Backend da aplicação._
- **frontend** - _Frontend da aplicação._
- **db** - _Banco de dados PostgreSQL._

Os containers da api e do frontend foram construídos em Dockerfile separadamente, os quais podem ser encontrados nos seguintes links do dockerhub:

- [backend](https://hub.docker.com/repository/docker/lemos12/backend-crud-avaliada-4-m7/general)
- [frontend](https://hub.docker.com/repository/docker/lemos12/frontend-crud-avaliada-4-m7/general)

# 🚀 Como rodar o projeto

Para rodar o projeto é necessário ter o Docker e o Docker Compose instalados na máquina. Também é necessário a criação de dois arquivos:

- **.env** - _Arquivo de variáveis de ambiente para o backend._
  Navegue até `/backend` e crie um arquivo `.env` com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://user:password@db/API-CRUD"
SECRET_KEY=${CHAVE_SECRETA_PARA_GERAR_O_JWT}
ALGORITHM="HS256"
JWT_SECRET=${MESMO_VALOR_DA_SECRET_KEY}
```

- **.env.local** - _Arquivo de variáveis de ambiente para o frontend._
  Navegue até `/frontend` e crie um arquivo `.env.local` com o seguinte conteúdo:

```env
NEXTAUTH_SECRET=${MESMO_VALOR_DA_SECRET_KEY_DO_BACKEND}
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
API_URL=http://backend:3001
NEXT_PUBLIC_API_URL=http://localhost:3001

```

Após isso, basta clonar o projeto para a sua máquina e executar o seguinte comando na raiz do projeto:

```bash
docker compose build
```

```bash
docker compose up
```

Pronto! Agora você pode acessar os seguintes serviços nos seguintes endereços:

- **api** - _http://localhost:3001_
- **frontend** - _http://localhost:3000_
- **db** - _http://localhost:3002_

**Obs:** _Essas instruções são para uso único e exclusivo local._

**Obs2:** _Há duas contas administradoras no banco de dados local: email --> gui@gmail.com , senha --> 123 ; email --> gmail@nicola.com , senha --> 123_

# 💭 Estrutura Cloud

## Amazon ECS

O Amazon Elastic Container Service (ECS) é um serviço de gerenciamento de contêineres altamente escalável e de alto desempenho. Na infraestrutura atual:

- **Cluster**: Temos um único cluster ECS configurado.

  - **Serviço 1 - Backend**:

    - **Definição de tarefa**: Consiste em um contêiner Docker para o backend.
    - **Load Balancer**: Este serviço está associado ao load balancer para distribuir o tráfego e garantir alta disponibilidade.

  - **Serviço 2 - Frontend**:
    - **Definição de tarefa**: Contém um contêiner Docker para servir o frontend.
    - **Load Balancer**: Da mesma forma que o backend, este serviço está vinculado ao load balancer.

## Load Balancer

- **Tipo**: Network Load Balancer (NLB)

  O Network Load Balancer é projetado para lidar com milhões de solicitações por segundo. Ele garante baixa latência e tratamento de tráfego TCP, UDP e TLS, onde é necessário, por exemplo, manter uma conexão de IP de origem do cliente.

- **IP Elástico**: O Load Balancer está associado a um endereço IP elástico, garantindo que o IP não mude ao longo do tempo, o que é crucial para manter a aplicação sempre acessível.

## Amazon RDS - PostgreSQL

- **Amazon RDS (Relational Database Service)**: Permite configurar, operar e escalar facilmente um banco de dados relacional na nuvem.

- **Tipo de banco de dados**: PostgreSQL

# 📈 Dashboard

O dashboard foi construído utilizando a biblioteca `Recharts`, a qual foi responsável por gerar os gráficos de acordo com os dados recebidos da api. Possuímos 2 gráficos:

- Um para mostrar a quantidade de clientes por gênero.
- Um para mostrar a evolução da predição ao longo do tempo de acordo com as informações do usuário.

**Obs:** _O sistema foi construído de uma maneira que cada usuário precisa cadatrar os clientes da sua loja e a intenção é que o próprio usuário vá atualizado as informações do seu cliente de acordo com o tempo e assim sempre que atualizá-la, você deveria realizar uma nova predição._

# 🔒 Segurança

Toda a `api` e `frontend` estão envolvidos por uma segurança mediada por um token JWT.  
Para acessar os serviços da `api` é necessário passar o token no header `Authorization` com o seguinte valor `Bearer ${seu_token}`. O token JWT é emitido no momento do login e tem validade de 2 horas. Para gerar um novo token é necessário fazer login novamente. Em todas as rotas que são protegidas é possível de identificar a utilização da função `Depends` da biblioteca fastapi que recebe como argumento o método de autenticação. Caso não haja a utilização dessa função, significa que não há restrição de acesso a rota. Essa função é responsável por antes de executar a requisição executar uma outra função. Essa outra função então, é responsável por administrar as permissões de acordo com o necessário. A principal delas extraí dos headers o JWT que contém o id e os acessos que o usuário possuí. Caso o usuário tenha o acesso, a requisição continua, caso contrário, a request é encerrada.  
Já para acessar os serviços do `frontend` foi utilizado a biblioteca `next-auth`. Essa biblioteca permite um gerenciamento de sessão de usuário de forma simples e segura através de cookies criptografados. Para acessar qualquer rota do `frontend` é necessário estar logado, caso não esteja você sempre será redirecionado para o login. O login é feito através de um form que coletará o email e a senha do usuário, e enviará um `POST` para a rota de `login` da `api`. Caso a api retorne status 200, ele coletará os dados da resposta (que no caso é o token JWT do usuário) e o armazenará nos cookies geridos pela biblioteca `next-auth`. Em todas as chamadas que requerem autenticação, é utilizado as funções da biblioteca `next-auth` para coletar o JWT armazenado e passar nos headers da requisição. Todas as páginas do `frontend` estão envolvidas por um `middleware` que verifica `server side` se o usuário possui uma sessão vigente, caso não esteja, ele redireciona para a página de login, ou seja, nenhuma página é gerada a não ser que o usuário passe por um login bem sucedido.

# 📚 Modelo preditivo

## 📊 Preparação dos Dados

Para a criação desse modelo, foi utilizado o conjunto de dados do `kaggle` de [Customer Segmentation](https://www.kaggle.com/datasets/joebeachcapital/customer-segmentation?resource=download). O conjunto de dados contém 200 registros de clientes com 5 atributos: `customerID`, `gender`, `age`, `annual_income` e `spending_score`. O objetivo é prever o `spending_score` de um cliente com base nos outros atributos. Depois de carregado os dados apropriadamente utilizando a biblioteca `pandas`, foi feita a seguinte transformação dos dados:

- O atributo `gender` foi transformado em um atributo numérico, onde `1` representa `Male` e `0` representa `Female`.
- O atributo `customerID` foi removido, pois não é relevante para o modelo.

**_obs.: os demais dados não foram normalizados pois devido a quantidade de dados e a sua natureza não julguei necessário._**

Por fim, os dados foram divididos em dados de treinamento e dados de teste, onde 20% dos dados foram separados para teste. O código completo pode ser encontrado [aqui](/notebooks/model.ipynb).

## 🛠 Treinamento

Para esse caso foi escolhido o modelo `Linear Regression` do `skitlearn` pois o objetivo era prever um valor contínuo - o "spending score", e a regressão linear é uma das abordagens mais diretas para modelar uma relação linear entre um conjunto de variáveis independentes e uma variável dependente. O modelo foi treinado com os dados de treinamento e avaliado com os dados de teste. O código completo pode ser encontrado [aqui](/notebooks/model.ipynb).

## 🚀 API FastAPI

A API possui um endpoint `/model/predict` que recebe os seguintes dados no "body" da request:

- "gender": homem/male ou mulher/female,
- "age": idade em anos,
- "annual_income": em milhares de dólares por ano (170 representaria $170.000 por ano)

Caso a requisição proceda corretamente, utilizamos o modelo importado com a biblioteca `joblib`, retornando na chamada o "spending score" previsto para o cliente de acordo com o que o modelo informa. O código completo pode ser encontrado [aqui](/backend/model).
