const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// For the default version


// For the default version
const algoliasearch = require("algoliasearch");


const client = algoliasearch("X3LM926NK1"
    , "6e9ae7d0040979bf816c25e2cf5721c7");
const index = client.initIndex("firebase_query");

exports.onPostCreated = functions.firestore.document("posts/{noteId}")
    .onCreate((snap, context) => {
      // Get the note document
      const note = snap.data();

      // Add an 'objectID' field which Algolia requires
      note.objectID = context.params.noteId;

      // Write to the algolia index

      return index.saveObject(note);
    });

exports.onPostDeleted = functions.firestore.document("posts/{noteId}")
    .onDelete((snap, context) => {
      // Get the note document
      const note = snap.id;

      // Add an 'objectID' field which Algolia requires


      // Write to the algolia index

      return index.deleteObject(note);
    });
