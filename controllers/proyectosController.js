const req = require('express/lib/request');
const Proyectos = require('../models/Proyectos');

exports.proyectosHome = async (request, response) => {
    const proyectos = await Proyectos.findAll();
    response.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
}

exports.formularioProyecto = async (request, response) => {
    const proyectos = await Proyectos.findAll();
    response.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos,
    });
}

exports.nuevoProyecto = async (request, response) => {
    const proyectos = await Proyectos.findAll();
    // Enviar a la consola lo que el usuario escriba
    // console.log(request.body);

    // validar que se haya algo escrito en el input
    const { nombre } = request.body;
    let errores = [];

    if (!nombre) {
        errores.push({
            'texto': 'Agrega un nombre al Proyecto'
        })
    }

    // si hay errores
    if (errores.length > 0) {
        response.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        await Proyectos.create({ nombre });
        response.redirect('/');
    }
}
exports.proyectoPorUrl = async (request, response, next) => {
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({
        where: {
            url: request.params.url
        }
    });

    const [proyectos, proyecto] = await Promise.all([
        proyectosPromise,
        proyectoPromise
    ]);

    if (!proyecto) return next();

    // render la vista
    response.render('tareas', {
        nombrePagina: 'Tareas del proyecto',
        proyecto,
        proyectos
    });
}
exports.formularioEditar = async (request, response) => {
    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({
        where: {
            id: request.params.id
        }
    });

    const [proyectos, proyecto] = await Promise.all([
        proyectosPromise,
        proyectoPromise
    ]);

    response.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    })
}

exports.actualizarProyecto = async (request, response) => {
    const proyectos = await Proyectos.findAll();


    // validar que se haya algo escrito en el input
    const { nombre } = request.body;
    let errores = [];

    if (!nombre) {
        errores.push({
            'texto': 'Agrega un nombre al Proyecto'
        })
    }

    // si hay errores
    if (errores.length > 0) {
        response.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        await Proyectos.update(
            { nombre: nombre },
            {
                where: {
                    id: request.params.id
                }
            }
        );
        response.redirect('/');
    }
}