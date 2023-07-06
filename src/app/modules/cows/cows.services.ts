import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { PaginationHelper } from "../../../helper/paginationHelper";
import { IUpdateReponse } from "../../../interfaces/common";
import { IPaginationOption } from "../../../interfaces/pagination";
import { ICow, IGenericResponse } from "./cows.interface";
import { Cow } from "./cows.model";

const createCowsService = async (payload: ICow): Promise<ICow | null> => {
  // try {
  //     const userCreated = await User.create(payload)
  //     return userCreated
  // } catch (error) {
  //     return null
  // }
  const cowCreated = await Cow.create(payload);
  if (!cowCreated) {
    throw new Error("Failed to create new cow profile");
  }
  return cowCreated;
};

const getCowService = async (
  paginationOption: IPaginationOption
): Promise<IGenericResponse<ICow[]>> => {
  const count = await Cow.countDocuments();
  const { page, limit, skip } =
    PaginationHelper.calculatePagination(paginationOption);
  const cows = await Cow.find()
    .sort()
    .skip(skip)
    .limit(limit)
    .populate("seller");
  if (!cows) {
    throw new Error("No data found");
  }
  return {
    meta: {
      page,
      limit,
      count,
    },
    data: cows,
  };
};

const getSingleCowService = async (id: string) => {
  const singleCow = await Cow.findById(id).exec();
  if (!singleCow) {
    throw new Error("Cow id is invalid");
  }
  return singleCow;
};

const updateCowService = async (
  id: string,
  payload: IUpdateReponse<ICow>,
  sellerId: string
) => {
  const isValidSeller = await Cow.findById(id);
  if (isValidSeller?.seller.toString() !== sellerId) {
    throw new ApiError(httpStatus.FORBIDDEN, "Not valid seller");
  }
  const updatedCow = await Cow.findByIdAndUpdate(id, payload, { new: true });

  if (!updatedCow) {
    throw new Error("Cow id is invalid");
  }
  return updatedCow;
};

const deleteCowService = async (id: string, sellerId: string) => {
  const isValidSeller = await Cow.findById(id);
  if (isValidSeller?.seller.toString() !== sellerId) {
    throw new ApiError(httpStatus.FORBIDDEN, "Not valid seller");
  }
  const deletedCow = await Cow.findByIdAndDelete(id);
  if (!deletedCow) {
    throw new Error("User id is invalid");
  }
  return deletedCow;
};

export const CowsService = {
  createCowsService,
  getCowService,
  getSingleCowService,
  updateCowService,
  deleteCowService,
};
