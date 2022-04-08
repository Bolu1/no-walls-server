import mongoose from 'mongoose'

const Schema = mongoose.Schema

const assignmentSchema = new Schema({
    classId:{
        type: Schema.Types.ObjectId,
        ref: 'Classgc',
        required: true
    },
    dueDate: {type:String},
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
    },
    submission:{
        type: [String],
        ref: 'Posts'

    }

})

module.exports = mongoose.model('Assignmentgc', assignmentSchema)