import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = new Schema({
    classId:{
        type: Schema.Types.ObjectId,
        ref: 'Classgc',
    },
    assignmentId:{
        type: Schema.Types.ObjectId,
        ref: 'Assignmentgc',
    },
    createdAt: {type:String},
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usergc',
        required: true
    },
    post:{
        type: String,
        required: true
    },
    media:{
        type: String
    }

})

module.exports = mongoose.model('Posts', postSchema)