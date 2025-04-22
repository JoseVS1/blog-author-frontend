# ObsidianPost Frontend (Author/Admin View)

A React-based frontend application designed for authors and administrators of the ObsidianPost blog platform.

## Overview

This specialized frontend, built with React and Vite, provides authors and administrators with tools to manage the ObsidianPost blog content. Users can log in, manage all posts (CRUD, publish/unpublish), utilize a rich text editor (TinyMCE) for creating/editing posts, manage all comments (edit/delete), and grant author privileges to other users via a secret code. It interacts with the ObsidianPost Backend API for all data operations.

## Features

-   User Authentication: Login functionality for authors/admins.
-   Author Promotion: A dedicated page for users to enter a secret code and gain author privileges.
-   Comprehensive Post Management: Create, Read, Update, and Delete operations for all blog posts.
-   Rich Text Editing: Integrates TinyMCE for creating and editing post content with formatting options.
-   Publishing Control: Ability to publish or unpublish posts, controlling their visibility on the user-facing site.
-   Full Comment Moderation: View, Edit, and Delete any comment on any post.
-   Dashboard View: Home page displays all posts, including their current publishing status.
-   Protected Routes: Ensures only logged-in users can access the authoring tools.

## Technology Stack

-   Frontend: React, Vite
-   Routing: `react-router-dom`
-   State Management: React Context API (`UserContext`), `useState`, `useEffect`
-   Styling: CSS (including custom styles for TinyMCE via `editor-content.css`)
-   API Interaction: Native `fetch` API
-   Rich Text Editor: TinyMCE
-   Utilities: `jwt-decode`, `date-fns`, `html-react-parser`

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/JoseVS1/blog-author-frontend.git
    cd blog-author-frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Ensure the ObsidianPost Backend API server is running (typically on `http://localhost:3000`) and that the `AUTHOR_CODE` is correctly set in its `.env` file.

4.  Start the development server:
    ```bash
    npm run dev
    ```
    *(This command is standard for Vite projects)*

## Project Structure

```
└── ./
├── src
│ ├── components
│ │ ├── Comment.jsx
│ │ ├── Comments.jsx
│ │ ├── Errors.jsx
│ │ ├── Navbar.jsx
│ │ └── ProtectedRoute.jsx
│ ├── context
│ │ └── UserContext.js
│ ├── pages
│ │ ├── BecomeAuthor.jsx
│ │ ├── CreatePost.jsx
│ │ ├── Home.jsx
│ │ ├── Login.jsx
│ │ ├── NoMatch.jsx
│ │ ├── Post.jsx
│ │ └── UpdatePost.jsx
│ ├── App.jsx
│ ├── editor-content.css
│ ├── index.css
│ └── main.jsx
├── eslint.config.js
├── index.html
└── vite.config.js
```

## Usage

### Authentication & Author Status
1.  Navigate to the `/login` page to log in. Only logged-in users can access content.
2.  If the logged-in user is not yet an author, they can navigate to `/becomeAuthor` via the navbar link and enter the secret `AUTHOR_CODE` (defined in the backend `.env`) to gain author privileges.

### Post Management
-   The Home page (`/`) displays all posts (published and unpublished).
-   Use the "Create post" link in the navbar (`/addPost`) to compose a new post using the TinyMCE editor.
-   Click on a post title from the home page to view its detail page (`/posts/:id`).
-   On the post detail page, authors can:
    -   Click "Publish" or "Unpublish" to toggle the post's visibility.
    -   Click "Update" to navigate to the edit page (`/posts/:id/update`) which uses TinyMCE.
    -   Click "Delete" to remove the post.

### Comment Management
-   On the post detail page (`/posts/:id`), all comments are displayed.
-   Authors will see "Edit" and "Delete" buttons on *every* comment, allowing full moderation.

## API Endpoints

This application consumes the ObsidianPost Backend API. It does not expose its own endpoints. Key interactions include fetching posts/comments, user login, author promotion, and full CRUD operations for posts and comments via the backend API.

## Security

-   User authentication relies on JWT tokens provided by the backend.
-   Tokens are stored in the browser's `localStorage`.
-   The token is included in the `Authorization: Bearer <token>` header for requests requiring authentication.
-   The `ProtectedRoute` component prevents access if not logged in.
-   Frontend UI elements (like admin actions) are conditionally rendered based on the `user.isAuthor` flag obtained after login.
-   The backend API performs the definitive authorization checks for all sensitive operations.

## Contributing

1.  Fork the repository
2.  Create a feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'Add some amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request

## License

[MIT License](LICENSE)

## Acknowledgements

-   [React](https://reactjs.org/)
-   [Vite](https://vitejs.dev/)
-   [React Router](https://reactrouter.com/)
-   [TinyMCE](https://www.tiny.cloud/)
-   [date-fns](https://date-fns.org/)
-   [jwt-decode](https://github.com/auth0/jwt-decode)
-   [html-react-parser](https://github.com/remarkablemark/html-react-parser)
