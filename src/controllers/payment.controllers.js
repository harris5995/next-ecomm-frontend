import express from 'express'
import { Prisma } from "@prisma/client"
import prisma from "../utils/prisma.js"
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Np0BPIBrBC1A34W3YVjxuengAgvCwZjUVdPkJ7wH3WA0QY3v63nluatrGaq6fVaRhPSHSOKjQlPW3C3E5JwgMBF008Mhe5jRy');
// # See your keys here: https://dashboard.stripe.com/apikeys

const router = express.Router()

// const customer = await stripe.customers.create({
//   email: 'customer@example.com',
// });

router.post('/', async (req, res) => {

  // make router so that it gets single image data instead of all
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: req.image.title,
            description: req.image.description,
            images: [req.image.url]
          },
          unit_amount: (req.image.price*100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://127.0.0.1:5173/payment/success',
    cancel_url: 'http://127.0.0.1:5173/payment/cancel',
  });

  return res.json(session.url)
});


export default router
