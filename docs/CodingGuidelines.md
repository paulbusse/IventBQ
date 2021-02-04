# Coding Guidelines

## Code locations

### Vue

* The only `.vue` file in the src-directory should be `App.vue`
* The `components` directory contains reusable components. Components should not contain any logic on the application itself.
  * extensions to Primevue components
  * components develop in the context of this project
* The  `views` directory contains non-resuable components that contain knownledge on this project

## Tools used

For config files that must be edited by humans we use YAML.

## Naming conventions

### Vue components

Some guidelines on the use of components

* They do not contain business knowledge
* They are imported with prefix `Ivt`
* The file name does not contain any prefix.
