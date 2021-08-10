## Table of contents

- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Commands](#commands)

## Requirements

Node v14  
PostgreSQL  


## Quick start

First, copy .env.template content into a new .env file. Then run the following commands:  
`npm run db:init` : Create the database then run the migrations and the seeds.   
`npm start` : Execute the project in development mode.  

## Commands

`build` : Build the project   
`test` : Run unit tests in test environment.   
`local`: Run the project with live reload in development mode.

Any command ending by `:watch` adds live reload to the original command.


