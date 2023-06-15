require('dotenv').config(); // loading secret environment variables
module.exports = {
	PORT: process.env.PORT,
	DB_OWNER: process.env.MONGO_OWNER,
	DB_PASS: process.env.MONGO_PASSWORD,
	VAULT: process.env.MONGO_VAULT,
	DB_NAME: process.env.MONGO_DB_NAME,
	PLANT_ID: process.env.PLANT_ID_V,
<<<<<<< HEAD
	CLUSTER_EXT: process.env.MONGO_DB_CLUSTER_EXT
=======
	CLUSTER_EXT: process.env.MONGO_CLUSTER_EXT,
>>>>>>> acbe31212c3d3b7bb15b9b613309c62dbdf12af3
};
