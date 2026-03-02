# @dephub/response 🌐

> Enhanced HTTP Response class with convenient static methods for common scenarios. A lightweight wrapper around the native Response class for Node.js and browser environments.

[![NPM version](https://img.shields.io/npm/v/@dephub/response.svg?style=flat)](https://npmjs.org/package/@dephub/response)
[![ESM-only](https://img.shields.io/badge/ESM-only-brightgreen?style=flat)](https://nodejs.org/)

---

## Features ✨

- 🛠️ **Native Wrapper** - Extends standard `Response` with zero overhead
- 🎯 **Type Safe** - Full TypeScript support with native types
- 🔧 **Convenience Methods** - Static helpers for common HTTP scenarios
- 📡 **Fetch API Compatible** - Works seamlessly with standard Fetch API
- 🚀 **Lightweight** - No dependencies, minimal footprint
- 🕒 **Timestamped Responses** - Automatic ISO timestamps in structured responses

---

## Installation 📦

```bash
npm install @dephub/response
# or
pnpm add @dephub/response
# or
yarn add @dephub/response
```

---

## Quick Start 🚀

```typescript
import { HttpResponse } from '@dephub/response';

// Success responses
HttpResponse.json({ data: user });
HttpResponse.success(user, 'User found');
HttpResponse.created(newUser, 'User created successfully');

// Error responses
HttpResponse.notFound('User not found');
HttpResponse.unauthorized('Invalid credentials');
HttpResponse.serverError('DATABASE_ERROR', 'Unable to connect');

// Special responses
HttpResponse.noContent();
HttpResponse.redirect('/login');
```

---

## Usage Examples 🎯

### Basic API Route Handler

```typescript
import { HttpResponse } from '@dephub/response';

export function GET(request: Request) {
  try {
    const user = await getUser(request);

    if (!user) {
      return HttpResponse.notFound('User not found');
    }

    return HttpResponse.success(user);
  } catch (error) {
    return HttpResponse.serverError('SERVER_ERROR', 'Something went wrong');
  }
}
```

### RESTful API Implementation

```typescript
import { HttpResponse } from '@dephub/response';

// GET /users/123
function getUser(id: string) {
  const user = db.users.find(id);
  if (!user) {
    return HttpResponse.notFound('User not found');
  }
  return HttpResponse.success(user);
}

// POST /users
function createUser(userData: any) {
  const newUser = db.users.create(userData);
  return HttpResponse.created(newUser, 'User created successfully');
}

// DELETE /users/123
function deleteUser(id: string) {
  const user = db.users.find(id);
  if (!user) {
    return HttpResponse.notFound('User not found');
  }

  db.users.delete(id);
  return HttpResponse.noContent();
}
```

### Error Handling

```typescript
import { HttpResponse } from '@dephub/response';

function updateUser(id: string, updates: any) {
  const user = db.users.find(id);

  if (!user) {
    return HttpResponse.notFound('User not found');
  }

  if (!hasPermission(user)) {
    return HttpResponse.forbidden('Insufficient permissions');
  }

  try {
    const updatedUser = db.users.update(id, updates);
    return HttpResponse.success(updatedUser, 'User updated');
  } catch (error) {
    return HttpResponse.serverError('UPDATE_FAILED', 'Failed to update user');
  }
}
```

---

## API Reference 📚

### Static Methods

#### `HttpResponse.json(body, init?)`

Create a JSON response with proper Content-Type header.

**Parameters:**

- `body` (any) - Data to send as JSON
- `init` (ResponseInit) - Standard response options

**Returns:** `HttpResponse`

#### `HttpResponse.success(body, message?, init?)`

Create a successful 200 OK response with standardized format.

**Parameters:**

- `body` (any) - Response data payload
- `message` (string) - Optional success message
- `init` (ResponseInit) - Additional response options

**Returns:** `HttpResponse`

#### `HttpResponse.created(body, message?, init?)`

Create a 201 Created response for new resources.

**Parameters:**

- `body` (any) - The created resource data
- `message` (string) - Success message (default: 'Resource created')
- `init` (ResponseInit) - Additional response options

**Returns:** `HttpResponse`

#### `HttpResponse.noContent(init?)`

Create a 204 No Content response.

**Parameters:**

- `init` (ResponseInit) - Additional response options

**Returns:** `HttpResponse`

#### `HttpResponse.redirect(url, status?)`

Create a redirect response.

**Parameters:**

- `url` (string | URL) - URL to redirect to
- `status` (number) - HTTP status code (default: 302)

**Returns:** `HttpResponse`

### Error Responses

All error methods return a `HttpResponse` with standardized error format and appropriate status code.

#### `HttpResponse.error(error?, message?, init?)`

Generic error response (400 Bad Request by default).

#### `HttpResponse.unauthorized(message?, init?)`

401 Unauthorized response.

#### `HttpResponse.forbidden(message?, init?)`

403 Forbidden response.

#### `HttpResponse.notFound(message?, init?)`

404 Not Found response.

#### `HttpResponse.serverError(error?, message?, init?)`

500 Internal Server Error response.

---

## Response Format

### Success Response Format

```json
{
  "body": { ... },
  "message": "Operation successful",
  "success": true,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Error Response Format

```json
{
  "error": "NOT_FOUND",
  "message": "Resource not found",
  "success": false,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## License 📄

MIT License – see [LICENSE](LICENSE) for details.

**Author:** Estarlin R ([estarlincito.com](https://estarlincito.com))
