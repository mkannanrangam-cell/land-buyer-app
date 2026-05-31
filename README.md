# Land Buyer Application

This is a React application for managing land buyer information. Users can log in, view a dashboard with buyer details, and manage buyer information through a form.

## Project Structure

```
land-buyer-app
├── client                # React client application
│   ├── package.json      # Client dependencies and scripts
│   ├── public
│   │   └── index.html    # Main HTML file
│   └── src
│       ├── index.js      # Entry point for React application
│       ├── App.js        # Main App component with routing
│       ├── pages
│       │   ├── LoginPage.jsx  # User authentication page
│       │   ├── Dashboard.jsx    # Displays land buyer information
│       │   └── BuyerForm.jsx    # Form for adding/updating buyer info
│       ├── components
│       │   ├── Header.jsx      # Navigation bar component
│       │   ├── BuyerList.jsx    # Lists all land buyers
│       │   └── BuyerCard.jsx     # Displays individual buyer info
│       ├── services
│       │   └── api.js          # API calls to the server
│       └── styles
│           └── app.css         # CSS styles for the application
├── server                # Node.js server application
│   ├── package.json      # Server dependencies and scripts
│   ├── .env              # Environment variables
│   └── src
│       ├── index.js      # Entry point for server application
│       ├── routes
│       │   ├── auth.js    # Authentication routes
│       │   └── buyers.js   # Routes for land buyer information
│       ├── controllers
│       │   ├── authController.js  # Handles user authentication
│       │   └── buyerController.js  # Handles land buyer information
│       ├── models
│       │   └── buyerModel.js      # Defines buyer schema
│       ├── db
│       │   └── connection.js       # Database connection
│       └── middleware
│           └── authMiddleware.js    # Authentication middleware
├── db
│   └── schema.sql        # SQL schema for MySQL database
├── docker-compose.yml     # Docker configurations
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

- Node.js and npm installed
- MySQL database setup

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd land-buyer-app
   ```

2. Navigate to the client directory and install dependencies:
   ```
   cd client
   npm install
   ```

3. Navigate to the server directory and install dependencies:
   ```
   cd ../server
   npm install
   ```

4. Set up the database:
   - Create a MySQL database and run the SQL schema located in `db/schema.sql`.

5. Configure environment variables:
   - Create a `.env` file in the `server` directory and add your database connection details.

### Running the Application

1. Start the server:
   ```
   cd server
   npm start
   ```

2. Start the client:
   ```
   cd ../client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to access the application.

## Features

- User authentication (login)
- Dashboard displaying land buyer information
- Add, update, and delete land buyer information

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.