import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../app/modules/users/users.model";
import { Cow } from "../app/modules/cows/cows.model";
import { number } from "zod";

const checkEligibleOrder = () => async (req:Request, res:Response, next:NextFunction) => {
	try {
		
		const isBuyerEligible = await User.findById(req.body.buyer);
		const isCowAvailable = await Cow.findById(req.body.cow);
        req.body.balance = isBuyerEligible?.budget 
        req.body.price = isCowAvailable?.price
		if (isBuyerEligible && isCowAvailable && isBuyerEligible?.budget >= isCowAvailable?.price && isBuyerEligible?.role === 'Buyer') {
            const balance = isBuyerEligible?.budget
            const price = isCowAvailable?.price
			next();
		}else{
            throw new Error("You do not have enough fund or not valid buyer");
        }

	} catch (error) {
		
        next(error)
	}
};

export default checkEligibleOrder;
