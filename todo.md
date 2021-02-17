# Things to do

## Add item screen

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

### more stuff for this screen

- [ ] POST /items
- [ ] PUT /items
- [ ] DELETE /items
- [ ] GET /items?q=recentadds

### classes/items

- [ ] labels low/high watermark
- [ ] POST /labels
- [ ] Refactor: Rename ids to labels
- [x] Rename label to description ()
- [x] update an items

  - [x] when the count > previous count
  - [x] when the count < previous count
- [ ] Save to DB
- [ ] Load from DB

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
