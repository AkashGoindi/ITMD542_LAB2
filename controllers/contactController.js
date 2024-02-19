const {validationResult} = require('express-validator');
const contactsRepo = require('../src/contactFileRepo');
const Contact = require('../src/Contact');


exports.welcome_page = function(req, res, next) {
  res.render('index', {pageTitle: "Welcome Page"});
}

/* Read */
exports.contacts_page = function(req, res, next) {
  const data = contactsRepo.findAll();
  res.render('contacts', {pageTitle: "All Contacts", contacts: data});
}

exports.details_page = function(req, res, next) {
  const contactId = req.params.id;
  const contact = contactsRepo.findById(contactId);
  if (contact) {
    res.render('contact', { pageTitle: "Contact Details", data: contact });
  } else {
    res.redirect('/contacts');
  }
}

/* Create */
exports.add_contact_page = function(req, res, next) {
  res.render('contact_add', {pageTitle: "Add New Contact", errors: null});
}

exports.create_contact = function (req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.render('contact_add', { pageTitle: "Add New Contact", errors: result.array() });
  } else {
    let fname = req.body.firstName.trim();
    let lname = req.body.lastName.trim();
    let email = req.body.email ? req.body.email.trim() : "";
    let notes = req.body.notes ? req.body.notes.trim() : "";
    contactsRepo.create(new Contact('', fname, lname, email, notes));
    res.redirect('/contacts');
  }
};

/* Update */
exports.edit_contact_page = function (req, res, next) {
  const contactId = req.params.id;
  const contact = contactsRepo.findById(contactId);
  res.render('contact_edit', {pageTitle: `Edit ${contact.getName()}'s Contact`, errors: null, data: contact});
};

exports.edit_contact = function (req, res, next) {
  const result = validationResult(req);
  const contactId = req.params.id;
  const contact = contactsRepo.findById(contactId);
  if (!result.isEmpty()) {
    res.render(`contact_edit`, { pageTitle: "Edit Contact", errors: result.array(), data: contact });
  } else {
    let fname = req.body.firstName.trim();
    let lname = req.body.lastName.trim();
    let email = req.body.email ? req.body.email.trim() : "";
    let notes = req.body.notes ? req.body.notes.trim() : "";

    contactsRepo.update(new Contact(contactId, fname, lname, email, notes));

    res.redirect('/contacts');
  }
};


/* Delete */
exports.delete_contact_page = function (req, res, next) {
  const contactId = req.params.id;
  res.render('contact_delete', {id: contactId});
};

exports.delete_contact = function (req, res, next) {
  const contactId = req.params.id;
  contactsRepo.deleteById(contactId);
  res.redirect('/contacts');
};

