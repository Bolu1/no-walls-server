"use strict";
// const axios = require('axios')
// const {
//     GraphQLObjectType,
//     GraphQLString,
//     GraphQLInt,
//     GraphQLID,
//     GraphQLSchema,
//     GraphQLList,
//     GraphQLNonNull
// } = require ('graphql')
// const { argsToArgsConfig } = require  ('graphql/type/definition')
// const jwt = require('jsonwebtoken')
// const Users = require('../Models/gc-users')
// const Classes = require('../Models/gc-classes')
// const bcrypt = require('bcrypt')
// // User Type
// const UserType = new GraphQLObjectType({
//     name: 'User',
//     fields:() =>({
//         id: {type:GraphQLID},
//         name: {type:GraphQLString},
//         email: {type:GraphQLString},
//         password: {type:GraphQLString}
//     })
// })
// // class type
// const ClassType = new GraphQLObjectType({
//     name: 'Class',
//     fields:() =>({
//         id: {type:GraphQLID},
//         name: {type:GraphQLString},
//         password: {type:GraphQLString},
//         profile: {type:GraphQLString},
//         info: {type:GraphQLString},
//         teacher: {
//             type: UserType,
//             resolve(parent:any, args:any){
//             }
//         },
//         members:{
//             type: new GraphQLList(UserType),
//         resolve(parent:any, args:any){
//         }
//     }
//     })
// })
// // Root Query
// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields:{
//         user:{
//             type:UserType,
//             args:{
//                 id:{type:GraphQLString}
//             },
//             resolve(parentValue:any, args:any){
//             }
//         },
//         class:{
//             type:ClassType,
//             args: {id: {type: GraphQLID}},
//             resolve(parents:any, args:any){
//             }
//         },
//         classes:{
//             type:new GraphQLList(ClassType),
//             args: {id: {type: GraphQLID}},
//             resolve(parent:any, args:any){
//             }
//         },
//         users:{
//             type: new GraphQLList(UserType),
//             args: {id: {type: GraphQLID}},
//             resolve(parents:any, args:any){
//             }
//         },
//         signin:{
//             type: UserType,
//             args: {
//                 email: {type: GraphQLString},
//                 password: {type: GraphQLString},
//                 confirmPassword: {type: GraphQLString}
//             },
//             resolve: async(parent:any, args:any) =>{
//                 var response
//                 if(args.password != args.confirmPassword){
//                     return "passwords don't match"
//                 }else{
//                     const user = await Users.findOne({ email: args.email })
//                     if (user && bcrypt.compareSync(args.password, user.password)) {
//                     const token = jwt.sign({
//                             email: args.email,
//                             id: user._id
//                            }, 'Balss', {
//                                expiresIn: "30d"
//                            })
//                     response = {
//                     token: token,
//                     id: user._id,
//                     name: user.name,
//                     email: user.email,
//                     }
//                     } else {
//                     return "invalid login params"
//                     }
//                 }
//                 return response
//             }
//         }
//     }
// })
// const Mutation = new GraphQLObjectType({
//     name:'Mutation',
//     fields:{
//         signup:{
//             type:UserType,
//             args: {
//                 email: {type: GraphQLString},
//                 password: {type: GraphQLString},
//                 name: {type: GraphQLString},
//             },
//             resolve: async(parent:any, args:any) =>{
//                     var createdUser
//                     try{
//                     const pas = bcrypt.hashSync(args.password, 10)                  
//                     const data = await Users.findOne({ email: args.email })
//                     if(data == 23){
//                         console.log(data, " m")
//                         createdUser = "This email is already in use"
//                         return "This email is already in use"
//                         // res.status(406).send("This email is already in use")
//                     }else{
//                     const user = new Users({name: args.name, 
//                                             email: args.email,
//                                             password: pas
//                     })
//                     createdUser = await user.save()
//                     console.log(createdUser, " cc")
//                     return createdUser
//                 }}catch(error){
//                     console.log(error)
//                 }
//             console.log(createdUser, ' ip')
//             return createdUser
//             }
//         },
//     }
// }
// )
// module.exports = new GraphQLSchema({
//     query: RootQuery,
//     mutation: Mutation
// })
