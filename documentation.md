FORMAT: 1A

# sm-api

sm-api is a [Node.js](https://nodejs.org) REST API

# Group Health check

## Monitor the application status [/healthcheck]

### Health check [GET]

+ Response 200

# Group History

## History endpoint [/history]

### Historical data [GET]

+ Response 200 (application/json)
  + Body

             [
               {
                 "_id": "abc1234",
                 "winner": "purE",
                 "second": "cheminator",
                 "season": "2005-06"
               },
               ...,
               {
                 "_id": "xyz456",
                 "winner": "montouto2000",
                 "second": "lhooq1770",
                 "season": "2015-16"
               }
             ]

# Group Players

## Players endpoint [/players]

### List of players [GET]

+ Response 200 (application/json)
  + Body

             [
               {
                 "_id": "abc1234",
                 "nick": "purE",
                 "name": "Manu",
                 "team": "Illuminati",
                 "bio": "",
                 "picture": "",
                 "active": true
               },
               ...,
               {
                 "_id": "xyz456",
                 "nick": "vporto",
                 "name": "Valentín",
                 "team": "AC Milano",
                 "bio": "",
                 "picture": "",
                 "active": false
               },
             ]

### List of all active players [GET /players/active]

+ Response 200 (application/json)
  + Body

             [
               {
                 "_id": "abc1234",
                 "nick": "purE",
                 "name": "Manu",
                 "team": "Illuminati",
                 "bio": "",
                 "picture": "",
                 "active": true
               },
               ...,
             ]

### List of all retired players [GET /players/retired]

+ Response 200 (application/json)
  + Body

             [
               {
                 "_id": "xyz456",
                 "nick": "vporto",
                 "name": "Valentín",
                 "team": "AC Milano",
                 "bio": "",
                 "picture": "",
                 "active": false
               },
               ...
             ]

### Player information [GET /players/{nick}]

+ Parameters
  + nick: `purE` (required, string) - player's nick in the league

+ Response 200 (application/json)
  + Body

             {
               "_id": "abc1234",
               "nick": "purE",
               "name": "Manu",
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
                 "Temporada": "2015-16",
                 "total": 34
               },
               {
                 "Temporada": "2016-17",
                 "total": 34
               }
             ]

### List of season standings [GET /standings/{season}]

+ Parameters
  + season: `2016-17` (required, string) - season years

+ Response 200 (application/json)
  + Body

             [
               {
                 "_id": "xxx",
                 "Numero": 1,
                 "Temporada": "2016-17",
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
                 "Temporada": "2016-17",
                 "Jornada": {},
                 "General": {},
                 "Broker": {},
                 "Puntos": {},
                 "Rebotes": {},
                 "Triples": {},
                 "Asistencias": {}
               }
             ]

### Details for a standing [GET /standings/{season}/{number}]

+ Parameters
  + season: `2016-17` (required, string) - season years
  + number: 17 (required, number) - standings number [1-34]

+ Response 200 (application/json)
  + Body

             {
               "_id": "xyz",
               "Numero": 17,
               "Temporada": "2016-17",
               "Jornada": {},
               "General": {},
               "Broker": {},
               "Puntos": {},
               "Rebotes": {},
               "Triples": {},
               "Asistencias": {}
             }

+ Response 400 (application/json)
  + Body

             {
               "error": "Invalid standings number value: 35"
             }
