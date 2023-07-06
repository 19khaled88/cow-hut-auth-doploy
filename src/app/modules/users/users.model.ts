import { model, Schema } from "mongoose";
import { role } from "../../../constnts/users.constants";
import { IUser, UserModel } from "./users.interface";
import bcrypt from "bcrypt";
import config from "../../../config";
const userSchema = new Schema<IUser, UserModel>(
  {
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: role,
      default: "User",
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    budget:{
      type:Number,
      default:0
    },
    income:{
      type:Number,
      default:0
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  //hasing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.hash_pass_salt_round)
  );
  next();
});

// userSchema.methods.toJSON = function () {
// 	const userObject = this.toObject();
// 	delete userObject.password;
// 	return userObject;
// };

export const User = model<IUser, UserModel>("User", userSchema);
