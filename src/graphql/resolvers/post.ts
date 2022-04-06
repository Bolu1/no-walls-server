const Post = require('../../Models/gc-posts')

module.exports = 

{
    posts: async (args:any, req:any)=>{
        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }
        try{
            const PAGE_SIZE = 2
            const page = args.page || 1
            const res = await Post.find({classId:args.id}).populate('user').sort({_id: -1}).limit(PAGE_SIZE* page)
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
            const p = {
                classId: args.id,
                user: req.userId, 
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