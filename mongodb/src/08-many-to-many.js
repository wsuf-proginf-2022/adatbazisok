const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const shop = client.db('shop');
    // classic many-to-many relationship with a 'join' collection
    shop.collection('products').insertOne({
      name: 'a book',
      price: 10,
      _id: 'product1'
    });

    shop.collection('customers').insertOne({
      name: 'John',
      age: 30,
      _id: 'customer1'
    });

    shop.collection('orders').insertOne({
      productId: 'product1',
      customerId: 'customer1',
      quantity: 1
    });

    // query for the order including the product and customer documents
    const order = await shop
      .collection('orders')
      .aggregate([
        { $match: { productId: 'product1' } },
        {
          $lookup: {
            from: 'products',
            localField: 'productId',
            foreignField: '_id',
            as: 'product'
          }
        },
        { $addFields: { product: { $arrayElemAt: ['$product', 0] } } },
        {
          $lookup: {
            from: 'customers',
            localField: 'customerId',
            foreignField: '_id',
            as: 'customer'
          }
        },
        { $addFields: { customer: { $arrayElemAt: ['$customer', 0] } } }
      ])
      .toArray();
    console.log(JSON.stringify(order, null, 2));

    // many-to-many relationship with an embedded/nested array
    shop.collection('customers').insertOne({
      name: 'John',
      age: 30,
      orders: [
        {
          orderId: '232',
          products: [
            {
              name: 'book',
              quantity: 1,
              image: '23432edsfg.jpg',
              author: 'John'
            },
            { name: 'desk', quantity: 2, image: '23423423.jpg' }
          ]
        }
      ]
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  } finally {
    await client.close();
  }
}

run();
