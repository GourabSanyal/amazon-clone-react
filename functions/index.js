const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const stripe = require("stripe")("sk_test_51JAbmoSJaBt33xWEtGvQajqmj3G257lE7EDOpFhTQep88yCR1aJwnH1IOBuSSbYKV0pN36knpCacptTXaSn0Vlkt00Qg2QBT5D");

// API

// - App Config
const app = express();

// - Middlewears
app.use(cors({ origin: true }))
app.use(express.json());

// - API routes
app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('./payment/create', async (request, response) => {
    const total = request.quary.total;

    console.log('Payment Request Revieved for this amount ->', total)

    const paymentInternet = await stripe.paymentInternet.create({
        amount: total, // subunit of currency
        currency: "usd"
    });
    // 201 - OK - Created Something
    response.status(201).send({
        clientSecret: paymentInternet.client_secret
    })
})

// - Listen Command
exports.api = functions.https.onRequest(app)