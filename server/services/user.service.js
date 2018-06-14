var PastSprintModel = require("../models/past-sprint.model");

//log management
var graylog2 = require("graylog2");
var logger = new graylog2.graylog({
  servers: [{ host: "127.0.0.1", port: 12201 }]
});

exports.deleteData = async function(userId) {
  try {
    const deleted = await PastSprintModel.deleteMany(
      {
        user: userId
      },
      err => {
        if (err) {
          logger.log("Delete data: service error");
          logger.log(err);
        }
      }
    );
    logger.log("Delete data: " + deleted.result.n + " past sprints deleted");
    return deleted.result.n;
  } catch (e) {
    logger.log("Delete data: past sprints could not be deleted");
    logger.log(e);
  }
};
