# React Node Telegram Bot Analytics

This project is designed to collect and display analytics from Telegram bot messages. It includes a Node.js server for data processing and a React client for displaying charts.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/MariaSnegireva/react_node_telegram.git

2. Navigate to the project directory:

cd react_node_telegram

## Backend

1. Navigate to the backend directory:

```bash
  cd backend
```

2. Install dependencies:

```bash
  npm install
```

3. Start the server:

```bash
  node server.js
```

The server will be running on <http://localhost:5000>. Use </generate-chart> for POST requests and </chart-data> to get chart data.

## Frontend

1. Navigate to the root directory of the project:

```bash
  cd ../
```

2. Install dependencies:

```bash
  npm install
```

3. Start the client application:

```bash
  npm start
```

The client will be running on <http://localhost:3000>.

## Usage

Sending Data to the Server
To send data to the server, use the following command:

curl -X POST <http://localhost:5000/generate-chart> -H "Content-Type: application/json" -d '{"hour": "13:43", "duration": "1h 45m"}'

Fetching Chart Data
To fetch chart data, use the following command:

curl <http://localhost:5000/chart-data>

## Project Structure

backend/ - Directory containing the server-side code
server.js - Main server file
src/ - Directory containing the client-side code
App.jsx - Main React component
App.css - Styles for the React application

## License

[MIT](https://choosealicense.com/licenses/mit/)

#### [DEMO LINK](https://MariaSnegireva.github.io/react_node_telegram)
