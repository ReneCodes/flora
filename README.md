<h1 style="color: #15aabf;">FLORA</h1>

Identify, track and care for your plant friends with FLORA 🌱🙌

This app is a passion project to keep track of and take care of your favourite Houseplants.  
A User can capture an image from his device to identify the plant and get information such as the watering schedule or natural habitat.  
The plant can be added to their personal collection, and it allows them to add personal notes.  
Additionally, you can have a look at care and watering guides which include helpful tips.

## Getting Started

Install dependencies on the client and server side with `npm i`

In the root of the server folder -> create a `.env` and include your variables
e.g.

```
PORT=4242
MONGO_OWNER=<your-name>
MONGO_PASSWORD=<your-password>
MONGO_VAULT=<your-vault>
MONGO_DB_NAME=<your-db-name>

# For PLANT.ID API
PLANT_ID_KEY=<your-API-key>
```

#### Cold vs. Hot Wire

Currently, the server is **COLD Wired**, meaning that you can take a snapshot with the App, but it will always give you the same plant as a result.  
However, you can play around with the app without signing up for a Plant.id API key.

**HOT Wiring:**  
Sign up for API Access Key (see instructions below) and include them in your `.env` variables.
Go to `index.controller.js` (server-side) and uncomment the `HOT WIRE START` function.  
Respectively, comment out the `COLD WIRE` function.  
You should be good to go!

### Used API's

[Plant.id]: https://web.plant.id/plant-identification-api/
[Plant.id-Docs]: https://github.com/flowerchecker/Plant-id-API/wiki

#### [Plant.id]

To get your API access key go to <u>[Plant.id]</u>
and hit the Get API trial access button. Fill out the form and get 100 test calls for free.  
Their docs can be found here: <u>[Plant.id-Docs]</u>

[Wiki-Docs]: https://en.wikipedia.org/api/rest_v1/#/Page%20content
[Wiki-Example]: https://en.wikipedia.org/api/rest_v1/page/summary/Phlebodium_aureum

#### WIKI

No API key is required.
Wiki docs can be found here: [Wiki-Docs]
Here is an example of a GET call endpoint: [Wiki-Example]

### Others

#### TEMP

included TEMP folders on server side contains mock data to work with **COLD Wired** App.

### Tech Stack

<table>
<tr>
<th>MERN</th>
<th>Additionals</th>
</tr>

<tr>
<td>MongoDB</td>
<td>Mongoose</td>
</tr>

<tr>
<td>Express</td>
<td></td>
</tr>

<tr>
<td>React</td>
<td>Redux</td>
</tr>

<tr>
<td>Node.js</td>
<td></td>
</tr>

</table>
