var express = require('express');
var router = express.Router();
const contactController = require('../controllers/contactController');
const {body} = require('express-validator');


router.get('/', contactController.welcome_page);

router.get('/contacts', contactController.contacts_page);

router.get('/contact/:id', contactController.details_page);

router.get('/add', contactController.add_contact_page);

router.post('/add', 
  body('email').isEmail().withMessage("Invalid Email"), 
  body('firstName').notEmpty().withMessage("First Name Invalid/Missing"), 
  body('lastName').notEmpty().withMessage("Last Name Invalid/Missing"), 
  contactController.create_contact);

router.get('/contact/:id/edit', contactController.edit_contact_page);

router.post('/edit/:id', 
body('email').isEmail().withMessage("Invalid Email"), 
body('firstName').notEmpty().withMessage("First Name Invalid/Missing"), 
body('lastName').notEmpty().withMessage("Last Name Invalid/Missing"), 
contactController.edit_contact);

router.get('/contact/:id/delete', contactController.delete_contact_page);

router.post('/delete/:id', contactController.delete_contact);


module.exports = router;
