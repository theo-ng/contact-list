$(function() {
  var $contacts = $('#contacts');
  
  var handlers = {
    toggleNew: function() {
      $('#newContact').toggle();
    },
    toggleList: function() {
      $contacts.toggle();
    },
    addToList: function (contact) {
      var con = $('<div>').appendTo($contacts);
      var $contact = $('<li>');
      $contact.text("Name: " + contact.firstname + " " + contact.lastname + " Email: " + contact.email);
      $contact.appendTo(con);
      var span = $('<span>');
      var button = $('<button>').addClass('button-primary delete').attr('contactid', contact.id).text("Delete");
      button.appendTo(span).appendTo(con);
      handlers.deleteContact();
    },
    getContacts: function(contacts) {
      $.each(contacts, function(i, contact) {
        handlers.addToList(contact);
      });
    },
    addToListAfterCreate: function(data) {
      if(data) {
        handlers.addToList(data);
      }
    },
    addContact: function() {
      var fName = $('#firstName').val();
      var lName = $('#lastName').val();
      var email = $('#email').val();
      var contact = { firstname: fName, lastname: lName, email: email }

      $.post("/contacts/new", contact, handlers.addToListAfterCreate, 'json');
    },
    toggleSearch: function() {
      $('#searchBox').toggle();
    },
    removeFromList: function(contact) {
      contact.remove();
    },
    deleteContact: function() {
      $('.delete').on("click", function() {
        var button = $(this);
        var parent = button.closest('div');
        $.ajax({
          url: "/contacts/"+button.attr('contactid'),
          method: 'DELETE',
          success: function(result) {
            handlers.removeFromList(parent);
          }
        });
      });
    }
  };

  $('#btn-new').on("click", handlers.toggleNew);

  $('#btn-list').on("click", handlers.toggleList);

  $('#btn-new-contact').on("click", handlers.addContact);

  $.getJSON("/contacts", handlers.getContacts);

  $('#btn-search').on("click", handlers.toggleSearch);

  
  // });

  // $('#term').on("change", function() {
  //   $contact.empty();

  // }

});