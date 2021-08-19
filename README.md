# nyt-spelling-bee-db
A node application that fetches and stores the nyt spelling-bee game data daily. 

## Usage
* API GET "/YYYY-MM-DD" will return that day's spelling bee data if it exists in the database.
* (Note: the earliest data available is from 2020-08-20)


## Technologies used
* express (server)
* sequelize, pg - databse (bee data persistency)
* request-promise - fetching bee data
* node-cron - scheduling data fetching for once a day (4:00am EST; an hour after the new puzzle is released every morning)

## Future plans
* add data from earlier than 2020-08-20 if available somewhwere
* implement front-end for data access
* ...?
