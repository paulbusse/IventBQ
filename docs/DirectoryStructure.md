# Directory Structure

:exclamation: This is work in progress

## Project Root

* `api`: the backend code
* `ui`: the frontend code
* `data`: the place where the data resides. This can be both data delivered with the product, e.g. the label types, or the sqlite database for the product.
* `docs`: This documentation
* `logs`: This is the default place for the logs

## API

* `bin`: Scripts to manage the API
* `migrations`: scripts to move the database along
* `src`: the backend code
* The other files and directories are related to Node itself or to the development environment.

## API/bin

* `generate_labels`: this script generates the PDF files to print the labels

## API/src

This is the root for the API code.

Files

* `index.js`: This is the script that kicks it off

Directories

* `classes`: Manage specific resources and hide details from the rest of the application
* `config`: contains a database configuration file
* `controllers`: contains the controllers called from the routers
* `models`: contains the database models
* `routers`: contians the routers
* `utils`: contians the routers

## API/src/classes

Classes abstract certain data structures or concepts

* `labelfile.js`: manages the creation of the label files and the directory `~/data/labelfile`
* `labelfile.js`: manages the label types, defined in `~/data/labeltypes.yaml`
* `unique.js`: ---NEEDS REFACTORING --- contains the generation of unique identifiers

## API/src/config

:exclamation: --- NEEDS REFACTORING --- this directory should move to ~.

* `db.json`: configuration for the DB connection.

## API/src/controllers

Controllers are functions called from the routers. The routes are grouped by the exposed data structures, the controllers should mimic that grouping.

Files

* `generic.js`: generic controllers do not expose an actual object
* `places.js`: All functions linked to the `/places`-endpoint

Directories

* `labels`: All functions linked to the `/labels`-endpoint

## API/src/controllers/labels

Files

* `files.js`: All functions linked to the `/labels/files`-endpoint
* `types.js`: All functions linked to the `/labels/types`-endpoint

## API/src/models

This directory contains the models for the `sequelize` models

Files

* `label.js`: The DB interactions for labels
* `place.js`: The DB interactions for places
* `index.js`: Initializes the DB structure

## API/src/routers

In this directory we map the endpoints to the functions in the controllers

Files

* `main.js`: All single endpoints are mapped here
* `label.js`: The endpoints under `/labels` are mapped here

## API/src/utils

In this directory find utilities that hide configuration interpretations or generic functions.

Files

* `logger.js`: logging functionality
