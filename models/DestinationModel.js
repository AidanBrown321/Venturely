import mongoose from "mongoose";
import { DESTINATION_STATUS, DESTINATION_TYPE } from "../utils/constants.js";

const DestinationSchema = new mongoose.Schema(
  {
    name: String,
    country: String,
    admin1: String,
    lat: String,
    lon: String,
    destinationStatus: {
      type: String,
      enum: Object.values(DESTINATION_STATUS),
      default: DESTINATION_STATUS.WANT,
    },
    destinationType: {
      type: String,
      enum: Object.values(DESTINATION_TYPE),
      default: DESTINATION_TYPE.RESORT,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Destination", DestinationSchema);
