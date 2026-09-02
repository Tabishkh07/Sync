# API Guide

## Authentication API

### Register User

Creates a new user account.

**Endpoint:** `POST /api/auth/register`

**Authentication:** Not required.

#### Request Body

- `name` — User's name.
- `email` — User's email address.
- `password` — User's password. Minimum 8 characters.

#### Responses

- `201 Created` — User created successfully.
- `400 Bad Request` — Invalid input.
- `409 Conflict` — Email is already registered.

> Passwords are never returned in API responses.

#### Example

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "name": "Tabish",
  "email": "tabish@gmail.com",
  "password": "test1234"
}
```

#### Success Response

```json
{
  "message": "User Created Successfully"
}
```

> Registration creates the account but does not log the user in. A separate login request is required to obtain a JWT.

---

### Login User

Authenticates a user and returns a JWT token.

**Endpoint:** `POST /api/auth/login`

**Authentication:** Not required.

#### Request Body

- `email` — Registered user's email address.
- `password` — User's password.

#### Responses

- `200 OK` — Login successful and JWT returned.
- `400 Bad Request` — Email or password is not a string.
- `401 Unauthorized` — Invalid credentials.

#### Example

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "tabish@gmail.com",
  "password": "test1234"
}
```

#### Success Response

```json
{
  "token": "<JWT>"
}
```

#### Failed Login

```json
{
  "error": "Invalid credentials"
}
```

---

## Users API

### Get Users

Listing all users.

**Endpoint:** `GET /api/users`

#### Query Parameters

- `page` — Page number. Default: `1`.
- `limit` — Number of users per page. Default: `10`, maximum: `100`.
- `name` — Filters users by name, ignoring uppercase/lowercase.
- `search` — Searches users by name or email.
- `sort` — Sorts users by name. Use `name` for ascending order and `-name` for descending order.

#### Success Response

**Status:** `200 OK`

Returns a list of users along with pagination information.

#### Response

> Passwords are never returned in API responses.

- `users` — Array of user objects.
- `pagination` — Information about the current page and total results.
  - `page` — Current page.
  - `limit` — Number of users per page.
  - `totalUsers` — Total number of matching users.
  - `totalPages` — Total number of available pages.

#### Example

Get up to 5 users whose name contains "tabish", sorted alphabetically:

```http
GET /api/users?name=tabish&limit=5&sort=name
```

---

### Get User By ID

Returns a specific user by their ID.

**Endpoint:** `GET /api/users/:id`

**Authentication:** Not required.

#### Responses

- `200 OK` — User found.
- `400 Bad Request` — Invalid user ID format.
- `404 Not Found` — User does not exist.

> Passwords are never returned in API responses.

#### Example

```http
GET /api/users/6a76abef5b5414b83e1b21a8
```

---

### Update User

Updates the authenticated user's name or email.

**Endpoint:** `PUT /api/users/:id`

**Authentication:** Required.

**Authorization:** A user can only update their own account.

#### Request Body

- `name` — User's name.
- `email` — User's email address.

#### Responses

- `200 OK` — User updated successfully.
- `400 Bad Request` — Invalid input.
- `401 Unauthorized` — Missing or invalid authentication token.
- `403 Forbidden` — User is not authorized to update this account.
- `404 Not Found` — User does not exist.

> Passwords are never returned in API responses.

#### Example

```http
PUT /api/users/6a97794e0518897ecd89966e
Authorization: Bearer <JWT>
Content-Type: application/json
```

```json
{
  "name": "Put Updated",
  "email": "putupdated@gmail.com"
}
```

---

### Delete User

Deletes the authenticated user's account.

**Endpoint:** `DELETE /api/users/:id`

**Authentication:** Required.

**Authorization:** A user can only delete their own account.

#### Responses

- `200 OK` — User deleted successfully.
- `401 Unauthorized` — Missing or invalid authentication token.
- `403 Forbidden` — User is not authorized to delete this account.
- `404 Not Found` — User does not exist.

#### Example

```http
DELETE /api/users/6a977c490518897ecd89966e
Authorization: Bearer <JWT>
```

#### Success Response

```json
{
  "message": "User Deleted Successfully"
}
```

---

## Authentication

Protected endpoints require a valid JWT.

After a successful login, the API returns a JWT token.

The token must be sent in the `Authorization` header using the Bearer scheme.

**Header:**

```http
Authorization: Bearer <JWT>
```

### Protected Endpoints

- `PUT /api/users/:id`
- `DELETE /api/users/:id`

### Public Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users`
- `GET /api/users/:id`

---

## Protected Request Example

Protected endpoints require a JWT in the `Authorization` header.

Example: Update the authenticated user's account.

```bash
curl -i -X PUT "http://localhost:3000/api/users/:id" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <JWT>" \
-d '{"name":"Updated Name","email":"updated@gmail.com"}'
```

The JWT identifies the authenticated user.

The user can only update their own account.

A request without a valid JWT returns `401 Unauthorized`.

A request attempting to modify another user's account returns `403 Forbidden`.

---

## Common HTTP Errors

| Status | Meaning |
|---|---|
| `400 Bad Request` | The request contains invalid input or an invalid user ID. |
| `401 Unauthorized` | Authentication is missing, invalid, or expired. |
| `403 Forbidden` | The authenticated user is not authorized to perform the requested action. |
| `404 Not Found` | The requested user does not exist. |
| `409 Conflict` | The email address is already registered. |
| `413 Payload Too Large` | The request body exceeds the allowed size. |
| `500 Internal Server Error` | An unexpected server-side error occurred. |

> Internal error details are logged by the server but are not exposed to API clients.
