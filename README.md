# Vue 2 Project with Node.js 16 Support

This README file provides instructions on how to set up and run a Vue 2 project with Node.js version 16 support. Additionally, it includes guidance on setting up a JSON server for development purposes.

## Prerequisites

Before you can start working on this project, ensure that you have the following prerequisites installed on your system:

1. **Node.js 16**: You can download and install Node.js from the official website: [Node.js Download](https://nodejs.org/)

## Project Setup

1. Clone the project repository to your local machine using the following command:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project_directory>
   ```

3. Install project dependencies using npm:

   ```bash
   npm install
   ```

## Running the Project

Once you have installed the project dependencies, you can run the Vue 2 project with the following command:

```bash
npm run serve
```

This command will start a development server, and you can access your Vue 2 application in your web browser at `http://localhost:8080` by default.

## Setting Up JSON Server

For this project, we use JSON Server to simulate a REST API for development purposes. To set up and run JSON Server, follow these steps:

1. Install JSON Server globally using npm:

   ```bash
   npm install -g json-server
   ```

2. Start JSON Server by running the following command:

   ```bash
   json-server --watch db.json
   ```

   This command will start the JSON Server and listen on `http://localhost:3000` by default.

## Accessing JSON Server API

You can access the JSON Server API using the following base URL:

```
http://localhost:3000
```

## Additional Information

For more information on Vue.js 2, please refer to the official documentation: [Vue.js 2 Documentation](https://vuejs.org/v2/guide/)

For more information on JSON Server, please refer to the official documentation: [JSON Server](https://github.com/typicode/json-server)

You are now ready to start developing your Vue 2 project with Node.js 16 support and a JSON Server for your API needs. Happy coding!
