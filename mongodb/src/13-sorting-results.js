const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const movieData = client.db('movieData');

    // sort by rating
    const res1 = await movieData
      .collection('movies')
      .find()
      .sort({ 'rating.average': 1 })
      .toArray();
    console.log(res1.map((movie) => ({ rating: movie.rating.average })));

    const res2 = await movieData
      .collection('movies')
      .find()
      .sort({ 'rating.average': 1, runtime: 1 })
      .toArray();
    console.log(res2.map((movie) => ({ rating: movie.rating.average })));

    // slice and limit the results for pagination
    const res3 = await movieData
      .collection('movies')
      .find()
      .sort({ 'rating.average': 1, runtime: 1 })
      .skip(10)
      .limit(10)
      .toArray();
    console.log(res3.map((movie) => ({ rating: movie.rating.average })));

    const res4 = await movieData
      .collection('movies')
      .find({ 'rating.average': { $gt: 9 } })
      // [1,2] means second and third element should be included in the result
      .project({ genres: { $slice: [1, 2] }, name: 1, _id: 0 })
      .toArray();
    console.log(res4);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

run();
