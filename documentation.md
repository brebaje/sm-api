FORMAT: 1A

# sm-api

sm-api is a [Node.js](https://nodejs.org) REST API

# Group Health check

## Monitor the application status [/healthcheck]

### Health check [GET]

+ Response 200

# Group Player

## Player endpoint [/player]

### List of active players [GET]

+ Response 200 (application/json)
  + Body

             [
               {
                 "_id": "purE",
                 "team": "Illuminati",
                 "bio": "",
                 "picture": "",
                 "active": true
               },
               {
                 "_id": "sabinaesdios",
                 "team": "Síndrome Peleteiro",
                 "bio": "",
                 "picture": "",
                 "active": true
               }
             ]

### List of all historic players [GET /player/historic]

+ Response 200 (application/json)
  + Body

             [
               {
                 "_id": "purE",
                 "team": "Illuminati",
                 "bio": "",
                 "picture": "",
                 "active": true
               },
               {
                 "_id": "vporto",
                 "team": "AC Milano",
                 "bio": "",
                 "picture": "",
                 "active": false
               }
             ]

### Player information [GET /player/{alias}]

+ Parameters
  + alias: `purE` (required, string) - alias of the player in the league

+ Response 200 (application/json)
  + Body

              {
                "_id": "purE",
                "team": "Illuminati",
                "bio": "",
                "picture": "",
                "active": true
              }
