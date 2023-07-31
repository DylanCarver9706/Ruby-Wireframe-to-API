import React from 'react';

const HowToUse = () => {
  return (
    <div>
      <h2>How to Use the Wireframe to API Converter</h2>
      <p>
        The Wireframe to API Converter is a user-friendly web application that allows you to convert wireframes into API structures effortlessly. Follow the steps below to effectively use the application:
      </p>
      <ol>
        <li>
          <strong>Create a New Table:</strong> Click on the "Add Table" button in the navigation bar to create a new table. Provide a title for the table, and define its attributes using the input fields provided. You can specify attributes like "name," "type," and more to set up your table structure.
        </li>
        <li>
          <strong>Establish Relationships:</strong> To create relationships between tables, select the appropriate relationship type from the dropdown, and choose the related table. For "has_many_through" relationships, specify the through table as well. Click on the "Add Relationship" button to add the relationship to the table.
        </li>
        <li>
          <strong>Drag and Reposition Tables:</strong> You can easily drag and reposition the tables on the screen using your mouse. This feature allows you to organize your wireframes efficiently.
        </li>
        <li>
          <strong>Generate API:</strong> Once you've defined the wireframes and relationships, click on the "Generate API" button in the navigation bar. The application will create an API structure based on the wireframes you've designed. The generated API will be available for download in a zip file.
        </li>
      </ol>
      <p>
        Please note that the Wireframe to API Converter is intended for wireframe to API conversion and does not handle backend logic or data storage. The generated API structures can be used as a starting point for your backend development. If you encounter any issues or have suggestions, feel free to explore the codebase and contribute to the project on GitHub.
      </p>
    </div>
  );
};

export default HowToUse;
