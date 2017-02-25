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

# Group Standings

## Standings endpoint [/standings]

### Standings information [GET]

+ Response 200 (application/json)
  + Body

             [
               {
                 "Temporada": "15-16",
                 "total": 34
               },
               {
                 "Temporada": "16-17",
                 "total": 34
               }
             ]

### List of season standings [GET /standings/{season}]

+ Parameters
  + season: `16-17` (required, string) - season years

+ Response 200 (application/json)
  + Body

             [
               {
                 "_id": "xxx",
                 "Numero": 1,
                 "Temporada": "16-17",
                 "Jornada": {},
                 "General": {},
                 "Broker": {},
                 "Puntos": {},
                 "Rebotes": {},
                 "Triples": {},
                 "Asistencias": {}
               },
               ...,
               {
                 "_id": "zzz",
                 "Numero": 34,
                 "Temporada": "16-17",
                 "Jornada": {},
                 "General": {},
                 "Broker": {},
                 "Puntos": {},
                 "Rebotes": {},
                 "Triples": {},
                 "Asistencias": {}
               }
             ]

### Details for a season standing [GET /standings/{season}/{number}]

+ Parameters
  + season: `16-17` (required, string) - season years
  + number: 17 (required, number) - standings number [1-34]

+ Response 200 (application/json)
  + Body

             {
               "_id": "xyz",
               "Numero": 17,
               "Temporada": "16-17",
               "Jornada": {},
               "General": {},
               "Broker": {},
               "Puntos": {},
               "Rebotes": {},
               "Triples": {},
               "Asistencias": {}
             }
