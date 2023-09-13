import express from 'express'
import { Prisma } from "@prisma/client"
import prisma from "../utils/prisma.js"
import { validateImages } from '../validators/images.js'
import { filter } from "../utils/common.js"
import auth from "../middlewares/auth.js"
import { verifyAccessToken } from '../utils/jwt.js'
const router = express.Router()

router.post("/", auth, async (req, res) => {
  // const databody = req.body;
  // const dataID = req.user.payload.id;
  // const data = { ...databody, user_id: dataID }; 
  const data = req.body
  const validationErrors = validateImages(data)

  const price = parseInt(req.body.price, 10);
  console.log(req)
    if (Object.keys(validationErrors).length != 0) return res.status(400).send({
        error: validationErrors
      })

  // prisma.image.create({
  //   data: {
  //     ...data,
  //     price: price 
  //   }
  // })
  // .then(item => {
  //   console.log(item)
  //   return res.json(item)
  prisma.image.create({
    data: {
      ...data,
      user_id: req.user.payload.id,
      price: price
    }
  }).then(image => {
    console.log(req.body.id)
    console.log(req.user.payload.id)
    console.log(image);
    return res.json(image);
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
})

router.get('/', async (req,res) =>{
  const allImages = await prisma.image.findMany()
  res.json(allImages)
      })

router.get('/:id', async (req,res) =>{
  const { id } = req.params
  console.log(id)
  const Images = await prisma.image.findUnique({
            where: {
            id: Number(id)
           }
          })
        res.json(Images)
      })

router.delete('/:id', auth, async (req, res) => {
  const id  = req.body.id;
  console.log(typeof id)

  try {
    const image = await prisma.image.findUnique({
      where: {
        id: parseInt(id),
      }
    });

    if (!image) {
      return res.status(404).send({ 'error': 'Image not found' });
    }

      if (req.user.payload.id != image.user_id) {
    return res.status(401).send({ error: 'Unauthorized' })
  }

    await prisma.image.delete({
      where: {
        id: parseInt(req.body.id)
      }
    })
    .then((image) => {
      return res.json(image)
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send({ 'error': 'Internal Server Error' });
  }
});
          

export default router


    