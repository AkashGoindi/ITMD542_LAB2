const {validationResult} = require('express-validator');
const contactsRepo = require('../src/contactFileRepo');
const Contact = require('../src/Contact');

/* GET contact listing. */
exports.contact_list = function(req, res, next) {
  const data = contactsRepo.findAll();
  res.render('contacts', {pageTitle: "All Contacts", contacts: data});
}

exports.contact_details = function(req, res, next) {
  const contactId = req.params.id;
  const contact = contactsRepo.findById(contactId);
  if (contact) {
    res.render('contact', { pageTitle: "Contact Details", data: contact });
  } else {
    res.redirect('/contacts');
  }
}

/* POST contact add */
exports.create_contact = function (req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.render('contact_add', { pageTitle: "Add New Contact", errors: result.array() });
  } else {
    contactsRepo.create(new Contact('', req.body.firstName, req.body.lastName, req.body.email, req.body.notes));
    res.redirect('/');
  }
};

exports.edit_contact_page = function (req, res, next) {
  const contactId = req.params.id;
  const contact = contactsRepo.findById(contactId);
  res.render('contact_edit', {pageTitle: "Edit Contact", errors: null, data: contact});
};

exports.edit_contact = function (req, res, next) {
  const result = validationResult(req);
  const contactId = req.params.id;
  const contact = contactsRepo.findById(contactId);
  if (!result.isEmpty()) {
    res.render(`contact_edit`, { pageTitle: "Edit Contact", errors: result.array(), data: contact });
  } else {
    contactsRepo.update(new Contact(contactId, req.body.firstName, req.body.lastName, req.body.email, req.body.notes));
    res.redirect('/contacts');
  }
};


/* Delete contact */
exports.delete_contact_page = function (req, res, next) {
  const contactId = req.params.id;
  res.render('contact_delete', {id: contactId});
};

exports.delete_contact = function (req, res, next) {
  const contactId = req.params.id;
  contactsRepo.deleteById(contactId);
  res.redirect('/contacts');
};

