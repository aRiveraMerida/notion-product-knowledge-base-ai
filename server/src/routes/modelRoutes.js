const express = require('express')
const router = express.Router()
const modelController = require('../controllers/modelController')

// Ruta para procesar y enviar texto a Notion
router.post('/item', modelController.processAndSubmitToNotion)
// Rutas adicionales para las otras funcionalidades
router.get('/item/:itemId', modelController.retrieveItemFromNotion)
router.put('/item/:itemId', modelController.updateItemInNotion)
router.delete('/item/:itemId', modelController.deleteItemFromNotion)
router.get('/items', modelController.retrieveItemsFromNotion)
router.get('/items/name/:name', modelController.retrieveItemsByNameFromNotion)

// Puedes añadir más rutas aquí según sea necesario
// Por ejemplo:
// router.get('/some-endpoint', modelController.someControllerFunction);

module.exports = router
