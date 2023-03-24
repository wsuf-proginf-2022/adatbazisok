const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const carFleet = client.db('carfleet');

    const result = await carFleet.collection('passengers').insertOne({
      name: 'Person 1'
    });

    console.log(result);

    const result2 = await carFleet.collection('passengers').insertOne(
      {
        name: 'Person 2'
      },
      { writeConcern: { w: 0 } }
    );

    console.log(result2);

    const result3 = await carFleet.collection('passengers').insertOne(
      {
        name: 'Person 3'
      },
      { writeConcern: { w: 1, j: false } }
    );

    console.log(result3);
    const result4 = await carFleet.collection('passengers').insertOne(
      {
        name: 'Person 4'
      },
      { writeConcern: { w: 1, j: true, wtimeout: 1 } }
    );

    console.log(result4);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

run();
