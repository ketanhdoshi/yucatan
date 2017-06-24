# Yucatan
An experimental project to create a web application using pure Javascript. The application is composed of three logical units:

1) The Web Client is a rich single page client app in React. It is structured as a universal (or isomorphic) Javascript application with common UI code running in both the browser and the server. In other words the same UI can be rendered on either the server-side or the browser-side using identical code.

The UI functionality layer makes use of React Router for client or server routing and Redux for handling data flow, state storage and component interaction.

The UI display layer uses Bootstrap and modular CSS using CSS Modules. It follows the standard React paradigm of structuring the UI as a set of reusable components and sub-components.

Bundling and packaging is done using Webpack.

2) The Web Backend shares code with the web client and runs within a node.js server. 

3) The API Backend is a REST API that communicates over HTTP using JSON payloads.

The single node.js server is based on the HAPI framework and runs with two backend connections. The first hosts the web backend as above and the second hosts the API backend.

The API supports authentication schemes such as Basic Auth, Cookie Auth and JWT.

The persistence layer uses the mongoose ORM to connect to MongoDB NoSQL database.
