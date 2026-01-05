# guess-who-dsa

> Check out the live demo [here](https://radical-winona-personal-domain-8890598e.koyeb.app/). Remember two players are needed to start the game!

Guess Who: Data Structures and Algorithms provides a unique twist on the traditional two-player board game. Instead of guessing a character, players are randomly assigned a data structure or algorithm and have to guess what their opponent has been assigned based on what they have learned from their Data Structures and Algorithms courses. Combining real-time multiplayer gameplay with computer science education, the game not only provides a modern take on a classic game but also helps students to learn and better understand data structures and algorithms in a fun and interactive way.

## Features

- Full-stack application with React frontend and Node.js + Express backend
- Real-time chat and multiplayer using WebSockets with socket.io
- Activity detection when other player starts typing
- Matchmaking between players with lobby queue and room management
- Requeue players when opponent disconnects in the middle of game session
- Server serves as ultimate authority for game state and validates player actions
- Cloud deployment of monorepo architecture on Koyeb
- Containerization with Dockerfile for hosting frontend and backend on the same server

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

> All commands assume you are at the root of the project directory.

Create frontend production build:

```
cd client
npm run build
```

Run backend production build:

```
cd ../server
npm run start
```

## Known Issues

The user interface becomes desynchronized when socket listeners have not been mounted before communication from the server is received because the components on which the listeners are mounted have not been rendered. Players can rejoin matchmaking to resolve the problem.