# flora

Identify, track and care for your plant-friends

## Setup

In the root of the folder -> create a `.env` and include your variables
e.g.

```
PORT=4242
MONGO_OWNER=<your-name>
MONGO_PASSWORD=<your-password>
MONGO_VAULT=<your-vault>
MONGO_DB_NAME=<your-db-name>

# For PLANT.ID API
PLANT_ID_V=<your-API-key>
```

#### Plant.id

To get your plant.id API key go to https://web.plant.id/plant-identification-api/  
and hit the Get API trial access button. Fill out the form and get 100 test calls for free.  
Plant.id docs can be found here -> https://github.com/flowerchecker/Plant-id-API/wiki

#### WIKI

No API key is required.
Wiki docs can be found here > https://en.wikipedia.org/api/rest_v1/#/Page%20content

Example API GET call endpoint:
https://en.wikipedia.org/api/rest_v1/page/summary/Phlebodium_aureum  
Switch out the language code before -wikipedia- to change the language e.g.  
https://es.wikipedia.org/api/rest_v1/page/summary/Phlebodium_aureum

#### TEMP

included TEMP folders contain mock data to work with.

#### Additionals

If you feel fancy you can try to fetch additional data from https://trefle.io/ and try to merge them with plant.id data.  
Account required to get API key. Plant can be searched by name.
