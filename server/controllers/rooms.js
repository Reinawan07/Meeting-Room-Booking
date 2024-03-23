const { room } = require('../models')

class RoomsControllers {

    static async addRoom(req, res, next) {
        try {
            const { roomName, costPerHour } = req.body
            const data = await room.create({
                roomName,
                costPerHour
            })
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getRooms(req, res, next) {
        try {
            const data = await room.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async getRoomById(req, res, next) {
        try {
            const data = await room.findByPk(req.params.id)
            if (!data) {
                throw ({ name: "NotFound", message: `Room id ${req.params.id} not found` })
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async editRoom(req, res, next) {
        try {
            const data = await room.findByPk(req.params.id);
            if (!data) {
                throw ({ name: "NotFound", message: `Room id ${req.params.id} not found` })
            }
            await data.update(req.body, { where: { id: req.params.id } })
            res.status(200).json({ message: `Success update room id ${req.params.id}` })
        } catch (error) {
            next(error)
        }
    }

    static async deleteRoom(req, res, next) {
        try {
            const data = await room.findByPk(req.params.id);
            if (!data) {
                throw ({ name: "NotFound", message: `Room id ${req.params.id} not found` })
            }
            await data.destroy()
            res.status(200).json({ message: `Id ${req.params.id} success to delete` })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = RoomsControllers