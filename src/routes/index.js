const express = require('express');
const router = express.Router();

const Task = require('../models/task');

//solo un mensaje
router.get('/', function (req, res) {
    res.json({
        'success': true,
        'message' : 'Welcome to NODEJS + MONGODB + COMPASS + EXPRESSS',
        'data' : []
    })
});

//mostrar todas las tareas
router.get('/task', function (req, res) {
    Task.find({})
            .exec( (err, taskList) => {
                if(err){
                    return res.json({
                        'success': false,
                        'message' : err.message,
                        'data' : []
                    });
                }
                return res.json({
                    'success': true,
                    'message' : 'Task List',
                    'data' : [taskList]
                })
            });

});

//Agregar
router.post('/task', function (req, res) {
    let data = req.body;
    let task = new Task({
        title: data.title,
        description: data.description,
        image_url: data.image_url,
    });

    task.save((err, taskDB) => {
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err,
                'data' : []
            });
        }
        if(!taskDB){
            return res.json({
                'success': false,
                'message' : err.message,
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'Task saved successfully',
            'data' : [taskDB]
        })
    });
});

//mostrar tarea por id
router.get('/task/:id', function (req, res) {
    let id = req.params.id;

    Task.findById(id)
            .exec( (err, taskDetail) => {
                if(err){
                    return res.status(400).json({
                        'success': false,
                        'message' : err.message,
                        'data' : []
                    });
                }
                if(!taskDetail){
                    return res.json({
                        'success': false,
                        'message' : 'Task doesnt found',
                        'data' : []
                    });
                }
                return res.json({
                    'success': true,
                    'message' : 'Task Detail',
                    'data' : [taskDetail]
                })
            });
});







router.put('/task/:id', function (req, res) {
    let id = req.params.id;
    let data = req.body;

    // Capturar solo el titulo y la descripcion
    // y eso será la variable DATA. Ejemplo está en eliminar

    Task.findByIdAndUpdate(id, data, {new : true,  runValidators: true}, (err, taskDB) => {
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err,
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'Task updated successfully',
            'data' : [taskDB]
        })
    });
});

router.delete('/task/:id', function (req, res) {
    let id = req.params.id;
    let data = { active : false };
    Task.findByIdAndUpdate(id, data, {new : true,  runValidators: true}, (err, taskDB) => {
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err,
                'data' : []
            });
        }
        if(!taskDB){
            return res.json({
                'success': false,
                'message' : 'Task doesnt found',
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'Task deleted successfully',
            'data' : [taskDB]
        })
    });
});


/*
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.render('index', {
        tasks // --> es lo mismo que task: task 
    });
});

router.post('/add', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.redirect('/');
});

router.get('/turn/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('edit',  {
        task
    });
});

router.post('/edit/:id', async (req, res, next) => {
    const { id } = req.params
    await Task.update({_id: id}, req.body);
    res.redirect('/')
});


router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Task.remove({_id: id});
    res.redirect('/');
});
*/

module.exports = router;