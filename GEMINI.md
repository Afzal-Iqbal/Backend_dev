# Gemini Project Context: Backend_dev

This document provides a comprehensive overview of the `Backend_dev` directory to be used as instructional context for future interactions.

## Project Overview

This repository is a workspace containing three distinct and independent Node.js projects. Each sub-directory (`express`, `express_project`, `server`) is a self-contained application with its own dependencies and entry point. The projects appear to be for learning and demonstrating different aspects of Node.js backend development, from basic module systems and HTTP servers to building APIs with the Express.js framework.

The root directory also contains `infor.txt`, which holds general notes on Node.js and `npm`.

## Project Details

### 1. `express` Project

-   **Purpose:** This project demonstrates the basics of Node.js CommonJS modules. It does not run a web server. The main file (`index.js`) imports functions from a local module (`cartModule.js`) and logs their output to the console.
-   **Key Files:**
    -   `index.js`: The main entry point.
    -   `cartModule.js`: A local module exporting simple functions.
    -   `package.json`: Defines `nodemon` as a development dependency.

-   **Building and Running:**
    ```bash
    # Navigate to the project directory
    cd express

    # Install dependencies
    npm install

    # Run the script using nodemon for automatic restarts on file changes
    npm start
    ```

### 2. `express_project` Project

-   **Purpose:** This project is a simple REST API built with the Express.js framework. It listens on port 8000 and exposes several endpoints (e.g., `/`, `/news`, `/products`, `/login`) to demonstrate routing, handling dynamic parameters, and processing JSON request bodies.
-   **Key Files:**
    -   `index.js`: The main server file.
    -   `info.txt`: Contains detailed notes about the Express.js framework.
    -   `package.json`: Defines `express` as a dependency.

-   **Building and Running:**
    ```bash
    # Navigate to the project directory
    cd express_project

    # Install dependencies
    npm install

    # Run the server
    node index.js
    ```
    *Note: This project does not have a `start` script configured.*

### 3. `server` Project

-   **Purpose:** This project demonstrates how to create a basic web server using Node.js's built-in `http` module, without any external frameworks. It listens on port 8000 and provides simple responses for the `/news` and `/` routes.
-   **Key Files:**
    -   `index.js`: The server entry point.
    -   `package.json`: Defines `nodemon` for development.

-   **Building and Running:**
    ```bash
    # Navigate to the project directory
    cd server

    # Install dependencies (if any were added)
    npm install

    # Run the server using nodemon for automatic restarts
    npm start
    ```

## Development Conventions

-   **Modularity:** Each of the three directories is a separate, self-contained Node.js project.
-   **Module System:** All projects use the CommonJS module system (`require` and `module.exports`).
-   **Dependencies:** Dependencies are managed individually within each project's `package.json`.
-   **Documentation:** Notes and learning materials are stored in `.txt` files (`infor.txt`, `express_project/info.txt`).
