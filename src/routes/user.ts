import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signupInput,signinInput } from "../zod";
import z from'zod';



export const userRouter=new Hono<{
    Bindings:{
         DATABASE_URL:string;
         JWT_SECRET:string;
    }
}>();
