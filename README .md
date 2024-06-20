                        Bike Rental Reservation System Backend

Welcome to the Bike Rental Reservation System backend repository. This project is designed to provide a comprehensive backend solution for managing bike rentals. The backend is built with Node.js and Express, utilizing MongoDB for the database. This README will guide you through the setup and usage of the application.

Table of Contents
1.Project Name
2.Live URL
3.Features
4.Technologies Used
5.Setup and Installation
6.Usage
7.API Endpoints

#Project Name
Bike Rental Reservation System Backend

#Live URL
..here live link will be add

#Features
Here below those features I use in this project... 
1.User Authentication and Authorization: Register and login functionality with JWT-based authentication.
2.Bike Management: CRUD operations for bikes, with role-based access control.
3.Rental Management: Rent and return bikes, with automatic calculation of rental costs.
4.User Profile Management: View and update user profiles.
5.Error Handling: Robust error handling and validation throughout the application.

#Technologies Used
This is the technologies that I use in this project
1.Node.js: JavaScript runtime environment.
2.Express: Web framework for Node.js.
3.MongoDB: NoSQL database.
4.Mongoose: ODM for MongoDB.
5.bcrypt: Password hashing.
6.jsonwebtoken: JWT implementation for authentication.
7.zod: Validation library.
8.dotenv: Environment variables management.

#Setup and Installation
1.Clone the repository: git clone https://github.com/yourusername/bike-rental-backend.git
cd bike-rental-backend
2.Install dependencies: npm install
3.Set up environment variables: Create a .env file in the root directory and add the following environment variables: 
PORT=5000
DB_URL=mongodb://localhost:27017/bike-rental
JWT_SECRET=//here will be secret token...

4.Start the application: npm start:dev it's for this server will be running on http://localhost:5000.

#API Endpoints
Authentication:

1.POST /api/auth/signup
Register a new user.
Body parameters: name, email, password, phone, address, role.

2.POST /api/auth/login
Login an existing user.
Body parameters: email, password.

User: 
1.GET /api/users/me
Get user profile. Requires authentication.

2.PUT /api/users/me
Update user profile. Requires authentication.
Body parameters: name, phone.

Bikes:
1.POST /api/bikes
Add a new bike. Requires admin role.
Body parameters: name, description, pricePerHour, cc, year, model, brand.

2.GET /api/bikes
Get all bikes.

3.PUT /api/bikes/:id
Update bike details. Requires admin role.
Body parameters: Any updatable bike fields.

4.DELETE /api/bikes/:id
Delete a bike. Requires admin role.

Rentals:
1.POST /api/rentals
Create a new rental. Requires authentication.
Body parameters: bikeId, startTime.

2.PUT  /api/rentals/:id/return 
Return a rented bike. Requires admin role.

3.GET /api/rentals
Get all rentals for the authenticated user.

Environment Variables:
The application uses the following environment variables, defined in a .env file:
PORT: Port number the server will listen on.
DB_URL: MongoDB connection string.
JWT_SECRET: Secret key for JWT token generation.