var PastSprintModel = require("../models/past-sprint.model");

exports.deleteData = async function(userId) {
  try {
    const deleted = await PastSprintModel.deleteMany(
      {
        user: userId
      },
      err => {
        if (err) {
          console.log("Delete data: service error");
          console.log(err);
        }
      }
    );
    console.log("Delete data: " + deleted.result.n + " past sprints deleted");
    return deleted.result.n;
  } catch (e) {
    console.log("Delete data: past sprints could not be deleted");
    console.log(e);
  }
};
