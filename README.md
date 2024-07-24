# React Node Telegram Bot Analytics

This project is designed to collect and display analytics from Telegram bot messages. It includes a Node.js server for data processing and a React client for displaying charts.

## Installation

1.Clone the repository:

```bash
  git clone https://link-to-project
```

2.Navigate to the project directory:

```bash
  cd my-project
```

## Backend

1.Navigate to the backend directory:

```bash
  cd backend
```

2.Install dependencies:

```bash
  npm install
```

3.Start the server:

```bash
  node server.js
```

The server will be running on <http://localhost:5000>. Use </generate-chart> for POST requests and </chart-data> to get chart data.

## Frontend

1.Navigate to the root directory of the project:

```bash
  cd ../
```

2.Install dependencies:

```bash
  npm install
```

3.Start the client application:

```bash
  npm start
```

The client will be running on <http://localhost:3000>.

## Deploy

1.Install:

```bash
  npm install gh-pages --save-dev
```

2.Add scripts to package.json:

'
"homepage": "https://[username or name of organization].github.io/[name of repo]/",
 "predeploy": "npm run build",
 "deploy": "gh-pages -d build"
'

4.Run Build:

```bash
  npm run build
```

## Usage

Sending Data to the Server
To send data to the server, use the following command:

```bash
  curl -X POST http://localhost:5000/generate-chart -H "Content-Type: application/json" -d '{"hour": "13:43", "duration": "1h 45m"}'
```

Fetching Chart Data
To fetch chart data, use the following command:

```bash
  curl http://localhost:5000/chart-data
```

## Project Structure

backend/ - Directory containing the server-side code
server.js - Main server file
src/ - Directory containing the client-side code
App.jsx - Main React component
App.css - Styles for the React application

## License

[MIT](https://choosealicense.com/licenses/mit/)

### [DEMO LINK](https://MariaSnegireva.github.io/react_node_telegram)
