import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export default class middleware {

    //Token authentication
    async auth(req: any, res: any, next:NextFunction) {
        try {
            // console.log('auth is running')
            const tokenString = req.headers.authorization

            let token = tokenString.replace('Bearer ', "")

            let secretKey: any = process.env.SECRET_KEY

            const verifyUser: any = jwt.verify(token, secretKey)
            console.log(verifyUser);
            if (!verifyUser) {
                req.userId = verifyUser._id;
                return res.status(401).send({ message: "User Unauthorized" })

            } else {

                next();
            }
        } catch (error) {
            return res.status(401).send({ message: "User Unauthorized" })


        }
    }


}