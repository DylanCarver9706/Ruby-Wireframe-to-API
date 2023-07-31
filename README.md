# Wireframe to API Converter

## Overview

The Wireframe to API Converter is a web application that helps developers convert wireframes into API structures easily. It allows users to create tables, define attributes, and establish relationships between the tables using a simple and intuitive user interface.

## Technologies Used

The application is built using the following technologies:

- React: A popular JavaScript library for building user interfaces.
- React Router: A library for handling navigation and routing in React applications.
- Material-UI: A popular React UI framework that provides pre-designed components with Material Design styling.
- react-draggable: A library to enable draggable behavior for React components.

## Installation

To run the Wireframe to API Converter, you'll need to have the following installed on your system:

Node.js: If you don't have Node.js installed, you can download it from the official website: [https://nodejs.org/](https://nodejs.org/)
Ruby (optional). The latest version of Ruby will be installed when you run the program if you don't have it installed

Once you have Node.js installed, follow these steps:

1. Clone this repository to your local machine:

git clone https://github.com/your-username/wireframe-to-api-converter.git

2. Change into the project directory:

cd wireframe-to-api-converter

3. Install the project dependencies:

npm install

4. Start the development server:

npm start

The application will now be running at `http://localhost:3000`.

## Usage

1. Click on the "Add Table" button in the navigation bar to create a new table.

2. Provide a title for the table and define its attributes using the input fields provided.

3. To establish relationships between tables, select the appropriate relationship type and related table from the dropdowns. If needed, specify the through table for "has_many_through" relationships.

4. Click on the "Add Relationship" button to add the relationship to the table.

5. You can drag and reposition the tables on the screen using the mouse.

6. The "Generate API" button in the navigation bar allows you to create an API structure based on the wireframes and relationships you've defined. The generated API will be available for download in a zip file.

7. Extract/Un-zip the download and run the python script in the download folder

## Note

This application is intended for wireframe to API conversion and is not meant to handle backend logic or data storage. The generated API structures can be used as a starting point for your backend development. The provided API will have associated endpoints named after the table names that you can immediately use once the script runs and the port is in use.

## Contributions

Contributions to the Wireframe to API Converter project are welcome. If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.
