const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const movieData = client.db('movieData');
    // https://www.mongodb.com/docs/manual/reference/operator/query/

    // find all movies with a weight of 49
    const res1 = await movieData
      .collection('movies')
      .find({ weight: 49 })
      .toArray();

    // console.log('Movies with a weight of 49:', res1.length);

    // find all movies where the weight is greater than 50
    const res2 = await movieData
      .collection('movies')
      .find({ weight: { $gt: 50 } })
      .toArray();

    // console.log('Movies with a weight of greater than 50:', res2.length);

    // to get the number of documents
    const res3 = await movieData
      .collection('movies')
      .countDocuments({ weight: { $gt: 50 } });

    // console.log('Movies with a weight of greater than 50:', res3);

    // findOne will always return one even if there are more
    const res4 = await movieData
      .collection('movies')
      .findOne({ weight: { $gt: 50 } });

    // console.log('One movie with a weight of greater than 50:', res4);

    // query for nested objects
    const res5 = await movieData
      .collection('movies')
      .find({ 'rating.average': { $gt: 8 } })
      .toArray();

    // console.log(`Movies with an average rating greater than 8: ${res5.length}`);

    const res6 = await movieData
      .collection('movies')
      .find({ 'rating.average': { $in: [7, 8] } })
      .toArray();

    // console.log(`Movies with an average rating of 7 or 8: ${res6.length}`);

    const res7 = await movieData
      .collection('movies')
      .find({
        $and: [
          { 'rating.average': { $gt: 7 } },
          { 'rating.average': { $lt: 9 } }
        ]
      })
      .toArray();
    // console.log(
    //   `Movies with an average rating between 7 and 9: ${res7.length}`
    // );

    const res8 = await movieData
      .collection('movies')
      .find({
        $nor: [{ 'rating.average': { $gt: 7 } }, { type: { eq: 'Reality' } }]
      })
      .toArray();
    // console.log(
    //   `Movies with rating not greater than 7 and not Reality: ${res8.length}`
    // );

    const res9 = await movieData
      .collection('movies')
      .find({ runtime: { $exists: true, $ne: null, $type: 'number' } })
      .toArray();
    // console.log(`Movies with a runtime: ${res9.length}`);

    // https://en.wikipedia.org/wiki/Regular_expression
    const res10 = await movieData
      .collection('movies')
      .find({ summary: { $regex: /Ipsfum/ } })
      .toArray();
    // console.log(`Movies with a summary containing Ipsum: ${res10.length}`);

    const res11 = await movieData
      .collection('movies')
      .find({ $expr: { $gt: ['$runtime', '$weight'] } })
      .toArray();
    // console.log(
    //   `Movies with a runtime greater than the weight: ${res11.length}`
    // );

    const res12 = await movieData
      .collection('movies')
      .find({ genres: 'Drama' })
      .toArray();
    // console.log(`Movies with a genre of Drama: ${res12.length}`);

    const res13 = await movieData
      .collection('movies')
      .find({ genres: { $size: 1 } })
      .toArray();
    // console.log(`Movies with a single genre: ${res13.length}`);

    const res14 = await movieData
      .collection('movies')
      .find({ genres: { $all: ['Action', 'Drama'] } })
      .toArray();
    // console.log(`Movies with both Action and Drama: ${res14.length}`);

    const res15 = await movieData
      .collection('movies')
      .find(
        {
          $and: [
            { 'reviews.rating': { $gt: 9 } },
            { 'reviews.recommendation': 'no' }
          ]
        },
        { projection: { title: 1, reviews: 1, _id: 0 } }
      )
      .toArray();
    // console.log(JSON.stringify(res15, null, 2));
    console.log(
      `Movies with a review rating greater than 9 and a recommendation of no: ${res15.length}`
    );

    // the previous query can be rewritten with the $elemMatch operator
    const res16 = await movieData
      .collection('movies')
      .find(
        {
          reviews: { $elemMatch: { rating: { $gt: 9 }, recommendation: 'no' } }
        },
        { projection: { title: 1, reviews: 1, _id: 0 } }
      )
      .toArray();
    console.log(JSON.stringify(res16, null, 2));
    console.log(
      `Movies with a review rating greater than 9 and a recommendation of no: ${res16.length}`
    );
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

run();
