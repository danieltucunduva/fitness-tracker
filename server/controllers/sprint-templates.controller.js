var sprintTemplateService = require('../services/sprint-template.service')

/**
 * @swagger
 * /api/sprint-templates:
 *   get:
 *     tags:
 *      - sprint-templates
 *     description: Get list of SprintTemplate
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: ok
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: number
 *             data:
 *               type: object
 *               properties:
 *                 docs:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/SprintTemplate'
 *                 total:
 *                   type: number
 *                 limit:
 *                   type: number
 *                 page:
 *                   type: number
 *                 pages:
 *                   type: number
 *             message:
 *               type: string
 *       400:
 *         description: bad request
 */
exports.getSprintTemplates = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1
  var limit = req.query.limit ? req.query.limit : 10

  try {
    var sprintTemplates = await sprintTemplateService.getSprintTemplates({}, page, limit)
    return res.status(200).json({
      status: 200,
      data: sprintTemplates,
      message: 'Sprint templates: success retrieving'
    })
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    })
  }
}

/**
 * @swagger
 * /api/sprint-templates/{id}:
 *   get:
 *     tags:
 *      - sprint-templates
 *     parameters:
 *       - name: id
 *         description: Sprint id
 *         in: path
 *         required: true
 *         type: string
 *     description: Get SprintTemplate by id
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: ok
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: number
 *             data:
 *               $ref: '#/definitions/SprintTemplate'
 *             message:
 *               type: string
 *               description: 'Sprint templates: success retrieving'
 *       400:
 *         description: bad Request
 */
exports.getOneSprintTemplate = async function (req, res, next) {
  try {
    var sprintTemplate = await sprintTemplateService.getOneSprintTemplate(req.params.id)
    return res.status(200).json({
      status: 200,
      data: sprintTemplate,
      message: 'Sprint template: success retrieving'
    })
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    })
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
