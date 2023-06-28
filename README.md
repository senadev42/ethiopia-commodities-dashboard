# Market Prices Dashboard

This project includes an Express server and a React app that displays market prices data.

## Getting Started

To get started, first clone the repository:

```
$ git clone https://github.com/senadev42/ethiopian-commodities-dashboard.git
```

Next, navigate to the project directory:

```
$ cd ethiopian-commodities-dashboard
```

### Server

To start the server, navigate to the `server` directory and install the dependencies:

```
$ cd server
$ npm install
```

Next, start the server:

```
$ npm start
```

This will start the server on `http://localhost:5000`. The server fetches market prices data from a URL, parses it, and provides it to the React app on the `/` endpoint.

### React App

To start the React app, navigate to the project root directory and install the dependencies:

```
$ cd ..
$ npm install
```

Next, start the app:

```
$ npm run dev
```

This will start the app on `http://localhost:5173`. The app fetches market prices data from the server's `/` endpoint and displays it in a table format.

### TODO

On the web app

- [ ] Add some charts
- [ ] History date

On the server

- [ ] More routes (after finding other data sources)
