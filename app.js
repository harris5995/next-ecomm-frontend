import express from "express"
import userRouter from "./src/controllers/users.controllers.js"
import authRouter from "./src/controllers/auth.controllers.js"
import imagesRouter from "./src/controllers/images.controllers.js"
import auth from "./src/middlewares/auth.js" 
import cors from "cors"
import morgan from "morgan"


const app = express()
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());

app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/images', imagesRouter)



app.get('/protected', auth, (req, res) => {
    res.json({ "hello": "world" })})

export default app



// import express from "express"
// import prisma from "./src/utils/prisma.js"
// import { Prisma } from "@prisma/client"
// import bcrypt from "bcryptjs"
// import { signAccessToken } from "./src/utils/jwt.js"
// import { filter } from "./src/utils/common.js"
// import cors from "cors";
// import userRouter from "./src/controllers/users.controllers.js"

// const app = express()
// app.use(cors());
// app.use(express.json());
// app.use('/users', userRouter)
// app.use('/auth', authRouter)

// app.get('/', async (req, res) => {
//   const allUsers = await prisma.user.findMany()
//   res.json(allUsers)
// })



// app.post('/users', async (req, res) => {
//   const data = req.body

//   const validationErrors = validateUser(data)

//   if (Object.keys(validationErrors).length != 0) return res.status(400).send({
//     error: validationErrors
//   })

//   data.password = bcrypt.hashSync(data.password, 8);

//   prisma.user.create({
//     data
//   }).then(user => {
//     return res.json(filter(user, 'id', 'name', 'email'))

//   }).catch(err => {
//     // we have unique index on user's email field in our schema, Postgres throws an error when we try to create 2 users with the same email. here's how we catch the error and gracefully return a friendly message to the user.
//     if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
//       const formattedError = {}
//       formattedError[`${err.meta.target[0]}`] = 'already taken'

//       return res.status(500).send({
//         error: formattedError
//       })
//     }
//     throw err
//   })
// })

// //Create POST /signin endpoint that takes a user's email and password as its JSON body.
// app.post('/sign-in', async (req, res) => {
//   const data = req.body

//   const validationErrors = validateLogin(data)

//   if (Object.keys(validationErrors).length != 0) return res.status(400).send({
//     error: validationErrors
//   })

//   const user = await prisma.user.findUnique({
//     where: {
//       email: data.email
//     }
//   })

//   if (!user) return res.status(401).send({
//     error: 'Email address or password not valid'
//   })

//   const checkPassword = bcrypt.compareSync(data.password, user.password)
//   if (!checkPassword) return res.status(401).send({
//     error: 'Email address or password not valid'
//   })

//   const userFiltered = filter(user, 'id', 'name', 'email')
//   const accessToken = await signAccessToken(userFiltered)
//   return res.json({ accessToken })
// })

// export default app