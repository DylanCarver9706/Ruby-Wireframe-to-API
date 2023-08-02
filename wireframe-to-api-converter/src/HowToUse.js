import React from "react";
import "./App.css";

const HowToUse = () => {
  return (
    <div className="how-to-use-container">
      <div className="how-to-instructions">
        <div className="how-to-intro">
          <h2>How to Use Wireframe to API Converter</h2>
          <p>
            Wireframe to API Converter is a user-friendly web application that
            allows you to convert backend database wireframes into RESTful API
            structures effortlessly and kick-start your next project ASAP.
            Follow the steps below to effectively use the application.
          </p>
          <p>
            Wireframe to API Converter is intended to provide RESTful API
            endpoints for app development with basic CRUD methods tailored to
            your database to get you started faster. The generated API
            structures are made from Ruby on Rails methods and can be used as a
            starting point for your backend development. Please note that the
            database used is MySQL.
          </p>
        </div>
        <h2>Instructions</h2>
        <div class="instruction">
          <strong>Start your Wireframe:</strong> Go to "Wireframe Maker" to
          start creating the wireframe for your backend database.
        </div>
        <div class="instruction">
          <strong>Name Your Database:</strong> At the top there will be a header
          that says 'Database Name'. This will be the name of your database and
          ultimately your ruby project when you generate the tables into an APi.{" "}
          <strong>
            For database naming conventions, please do no have any spaces,
            capital letters, or special characters
          </strong>{" "}
          when naming the database. This will prevent the API from being
          generated later. Some examples or database names are
          'restaurant-database' or 'my-new-ruby-api'
        </div>
        <div class="instruction">
          <strong>Name Your Table:</strong> On your first table, you will see
          'http://localhost:3000/Table Title'. In the input field, enter the
          name of the table.{" "}
          <strong>Be sure not to pluralize the table names </strong>
          as the Ruby methods will take care of that and it can cause issues for
          join tables later.
        </div>
        <div class="instruction">
          <strong>Add attributes to your first table:</strong> The attributes
          are the columns for your database table. Do not pluralize these names.
          Also, be sure to add your IDs into your join table to follow Ruby
          conventions. There is no need to specify "id" as an attribute as this
          is taken care of with Ruby methods.
        </div>
        <div class="instruction">
          <strong>Establish Relationships:</strong> To create
          relationships/associations between tables, select the appropriate
          relationship type from the dropdown and choose the related table. For
          "has_many_through" relationships, specify the through table as well.
          Click on the "Add Relationship" button to add the relationship to the
          table. Follow this guide to find the appropriate relationship for your
          table:&nbsp;
          <a
            href="https://guides.rubyonrails.org/association_basics.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ruby on Rails Association Basics Guide
          </a>
        </div>
        <div class="instruction">
          <strong>Create a New Table:</strong> Once you are ready to expand your
          database, click on the "Add Table" button in the navigation bar to
          create a new table. Provide a title for the table and define its
          attributes and data types using the fields provided.
        </div>
        <div class="instruction">
          <strong>Drag and Reposition Tables:</strong> You can easily drag and
          reposition the tables on the screen using your mouse with React DnD.
          This feature allows you to organize your wireframes efficiently.
        </div>
        <div class="instruction">
          <strong>Generate API:</strong> Once you've defined the attributes and
          relationships of your database, click on the "Generate API" button in
          the navigation bar. The application will create an API based on the
          wireframe and download a custom script to get it running.
        </div>
        <div class="instruction">
          <strong>Test and Build:</strong> Now you can run the Python script
          provided in the download folder to create a custom Ruby on Rails
          project with enpoints ready to go!
        </div>
      </div>
      <h2>How to Run the API</h2>
      <div className="how-to-run-api">
        <div class="instruction">
          <strong>Unpack:</strong> Once the file is downloaded, unzip and move
          the folder to where you want the project to live in your directory
        </div>
        <div class="instruction">
          <strong>Run:</strong> Run the .exe file in the download folder to run
          the custom Python script built just for your database
        </div>
        <div class="instruction">
          <strong>Protection:</strong> If you encounter any warnings from
          Windows Defender or an anti-virus software, ignore it and continue. I
          promise this is not a virus 😉
        </div>
        <div class="instruction">
          <strong>Ruby Version:</strong> The program will check if the latest
          version of ruby is installed by checking the rubyinstaller.org. If the
          latest version is installed, the script will continue building your
          API, if it isn't, the downloader will be downloaded and installed for
          you. Follow the prompts on the installer and the script until it is
          downloaded
        </div>
        <div class="instruction">
          <strong>Success:</strong> The API will then be generated and a port
          will be open to allow you to access those endpoints you created
          earlier, immediately!
        </div>
        <div class="instruction">
          <strong>Test Endponts:</strong> Test your endpoints. I recommend&nbsp;
          <a
            href="https://www.postman.com/downloads/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Postman
          </a>
          &nbsp;for this
        </div>
        <div class="instruction">
          <strong>Done:</strong> Now your API is live and running and ready for
          you to create that next billion dollar idea. Just don't forget who
          saved you tons of time building your app when you are on your yacht!
        </div>
      </div>
      <div className="faq-section">
        <div className="commonly-asked-questions">
          <h2>Commonly Asked Questions</h2>
          <div className="faq-item">
            <strong>
              Q: What happens if I close the script window while the port is
              running?
            </strong>
            <p>
              A: No worries! If you accidentally close the script window while
              the port is running, you can easily restart the API. Head to the
              location where you unzipped the file, navigate to the project
              directory, and navigate to the /app sub-directory. In your
              terminal of choice, run 'rails s' to start the API on the same
              port again.
            </p>
          </div>
          <div className="faq-item">
            <strong>
              Q: Are there any other languages or frameworks supported other
              than Ruby on Rails?
            </strong>
            <p>
              A: Great question! Currently, the app is focused on providing
              features specifically for Ruby on Rails. However, our long-term
              vision includes expanding support for other languages and
              frameworks in the future.
            </p>
          </div>
          <div className="faq-item">
            <strong>
              Q: Can I customize the generated API code after downloading it?
            </strong>
            <p>
              A: Absolutely! You have full control over the downloaded API code.
              After generating the API, you can modify and extend it according
              to your specific project requirements. Feel free to add additional
              functionalities, validations, or endpoints as needed.
            </p>
          </div>
          <div className="faq-item">
            <strong>
              Q: What if I encounter errors while running the custom Python
              script for the API?
            </strong>
            <p>
              A: If you encounter any issues or errors while running the custom
              Python script, first double-check the installation of required
              dependencies like Ruby and other related software. Ensure that you
              follow the prompts and instructions during the installation
              process carefully. If you still face problems, you can reach out
              to the application's support team for assistance.
            </p>
          </div>
          <div className="faq-item">
            <strong>
              Q: Can I change the database type used by the Wireframe to API
              Converter?
            </strong>
            <p>
              A: Currently, the Wireframe to API Converter supports MySQL
              databases, and it does not provide the option to switch to other
              database types in the GUI. However, if you need to use a different
              database type, you may need to manually modify the generated API
              code after downloading.
            </p>
          </div>
          <div className="faq-item">
            <strong>
              Q: How do I handle complex relationships, such as many-to-many
              relationships?
            </strong>
            <p>
              A: For complex relationships like many-to-many, you can use the
              "has_many_through" option in the relationship dropdown. Specify
              the through table to define the relationship. You can refer to the
              provided link to the Ruby on Rails association guide for more
              information.
            </p>
          </div>
          <div className="faq-item">
            <strong>
              Q: Is the Wireframe to API Converter suitable for large-scale
              applications?
            </strong>
            <p>
              A: The Wireframe to API Converter is designed to provide a
              starting point for small to medium-scale applications. While it
              can be used as a foundation for larger projects, it may require
              further optimization and customization to handle the complexities
              of larger datasets and high-traffic applications.
            </p>
          </div>
          <div className="faq-item">
            <strong>
              Q: Can I share my generated API with my team members or clients?
            </strong>
            <p>
              A: Absolutely! You can share the generated API code with your team
              members or clients. Simply provide them with the downloaded files,
              and they can set up the API on their local machines or server
              environments. Be sure to include any necessary setup instructions
              to make the process smoother for others.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
