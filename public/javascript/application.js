$(function() {
  var $contacts = $('#contacts');
  
  var handlers = {
    $contacts: $('#contacts'),
    toggleNew: function() {
      $('#newContact').toggle();
    },
    toggleList: function() {
      $contacts.toggle();
    },
    addToList: function (contact) {
      var con = $('<div>').addClass('u-full-width').appendTo($contacts);
      var $contact = $('<li>').addClass('nine columns');
      $contact.text("Name: " + contact.firstname + " " + contact.lastname + " Email: " + contact.email);
      $contact.appendTo(con);
      var span = $('<span>').addClass('two column');
      var button = $('<button>').addClass('button-primary').addClass('delete').attr('contactid', contact.id).text("Delete");
      button.appendTo(span).appendTo(con);
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
    },
    filterList: function() {
      $('#term').on("keyup", function() {
        $term = $(this).val();
        if($term) {
          $hide = $contacts.find('li:not(:Contains('+$term+'))');
          $hide.parent('div').slideUp();
          $show = $contacts.find('li:Contains('+$term+')');
          $show.parent('div').slideDown();
        }
        else {
          $contacts.find('li').parent('div').slideDown();
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