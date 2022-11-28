"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Class = require('../../Models/gc-classes');
const bcrypt = require('bcrypt');
module.exports =
    {
        class: () => __awaiter(void 0, void 0, void 0, function* () {
            const c = yield Class.find().populate('teacher');
            return c;
        }),
        getClass: (args, req) => __awaiter(void 0, void 0, void 0, function* () {
            if (!req.isAuth) {
                throw new Error('Unauthenticated');
            }
            const c = yield Class.find({ members: req.userId }).populate('teacher').populate('members');
            if (!c[0]) {
                throw new Error('User does not belong to any class');
            }
            console.log(c[0].createdAt);
            return c;
        }),
        getOneClass: (args, req) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!req.isAuth) {
                    throw new Error('Unauthenticated');
                }
                const c = yield Class.findOne({ _id: args.id }).populate('teacher').populate('members');
                var valid = false;
                c.members.map((m) => {
                    if (m._id == req.userId) {
                        return valid = true;
                    }
                });
                // const index = c.members._id.indexOf(req.userId)
                if (!valid) {
                    throw new Error("Access denied");
                }
                if (!c) {
                    throw new Error('Class dosent exist');
                }
                return c;
            }
            catch (error) {
                console.log(error);
            }
        }),
        createClass: (args, req) => __awaiter(void 0, void 0, void 0, function* () {
            // let a = []
            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            // const a =data.map(d =>{  
            var date = new Date();
            // Hours part from the timestamp
            var hours = date.getMonth();
            // Minutes part from the timestamp
            var day = date.getDate();
            // Seconds part from the timestamp
            var year = date.getFullYear();
            //mi9nths
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            // Will display time in 10:30:23 format
            var formattedDate = day + ' ' + months[hours] + '';
            console.log(JSON.stringify(formattedDate));
            // console.log(formattedTime);
            const ca = JSON.stringify(formattedDate);
            // })
            if (!req.isAuth) {
                throw new Error('Unauthenticated');
            }
            //class is reserved
            const pass = yield bcrypt.hash(args.classInput.password, 12);
            const cl = {
                name: args.classInput.name,
                password: pass,
                profile: args.classInput.profile || "",
                info: args.classInput.info,
                createdAt: ca,
                teacher: req.userId,
                members: [req.userId]
            };
            const c = new Class(cl);
            const res = yield c.save();
            return c;
        }),
        joinClass: (args, req) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!req.isAuth) {
                    throw new Error('Unauthenticated');
                }
                const klass = yield Class.findOne({ _id: args.id });
                if (!klass) {
                    throw new Error('Class does not exist');
                }
                const valid = yield bcrypt.compare(args.password, klass.password);
                if (!valid) {
                    throw new Error('Invalid class details');
                }
                const index = klass.members.indexOf(req.userId);
                if (index == -1) {
                    const members = klass.members;
                    members.push(req.userId);
                    yield Class.updateOne({ _id: args.id }, { $set: {
                            members: members
                        } });
                }
                return klass;
            }
            catch (error) {
                console.log(error);
            }
        })
    };
