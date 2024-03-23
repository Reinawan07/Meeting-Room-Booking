const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const {user} = require('../models')

class UsersControllers {

    static async Login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) {
                throw({ name: "Email is missing" })
            }

            if (!password) {
                throw({ name: "Password is missing" })
            }

            const users = await user.findOne({ where: { email } })

            if (!users)  {
                throw ({ name: "Invalid email/password"})
            }

            const isPasswordValid = comparePassword(password, users.password)
            if (!isPasswordValid) {
                throw ({ name: "Invalid email/password"})
            }

            const access_token = signToken({ id: users.id })

            res.status(200).json({ access_token })
        } catch (error) {            
            next(error)
        }
    }
}

module.exports = UsersControllers