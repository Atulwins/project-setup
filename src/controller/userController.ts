import joi, { any } from 'joi';
import e, { Request, Response } from 'express';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import service from '../services/userService';

const Services = new service();

export default class userController {
    // create new users
    async newUser(req: Request, res: Response) {

        try {
            //validation
            const schema = joi.object({
                name: joi.string().required(),
                age: joi.number().required(),
                tech: joi.string().required(),
                email: joi.string().required(),
                password: joi.string().required()
            });
            const params = schema.validate(req.body, { abortEarly: false });
            if (params.error) {
                res.status(400).send({ msg: params.error.message })
            }

            // console.log('params', params)
            let userInput = {
                name: params.value.name,
                age: params.value.age,
                tech: params.value.tech,
                email: params.value.email,
                password: params.value.password,
            }
            userInput.password = await bcrypt.hash(userInput.password, 10)
            let user;
            try {
                user = await Services.createUser(userInput);
                user.save()
                return res.status(200).send({ message: "user created", id: user._id })

            } catch (error) {
                console.log(error);
                return res.status(400).send({ message: "user not created" })
            }
            if (!user) {
                return res.status(400).send({ message: "user not created" })
            }

        }

        catch (e) {
            console.log(e)
        }
    }
    // //get all user data

    async allUser(req: Request, res: Response) {
        let user;
        try {
            user = await Services.getAllUser()
            return res.status(200).send({ message: 'user', user })
        } catch {
            //return invalid credential
            return res.status(400).send({ message: 'invaild credential' })
        }
    }
    // //delete user by id...

    async deleteUser(req: Request, res: Response) {
        const id = req.params.id
        let user;
        try {
            user = await Services.deleteById(id)
            // console.log(user)
            return res.status(200).send({ message: 'user deleted' })
        } catch (error) {
            return res.status(400).send({ message: 'user not found' })
        }
    }
    // //update by id...

    async updateUserData(req: Request, res: Response) {
        let Id = req.params.id
        let data: any = req.body
        try {
            const updateUser = await Services.updateById(Id, data);
            if (updateUser === null) {
                return res.status(304).send({ message: 'not modified' })
            }
            else {
                return res.status(200).send({ message: " updated", updateUser })
            }
        } catch (error) {
            return res.status(404).send({ message: 'user not found' })
        }
    }
    // login by email
    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        let user;
        try {
            user = await Services.getUserByAttributes({ email})
            if (user) {

                const isValidPassword = await bcrypt.compare(password, user.password)

                if (isValidPassword) {
                    //generate token
                    let secretKey: any = process.env.SECRET_KEY;
                    var token = jwt.sign({ _id:"62833f0268e319d2362b5259" }, secretKey);
                    return res.status(200).send({ message: 'Login Successful',token})
                } else {
                    //return invalid credential
                    return res.status(400).send({ message: 'invalid credential' })
                }
            } else {
                //return invalid credentia
                return res.status(400).send({ message: 'invalid credential' })
            }
        } catch (error) {
            return res.status(400).send({ message: 'invalid credential' })

        }
    }

}