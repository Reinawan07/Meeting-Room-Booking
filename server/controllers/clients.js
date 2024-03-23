const { client } = require("../models")

class ClientsControllers {
    static async addClient(req, res, next) {
        try {
            const { name, email, phone, credit } = req.body
            const users = await client.create({
                name,
                email,
                phone,
                credit
            })
            res.status(201).json(users)
        } catch (error) {
            next(error)
        }
    }

    static async getClients(req, res, next) {
        try {
            const data = await client.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getClientsById(req, res, next) {
        try {
            const data = await client.findByPk(req.params.id)
            if (!data) {
                throw ({ name: "NotFound", message: `Client id ${req.params.id} not found` })
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async editClient(req, res, next) {
        try {
            const data = await client.findByPk(req.params.id);
            if (!data) {
                throw ({ name: "NotFound", message: `Client id ${req.params.id} not found` })
            }
            await data.update(req.body, { where: { id: req.params.id } })
            res.status(200).json({ message: `Success update client id ${req.params.id}` });
        } catch (error) {
            next(error)
        }
    }

    static async deleteClient(req, res, next) {
        try {
            const data = await client.findByPk(req.params.id);
            if (!data) {
                throw ({ name: "NotFound", message: `Client id ${req.params.id} not found` })
            }
            await data.destroy()
            res.status(200).json({ message: `Id ${req.params.id} success to delete` });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ClientsControllers