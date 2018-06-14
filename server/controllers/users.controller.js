var userService = require('../services/user.service')

/**
 * @swagger
 * /api/users/:username:
 *   delete:
 *     tags:
 *      - users
 *     parameters:
 *       - name: user
 *         description: User
 *         in: body
 *         required: true
 *         schema:
 *           type: string
 *     description: Deletes all data concerning a user
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
 *               type: number
 *             message:
 *               type: string
 *       400:
 *         description: bad request
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
