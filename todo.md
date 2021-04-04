# Things to do

## Current

### ItemView: basic list

- [x] add the itemview view basic table
- [x] define GET stored items (Frontend)
- [x] define GET stored items (Backend)
- [x] Added query to retrieve stored items
- [x] call GET stored items (Frontend)
- [x] show results

### Bugs

- [x] When new items are created the items list must be invalidated
- [x] Place is not stored when a new item is created

### Refactor

- [x] Rename items to CreateItems
- [ ] remove the dependency of itemadd on service/places
- [ ] replace places by places2 everywhere and then rename places2 to places
- [ ] improve the foreign key links
  - [ ] rewrite the creation of items

### more stuff for this screen

- [ ] PUT /items
- [ ] DELETE /items

## Merge

### Refactored

N/A

### Bugs

N/A

### Other

- [x] upgraded primeicons to 4.1.0
- [x] added the public directory to serve static stuff from express
- [x] rewrote places, now places2, not everything is migrated

## settings

- [ ] Operational
  - [ ] nr of labels in cache
    - [ ] max number of items declared in one go.
  - [ ] nr of days to break a lock
  - [ ] nr of days to reuse a deleted label

## More fixes

### More bugs

- [ ] When entering itemadd, focus should be on description field
- [ ] the favicon is the Vue logo.

### More Refactoring

- [ ] move generic css to core.css
- [ ] scrolling in itemadd based on flex
- [ ] remove labelfiles and labeltypes references

- [ ] replace goederen met artikelen

## Before release

### Functions

- [ ] delete items
- [ ] delete locations
- [ ] edit locations
- [ ] lookup items
- [ ] logging issues to the backend

### Release process

- [ ] clean code
  - [ ] remove console.log
  - [ ] remove unused Primevue components
  - [ ] look for eslint-disable
- [ ] build procedure
- [ ] install procedure
- [ ] install documatation
- [ ] user documentation

## Technical debt

- [ ] create a input text component based on itemadd Inputtexts
  - [ ] create the component
  - [ ] use for itemadd quantity (needs 3 places before this becomes active)
- [ ] Proper implementation of CORS;

## Ideas

### Item categories

Each category has its own attributes and list of locations

Food:

- expiry date
  
Wine:

- region/country
- Red/white/...
- ...

Book:

- Author

### Label locking

Label locking should be done based on a session id. That session id should also
be used when labels are consumed.
