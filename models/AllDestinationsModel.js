import mongoose from "mongoose";

const AllDestinationsSchema = new mongoose.Schema({
  name: String,
  country: String,
  countryCode: String,
  admin1: String,
  lat: String,
  lon: String,
});

export default mongoose.model("AllDestinations", AllDestinationsSchema);
