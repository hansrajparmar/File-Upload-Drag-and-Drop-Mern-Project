var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://mohit123:mohit123@mohit.tjed4.mongodb.net/?retryWrites=true&w=majority"
);

const fileScheema = new mongoose.Schema({
  image: {
    public_id: {
      type: String,
      required: true,
    },
    name: {
        type: String,
        required: true,
      },
      format: {
        type: String,
        required: true,
      },
    url: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("file", fileScheema);
