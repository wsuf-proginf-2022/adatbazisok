const { MongoClient, Timestamp } = require('mongodb');
const Int32 = require('mongodb').Int32;
const Decimal128 = require('mongodb').Decimal128;

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const shop = client.db('shop');

    await shop.collection('products').insertOne({
      name: 'T-Shirt',
      price: 9.99,
      description: null
    });

    await shop.collection('products').insertOne({
      name: 'computer',
      price: 34,
      description: "It's a computer"
    });

    await shop.collection('products').insertOne({
      name: 'computer mouse',
      //    12345678901234567000
      sold: 12345678901234567890,
      stock: Decimal128.fromString('12345678901234567890'),
      price: new Int32(34),
      details: { model: 'abc', make: 'xyz' },
      tags: ['electronics', 'accessories', 'computer'],
      created: new Date(),
      modified: new Timestamp(),
      description: "It's a computer"
    });

    const computerMouse = await shop
      .collection('products')
      .findOne({ name: 'computer mouse' });
    for (const key in computerMouse) {
      console.log(key, typeof computerMouse[key]);
    }
    // https://www.mongodb.com/docs/mongodb-shell/reference/data-types/
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

run();
