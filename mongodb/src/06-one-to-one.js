const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const carFleet = client.db('carfleet');

    // one to one relationship with embedded/nested document
    await carFleet.collection('cars').insertOne({
      make: 'Honda',
      driver: { name: 'John', age: 30 }
    });

    // query for the car with the driver named John
    const car = await carFleet
      .collection('cars')
      .findOne({ 'driver.name': 'John' });
    console.log(car);

    // one to one relationship with a references
    await carFleet.collection('cars').insertOne({
      make: 'Porsche',
      driver: 'driver2'
    });

    // create a driver document
    await carFleet.collection('drivers').insertOne({
      _id: 'driver2',
      name: 'Jane',
      age: 25
    });

    // query for the car including the driver document
    const carWithDriver = await carFleet
      .collection('cars')
      .aggregate([
        { $match: { make: 'Porsche' } },
        {
          $lookup: {
            from: 'drivers',
            localField: 'driver',
            foreignField: '_id',
            as: 'driver'
          }
        },
        { $addFields: { driver: { $arrayElemAt: ['$driver', 0] } } }
      ])
      .toArray();
    console.log(JSON.stringify(carWithDriver, null, 2));
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

run();
