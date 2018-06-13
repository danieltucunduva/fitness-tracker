var userService = require('../services/user.service')

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *      - users
 *     parameters:
 *       - name: user
 *         description: User
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     description: Log in a user
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
 *               $ref: '#/definitions/User'
 *             message:
 *               type: string
 *       400:
 *         description: bad request
 *       406:
 *         description: not acceptable
 */
exports.deleteData = async function (req, res, next) {
  const userId = req.params.username
  try {
    const sprintsDeleted = await userService.deleteData(userId)
    return res.status(200).json({
      status: 200,
      data: sprintsDeleted,
      message: 'Success: data deleted'
    })
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    })
  }
}
