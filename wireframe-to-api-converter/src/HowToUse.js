import React from "react";

const HowToUse = () => {
  return (
    <div>
      <h2>How to Use Wireframe to API Converter</h2>
      <p>
        Wireframe to API Converter is a user-friendly web application that
        allows you to convert backend database wireframes into RESTful API
        structures effortlessly and kick your next project off ASAP. Follow the
        steps below to effectively use the application:
      </p>
      <p>
        Wireframe to API Converter is intended to provide endpoints for app
        development with basic CRUD methods tailored to your database. The
        generated API structures are made from Ruby on Rails methods and can be
        used as a starting point for your backend development. The converter
        will create a RESTful API with endpoints for each of the tables
        provided. These endpoints will have basic CRUD methods when the API is
        created to get you started faster. Please note that the database used is
        MySQL.
      </p>
      <ol>
        <li>
          <strong>Start your Wireframe:</strong> Go to "Wireframe Maker" to
          start creating the wireframe for your backend database.
        </li>
        <li>
          <strong>Give a clear and concise name to your table:</strong> On yout
          first table, your will see 'http://localhost:3000/Table Title'. In the
          input field, enter the name of this table. Be sure to not pluralize it
          as the ruby methods will take care of that and can cause issues for
          join tables later
        </li>
        <li>
          <strong>Add the attributes to your first table:</strong> The
          attributes are the columns to your database table. Do not pluralize
          these names. Also be sure to add your IDs into your join table to
          follow ruby conventions. There is also no need to specify "id" as an
          attribute as this is taken care of with ruby methods.
        </li>
        <li>
          <strong>Establish Relationships:</strong> To create
          relationships/associations between tables, select the appropriate
          relationship type from the dropdown, and choose the related table. For
          "has_many_through" relationships, specify the through table as well.
          Click on the "Add Relationship" button to add the relationship to the
          table. Follow this guide to find the appropriate relationship for your
          table: https://guides.rubyonrails.org/association_basics.html
        </li>
        <li>
          <strong>Create a New Table:</strong> Once you are ready to expand your
          database, click on the "Add Table" button in the navigation bar to
          create a new table. Provide a title for the table, and define its
          attributes and data type using the fields provided.
        </li>
        <li>
          <strong>Drag and Reposition Tables:</strong> You can easily drag and
          reposition the tables on the screen using your mouse using React DnD.
          This feature allows you to organize your wireframes efficiently.
        </li>
        <li>
          <strong>Generate API:</strong> Once you've defined the attributes and
          relationships of your database, click on the "Generate API" button in
          the navigation bar. The application will create an API based on the
          wireframe and download a custom script to get it running.
        </li>
      </ol>
      <strong>How to run your API:</strong> The hard part is over!
      <ol>
        <li>
          <strong></strong>Once the file is downloaded, unzip and move the
          folder to where you want the project to live in your directory
        </li>
        <li>
          Run the .exe file in the download folder to run the custom Python
          script built just for your database
        </li>
        <li>
          If you encounter any warnings from Windows Defender or an anti-virus
          software, ignore it and continue. I promise this is not a virus 😉
        </li>
        <li>
          The program will check if the latest version of ruby is installed by
          checking the rubyinstaller.org. If the latest version is installed,
          the script will continue building your API, if it isn't, the
          downloader will be downloaded and installed for you. Follow the
          prompts on the installer and the script until it is downloaded
        </li>
        <li>
          The API will then be generated and a port will be open to allow you to
          access those endpoints your created earlier immediately!
        </li>
        <li>Test your endpoint. I recommend Postman for this</li>
        <li>Done!</li>
      </ol>
      <h3>Commonly Asked Questions</h3>
      <strong>
        Q: What happens if I close the script window while the port is running?
      </strong>
      <p>
        A: No one expects it to stay open forever. To run the API on the port
        again, head to the location you unziped the file to and go into the
        project directory. Once there navigate to the /app sub-directory in your
        terminal of choice and run 'rails s'. A new onstance of that port will
        be live!
      </p>
      <strong>
        Q: Are there any other languages or frameworks supported other than Ruby
        on Rails?
      </strong>
      <p>
        A: Great question! Currently, the app is focused on bringing as many
        features as possible to Ruby on Rails so that in the future, those same
        great features can be used for other languages and frameworks
      </p>
      <strong>
        Q: Can I customize the generated API code after downloading it?
      </strong>
      <p>
        Yes, you have full control over the downloaded API code. After
        generating the API, you can modify and extend it according to your
        specific project requirements. Feel free to add additional
        functionalities, validations, or endpoints as needed.
      </p>
      <strong>
        Q: What if I encounter errors while running the custom Python script for
        the API?
      </strong>
      <p>
        A: If you encounter any issues or errors while running the custom Python
        script, double-check the installation of required dependencies like Ruby
        and other related software. Make sure you follow the prompts and
        instructions during the installation process carefully. If you still
        face problems, you can reach out to the application's support team for
        assistance.
      </p>
      <strong>
        Q: Can I change the database type used by the Wireframe to API
        Converter?
      </strong>
      <p>
        A: Currently, the Wireframe to API Converter supports MySQL databases.
        It does not provide the option to switch to other database types in the
        GUI. However, if you need to use a different database type, you may need
        to manually modify the generated API code after downloading.
      </p>
      <strong>
        Q: How do I handle complex relationships, such as many-to-many
        relationships?
      </strong>
      <p>
        A: For complex relationships like many-to-many, you can use the
        "has_many_through" option in the relationship dropdown. Specify the
        through table to define the relationship. You can refer to the provided
        link to the Ruby on Rails association guide for more information.
      </p>
      <strong>
        Q: Is the Wireframe to API Converter suitable for large-scale
        applications?
      </strong>
      <p>
        A: The Wireframe to API Converter is designed to provide a starting
        point for small to medium-scale applications. While it can be used as a
        foundation for larger projects, it may require further optimization and
        customization to handle the complexities of larger datasets and
        high-traffic applications.
      </p>
      <strong>
        Q: Can I share my generated API with my team members or clients?
      </strong>
      <p>
        A: Yes, you can share the generated API code with your team members or
        clients. Simply provide them with the downloaded files, and they can set
        up the API on their local machines or server environments. Be sure to
        include any necessary setup instructions to make the process smoother
        for others.
      </p>
      <h2>
        If you encounter any issues or have suggestions, feel free to explore
        the codebase and contribute to the project on GitHub or send an email to
        the creater in the About the Author section.
      </h2>
    </div>
  );
};

export default HowToUse;
