# Middleware: Token Verification

This middleware is designed to verify the authenticity of JSON Web Tokens (JWT) provided in the authorization header of incoming HTTP requests. It ensures that the token is valid and has not been tampered with.

## Installation

Make sure to install the required dependencies:

```bash
npm install jsonwebtoken dotenv
```

## Usage

1. Import the middleware into your Express application:

```typescript
import verifyToken from './path-to-middleware/verifyToken';
```

2. Apply the middleware to the routes or endpoints where token verification is required:

```typescript
app.use('/secured-endpoint', verifyToken);
```

## Configuration

Ensure that you have a valid JWT secret key either provided in the environment variable `JWT_KEY` or a default value (for development purposes) if not set.

```typescript
// Create a .env file in your project root and add the following:
JWT_KEY=your_secret_key
```

## Middleware Explanation

1. **Dependencies:**
   - `jsonwebtoken`: Used for verifying JWTs.
   - `dotenv`: Used for loading environment variables.

2. **Middleware Function:**
   - The middleware function takes three parameters: `req` (request), `res` (response), and `next` (next middleware function).
   - It extracts the JWT from the authorization header and verifies its authenticity using the provided secret key.

3. **Middleware Behavior:**
   - If no token is provided in the authorization header, the middleware sends a `401 Unauthorized` response.
   - If the token is provided but invalid or expired, the middleware sends a `500 Internal Server Error` response.
   - If the token is valid, it decodes the token payload and attaches it to the `user` property in the request (`req`).
   - The request is then passed to the next middleware using the `next()` function.

4. **Usage Example:**
   - Apply this middleware to routes or endpoints that require authentication.

```typescript
import express from 'express';
import verifyToken from './middleware/verifyToken';

const app = express();

// Apply middleware to the '/secured-endpoint'
app.use('/secured-endpoint', verifyToken);

// Define your secured routes below
app.get('/secured-endpoint', (req, res) => {
  res.json({ message: 'Access granted!' });
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```
