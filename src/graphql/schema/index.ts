
const {buildSchema} = require('graphql')

module.exports = buildSchema( 
 `
 type User{
     _id: ID!
     email: String!
     password: String!
     profile: String
     name: String!
     date: String!
     classes: [String!]
     createdAt: String!
     updatedAt: String!
 }

 type Post{
     _id: ID!
     classId: Class
     user: User
     post: String!
     media: String
     createdAt: String!
     updatedAt: String!
 }

 type Class{
     _id: ID! 
     name: String!
     profile: String
     info: String
     teacher: User
     memebers: [User]
     createdAt: String!
     updatedAt: String!

 }

 type AuthData{
     userId: ID!
     token: String!
     email: String!
     name: String!
     profile: String
 }

 input UserInput{
     email: String!
     password: String!
     name: String!
 }

 input ClassInput{
     name: String!
     password: String!
     profile: String
     info: String
     teacher: String
     memebers: String
 } 

 input PostInput{
     post: String!
     media: String!
 }

 type RootQuery{
     users: [User!]!
     class: [Class!]!
     getClass: [Class]
     getOneClass(id:ID!):Class
     posts(id: ID!, page:Int): [Post]!
     login(email:String!, password: String!): AuthData!
 }

 type RootMutation{
     createUser(userInput: UserInput): User 
     createClass(classInput: ClassInput): Class
     createPost(post: String! media: String id: ID!): Post
     joinClass(id: ID!, password: String!): Class
     editUser(name:String!, password:String!, newPassword:String, profile:String): User
 }

 schema{
     query: RootQuery
     mutation: RootMutation
 }
 `)