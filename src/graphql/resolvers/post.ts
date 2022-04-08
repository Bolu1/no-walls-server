const Post = require('../../Models/gc-posts')

module.exports = 

{
    posts: async (args:any, req:any)=>{
        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }
        try{
            const PAGE_SIZE = 20
            const page = args.page || 1
            const res = await Post.find({classId:args.id}).populate('user').sort({_id: -1}).limit(PAGE_SIZE* page)
            return res
        }catch(error){
            console.log(error)
        }
    },
    getSubmission: async(args:any, req:any)=>{
        try{  
            const PAGE_SIZE = 20
            const page = args.page || 1
            if(!req.isAuth){
                throw new Error('Unauthenticated')
            }
            const res = await Post.find({assignmentId:args.id}).populate('assignmentId').populate('user').limit(PAGE_SIZE* page)
            if(!res[0]){
                throw new Error("No submissions yet")
            }
            if(res[0].assignmentId.user != req.userId){
                throw new Error("Unauthorized")
            }
            return res
        }catch(error){
            console.log(error)
        }
    },
    createPost: async (args:any, req:any) =>{
        try{
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
              console.log(JSON.stringify(formattedDate))
              // console.log(formattedTime);
              const ca =  JSON.stringify(formattedDate)
            // })
            const p = {
                classId: args.id,
                assignmentId: args.id1,
                user: req.userId, 
                createdAt: ca,
                post: args.post,
                media: args.media,
            }
            const post = new Post(p)
            const pp = await post.save()
            return pp
        }catch(error){
            console.log(error)
        }
    }catch(error){
        console.log(error)
    }
    }
}