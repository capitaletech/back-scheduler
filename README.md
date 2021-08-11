## Table of contents

- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Commands](#commands)

## Requirements

Node v14  
PostgreSQL  

## Quick start

First, copy the .env.template content into a new .env file. Then run the following commands:\
`npm run db:init` which creates the database then run the migrations and the seeds.\
`npm start` to execute the project in development mode.\

## Commands

`build` : Build the app for development environment.\
`build-prod` : Build the app for prod environment.\
`test` : Run unit tests in test environment.\
`dev`: Run the project in development mode.\
`prod`: Run the project in production mode.\
`lint`: Run the linter Eslint.\
`apidoc`: Generate api doc.\
`db:create`: Create the database Scheduler.\
`db:migrate`: Execute the migration files.\
`db:seed`: Execute the seed files.

Any command ending by `:watch` adds live reload to the original command.


