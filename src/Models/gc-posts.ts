import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = new Schema({
    classId:{
        type: Schema.Types.ObjectId,
        ref: 'Classgc',
        required: true
    },
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

},{
    timestamps: true
})

module.exports = mongoose.model('Posts', postSchema)