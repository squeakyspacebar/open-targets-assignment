# Introduction

This repository consists of an [Apollo GraphQL server](https://www.apollographql.com/docs/apollo-server/) that provides some target-disease association data and a React app that consumes the data from the server using [Apollo Client](https://www.apollographql.com/docs/react/) to display a data table with graphs.

The GraphQL server was built to run in AWS Lambda by way of [Netlify Functions](https://www.apollographql.com/docs/apollo-server/v2/deployment/netlify/), and the React app was scaffolded with [Create React App](https://create-react-app.dev/).

# Requirements

This project uses [NodeJS](https://nodejs.org/en/) (recommended v16 or above).

# Getting Started

First, clone a copy of the repository to your desired working directory in the terminal:

```
git clone https://github.com/squeakyspacebar/open-targets-tech-test.git
```

After the repository has been successfully cloned, navigate into the project directory:

```
cd open-targets-tech-test
```

Once inside the project repository, install the project's npm dependencies by running:

```
npm i
```

There is one setup step required to configure the React app. Create a copy of the `.env.sample` file in the project root directory and rename the copy to `.env`. Since `.env.sample` contains all the necessary configuration for the app and does not need to be edited, you can also skip copying the file and rename it directly.

The easiest way to build and deploy both the application and GraphQL API is with the [Netlify CLI](https://docs.netlify.com/cli/get-started/), which a local copy should have been installed by npm. If you already have `netlify-cli` installed globally, feel free to use whichever version you wish, but you can use the locally installed version by using the following command from the project directory:

```
npx netlify dev
```

The previous command should automatically build both the React app and the GraphQL server, then launch local dev servers for each one. If the process does not automatically open the React app in your browser, you should be able to access it under the default location: `http://localhost:8888`.

# Finding Your Way Around

## React App

-   The data table is implemented as a series of components under the `src/components` directory.
-   The Apollo Client is initialized in `index.js`.

## Apollo GraphQL Server

-   The server implementation can be found in `src/lambda/graphql.js`.
