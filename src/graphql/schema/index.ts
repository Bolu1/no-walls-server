
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
     assignmentId: Assignment
     user: User
     post: String!
     media: String
     createdAt: String!
     updatedAt: String!
 }

 type Assignment{
    _id: ID!
    classId: Class
    user: User
    post: String
    media: String
    submission: Post
    dueDate: String
    createdAt: String!
}

 type Class{
     _id: ID! 
     name: String!
     profile: String
     info: String
     teacher: User
     members: [User]
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
     assignments(id: ID!): [Assignment]
     class: [Class!]!
     getClass: [Class]
     getOneClass(id:ID!):Class
     getSubmission(id: ID!, page:Int): [Post]
     posts(id: ID!, page:Int): [Post]!
     login(email:String!, password: String!): AuthData!
 }

 type RootMutation{
     createUser(userInput: UserInput): User 
     createAssignment(id:ID! dueDate:String post:String media:String ):Assignment
     createClass(classInput: ClassInput): Class
     createPost(post: String! media: String id: ID id1:ID): Post
     joinClass(id: ID!, password: String!): Class
     editUser(name:String!, password:String!, newPassword:String, profile:String): User
 }

 schema{
     query: RootQuery
     mutation: RootMutation
 }
 `)