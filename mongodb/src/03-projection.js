const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('carfleet');

    const cars = await database
      .collection('cars')
      .find({ make: 'Honda' }, { projection: { model: 1 } })
      .toArray();

    const carsWithoutId = await database
      .collection('cars')
      .find({ make: 'Honda' }, { projection: { _id: 0, model: 1 } })
      .toArray();

    console.log(carsWithoutId);
    console.log(cars);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

run();
