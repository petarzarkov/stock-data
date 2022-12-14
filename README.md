## Showcase
- [App](https://stock-data-app.herokuapp.com/)
- [API docs](https://stock-data-app.herokuapp.com/documentation)

<div align="center" style="background-color: rgb(149 150 150 / 35%); border-radius: 10px;">
  <h1>Stock Data</h1>
  <p>App and API</p>
  <a href="https://github.com/petarzarkov/stock-data/actions/"><img src="https://github.com/petarzarkov/stock-data/actions/workflows/build.yml/badge.svg?branch=main" alt="Build status"></a>
  <a href="https://github.com/petarzarkov/stock-data/blob/main/LICENSE"><img src="https://img.shields.io/github/license/petarzarkov/stock-data" alt="License"></a>
  <p style="color: gray;">Stack</p>
  <a href="https://pnpm.io/" target="blank"><img title="pnpm" alt="pnpm" width="26" src="https://pnpm.io/img/favicon.png" /></a>
  <a href="https://vitejs.dev/" target="blank"><img title="ViteJS" alt="ViteJS" width="26" src="https://vitejs.dev/logo.svg" /></a>
  <a href="https://chakra-ui.com/" target="blank"><img title="ChakraUI" alt="ChakraUI" width="26" src="https://chakra-ui.com/favicon.png" /></a>
  <a href="https://reactjs.org/" target="blank"><img title="React" alt="React" width="26" src="https://reactnative.dev/img/pwa/manifest-icon-512.png" /></a>
  <a href="https://www.javascript.com/"><img title="JavaScript" alt="JavaScript" width="26px" height="26px" src="https://github.com/get-icon/geticon/raw/master/icons/javascript.svg" /></a>
  <a href="https://www.typescriptlang.org/"><img title="Typescript" alt="Typescript" width="26px" height="26px" src="https://github.com/get-icon/geticon/raw/master/icons/typescript-icon.svg" /></a>
  <a href="https://www.fastify.io/"><img title="Fastify" alt="Fastify" width="26px" height="26px" src="https://www.fastify.io/images/favicon-32x32.1e22f0e774bc3cce.png" /></a>
  <a href="https://sequelize.org/"><img title="Sequelize" alt="Sequelize" width="26px" height="26px" src="https://sequelize.org/favicon.ico" /></a>
  <a href="https://nodejs.org/en/"><img title="NodeJS" alt="NodeJS" width="26px" height="26px" src="https://github.com/get-icon/geticon/raw/master/icons/nodejs-icon.svg" /></a>
  <a href="https://www.docker.com/"><img title="Docker" alt="Docker" width="26px" height="26px" src="https://github.com/get-icon/geticon/raw/master/icons/docker-icon.svg" /></a>
  <a href="https://github.com/" title="Github"><img src="https://github.com/get-icon/geticon/raw/master/icons/github-icon.svg" alt="Github" width="26px" height="26px" style="background-color: white; border-radius: 12px;"></a>
  <a href="https://code.visualstudio.com/" title="Visual Studio Code"><img src="https://github.com/get-icon/geticon/raw/master/icons/visual-studio-code.svg" alt="Visual Studio Code" width="26px" height="26px"></a>
  <a href="https://eslint.org/" title="ESLint"><img src="https://github.com/get-icon/geticon/raw/master/icons/eslint.svg" alt="ESLint" width="26px" height="26px"></a>
</div>

## Development
- `npm i -g pnpm`
- Setup DB
  - with docker compose, from root dir run, tomato
    - `docker-compose up`
  - or with docker container, tamato
    - build the image 
        - `docker build -f db.Dockerfile -t stock-data-db:local .`
    - run it
        - `docker container run -d -p 5445:5445 stock-data-db:local`
  - Migrate and seed the db
    - `pnpm install`
    - `npm run db:update`
- Start the service
  - `npm start`
