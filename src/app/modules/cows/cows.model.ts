import { model, Schema } from "mongoose";
import {
  breed,
  category,
  label,
  location,
} from "../../../constnts/cows.constants";
import { CowModel, ICow } from "./cows.interface";

const cowSchema = new Schema<ICow, CowModel>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      enum: location,
    },
    breed: {
      type: String,
      required: true,
      enum: breed,
    },
    weight: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: label,
    },
    category: {
      type: String,
      required: true,
      enum: category,
    },
    seller: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Cow = model<ICow, CowModel>("Cow", cowSchema);
