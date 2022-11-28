"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const postSchema = new Schema({
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Classgc',
    },
    assignmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Assignmentgc',
    },
    createdAt: { type: String },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usergc',
        required: true
    },
    post: {
        type: String,
        required: true
    },
    media: {
        type: String
    }
});
module.exports = mongoose_1.default.model('Posts', postSchema);
