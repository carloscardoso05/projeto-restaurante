import mongoose from "mongoose";

mongoose.connect(
  "mongodb://127.0.0.1:27017/restaurant_db"
);

const db = mongoose.connection;

export default db;
