const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const carFleet = client.db('carfleet');

    // one to many relationship with embedded/nested documents
    await carFleet.collection('cars').insertOne({
      make: 'Hyundai',
      passengers: [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 }
      ]
    });

    // query for the Hyundai car
    const car = await carFleet.collection('cars').findOne({ make: 'Hyundai' });
    console.log(car);

    // one to many relationship with references
    // one directional relationship: car to passengers
    await carFleet.collection('cars').insertOne({
      make: 'Toyota',
      passengers: ['passenger1', 'passenger2']
    });

    // create passenger documents
    await carFleet.collection('passengers').insertMany([
      { _id: 'passenger1', name: 'John', age: 30 },
      { _id: 'passenger2', name: 'Jane', age: 25 }
    ]);

    // query for the car including the driver document
    const carWithPassengers = await carFleet
      .collection('cars')
      .aggregate([
        { $match: { make: 'Toyota' } },
        {
          $lookup: {
            from: 'passengers',
            localField: 'passengers',
            foreignField: '_id',
            as: 'utasok'
          }
        }
      ])
      .toArray();
    console.log(JSON.stringify(carWithPassengers, null, 2));

    // one directional relationship: passengers to car
    await carFleet.collection('cars').insertOne({ make: 'BMW', _id: 'car1' });
    // create passenger documents
    await carFleet.collection('passengers').insertMany([
      { name: 'John', age: 30, car: 'car1' },
      { name: 'Jane', age: 25, car: 'car1' }
    ]);
    const bmwCarWithPassengers = await carFleet
      .collection('cars')
      .aggregate([
        { $match: { _id: 'car1' } },
        {
          $lookup: {
            from: 'passengers',
            localField: '_id',
            foreignField: 'car',
            as: 'utasok'
          }
        }
      ])
      .toArray();
    console.log(JSON.stringify(bmwCarWithPassengers, null, 2));
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

run();
