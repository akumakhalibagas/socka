const express = require("express");

const router = express.Router();

const homeController = require('../controllers/home.controller');

router.get('/', homeController.getHomePage);
router.get('/about', homeController.getAboutPage)

module.exports = router;