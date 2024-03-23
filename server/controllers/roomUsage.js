const { roomUsage, room, client } = require('../models')

class RoomUsageControllers {

    static async addRoomUsage(req, res, next) {
        try {
            const { clientId, roomId, startTime, endTime, bookingDate, quotaUsed } = req.body
            const roomUsages = await roomUsage.create({
                clientId,
                roomId,
                startTime,
                endTime,
                bookingDate,
                quotaUsed
            })
            res.status(201).json(roomUsages)
        } catch (error) {
            next(error)
        }
    }

    static async getRoomUsage(req, res, next) {
        try {
            const { roomName } = req.query;

            let filter = {};

            if (roomName) {
                filter = {
                    include: [
                        {
                            model: client,
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                        },
                        {
                            model: room,
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                            where: {
                                roomName: roomName
                            }
                        }
                    ]
                };
            } else {

                filter = {
                    include: [
                        {
                            model: client,
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                        },
                        {
                            model: room,
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                        }
                    ]
                };
            }

            const data = await roomUsage.findAll(filter);

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }


    static async getRoomUsageById(req, res, next) {
        try {
            const data = await roomUsage.findByPk(req.params.id, {
                include: [
                    {
                        model: client,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                    },
                    {
                        model: room,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                    }
                ]
            });
            if (!data) {
                throw ({ name: "NotFound", message: `Room Usage id ${req.params.id} not found` })
            }
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async editRoomUsage(req, res, next) {
        try {
            const data = await roomUsage.findByPk(req.params.id);
            if (!data) {
                throw ({ name: "NotFound", message: `Room Usage id ${req.params.id} not found` })
            }
            await data.update(req.body, { where: { id: req.params.id } })
            res.status(200).json({ message: `Success update room usage id ${req.params.id}` })
        } catch (error) {
            next(error)
        }
    }

    static async deleteRoomUsage(req, res, next) {
        try {
            const data = await roomUsage.findByPk(req.params.id);
            if (!data) {
                throw ({ name: "NotFound", message: `Room Usage id ${req.params.id} not found` })
            }
            // await data.destroy()
            res.status(200).json({ message: `Id ${req.params.id} success to delete` })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = RoomUsageControllers