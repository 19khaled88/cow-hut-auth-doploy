import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
	env: process.env.NODE_ENV,
	port: process.env.PORT,
	databasr_url: process.env.DB_URL,
	user_pass: process.env.USER_PASS,
	hash_pass_salt_round: process.env.SALT_ROUND,
	accessToken : process.env.JWT_SECRET,
	accessTokenExpire : process.env.JWT_EXPIRE_IN,
	refreshTokenExpire : process.env.JWT_REFRESH_EXPIRE_IN,
	refreshToken :process.env.JWT_REFRESH_SECRET,
};
