// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51Np0BPIBrBC1A34W3YVjxuengAgvCwZjUVdPkJ7wH3WA0QY3v63nluatrGaq6fVaRhPSHSOKjQlPW3C3E5JwgMBF008Mhe5jRy')

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: '/',
    cancel_url: '/',
  });

  res.redirect(303, session.url);
});

app.listen(8080, () => console.log(`Listening on port ${8080}!`));