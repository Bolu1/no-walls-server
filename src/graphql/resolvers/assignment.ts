const Assignment = require('../../Models/gc-assignments')
const Classa = require('../../Models/gc-classes')

module.exports = 

{
    assignments: async(args:any, req:any)=>{
        try{
        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }
        const res = await Assignment.find({classId: args.id}).sort({_id: -1})
        return res
        }catch(error){
            console.log(error)
        }
    },
    createAssignment: async(args:any, req:any) =>{
        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }
        try{  
            
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
                const ca =  JSON.stringify(formattedDate)

                
                const klass = await Classa.findOne({classId:args.id})
                if(klass.teacher != req.userId){
                    throw new Error("Unauthorized")
                }
                const a = {
                    classId: args.id,
                    dueDate: args.dueDate,
                    createdAt: ca,
                    user: req.userId,
                    post: args.post,
                    media: args.media
                }
                const assignment = new Assignment(a)
                const aa = await assignment.save()
                return aa


        }catch(error){
            console.log(error)
        }
    }
}