const express = require('express');

// require the Drone model here
const Drone = require('../models/Drone.model')

const router = express.Router();

router.get('/drones', async (req, res, next) => {
  // Iteration #2: List the drones
  try {
    const drones = await Drone.find();
    res.render('drones/list', { drones: drones })
  } catch (error) {
    console.log(error)
  }
});

router.get('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  try {
    res.render('drones/create-form')
  } catch (error) {
    console.log(error)
  }
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  try {
    let { name, propellers, maxSpeed } = req.body
    const newDrone = await Drone.create( { name, propellers, maxSpeed } )
    res.redirect('/drones')
  } catch (error) {
    res.redirect('drones/create-form')
  }
});

router.get('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    let droneId = req.params.id;
    const findDrone = await Drone.findById(droneId)
    res.render('drones/update-form', { drone: findDrone })
  } catch (error) {
    
  }

});

router.post('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    let droneId = req.params.id;
    let { name, propellers, maxSpeed } = req.body;
    const droneEdited = await Drone.findByIdAndUpdate(droneId, { name, propellers, maxSpeed })
    res.redirect('/drones')
  } catch (error) {
    console.log(error)
  }
});

router.post('/drones/:id/delete', async (req, res, next) => {
  // Iteration #5: Delete the drone
  try {
    let droneId = req.params.id;
    const droneToDelete = await Drone.findByIdAndDelete(droneId)
    res.redirect('/drones')
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
