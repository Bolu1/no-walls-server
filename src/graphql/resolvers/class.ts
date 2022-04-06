const Class = require('../../Models/gc-classes')
const bcrypt = require('bcrypt')

module.exports = 

{
    class: async() =>{
        
        const c = await Class.find().populate('teacher')
        return c
    },
    getClass: async(args:any, req:any) =>{
        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }
        const c = await Class.find({members: req.userId}).populate('teacher').populate('members')
        if(!c[0]){
            throw new Error('User does not belong to any class')
        }
        return c
    },
    getOneClass: async(args:any, req:any) =>{
        try{
        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }
        const c = await Class.findOne({_id: args.id}).populate('teacher')
        const index = c.members.indexOf(req.userId)
        if(index == -1){
            throw new Error("Access denied")
        }
        if(!c){
            throw new Error('Class dosent exist')
        }
        return c
        }catch(error){
            console.log(error)
        }
    },
    createClass: async(args:any, req:any) =>{
        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }
        //class is reserved
        const pass = await bcrypt.hash(args.classInput.password, 12)
        const cl = {
            name: args.classInput.name,
            password: pass,
            profile:  args.classInput.profile || "",
            info:  args.classInput.info,
            teacher:  req.userId,
            members: [req.userId]
        }
        const c = new Class(cl)
        const res = await c.save()
        return c
    },
    joinClass: async(args:any, req:any) =>{
        try{
        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }
        const klass = await Class.findOne({_id: args.id})
        if(!klass){
            throw new Error('Class does not exist')
        }
        const valid = await bcrypt.compare(args.password, klass.password)
        if(!valid){
            throw new Error('Invalid class details')
        }
        const index = klass.members.indexOf(req.userId)
        if(index == -1){
            
        const members = klass.members
        members.push(req.userId)
        await Class.updateOne({_id: args.id},
                                {$set:{
                                    members: members
                                }})
        }
        return klass
        }catch(error){
            console.log(error)
        }
    }
}