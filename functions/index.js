const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const stripe = require("stripe")
("sk_test_51JAbmoSJaBt33xWEtGvQajqmj3G257lE7EDOpFhTQep88yCR1aJwnH1IOBuSSbYKV0pN36knpCacptTXaSn0Vlkt00Qg2QBT5D");

// API

// - App Config
const app = express();

// - Middlewears
app.use(cors({ origin: true }))
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send('hello world'))

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;

    console.log("Payment Request Revieved for this amount ->", total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of currency
        currency: "usd",
    });
    // 201 - OK - Created Something
    response.status(201).send({
        clientSecret: paymentIntents.client_secret
    });
})

// - Listen Command
exports.api = functions.https.onRequest(app)

//Example end point: http://localhost:5001/clone-baadf/us-central1/api
//firebase emulators:start