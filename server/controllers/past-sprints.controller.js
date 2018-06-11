var pastSprintService = require('../services/past-sprints.service')

// const _this = this

// exports.getSprints = async function (req, res, next) {

//   var page = req.query.page ? req.query.page : 1
//   var limit = req.query.limit ? req.query.limit : 10;

//   try {
//     var todos = await pastSprintService.getSprints({}, page, limit)
//     return res.status(200).json({
//       status: 200,
//       data: todos,
//       message: "Succesfully Todos Recieved"
//     });
//   } catch (e) {
//     return res.status(400).json({
//       status: 400,
//       message: e.message
//     });
//   }
// }

exports.createPastSprint = async function (req, res, next) {
  try {
    var createdPastSprint = await pastSprintService.createPastSprint(req.body)
    return res.status(201).json({
      status: 201,
      data: createdPastSprint,
      message: 'Create past sprint: success'
    })
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'Create past sprint: failure'
    })
  }
}

exports.getPastSprints = async function (req, res, next) {
  var userId = req.body.userId

  try {
    var pastSprints = await pastSprintService.getPastSprints({
      user: userId
    })
    return res.status(200).json({
      status: 200,
      data: pastSprints,
      message: 'Past sprints: success retrieving'
    })
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    })
  }
}

// exports.updateSprint = async function (req, res, next) {

//   if (!req.body._id) {
//     return res.status(400).json({
//       status: 400,
//       message: "Id must be present"
//     })
//   }

//   var id = req.body._id;

//   var todo = {
//     id,
//     title: req.body.title ? req.body.title : null,
//     description: req.body.description ? req.body.description : null,
//     status: req.body.status ? req.body.status : null
//   }

//   try {
//     var updatedTodo = await pastSprintService.updateSprint(todo)
//     return res.status(200).json({
//       status: 200,
//       data: updatedTodo,
//       message: "Success: sprint updated"
//     })
//   } catch (e) {
//     return res.status(400).json({
//       status: 400,
//       message: e.message
//     })
//   }
// }

// exports.removeSprint = async function (req, res, next) {

//   var id = req.params.id;

//   try {
//     var deleted = await pastSprintService.deleteTodo(id)
//     return res.status(204).json({
//       status: 204,
//       message: "Succes: sprint deleted"
//     })
//   } catch (e) {
//     return res.status(400).json({
//       status: 400,
//       message: e.message
//     })
//   }

// }
