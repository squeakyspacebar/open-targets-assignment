import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache({
    // Prevent __typename from being returned when querying. We don't need it
    // for this project and it's easier to omit it from being returned than
    // move it after the fact.
    addTypename: false,
  }),
});

// Wrap the React app in ApolloProvider to expose the Apollo Client on the
// context (i.e. make it accessible down the component tree).
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
