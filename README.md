# yoga class registration

## 🔗 Hosting
# Backend is hosted on render.
[![Backend](https://img.shields.io/badge/Backend-deployed-brightgreen?style=for-the-badge&logo=appveyor)](https://yoga-server-2ew8.onrender.com/)
# Frontend is hosted on render.
[![Frontend](https://img.shields.io/badge/Frontend-deployed-blueviolet?style=for-the-badge&logo=appveyor)](https://yoga-client-e1u4.onrender.com/)


## Run Locally

Clone the client

Clone the server

```bash
  git clone https://github.com/shivam-kumar123/yoga-server.git
```

Go to the Server directory

```bash
  cd yoga-server
```

Install dependencies / node_modules  for server

```bash
  npm install
```

Configure environment variable after creating .env file in root directory of yoga-server folder

```bash
  .env
```

Start the server

```bash
  npm start
```

Server running on PORT as mentioned on .env file, lets assume you mentioned PORT=3001

```bash
  http://localhost:3001
```


## Tech Stack

**Client:** React,Typescript

**Server:** Node.js, Express.js

**Database** MongoDB





## System Architecture
![yoga-architecture](https://github.com/shivam-kumar123/yoga-server/assets/75497119/34c1736a-9f25-4a4f-8740-39f89647baf2)





## Future Scope

- Nginx can be used as reverse Proxy as each client and server are a microservice
- Consisent hashing can be implemented on Nginx server for effective load balancing if multiple server instance are present 
- database sharding can be done for making resilient system
- master slave architecture can be adopted for database for database failover prevention

## Check it out
[![Frontend]https://img.shields.io/badge/Project-deployed-blue?style=for-the-badge&logo=appveyor)](https://yoga-client-e1u4.onrender.com/)
