const ClientsControllers = require('../controllers/clients');
const RoomUsageControllers = require('../controllers/roomUsage');
const RoomsControllers = require('../controllers/rooms');
const UsersControllers = require('../controllers/users');
const authentication = require('../middlewares/authentication');
const errorHandler = require('../middlewares/errorHandler');
const router = require('express').Router();

router.get('/', (req, res) => res.json({message: "Buat Server Meeting Room"}));

router.post('/login', UsersControllers.Login);

router.use(authentication)

// CLIENT
router.post('/client', ClientsControllers.addClient);
router.get('/clients', ClientsControllers.getClients);
router.get('/client/:id', ClientsControllers.getClientsById);
router.put('/client/:id', ClientsControllers.editClient);
router.delete('/client/:id', ClientsControllers.deleteClient);

// ROOM
router.post('/room', RoomsControllers.addRoom);
router.get('/rooms', RoomsControllers.getRooms);
router.get('/room/:id', RoomsControllers.getRoomById);
router.put('/room/:id', RoomsControllers.editRoom);
router.delete('/room/:id', RoomsControllers.deleteRoom);

// ROOM USAGE
router.post('/usage', RoomUsageControllers.addRoomUsage);
router.get('/usages', RoomUsageControllers.getRoomUsage);
router.get('/usage/:id', RoomUsageControllers.getRoomUsageById);
router.put('/usage/:id', RoomUsageControllers.editRoomUsage);
router.delete('/usage/:id', RoomUsageControllers.deleteRoomUsage);

router.use(errorHandler)
module.exports = router;