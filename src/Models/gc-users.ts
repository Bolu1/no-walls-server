import mongoose, {Document} from 'mongoose'
// const Schema = mongoose.schema

const userSchemagc = new mongoose.Schema({
    email: {type:String, required: true, unique: true},
    name: {type:String, required: true},
    password: {type:String, required: true},
    profile: {type:String}
    
},{
    timestamps: true
})

module.exports = mongoose.model("Usergc", userSchemagc)
