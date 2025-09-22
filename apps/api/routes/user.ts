import { Router, type Request, type Response } from "express";
import { AuthInput } from "../types";
import { prismaClient } from "@packages/store/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router()

const salt_round = 5;

router.post("/signup", async(req: Request, res: Response) => {
    const userData = AuthInput.safeParse(req.body);
    if(!userData.success) {
        res.status(403).send("");
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(userData.data.password, salt_round);

        let user = await prismaClient.user.create({
            data: {
                username: userData.data.username,
                password: hashedPassword
            }
        })
        res.json({
            message: "Signup Succeeded",
            id: user.id
        })
    } catch (e) {
        res.status(403).send("")
    }
    
});

router.post("/signin", async(req: Request, res: Response) => {
    const userData = AuthInput.safeParse(req.body);
    if(!userData.success) {
        res.status(403).send("");
        return;
    }

    try{
        let user = await prismaClient.user.findFirst({
            where: {
                username: userData.data.username
            }
        })

        if(!user || !user.password) {
            res.status(403).send("Incorrect credentials")
            return;
        }
    
        const comparePassword = await bcrypt.compare(userData.data.password, user?.password)
    
        // if(user?.password !== userData.data.password) {
        //     res.status(403).send("")
        //     return;
        // }
    
        if(!comparePassword) {
            res.status(403).send("Incorrect password")
        }

        const token = jwt.sign({
            sub: user.id
        }, process.env.JWT_SECRET!)

        res.status(200).json({
            jwt: token
        })
    } catch(e) {
        res.status(403).send("Incorrect username or password")
    }
    
})

export default router