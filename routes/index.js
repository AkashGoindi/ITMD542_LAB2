var express = require('express');
var router = express.Router();
const contactController = require('../controllers/contactController');
const {body} = require('express-validator');


router.get('/', contactController.welcome_page);

router.get('/contacts', contactController.contacts_page);

router.get('/contact/:id', contactController.details_page);

router.get('/add', contactController.add_contact_page);

router.post('/add', 
  body('email').isEmail().withMessage("Invalid Email Format"), 
  body('firstName').trim().notEmpty().withMessage("Please fill the First Name!"), 
  body('lastName').trim().notEmpty().withMessage("Please fill the Name Name!"), 
  contactController.create_contact);

router.get('/contact/:id/edit', contactController.edit_contact_page);

router.post('/edit/:id', 
body('email').isEmail().withMessage("Invalid Email Format"), 
body('firstName').trim().notEmpty().withMessage("Please fill the First Name!"), 
body('lastName').trim().notEmpty().withMessage("Please fill the Name Name!"), 
contactController.edit_contact);

router.get('/contact/:id/delete', contactController.delete_contact_page);

router.post('/delete/:id', contactController.delete_contact);


module.exports = router;
