import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodEffects } from "zod";

const validationRequest =
	(schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { user } = req.body;

			await schema.parseAsync({
				body: user ? user : req.body,
				query: req.query,
				params: req.params,
				cookies: req.cookies,
			});

			next();
		} catch (error) {
			next(error);
		}
	};

export default validationRequest;
