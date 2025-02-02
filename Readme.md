# FAQ Management System

A comprehensive FAQ management system built with Express.js (server) and React (admin panel). This system allows users to create, retrieve, and manage frequently asked questions (FAQs) efficiently.

## Features
- **CRUD Operations:** Create, read, update, and delete FAQs.
- **Multilingual Support:** Automatically translates FAQs into multiple languages.
- **Caching:** Uses Redis to optimize performance.
- **Database Integration:** PostgreSQL as the primary database.
- **Admin Panel:** A React-based client to manage FAQs.
- **Docker Support:** Fully containerized for easy deployment.
- **Automated Testing:** Uses Vitest for unit and integration tests.

## Project Structure
The repository contains two main directories:
- **`server/`** - The backend service built with Express.js.
- **`admin/`** - The React client for managing FAQs.

Each service can be run individually by setting up the required environment variables using the `env.sample` files. Alternatively, follow the provided `.env` configurations to utilize the native services.

## Prerequisites
- [Bun](https://bun.sh/) (instead of npm)
- Node.js (for compatibility)
- PostgreSQL
- Redis
- Docker (optional, for containerized setup)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/SinghYuvraj0506/bharatfd-assingment-faqs
   cd bharatfd-assingment-faqs
   ```

2. Navigate to the `server/` directory and install dependencies:
   ```sh
   cd server
   bun install
   ```

3. Navigate to the `admin/` directory and install dependencies:
   ```sh
   cd ../admin
   bun install
   ```

4. Set up environment variables using `.env.sample` as a reference.

5. Start the backend server:
   ```sh
   bun run dev
   ```

6. Start the React admin panel:
   ```sh
   bun run dev
   ```

## Running with Docker
1. Build and start the containers:
   ```sh
   docker-compose up --build
   ```

2. Access the backend at `http://localhost:5000` and the admin panel at `http://localhost:3000`.

## API Usage
- **GET /api/v1/faq** - Retrieve all FAQs.
- **GET /api/v1/faq/:id** - Retrieve a FAQ Variants.
- **POST /api/v1/faq** - Create a new FAQ.
- **DELETE /api/v1/faq/:id** - Delete an FAQ.

Use an API tool like Postman to test the endpoints.

## Running Tests
We use **Vitest** for automated testing for backend. All test files are located in `server/src/tests/`.

Run tests using:
```sh
cd ./server
bun run test
```

## Contribution Guidelines
1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit changes (`git commit -m "Add new feature"`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
This project is licensed under the MIT License.

