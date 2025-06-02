# Streeters Casino Backend

A NestJS backend application for Streeters Casino, built with Express and MongoDB using Mongoose.

## Description

This is the backend API for Streeters Casino, providing a robust and scalable server-side solution for casino operations.

## Technologies

- **NestJS** - A progressive Node.js framework
- **Express** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling tool
- **TypeScript** - Typed superset of JavaScript

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4.4 or higher)

## Installation

```bash
$ npm install
```

## Configuration

1. Create a `.env` file in the root directory
2. Add the following environment variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/streeters-casino
PORT=3000

# Environment
NODE_ENV=development
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation

The API is available at `http://localhost:3000/api`

### Endpoints

- `GET /api` - Welcome message
- `GET /api/health` - Health check endpoint
- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `PATCH /api/users/:id/balance` - Update user balance

## Project Structure

```
streeters-casino-be/
├── src/
│   ├── app.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   └── users/
│       ├── dto/
│       │   ├── create-user.dto.ts
│       │   └── update-user.dto.ts
│       ├── schemas/
│       │   └── user.schema.ts
│       ├── users.controller.ts
│       ├── users.module.ts
│       └── users.service.ts
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .env
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── nest-cli.json
├── package.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json
```

## License

This project is [UNLICENSED](LICENSE).

## Support

For support, please contact the Streeters Casino development team.

## Stay in touch

- Website - [Streeters Casino](https://streeterscasino.com)
- Backend API - [http://localhost:3000/api](http://localhost:3000/api)
