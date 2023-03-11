const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    // verfify we are connected
    await client.db('admin').command({ ping: 1 });
    console.log('Connected correctly to server');

    await client
      .db('carfleet')
      .collection('cars')
      .insertOne({ make: 'Honda', model: 'Civic', year: 2019 });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

run();
