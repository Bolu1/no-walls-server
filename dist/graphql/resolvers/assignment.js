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
const Assignment = require('../../Models/gc-assignments');
const Classa = require('../../Models/gc-classes');
module.exports =
    {
        assignments: (args, req) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!req.isAuth) {
                    throw new Error('Unauthenticated');
                }
                const res = yield Assignment.find({ classId: args.id }).sort({ _id: -1 });
                return res;
            }
            catch (error) {
                console.log(error);
            }
        }),
        createAssignment: (args, req) => __awaiter(void 0, void 0, void 0, function* () {
            if (!req.isAuth) {
                throw new Error('Unauthenticated');
            }
            try {
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
                // console.log(formattedTime);
                const ca = JSON.stringify(formattedDate);
                const klass = yield Classa.findOne({ classId: args.id });
                if (klass.teacher != req.userId) {
                    throw new Error("Unauthorized");
                }
                const a = {
                    classId: args.id,
                    dueDate: args.dueDate,
                    createdAt: ca,
                    user: req.userId,
                    post: args.post,
                    media: args.media
                };
                const assignment = new Assignment(a);
                const aa = yield assignment.save();
                return aa;
            }
            catch (error) {
                console.log(error);
            }
        })
    };
