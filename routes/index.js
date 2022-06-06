const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

// Importar express validator
const { body } = require('express-validator')

// Importar el controlador
const proyectosController = require('../controllers/proyectosController')

module.exports = function () {
    router.get('/', proyectosController.proyectosHome);

    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);

    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto);

    // Listar proyectos
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

    // Actualizar proyecto
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar);

    router.post('/nuevo-proyecto/:id',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto);

    return router;
}
