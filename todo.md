# Things to do

## Add item screen

### Bugs

- [x] notify toast does not have a timer
- [x] itemlist no longer contains the location
- [x] Refactor: Rename ids to labels

### manage labels

- [ ] preload and lock labels in the DB.
  - [ ] POST /labels
- [ ] labels low/high watermark

### load new items in DB

- [x] itemadd: add button to save
- [ ] lock labels in the DB
- [ ] places class: transform items to records
- [ ] places service: post items to ivts
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

### settings

- [ ] Operational
  - [ ] nr of labels in backlog
    - [ ] max number of items declared in one go.

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
