const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const blog = client.db('blog');
    await blog.createCollection('posts', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['title', 'content', 'author'],
          properties: {
            title: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            content: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            author: {
              bsonType: 'objectId',
              description: 'must be an objectId and is required'
            },
            comments: {
              bsonType: 'array',
              description: 'must be an array if the field exists',
              items: {
                bsonType: 'object',
                required: ['author', 'content'],
                properties: {
                  author: {
                    bsonType: 'objectId',
                    description: 'must be an objectId and is required'
                  },
                  content: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                  }
                }
              }
            }
          }
        }
      }
    });
    await blog.collection('authors').insertOne({
      name: 'John Doe'
    });
    await blog.collection('posts').insertOne({
      title: 'My First Post',
      content: 'Hello World!',
      author: new ObjectId('641ddb60705fdaa1c4f4d359'),
      comments: [
        {
          content: 'First!',
          author: new ObjectId('641ddb60705fdaa1c4f4d359')
        }
      ]
    });

    // will fail!
    // await blog.collection('posts').insertOne({
    //   title: 'My First Post',
    //   content: true,
    //   author: 23
    // });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  } finally {
    await client.close();
  }
}

run();
