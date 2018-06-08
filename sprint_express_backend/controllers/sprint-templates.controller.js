var sprintTemplateService = require('../services/sprint-template.service')

_this = this


exports.getSprintTemplates = async function (req, res, next) {

  var page = req.query.page ? req.query.page : 1
  var limit = req.query.limit ? req.query.limit : 10;

  try {
    var sprintTemplates = await sprintTemplateService.getSprintTemplates({}, page, limit)
    return res.status(200).json({
      status: 200,
      data: sprintTemplates,
      message: "Sprint templates: success retrieving"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
}

exports.getOneSprintTemplate = async function (req, res, next) {
  try {
    var sprintTemplate = await sprintTemplateService.getOneSprintTemplate(req.params.id);
    return res.status(200).json({
      status: 200,
      data: sprintTemplate,
      message: "Sprint template: success retrieving"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
}


// exports.createSprint = async function (req, res, next) {
//   var todo = {
//     title: req.body.title,
//     description: req.body.description,
//     status: req.body.status
//   }

//   try {
//     var createdTodo = await sprintTemplateService.createSprint(todo)
//     return res.status(201).json({
//       status: 201,
//       data: createdTodo,
//       message: "Succesfully Created sprint"
//     })
//   } catch (e) {
//     return res.status(400).json({
//       status: 400,
//       message: "Todo Creation was Unsuccesfull"
//     })
//   }
// }

// exports.updateSprint = async function (req, res, next) {

//   if (!req.body._id) {
//     return res.status(400).json({
//       status: 400,
//       message: "Id must be present"
//     })
//   }

//   var id = req.body._id;

//   console.log(req.body)

//   var todo = {
//     id,
//     title: req.body.title ? req.body.title : null,
//     description: req.body.description ? req.body.description : null,
//     status: req.body.status ? req.body.status : null
//   }

//   try {
//     var updatedTodo = await sprintTemplateService.updateSprint(todo)
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
//     var deleted = await sprintTemplateService.deleteTodo(id)
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
