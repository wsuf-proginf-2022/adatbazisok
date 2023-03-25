const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const movieData = client.db('movieData');

    await movieData
      .collection('movies')
      .updateOne({ id: 857 }, { $set: { 'rating.average': 9 } });

    const res = await movieData
      .collection('movies')
      .updateMany(
        { 'rating.average': { $gt: 9 } },
        { $set: { 'rating.average': 9.1 } }
      );

    console.log(JSON.stringify(res, null, 2));
    // $min operator
    // will only update the value if the new value is less than the existing value
    // $max operator
    // will only update the value if the new value is greater than the existing value
    await movieData
      .collection('movies')
      .updateMany(
        { 'rating.average': { $gt: 9 } },
        { $min: { 'rating.average': 9.1 } }
      );

    // $mul operator
    // will multiply the existing value by the specified value
    await movieData
      .collection('movies')
      .updateMany(
        { 'rating.average': { $gt: 9 } },
        { $mul: { 'rating.average': 2 } }
      );

    // $unset operator
    // will remove the specified field from the document
    await movieData
      .collection('movies')
      .updateMany(
        { 'rating.average': { $gt: 9 } },
        { $unset: { 'rating.average': '' } }
      );

    await movieData
      .collection('movies')
      .updateMany(
        { 'rating.average': { $gt: 9 } },
        { $set: { 'rating.average': null } }
      );

    await movieData
      .collection('movies')
      .upteOne(
        { id: 905 },
        { $rename: { 'rating.average': 'rating.average2' } }
      );

    await movieData.collection('movies').updateOne(
      { id: 1 },
      { $set: { 'rating.average': 2, name: 'Batman' } },
      // will create a new document if the query does not match any documents
      { upsert: true }
    );

    const res2 = await movieData
      .collection('movies')
      .find(
        {
          'reviews.rating': { $gt: 9 },
          'reviews.recommendation': 'no'
        },
        {
          projection: {
            title: 1,
            reviews: {
              $filter: {
                input: '$reviews',
                as: 'review',
                cond: {
                  $and: [
                    { $gt: ['$$review.rating', 9] },
                    { $eq: ['$$review.recommendation', 'no'] }
                  ]
                }
              }
            },
            _id: 0
          }
        }
      )
      .toArray();
    console.log(
      `Movies with a review rating greater than 9 and a recommendation of no: ${res2.length}`
    );
    console.log(JSON.stringify(res2, null, 2));

    const res3 = await movieData.collection('movies').updateMany(
      { reviews: { $exists: true } },
      { $set: { 'reviews.$[elem].inconsistent': true } },
      {
        arrayFilters: [
          {
            'elem.rating': { $gt: 9 },
            'elem.recommendation': 'no'
          }
        ]
      }
    );

    console.log(JSON.stringify(res3, null, 2));
    await movieData
      .collection('movies')
      .updateOne(
        { id: 905 },
        { $addToSet: { reviews: { rating: 10, recommendation: 'yes' } } }
      );
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

run();
