import subprocess
import sys
import os
import json
import inflection
import requests
from bs4 import BeautifulSoup

# Check Ruby version
ruby_version_process = subprocess.run(['powershell.exe', '-Command', 'ruby -v'], capture_output=True, text=True)
ruby_version_output = ruby_version_process.stdout.strip()

if not ruby_version_output.startswith('ruby'):
    print("Ruby version not found.")
    print("Downloading the latest version from https://rubyinstaller.org...")
    
    # Send a GET request to the URL
    url = "https://rubyinstaller.org/downloads/"
    response = requests.get(url)

    # Parse the HTML content
    soup = BeautifulSoup(response.content, "html.parser")

    # Find the download link with class="downloadlink download-recommended"
    download_link = soup.find("a", class_="downloadlink download-recommended")

    if download_link is not None:
        # Get the href attribute
        href = download_link["href"]

        # Download the installer
        file_name = href.split("/")[-1]
        response = requests.get(href, stream=True)
        with open(file_name, "wb") as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
        print("Download complete. Opening Ruby installer...")

        # Run the downloaded program
        subprocess.run([file_name])
    input("Installation complete. Please re-run the script. Press Enter to exit.")
    sys.exit(1)

print("Your Ruby version:", ruby_version_output)

# Check if the version starts with a number (indicating a valid version format)
if ruby_version_output[5].isdigit():
    print("Ruby installation found. Proceeding with the script.")

    # Install Rails
    print("Installing Rails")
    rails_command = 'gem install rails'
    subprocess.run(['powershell.exe', '-Command', rails_command], check=True)
    print("Rails installation complete.")

    # Get the current directory path
    current_dir = os.path.dirname(sys.argv[0])

    # Set the working directory for the commands
    os.chdir(current_dir)

    # Load the tables data from the JSON file
    json_file_path = os.path.join(current_dir, 'tables.txt')
    with open(json_file_path, 'r') as file:
        data = json.load(file)

    # Extract the API name from the "database-name" field
    api_name = data.pop("database-name")
    api_dir = os.path.join(current_dir, api_name)

    # Run 'rails new my-dope-api --api' command
    rails_command = f'rails new {api_name} --api'
    subprocess.run(['powershell.exe', '-Command', rails_command], cwd=current_dir, check=True)

    # Path to the Gemfile
    gemfile_path = os.path.join(api_dir, 'Gemfile')

    # Insert line into the Gemfile
    with open(gemfile_path, 'r+') as file:
        content = file.read()
        file.seek(0, 0)
        file.write("gem 'active_model_serializers', '~> 0.10.13'\n" + content)

    # Run 'bundle install' command
    bundle_command = 'bundle install'
    subprocess.run(['powershell.exe', '-Command', bundle_command], cwd=api_dir)

    # Change to the API directory
    os.chdir(api_dir)

    # Generate and execute commands for each table
    tables = data["tables"]
    for table in tables:
        command = f"rails g resource {table['title'].lower()}"
        for attribute in table['attributes']:
            command += f" {attribute['name']}:{attribute['type']}"
        subprocess.run(['powershell.exe', '-Command', command], cwd=api_dir, check=True)

    # Modify controller files
    controllers_dir = os.path.join(api_dir, 'app', 'controllers')

    for file in os.listdir(controllers_dir):
        file_path = os.path.join(controllers_dir, file)
        if file.endswith('_controller.rb') and file != 'application_controller.rb':
            with open(file_path, 'r+') as controller_file:
                content = controller_file.readlines()
                table_name = file.split('_controller.rb')[0]
                table_name_singular = inflection.singularize(table_name).capitalize()
                updated_content = []
                for line in content:
                    updated_content.append(line)
                    if line.strip().startswith('class'):
                        updated_content.append("\n")
                        updated_content.append("  def index\n")
                        updated_content.append(f"    render json: {table_name_singular}.all, status: :ok\n")
                        updated_content.append("  end\n\n")
                        updated_content.append("  def show\n")
                        updated_content.append(f"    {table_name_singular[0].lower()}{table_name_singular[1:]} = {table_name_singular}.find(params[:id])\n")
                        updated_content.append(f"    render json: {table_name_singular[0].lower()}{table_name_singular[1:]}, status: :ok\n")
                        updated_content.append("  end\n\n")
                        updated_content.append("  def create\n")
                        updated_content.append(f"    {table_name_singular[0].lower()}{table_name_singular[1:]} = {table_name_singular}.create({table_name_singular[0].lower()}{table_name_singular[1:]}_params)\n")
                        updated_content.append(f"    render json: {table_name_singular[0].lower()}{table_name_singular[1:]}, status: :created\n")
                        updated_content.append("  end\n\n")
                        updated_content.append("  def destroy\n")
                        updated_content.append(f"    {table_name_singular[0].lower()}{table_name_singular[1:]} = {table_name_singular}.find(params[:id])\n")
                        updated_content.append(f"    {table_name_singular[0].lower()}{table_name_singular[1:]}.destroy\n")
                        updated_content.append("    head :no_content\n")
                        updated_content.append("  end\n\n")
                        updated_content.append("  def update\n")
                        updated_content.append(f"    {table_name_singular[0].lower()}{table_name_singular[1:]} = {table_name_singular}.find(params[:id])\n")
                        updated_content.append(f"    {table_name_singular[0].lower()}{table_name_singular[1:]}.update({table_name_singular[0].lower()}{table_name_singular[1:]}_params)\n")
                        updated_content.append(f"    render json: {table_name_singular[0].lower()}{table_name_singular[1:]}, status: :accepted\n")
                        updated_content.append("  end\n\n")
                        updated_content.append("  private\n\n")
                        updated_content.append(f"  def {table_name_singular[0].lower()}{table_name_singular[1:]}_params\n")
                        updated_content.append(f"    params.require(:{table_name_singular[0].lower()}{table_name_singular[1:]}).permit!\n")
                        updated_content.append("  end\n\n")
                controller_file.seek(0)
                controller_file.writelines(updated_content)

    # Modify model files
    models_dir = os.path.join(api_dir, 'app', 'models')

    for table in tables:
        table_name_singular = inflection.singularize(table['title']).capitalize()
        model_file_path = os.path.join(models_dir, f"{table_name_singular.lower()}.rb")
        relationships = table.get("relationships", [])
        updated_content = []
        with open(model_file_path, 'r+') as model_file:
            content = model_file.readlines()
            for line in content:
                updated_content.append(line)
                if line.strip().startswith('class'):
                    for relationship in relationships:
                        updated_content.append(f"  {relationship}\n")
            model_file.seek(0)
            model_file.writelines(updated_content)

    # Run 'rails db:migrate db:seed' command
    migrate_command = 'rails db:migrate db:seed'
    subprocess.run(['powershell.exe', '-Command', migrate_command], cwd=api_dir)

    # Run 'rails s' command
    server_command = 'rails s'
    subprocess.Popen(['powershell.exe', '-Command', server_command], cwd=api_dir)
