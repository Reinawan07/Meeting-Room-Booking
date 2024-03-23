const { user } = require('../models');
const { verifyToken } = require('../helpers/jwt');

async function authentication(req, res, next) {
    try {
        let access_token = req.headers.authorization
        if (!access_token) throw { name: "Unauthenticated" }

        let { id } = verifyToken(access_token.replace('Bearer ', ''))

        let users = await user.findByPk(id)
        if (!users) throw { name: "Unauthenticated" }

        req.users = {
            id: users.id,
            email: users.email,
            role: users.role
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication;