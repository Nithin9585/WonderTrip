WonderTrip
A comprehensive full-stack application for creating, viewing, editing, and deleting listings.
Users can sign up, log in, log out, and manage their listings.
The application is built using Node.js, Express.js, MongoDB Atlas, AWS for storage, and Cloudinary for image uploads. 
It follows the MVC architecture and includes features like CRUD operations, user authentication, and map integration using Mapbox.

## Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Live Demo

Check out the live demo: https://a-nhif.onrender.com (LIVE_DEMO_LINK).

## Features

- User authentication with Passport.js
- Create, view, edit, and delete listings
- Upload images to Cloudinary
- Integrated map using Mapbox for listing locations
- Middleware for error handling
- MVC architecture

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: Passport.js
- **Image Storage**: Cloudinary
- **Map Integration**: Mapbox
- **Hosting**: Render

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Nithin9585/A.git
   cd A
2. Install dependencies
    ```bash
   npm install

4. Set up environment variables
Create a .env file in the root directory and add the following:
PORT=3000
DATABASE_URL=your_mongo_atlas_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MAPBOX_TOKEN=your_mapbox_token
SESSION_SECRET=your_session_secret

5. Start the application
    ```bash
   npm start
6. Usage
Navigate to http://localhost:3000 in your browser.
Sign up or log in to access features.
Create, view, edit, and delete listings.
Upload images for your listings.
View listing locations on the integrated Mapbox map.

7. Contributing
Fork the repository
Create a new branch (git checkout -b feature-branch)
Commit your changes (git commit -am 'Add new feature')
Push to the branch (git push origin feature-branch)
Create a new Pull Request



