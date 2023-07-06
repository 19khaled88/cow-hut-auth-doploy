import { RequestHandler } from "express";
import { CowsService } from "./cows.services";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constnts/pagination";

const createCowController: RequestHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const result = await CowsService.createCowsService(body);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "New cow created",
      data: result,
    });
  } catch (error) {
    // res.status(400).json({
    //   error:error
    // });
    // console.log(error)
    next(error);
  }
};

const getAllCowController: RequestHandler = async (req, res, next) => {
  try {
    const paginationOption = pick(req.query, paginationFields);
    const cows = await CowsService.getCowService(paginationOption);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cows found",
      data: cows,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleCowController: RequestHandler = async (req, res, next) => {
  try {
    const cow = await CowsService.getSingleCowService(req.params.id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cow found",
      data: cow,
    });
  } catch (error) {
    next(error);
  }
};

const updateCowrController: RequestHandler = async (req, res, next) => {
  try {
    const cow = await CowsService.updateCowService(
      req.params.id,
      req.body,
      req.user?.id
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "cow upadated successfully",
      data: "cow",
    });
  } catch (error) {
    next(error);
  }
};

const deleteCowController: RequestHandler = async (req, res, next) => {
  try {
    const cow = await CowsService.deleteCowService(req.params.id, req.user?.id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cow deleted successfully",
      data: cow,
    });
  } catch (error) {
    next(error);
  }
};

export const CowController = {
  createCowController,
  getAllCowController,
  getSingleCowController,
  updateCowrController,
  deleteCowController,
};
