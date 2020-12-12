const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51HwawkCRRmxIqORSPnExEVcwYQF83CLDs3qpqTdhZ8UXS3jVuN60qiuLTSQyoa6Ep3Hd6IiQxGNvddlRD1ch0GYl00naXs2bQT');

// App config
const app = express();
// Middlewares
app.use(cors({origin:true}));
app.use(express.json);
// Database

// API routes
app.get('/', (req,res)=>{
    res.status(200).send("Hello Programmer!")
})


app.post('/payments/create', async(req,res)=>{
    const total = req.query.total;
    console.log("Payment req received for total:", total)
    const paymentIntent= await stripe.paymentIntents.create({
        amount:total,
        currency:"usd"
    });
    // OK, created => created a payment intent and send the res
    res.status(201).send({
        clientSecret: paymentIntent.clientSecret
    })
})



// Listener
// const runtimeOpts = {
//     timeOutSeconds:300
// }
exports.api = functions.https.onRequest(app)


// Example endpoint
// http://localhost:5001/clone-cb45d/us-central1/api



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
