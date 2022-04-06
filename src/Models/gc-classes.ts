import mongoose, {Document} from 'mongoose'
// const Schema = mongoose.schema


const classSchemagc = new mongoose.Schema({
    name: {type:String, required: true},
    password: {type:String, required: true},
    profile: {type:String},
    info: {type:String},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'Usergc'},
    members: {type:[String], ref: 'Usergc'},
    
},{
    timestamps: true
})

module.exports = mongoose.model("Classgc", classSchemagc)
