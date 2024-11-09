import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createPostInput,updatePostInput } from "../zod";

export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
    },
    Variables:{
        userId:string
    }

}>();

blogRouter.use(async(c,next)=>{
   try{ const authHeader=c.req.header("authorization")||"";
    const user=await verify(authHeader,c.env.JWT_SECRET);
    if(user){
        //@ts-ignore
        c.set("userId",user.id);
        await next()
    } 
    else{
        c.status(403);
        c.json({
            message:"you are not logged in"
        })
    }
}
    catch(e){
        c.status(403);
        c.json({
            message:"you are not logged in"
    })}
})

