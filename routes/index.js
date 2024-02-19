var express = require('express');
var router = express.Router();
const contactController = require('../controllers/contactController');
const {body} = require('express-validator');

/* GET todos listing. */
router.get('/', function(req, res, next) {
  res.render('home', {title: "My App!"});
});

router.get('/contacts', contactController.contact_list);

router.get('/contact/:id', contactController.contact_details);

router.get('/add', function(req, res, next) {
  res.render('contact_add', {title: "Add New!", errors: null});
});

router.get('/contact/:id/edit', contactController.edit_contact_page);

router.post('/edit/:id', contactController.edit_contact);

router.get('/contact/:id/delete', contactController.delete_contact_page);

router.post('/delete/:id', contactController.delete_contact);

/* Add Contact */
router.post('/add', 
  body('email').isEmail().withMessage("Invalid Email"), 
  body('firstName').notEmpty().withMessage("First Name Invalid/Missing"), 
  body('lastName').notEmpty().withMessage("Last Name Invalid/Missing"), 
  contactController.create_contact);



module.exports = router;
