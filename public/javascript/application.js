$(function() {
  // var $contacts = $('#contacts');
  
  var handlers = {
    contactsTable: $('#contactsTbl'),
    contacts: $('#contacts'),
    toggleNew: function() {
      $('#newContact').toggle();
    },
    toggleList: function() {
      handlers.contactsTable.toggle();
    },
    addToList: function (contact) {
      var row = $('<tr>').addClass('u-full-width').appendTo(handlers.contacts);
      var $fname = $('<td>').text(contact.firstname);
      var $lname = $('<td>').text(contact.lastname);
      var $email = $('<td>').text(contact.email);
      var $del = $('<td>');

      $del.html($('<button>').addClass('button-primary').addClass('delete').attr('contactid', contact.id).text("Delete"));

      $fname.appendTo(row);
      $lname.appendTo(row);
      $email.appendTo(row);
      $del.appendTo(row);

      // $contact.text("Name: " + contact.firstname + " " + contact.lastname + " Email: " + contact.email);
      // $contact.appendTo(con);
      // var span = $('<span>').addClass('two column');
      // var button = $('<button>').addClass('button-primary').addClass('delete').attr('contactid', contact.id).text("Delete");
      // button.appendTo(span).appendTo(con);
      handlers.deleteContact();
    },
    getContacts: function(contacts) {
      $.each(contacts, function(i, contact) {
        handlers.addToList(contact);
        handlers.filterList();
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
      $('#newContact div input').val('');

      $.post("/contacts/new", contact, handlers.addToListAfterCreate, 'json');
    },
    toggleSearch: function() {
      $('#searchBox').toggle();
    },
    removeFromList: function(contact) {
      contact.remove();
    },
    deleteContact: function() {
      $('.delete').unbind().on("click", function() {
        var button = $(this);
        var parent = button.closest('tr');
        $.ajax({
          url: "/contacts/"+button.attr('contactid'),
          method: 'DELETE',
          success: function(result) {
            handlers.removeFromList(parent);
          }
        });
      });
    },
    filterList: function() {
      $('#term').on("keyup", function() {
        $term = $(this).val();
        if($term) {
          $hide = handlers.contacts.find('td:not(:Contains('+$term+'))');
          $hide.closest('tr').hide();
          $show = handlers.contacts.find('td:Contains('+$term+')');
          $show.closest('tr').show();
        }
        else {
          handlers.contacts.find('td').closest('tr').show();
        }
      });
    }
  };

  $('#btn-new').on("click", handlers.toggleNew);

  $('#btn-list').on("click", handlers.toggleList);

  $('#btn-new-contact').on("click", handlers.addContact);

  $.getJSON("/contacts", handlers.getContacts);

  $('#btn-search').on("click", handlers.toggleSearch);

  jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(arg) {
    return function( elem ) {
      return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
  });

});