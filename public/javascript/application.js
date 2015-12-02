$(function() {
  var $contacts = $('#contacts')
  var handlers = {
    toggleNew: function() {
      $('#newContact').toggle();
    },
    toggleList: function() {
      $contacts.toggle();
    },
    addToList: function (contact) {
      $contact = $('<li>');
      $contact.text("Name: " + contact.firstname + " " + contact.lastname + " Email: " + contact.email);
        $contact.appendTo($contacts);
    },
    getContacts: function(contacts) {
      $.each(contacts, function(i, contact) {
        handlers.addToList(contact);
      });
    },
  };

  $('#btn-new').on("click", handlers.toggleNew);

  $('#btn-list').on("click", handlers.toggleList);

  $('#btn-new-contact').on("click", function() {
    var fName = $('#firstName').val();
    var lName = $('#lastName').val();
    var email = $('#email').val();
    var contact = { firstname: fName, lastname: lName, email: email }

    $.post("/contacts/new", contact, function(data) {
      if(data) {
        handlers.addToList(data);
      }
    }, 'json');
  });

  $.getJSON("/contacts", handlers.getContacts);
});