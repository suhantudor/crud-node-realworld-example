# CRUD NODE REAL WORLD EXAMPLE

<img src="https://img.shields.io/badge/crud node real world example-1.0.0-15ACF6?style=for-the-badge&logo=none&logoColor=white" alt="version" />&nbsp;<img src="https://img.shields.io/badge/DEVELOPER-Suhan Tudor-purple?style=for-the-badge&logo=none" alt="developer" />

**crud node real world example** is a nodejs implementation that shows the utility of _crud-node_ package.

## 👀 Benefits

Benefits of using _crud-node_ package.

- concise syntax
- reduce boilerplate
- spead up implementation
- over tested on several projects to ensure stability

## 📃 Prerequisites

You have to have installed following before running the example:

- [Nodejs](https://nodejs.org/en/)
- [Git bash](https://git-scm.com/downloads)
- [Docker](https://docs.docker.com/get-docker/)
- [Postman](https://www.postman.com/downloads/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)

## ⚡️ Usage

After _Prerequisites_ step is complete follow the next steps.

1. Navigate to root of the project

```js
yarn install
```

2. Start containers all:

Initially this application uses MySQLX adapter. After containers are running you can directly make request in postman.

```js
docker-compose up -d
```

Start containers MySQL container:

```js
docker-compose up -d mysql
```

Start containers MySQLX container:

```js
docker-compose up -d mysqlx
```

3. Restore database backup

```bash
bash restore_db.sh
```

4. Access _adminer_ on **localhost:8080**

5. Import postman collection and make first request

## 📝 Notes

- To switch between databases go to _src/db/index.ts_ and uncomment the database that you want to use (comment the database that you do not want to use).

- The tables in MySQLX adapter are created programmatically in the moment you start the application.

## ⚠️ License

UNLICENSED
