# Lost & Found Application

A full-stack web application that helps users report lost items and browse found items in their community. Users can post about items they've lost, view items found by others, and submit claims for items they recognize.

## Features

- **User Authentication**: Secure signup and login with password hashing using bcryptjs
- **Post Lost Items**: Create detailed listings for items you've lost
- **Post Found Items**: Share information about items you've found
- **Browse Listings**: View all lost and found items with detailed information
- **Claim Items**: Submit claims for items you recognize as yours
- **Search Functionality**: Search through lost and found items
- **User Sessions**: Persistent session management with MongoDB
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **Contact Page**: Get in touch with administrators

## Tech Stack

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB & Mongoose** - Database and ODM
- **Express-session** - Session management
- **bcryptjs** - Password hashing
- **express-validator** - Form validation

### Frontend
- **EJS** - Templating engine
- **Tailwind CSS** - Utility-first CSS framework
- **HTML5 & CSS3** - Markup and styling

### Tools & Deployment
- **Nodemon** - Development server with auto-reload
- **Vercel** - Deployment platform
- **npm** - Package manager

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (for cloud database)
- Environment variables configured

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pj_1_v4
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory
   - Add your MongoDB connection string and other configuration variables
   ```
   DB_PATH=mongodb+srv://username:password@cluster.mongodb.net/lostnfound
   SESSION_SECRET=your-secret-key
   PORT=3000
   ```

4. **Build Tailwind CSS** (one-time or watch mode)
   ```bash
   npm run tailwind
   ```

## Running the Project

### Development Mode (with auto-reload)
```bash
npm start
```
This command runs both the Node server with nodemon and Tailwind CSS in watch mode.

### Alternative - Individual services
```bash
# Terminal 1: Start the Express server
nodemon index.js

# Terminal 2: Watch Tailwind CSS changes
npm run tailwind
```

The application will be available at `http://localhost:3000`

## Project Structure

```
pj_1_v4/
├── controllers/           # Route handlers and business logic
│   ├── authcontroller.js     # Authentication logic
│   ├── homecontroller.js     # Home page logic
│   ├── lostcontroller.js     # Lost items logic
│   ├── foundcontroller.js    # Found items logic
│   ├── claimcontroller.js    # Claim requests logic
│   └── searchcontroller.js   # Search functionality
├── models/               # Mongoose schemas
│   ├── user.js             # User schema
│   ├── managelost.js       # Lost items schema
│   ├── managefound.js      # Found items schema
│   ├── manageclaims.js     # Claims schema
│   └── searchmodel.js      # Search/filter logic
├── routes/               # Express route definitions
│   ├── authroutes.js       # Authentication routes
│   ├── homeroutes.js       # Home routes
│   ├── lostroutes.js       # Lost items routes
│   ├── foundroutes.js      # Found items routes
│   ├── claimrequestroutes.js # Claims routes
│   └── searchroutes.js     # Search routes
├── views/                # EJS template files
│   ├── home.ejs            # Home page
│   ├── login.ejs           # Login page
│   ├── signup.ejs          # Signup page
│   ├── lostform.ejs        # Form to post lost item
│   ├── foundform.ejs       # Form to post found item
│   ├── lostitems.ejs       # Lost items listing
│   ├── founditems.ejs      # Found items listing
│   ├── searchresults.ejs   # Search results
│   ├── claimrequest.ejs    # Claim request form
│   ├── contact.ejs         # Contact page
│   ├── 404.ejs             # 404 error page
│   └── partials/           # Reusable template components
│       ├── nav.ejs         # Navigation bar
│       ├── footer.ejs      # Footer
│       └── helpcard.ejs    # Help card component
├── public/               # Static files
│   └── output.css        # Compiled Tailwind CSS
├── utils/                # Utility functions
│   ├── databaseutil.js   # Database connection
│   └── pathutil.js       # Path utilities
├── index.js              # Application entry point
├── package.json          # Project dependencies
├── tailwind.config.js    # Tailwind CSS configuration
├── nodemon.json          # Nodemon configuration
├── vercel.json           # Vercel deployment config
└── README.md            # This file
```

## Routing Overview

### Public Routes
- `GET /` - Home page
- `GET /login` - Login page
- `POST /login` - Handle login
- `GET /signup` - Signup page
- `POST /signup` - Handle signup
- `GET /contact` - Contact page

### Protected Routes (Require Authentication)
- **Lost Items**
  - `GET /lost` - View all lost items
  - `GET /lost/:id` - View lost item details
  - `GET /lost/post` - Post a lost item form
  - `POST /lost/post` - Submit a lost item

- **Found Items**
  - `GET /found` - View all found items
  - `GET /found/:id` - View found item details
  - `GET /found/post` - Post a found item form
  - `POST /found/post` - Submit a found item

- **Claims**
  - `POST /claim` - Submit a claim for an item

- **Search**
  - `GET /search` - Search functionality

## Authentication

The application uses:
- **bcryptjs** for secure password hashing
- **express-session** for session management
- **MongoDB** for session storage (using connect-mongodb-session)
- Session-based middleware to protect routes

Unauthenticated users are redirected to the login page (except for public routes).

## Database

The application uses MongoDB with Mongoose ODM. Database schemas are defined in the `models/` directory:
- **User** - Stores user account information
- **Lost Items** - Records of items users have lost
- **Found Items** - Records of items users have found
- **Claims** - Claim requests for items

## Styling

The project uses Tailwind CSS for styling:
- Configuration: `tailwind.config.js`
- Input CSS: `views/input.css`
- Output CSS: `public/output.css`

Run `npm run tailwind` to compile CSS in watch mode during development.

## Deployment

The project is configured for Vercel deployment using `vercel.json` configuration file. To deploy:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Development Notes

- Use `nodemon.json` for custom nodemon configuration
- Session data is stored in MongoDB for persistence across server restarts
- Excluded paths from authentication middleware: `/`, `/login`, `/signup`, `/contact`
- Ensure MongoDB connection string is correct in your `.env` file

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## Support

For issues or questions, please contact through the application's contact page or create an issue in the repository.
