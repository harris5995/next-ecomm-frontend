import express from 'express'
import { Prisma } from "@prisma/client"
import prisma from "../utils/prisma.js"
import { validateItem } from '../validators/items.js'
import { filter } from "../utils/common.js"
const router = express.Router()

//Creates a new item listing on the Items table
router.post('/', async (req, res) => {
    const data = req.body
    console.log(data)
    const validationErrors = validateItem(data)

    if (Object.keys(validationErrors).length != 0) return res.status(400).send({
        error: validationErrors
      })

      prisma.item.create({
        data
      }).then(item => {
        return res.json(filter(item, 'item_id', 'user', 'user_id', 'title', 'description', 'price'))

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
        const allItems = await prisma.item.findMany()
        res.json(allItems)
      })

    export default router


    