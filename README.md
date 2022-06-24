## Application Overview

This repository for everyone.

## Software Requirements

- [Node](https://nodejs.org/en/download/)
- [ExpressJS](https://www.npmjs.com/package/express)
- [MongoDB](https://www.mongodb.com/)

## How to install

### Using Git (recommended)

1.  Clone the project from github. Change "nodejs-express-mongodb-jsvalidation-bolierplate-prashant" to your project name.

```bash
git clone https://github.com/prashant1879/nodejs-express-mongodb-jsvalidation-bolierplate-prashant.git ./nodejs-express-mongodb-jsvalidation-bolierplate-prashant
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd nodejs-express-mongodb-jsvalidation-bolierplate-prashant
npm install && npm update
```

### IMPORTING DATABASED USING LINUX TERMINAL

```bash
sudo mongorestore --db bolierplate --verbose ./nodejs-express-mongodb-jsvalidation-bolierplate-prashant/0_files/database/BSON_IMPORT
```

### Setting up environments

1.  You will find a file named `.env` on config directory of project. which is used for constants define and enviroment purpose as well.

## Project structure

```sh
.
├── app.js
├── .env
├── README.md
├── routes.js
├── package.json
├── 0_files
│   ├── database
│   │   ├──BSON_IMPORT
│   │   ├──Studio3T JSON IMPORT
│   └── nodejs-express-mongodb-jsvalidation-bolierplate-prashant.postman_collection.json
└── app
    ├── controllers
    │   ├── project.controller.js
    │   ├── task.controller.js
    │   └── user.controller.js
    ├── helpers
    │   ├── auth.helper.js
    │   └── common.helper.js
    ├── models
    │   ├── project.model.js
    │   ├── task.model.js
    │   └── user.model.js
    ├── validation
    │   ├── project.validation.js
    │   ├── task.validation.js
    │   └── user.validation.js
    └── routes
        ├── project.routes.js
        ├── task.routes.js
        └── user.routes.js

```

## How to run

### Running API server locally

```bash
nodemon app.js
```
