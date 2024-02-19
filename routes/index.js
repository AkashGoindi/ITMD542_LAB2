var express = require('express');
var router = express.Router();
const contactController = require('../controllers/contactController');
const {body} = require('express-validator');




// [["3e86c844-d902-4a92-9bb4-b16fac94715c",{"id":"3e86c844-d902-4a92-9bb4-b16fac94715c","firstName":"Akash","lastName":"Sharaabi","email":"akash@gmail.com","notes":"adskjhlsd"}],["d4aee946-3836-4abb-851c-e40be989ccda",{"id":"d4aee946-3836-4abb-851c-e40be989ccda","firstName":"Akash","lastName":"Kapoor","email":"akash@gmail.com","notes":"adskjhlsd"}],["c302bf13-f350-489c-aff0-70d52a4b82f2",{"id":"c302bf13-f350-489c-aff0-70d52a4b82f2","firstName":"Mahima","lastName":"QWERTU","email":"akash@gmail.com","notes":"akdjbnalsd as dkjba skd asjklbd jlkas dad"}]]

/* GET todos listing. */
router.get('/', function(req, res, next) {
  res.render('index', {title: "My App!"});
});

router.get('/contacts', contactController.contact_list);

router.get('/contact/:id', contactController.contact_details);

router.get('/add', function(req, res, next) {
  res.render('contact_add', {pageTitle: "Add New Contact", errors: null});
});

router.get('/contact/:id/edit', contactController.edit_contact_page);

router.post('/edit/:id', 
body('email').isEmail().withMessage("Invalid Email"), 
body('firstName').notEmpty().withMessage("First Name Invalid/Missing"), 
body('lastName').notEmpty().withMessage("Last Name Invalid/Missing"), 
contactController.edit_contact);

router.get('/contact/:id/delete', contactController.delete_contact_page);

router.post('/delete/:id', contactController.delete_contact);

/* Add Contact */
router.post('/add', 
  body('email').isEmail().withMessage("Invalid Email"), 
  body('firstName').notEmpty().withMessage("First Name Invalid/Missing"), 
  body('lastName').notEmpty().withMessage("Last Name Invalid/Missing"), 
  contactController.create_contact);



module.exports = router;
