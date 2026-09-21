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
    status: {
      type: String,
      required: true,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: `{VALUE} is incorrect status`,
      },
    },
  },
  { timestamps: true },
);

connectionRequestSchema.pre("save", function(){
  const connectRequest = this;
if (connectRequest.toUserId.equals(connectRequest.fromUserId)) {
  throw new Error("user cannot send request to themselves");
}

})

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);

module.exports = ConnectionRequestModel;
