const {validationResult} = require('express-validator');
const contactsRepo = require('../src/contactFileRepo');
const Contact = require('../src/Contact');

/* GET contact listing. */
exports.contact_list = function(req, res, next) {
  const data = contactsRepo.findAll();
  console.log("===>", data)
  res.render('contacts', {title: "All Contacts!", contacts: data, errors: null});
}



/* POST contact add */
exports.create_contact = function (req, res, next) {
  console.log("req", req.body);
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log("Inside ----->", result.array());
    res.render('contact_add', { title: 'Voilaa', errors: result.array() });
  } else {
    contactsRepo.create(new Contact('', req.body.firstName, req.body.lastName, req.body.email, req.body.notes));
    res.redirect('/');
  }
};