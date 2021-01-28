# Directory Structure

:exclamation: This is work in progress

## Project Root

* `api`: the backend code
* `ui`: the frontend code
* `data`: the place where the data resides. This can be both data delivered with the product, e.g. the label types, or the sqlite database for the product.
* `docs`: This documentation

## API

* `bin`: Scripts to manage the API
* `migrations`: scripts to move the database along
* `src`: the backend code
* The other files and directories are related to Node itself or to the development environment.

## API/bin

* `generate_labels`: this script generates the PDF files to print the labels

## API/src

* `index.js`: This is the script that kicks it off
* `classes`: Manage specific resources and hide details from the rest of the application
* `config`: --- NEEDS REFACTORING ---
* `controllers`:
* `models`:
* `routers`:
