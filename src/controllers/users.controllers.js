import express from 'express'
import bcrypt from "bcryptjs"
import { Prisma } from "@prisma/client"
import prisma from "../utils/prisma.js"
import { validateUser } from "../validators/users.js"
import { filter } from "../utils/common.js"
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const router = express.Router()
//Registers new user (add new user info to users table)
//Works using Insomnia
//Need to connect with front-end login page button
router.post('/', async (req, res) => {
  const data = req.body

  const validationErrors = validateUser(data)

  if (Object.keys(validationErrors).length != 0) return res.status(400).send({
    error: validationErrors
  })

  data.password = bcrypt.hashSync(data.password, 8);

  prisma.user.create({
    data
  }).then(user => {
    const msg = {
      to: data.email, // Change to your recipient
      from: 'harrisidzwan@gmail.com', // Change to your verified sender
      subject: 'Registration Successful',
      text: 'Thank you for signing up with NEXT EComm. You may start posting your item listings on the website.',
      html: '<strong>Thank you for signing up with NEXT EComm. You may start posting your item listings on the website.</strong>',
    }
    
    sgMail
      .send(msg)
      .then((response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
      })
      .catch((error) => {
        console.error(error)
      })
    return res.json(filter(user, 'id', 'name', 'email'))

  }).catch(err => {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      const formattedError = {}
      formattedError[`${err.meta.target[0]}`] = 'already taken'

      return res.status(500).send({
        error: formattedError
      })
    }
    throw err
  })
});

router.get('/', async (req,res) =>{
  const allUsers = await prisma.user.findMany()
  res.json(allUsers)
})

// To do: Create a new user endpoint that allows to delete user from user table

router.delete('/', async (req, res) => {
    const { id } = req.body
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(id)
      },
    });
    res.json(deletedUser)
  })

export default router