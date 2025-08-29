# Todo App

A full-stack todo application built with Node.js, Express.js, and SQLite. Features user authentication, task management, and a clean, responsive interface with dark/light mode support.

## Features

- ✅ User registration and authentication
- ✅ JWT-based session management
- ✅ Create, read, update, and delete todos
- ✅ Filter todos by status (All, Open, Complete)
- ✅ Responsive design with custom CSS framework
- ✅ Automatic dark/light mode based on system preference
- ✅ SQLite database for data persistence

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Authentication**: JWT, bcryptjs
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Styling**: Custom Fanta CSS framework

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd todo-app
```

2. Install dependencies:
```bash
npm install
```

3. Install required packages:
```bash
npm install express sqlite3 bcryptjs jsonwebtoken
```

4. Start the server:
```bash
npm start
# or
node src/server.js
```

5. Open your browser and navigate to:
```
http://localhost:5003
```

## Usage

### Authentication
1. **Sign Up**: Create a new account with email and password (minimum 6 characters)
2. **Login**: Access your existing account
3. **Logout**: Clear session and return to login screen

### Managing Todos
- **Add Task**: Enter a task description and click the plus button
- **Mark Complete**: Click "Done" to mark a task as completed
- **Delete Task**: Click "Delete" to remove a task permanently
- **Filter Tasks**: Use the navigation tabs to view All, Open, or Complete tasks

## API Endpoints

### Authentication
- `POST /auth/register` - Create new user account
- `POST /auth/login` - Authenticate existing user

### Todos
- `GET /todos` - Get all todos for authenticated user
- `POST /todos` - Create new todo
- `PUT /todos/:id` - Update existing todo
- `DELETE /todos/:id` - Delete todo

All todo endpoints require Authorization header with valid JWT token.

## Project Structure

```
todo-app/
├── src/
│   ├── server.js          # Main server file
│   ├── db.js              # SQLite database configuration
│   └── routes/
│       ├── authRoutes.js  # Authentication endpoints
│       └── todoRoutes.js  # Todo CRUD endpoints
├── public/
│   ├── index.html         # Frontend application
│   ├── styles.css         # App-specific styles
│   └── fanta.css          # Custom CSS framework
└── database.sqlite        # SQLite database file (auto-generated)
```

## Database Schema

### Users Table
- `id` - Primary key (auto-increment)
- `username` - Unique username/email
- `password` - Hashed password

### Todos Table
- `id` - Primary key (auto-increment)
- `user_id` - Foreign key referencing users table
- `task` - Task description
- `completed` - Boolean flag (0/1)

## Configuration

The server runs on port 5003 by default. You can change this by setting the `PORT` environment variable:

```bash
PORT=3000 node src/server.js
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication with 1-minute expiration
- User isolation (users can only access their own todos)
- Input validation and error handling

## Custom CSS Framework (Fanta CSS)

The app includes a custom CSS framework with:
- Automatic dark/light mode detection
- CSS custom properties for theming
- Responsive design breakpoints
- Beautiful typography with Google Fonts (Eczar & Grenze)
- Pre-styled form elements and components

## Development

### Adding New Features
1. Backend routes go in `src/routes/`
2. Database schema changes go in `src/db.js`
3. Frontend functionality can be added to `public/index.html`
4. Styling updates go in `public/styles.css` or `public/fanta.css`

### Environment Variables
- `PORT` - Server port (default: 5003)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature description'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Troubleshooting

**Database Issues**: If you encounter database errors, delete `database.sqlite` and restart the server to recreate the tables.

**Authentication Problems**: Check that your JWT token hasn't expired (1-minute expiration). Log out and log back in to get a fresh token.

**Port Conflicts**: If port 5003 is in use, set a different port with `PORT=3001 node src/server.js`
