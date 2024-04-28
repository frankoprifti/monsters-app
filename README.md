# Lerna Monorepo for SPA with React Frontend and Express.js Backend

This monorepo contains a frontend application built with React and a backend application built with Express.js. The backend handles data storage and retrieval, while the frontend provides a single-page application (SPA) for user interaction. This README explains how to set up and run the project, including the requirements and key features.

## Table of Contents

- [Project Overview](#project-overview)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Running the Project](#running-the-project)
- [Docker Integration](#docker-integration)
- [Routes and Endpoints](#routes-and-endpoints)

## Project Overview

This project is a mono repo managed with [Lerna](https://lerna.js.org/). It consists of two main workspaces: a React frontend and an Express.js backend. The frontend is a Single Page Application (SPA) with multiple routes, while the backend provides RESTful endpoints to handle data operations.

## Setup Instructions

To set up the project, follow these steps:

### Prerequisites

Ensure the following are installed on your system:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/frankoprifti/monsters-app
cd monsters-app
```

### Install Dependencies

Use npm to install all dependencies and link packages:

`npm install`

## Project Structure

The monorepo consists of two primary workspaces:

- **App (Frontend)**:

  - A React-based Single Page Application (SPA).
  - Uses Material UI (MUI) for UI components.
  - Contains three primary routes:
    1.  Create monsters.
    2.  Display a paginated view of created monsters.
    3.  Display a new monster each second and delete those shown for over 10 seconds.

- **Backend**:

  - An Express.js application.
  - Manages monster data using Prisma with SQLite.
  - Provides RESTful endpoints to handle data operations for the frontend.

## Running the Project

To start the project, you can run both the frontend and backend at the same time. Here's how:

- **Start the app**: Navigate to the frontend package and start the development server (this will start both frontend at port 3000 and backend in port 3001):

  ```bash
    npm start
  ```

## Docker

To dockerise the app run
`docker-compose up`

- **Frontend**: Access the React frontend at `http://localhost:3000` in a web browser.
- **Backend**: Check the backend (Express.js) at `http://localhost:3001` to confirm it's running.

## Routes and Endpoints

The backend provides the following endpoints for the frontend to interact with:

- **Create Monster**:

  - `POST /monster`
  - Creates a new monster with specified details (name, level, species, sub-species).

- **Bulk Create Monsters**:

  - `POST /monster/bulk`
  - Creates multiple monsters based on the input data.

- **Get Monsters (Paginated)**:

  - `GET /monsters?page=<page-number>&pageSize=<page-size>`
  - Returns a paginated list of created monsters.

- **Get Random Monster**:

  - `GET /monster/random`
  - Gets a random monster from the ones stored in the database.

- **Delete Monster**:

  - `DELETE /monster/:id`
  - Deletes a monster based on its ID.
