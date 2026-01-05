# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Features

- Full-stack application with React frontend and Node.js + Express backend
- Real-time chat and multiplayer using WebSockets with socket.io
- Activity detection when other player starts typing
- Matchmaking between players with lobby queue and room management
- Requeue players when opponent disconnects in the middle of game session
- Server serves as ultimate authority for game state and validates player actions
- Cloud deployment of monorepo architecture on Koyeb
- Containerization with Docker for hosting frontend and backend on the same server

## Installation

Clone the repository:

```
git clone https://github.com/<YOUR_GITHUB_USERNAME>/guess-who-dsa.git
```

Change into project directory:

```
cd guess-who-dsa
```

Install client dependencies:

```
cd client 
npm install
```

Install server dependencies:

```
cd ../server
npm install
```

### Development

> All commands assume you are at the root of the project directory.

Run frontend development build:

```
cd client
npm run dev
```

Run backend development build:

```
cd ../server
npm run dev
```

### Production

> All commands assume you are at the root of project directory.

Create frontend development build:

```
cd client
npm run build
```

Run backend production build:

```
cd ../server
npm run start
```