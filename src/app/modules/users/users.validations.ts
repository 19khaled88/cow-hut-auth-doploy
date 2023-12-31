import { z } from "zod";

const loginZodSchema = z.object({
	body: z.object({
		phoneNumber: z.string({
			required_error: "phone number is required",
		}),
		password: z.string({
			required_error: "password is required",
		}),
	}),
});

const refreshTokenZodSchema = z.object({
	cookies: z.object({
		refreshToken: z.string({
			required_error: "Rrefresh token is required",
		}),
	}),
});

export const AuthZodValidation = {
	loginZodSchema,
	refreshTokenZodSchema,
};
