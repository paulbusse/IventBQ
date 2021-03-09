# Things to do

## Current

### Bugs

N/A

### Refactor

N/A

### more stuff for this screen

- [ ] POST /items
- [ ] PUT /items
- [ ] DELETE /items

### classes/items

- [x] Rename label to description ()
- [x] update an items
  - [x] when the count > previous count
  - [x] when the count < previous count
- [x] Save to DB
- [x] GET /items?p=itemdescriptions

## Merge

### Save new UI items in DB

- [x] transform the created items to DB structures
  - [x] TC 1: single element, count = 1
  - [x] TC 2: single element, count > 1
  - [x] TC 3: multiple elements
- [x] POST new items to DB
- [x] Added migrations script for items table

### load new items in DB

- [x] itemadd: add button to save
- [x] lock labels in the DB
- [x] places class: transform items to records
- [x] api routes: add new routs
- [x] api controller add controller
- [x] api model add items model

### Use db migration instead of sync

- [x] create migrations for labels
- [x] create migration for places
- [x] remove sync from db.
- [x] validate the db is in line with the code
- [x] test if all place API calls still work.

### views/itemadd

- [x] add [x] to inputtext, to clear inputtext
  - [x] the focus after pressing the x should be on the field again
- [x] replace 'plaats' with dropdown
- [x] implement [Save] when in edit mode
- [x] remove pencil icon in itemlist
- [x] [Save] on the list
  - [x] Button disappears when saved
  - [x] Button disappears when voeg toe is clicked
- [x] implement select item from itemlist

### Load places from DB

- [x] utils/ivts: Create a util for axios
- [x] utils/ivts: that feeds back to the toast
- [x] classes/places: load from DB
- [x] service/places:GET /places

### manage labels

- [x] preload and lock labels in the DB.
  - [x] PUT /labels
- [x] labels low/high watermark

### Refactored

- [x] ui classes places should not be derived from Array
- [x] places.vue -> composition api

## settings

- [ ] Operational
  - [ ] nr of labels in backlog
    - [ ] max number of items declared in one go.
  - [ ] nr of days to break a lock
  - [ ] nr of days to reuse a deleted label

## More fixes

### More bugs

- [ ] When entering itemadd, focus should be on description field

### More Refactoring

- [ ] move generic css to core.css
- [ ] scrolling in itemadd based on flex
- [ ] remove labelfiles and labeltypes references
- [ ] standardize backend error handling across all controllers and classes
  - [ ] controllers
    - [ ] labels
    - [ ] places
  - [ ] models
    - [ ] index
    - [ ] items
    - [ ] labels
    - [ ] places
- [ ] replace goederen met artikelen

## Before release

### Functions

- [ ] delete items
- [ ] delete locations
- [ ] edit locations
- [ ] lookup items

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

- [ ] Places should use the service/places GET call.
- [ ] create a input text component based on itemadd Inputtexts
  - [ ] create the component
  - [ ] use for itemadd description and quantity
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
