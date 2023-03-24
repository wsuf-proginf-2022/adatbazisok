const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

async function create() {
  try {
    await client.connect();

    await client
      .db('carfleet')
      .collection('cars')
      .insertOne({ make: 'Honda', model: 'Civic', year: 2019 });

    await client
      .db('carfleet')
      .collection('cars')
      .insertMany([
        { make: 'Toyota', model: 'Camry', year: 2018 },
        { plate: 'ABC123', type: 'Manual', model: 'Fusion', year: 2017 }
      ]);

    const myDoc = await client.db('carfleet').collection('cars').findOne();
    console.log(myDoc);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

async function read() {
  try {
    await client.connect();

    const myDoc = await client
      .db('carfleet')
      .collection('cars')
      .findOne({ make: 'Honda' });

    const allCars = await client
      .db('carfleet')
      .collection('cars')
      .find()
      .toArray();
    console.log(allCars);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

async function update() {
  try {
    await client.connect();
    await client
      .db('carfleet')
      .collection('cars')
      .updateOne({ make: 'Honda' }, { $set: { model: 'Accord' } });

    await client
      .db('carfleet')
      .collection('cars')
      .updateMany({ make: 'Honda' }, { $set: { model: 'Accord' } });

    await client
      .db('carfleet')
      .collection('cars')
      // if we don't specify a filter, it will update all documents
      .updateMany({}, { $set: { sold: true } });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

async function deleteCars() {
  try {
    await client.connect();
    await client.db('carfleet').collection('cars').deleteOne({ make: 'Honda' });

    await client
      .db('carfleet')
      .collection('cars')
      .deleteMany({ year: { $lt: 2018 } });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

async function nestedDocument() {
  try {
    await client.connect();
    await client
      .db('carfleet')
      .collection('cars')
      .insertOne({
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        driver: { name: 'John', age: 30 }
      });
    await client
      .db('carfleet')
      .collection('cars')
      .updateMany(
        {},
        {
          $set: {
            passengers: [
              { name: 'John', age: 30 },
              { name: 'Jane', age: 25 }
            ]
          }
        }
      );
    const cars = await client
      .db('carfleet')
      .collection('cars')
      .findOne({ 'passengers.name': 'John' });
    console.log(JSON.stringify(cars, null, 2));
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

nestedDocument();
// update();
// deleteCars();

// create();
// read();
