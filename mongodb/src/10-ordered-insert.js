const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const carFleet = client.db('carfleet');
    await carFleet.collection('passengers').drop();

    await carFleet.collection('passengers').insertOne({
      name: 'Person 1',
      _id: 'p1'
    });

    await carFleet.collection('passengers').insertMany([
      {
        name: 'Person 2',
        _id: 'p2'
      },
      {
        name: 'Person 1',
        _id: 'p1'
      },
      {
        name: 'Person 3',
        _id: 'p3'
      }
    ]);

    const passengers = await carFleet.collection('passengers').find().toArray();
    console.log(passengers);
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  } finally {
    await client.close();
  }
}

// run();

async function orderedInsert() {
  try {
    await client.connect();
    const carFleet = client.db('carfleet');
    await carFleet.collection('passengers').drop();

    await carFleet.collection('passengers').insertOne({
      name: 'Person 1',
      _id: 'p1'
    });

    await carFleet.collection('passengers').insertMany(
      [
        {
          name: 'Person 2',
          _id: 'p2'
        },
        {
          name: 'Person 1',
          _id: 'p1'
        },
        {
          name: 'Person 3',
          _id: 'p3'
        }
      ],
      // will ensure that all documents are inserted if possible
      { ordered: false }
    );

    const passengers = await carFleet.collection('passengers').find().toArray();
    console.log(passengers);
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  } finally {
    await client.close();
  }
}

orderedInsert();
