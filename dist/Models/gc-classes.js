"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// const Schema = mongoose.schema
const classSchemagc = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type: String },
    createdAt: { type: String },
    info: { type: String },
    teacher: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Usergc' },
    members: { type: [String], ref: 'Usergc' },
});
module.exports = mongoose_1.default.model("Classgc", classSchemagc);
