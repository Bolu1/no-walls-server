const express = require ('express')
const expressGraphQL = require ('express-graphql').graphqlHTTP
const {buildSchema} = require('graphql')
import colors from 'colors'
const mongoose = require('mongoose')
const app =  express()
const morgan = require('morgan')
const isAuth = require('./middleware/isAuth')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 5000

//graphql imports  
const GraphQLSchema = require('./graphql/schema/index')
const GraphQLResolvers = require('./graphql/resolvers/index')

const CONNECTION_URL  = 'mongodb+srv://user_0:user_0@cluster0.llrik.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// const CONNECTION_URL = 'mongodb://localhost:27017/nowalls'
mongoose.connect(CONNECTION_URL, ()=>{
    console.log(colors.rainbow("DB connected"))
})

// app.use((req:any,res:any,next:any) =>{
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Origin', 'POST, GET, OPTIONS')
//     res.setHeader('Access-Control-Allow-Origin', 'Content-Type, Authorization')
//     if(req.method === 'OPTIONS'){
//         return res.sendStatus(200)
//     }
//     next()
// })
app.use(cors())

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

app.use(isAuth)

app.use(morgan('dev'))
app.use('/graphql', expressGraphQL({
    schema: GraphQLSchema,
    rootValue: GraphQLResolvers,
    graphiql: true
}))

app.get('/', (req:any,res:any)=>{
    res.send("welcome")
})

app.listen(PORT, ()=>{
    console.log(colors.random(`Server is running on https://localhost:${PORT}`))
}) 