const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    Status: {
      type: String,
      required: true,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: `{values} is incorrect status`,
      },
    },
  },
  { timestamps: true },
);

const ConnectionRequestModel = new mongoose.Model(
  "ConnectionRequest",
  connectionRequestSchema,
);
