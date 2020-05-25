const {
  MongoClient
} = require('mongodb');
const uri = 'mongodb://localhost:27017';

MongoClient.connect(uri, { useUnifiedTopology: true }, function (err, client) {
  if (err) {
    console.log(err);
    throw (err);
  }
  db = client.db('clone-back');
  db.collection('users-permissions_user', async function (err, collection) {
    if (err) {
      console.log(err);
      throw (err);
    }
    await collection.deleteMany({});
    client.close();
  })
})
