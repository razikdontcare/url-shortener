# Wannabe URL Shortener

A simple URL shortener service built with Next.js, TypeScript, Firebase, and Hono.

## Table of Contents

- [Wannabe URL Shortener](#wannabe-url-shortener)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Development](#development)
    - [Project Structure](#project-structure)
  - [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/url-shortener.git
    cd url-shortener
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Configuration

Create a `.env.local` file in the root directory and add your Firebase and other environment variables:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
WANNABE_ORIGIN=your_origin
WANNABE_DEFAULT_ORIGIN=your_default_origin
BASE_URL=your_base_url
```

## Usage

Start the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

``GET /api/hello``
Returns a welcome message.

``POST /api/create``
Create a new shortened URL.

- Request Body:
    ```json
    {
        "target": "https://example.com",
        "randomId": true
    }
    ```
- Response:
    ```json
    {
        "id": "abc123",
        "target": "https://example.com",
        "url": "https://yourdomain.com/abc123",
        "_createdAt": 1672531200000,
        "_updatedAt": 1672531200000,
        "message": "URL created successfully."
    }
    ```

``GET /api/read``
Retrieves the target URL for a given ID.

- Query Parameters:
  - `id`: The shortened URL ID.
- Response:
    ```json
    {
        "id": "abc123",
        "target": "https://example.com",
        "_createdAt": 1672531200000,
        "_updatedAt": 1672531200000,
    }
    ```

## Development

### Project Structure

- `app/api/[...route]/route.ts`: API route handlers.
- `routes/create.ts`: Handles the URL creation form.
- `routes/read.ts`: Handles URL retrieval.
- `lib/firebase.ts`: Firebase configuration.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.