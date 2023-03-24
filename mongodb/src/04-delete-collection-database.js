const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('carfleet');

    // delete the cars collection
    await database.collection('cars').drop();

    // delete the carfleet database
    await database.dropDatabase();
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

run();
