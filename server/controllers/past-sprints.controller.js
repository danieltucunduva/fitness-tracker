var pastSprintService = require('../services/past-sprints.service')

/**
 * @swagger
 * /api/past-sprints/new:
 *   post:
 *     tags:
 *      - past-sprints
 *     parameters:
 *       - name: PastSprint
 *         description: Past Sprint
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/PastSprint'
 *     description: Create a new PastSprint
 *     produces:
 *      - application/json
 *     responses:
 *       201:
 *         description: created
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: number
 *             data:
 *               $ref: '#/definitions/PastSprint'
 *             message:
 *               type: string
 *       400:
 *         description: bad request
 */
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

/**
 * @swagger
 * /api/past-sprints:
 *   get:
 *     tags:
 *      - past-sprints
 *     description: Get list of PastSprint
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
 *                     $ref: '#/definitions/PastSprint'
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
 *         description: bad Request
 */
exports.getPastSprints = async function (req, res, next) {
  const userId = req.get('User')
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
