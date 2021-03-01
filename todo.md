# Things to do

## Current

### Bugs

- [x] When creating a new place the toast shows an (undefined)
- [x] I can add an item with an empty description
- [x] the labels are reloaded every time when voegtoe is pressed.
- [x] Support for CORS
- [x] When leaving the add items page and returning later, we loose all information
  - [x] lock labels
  - [x] already entered information
  - [x] The 'place' is not completed correctly
- [x] 'Bewaar' fails
- [x] Newly created places do not show up in dropdown in itemadd
- [x] Cards are not scrolling - must be removed
- [x] Created items list does not scroll

### Refactor

- [x] ui classes places should not be derived from Array
- [x] places.vue -> composition api

### manage labels

- [x] preload and lock labels in the DB.
  - [x] PUT /labels
- [x] labels low/high watermark

### load new items in DB

- [x] itemadd: add button to save
- [x] lock labels in the DB
- [ ] places class: transform items to records
- [ ] api routes: add new routs
- [ ] api controller add controller
- [ ] api classes add items class
- [ ] api model add items model

### more stuff for this screen

- [ ] POST /items
- [ ] PUT /items
- [ ] DELETE /items
- [ ] GET /items?q=recentadds

### classes/items

- [x] Rename label to description ()
- [x] update an items

  - [x] when the count > previous count
  - [x] when the count < previous count
- [ ] Save to DB
- [ ] Load from DB

## Merge

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

### CORS handling

CORS handling needs to be refined so that we handle it correctly. Currently all CORS requests are accepted.
