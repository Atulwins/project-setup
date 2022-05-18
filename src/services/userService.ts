import { any } from "joi";
import { FilterQuery } from "mongoose";
import userModel from "../model/userModel";
export default class service {
    static loginByEmail(arg0: { email: any; }): any {
        throw new Error('Method not implemented.');
    }
    static updateById(id: string, body: any) {
        throw new Error('Method not implemented.');
    }
// create user

    async createUser(userInput: any) {
        let user
        try {
            user = new userModel(userInput);
            console.log(user)
            return user;
        }
        catch (error) {
            return error;
        }
    }
    // delete by id

    async deleteById(userId: any) {
        let user;
        try {
            user = await userModel.findByIdAndDelete(userId).lean()

                return user
                
            }               
            
        catch (error) {
            console.log(error)
        }
        return user;
    }


    // 
    async getAllUser () {
        let user;
        try {
            user = await userModel.find({}).lean()

        } catch (error) {
            console.log(error)
        }
        return user;
    }

    // update user
    
    async updateById (Id:any,data:any) {
        let user;
        try {
            user = await userModel.findByIdAndUpdate(Id,data)
            return user

        } catch (error) {
            console.log(error)
            return error;
        }
        
    }


    // login by mail
    async getUserByAttributes(attributes:any) {
        let user;
        try {
            user = await userModel.findOne({attributes})
        } catch (error) {
            console.log(error)
        }
        return user;
    }


}