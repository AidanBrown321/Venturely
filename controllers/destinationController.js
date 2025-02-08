import Destination from "../models/DestinationModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

export const getAllDestinations = async (req, res) => {
  const { search, destinationStatus, destinationType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  if (destinationStatus && destinationStatus !== "all") {
    queryObject.destinationStatus = destinationStatus;
  }

  if (destinationType && destinationType !== "all") {
    queryObject.destinationType = destinationType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // Setup pagination

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const destinations = await Destination.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalDestinations = await Destination.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalDestinations / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalDestinations, numOfPages, currentPage: page, destinations });
};

export const createDestination = async (req, res) => {
  req.body.createdBy = req.user.userId;
  req.body.admin1 = "idaho";
  req.body.lat = "100";
  req.body.lon = "200";
  const destination = await Destination.create(req.body);
  res.status(StatusCodes.CREATED).json({ destination });
};

export const getDestination = async (req, res) => {
  const destination = await Destination.findById(req.params.id);
  res.status(StatusCodes.OK).json({ destination });
};

export const updateDestination = async (req, res) => {
  const updatedDestination = await Destination.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: "destination modified", destination: updatedDestination });
};

export const deleteDestination = async (req, res) => {
  const removedDestination = await Destination.findByIdAndDelete(req.params.id);

  res
    .status(StatusCodes.OK)
    .json({ msg: "destination deleted", destination: removedDestination });
};

export const showStats = async (req, res) => {
  let stats = await Destination.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$destinationStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    visited: stats.yes || 0,
    want: stats.no || 0,
  };

  let monthlyApplications = await Destination.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
