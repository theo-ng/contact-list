$(function() {
  var $contacts = $('#contacts');
  
  var handlers = {
    addToList: function (contact) {
      var row = $('<tr>').addClass('u-full-width').appendTo($contacts);
      var $fname = $('<td>').text(contact.firstname);
      var $lname = $('<td>').text(contact.lastname);
      var $email = $('<td>').text(contact.email);
      var $phone = $('<td>').text(contact.phone);
      var $del = $('<td>');

      $del.html($('<button>', {
        'class': 'button-primary delete',
        'data-contactid': contact.id,
        'text': "Delete"
      }));

      row.append($fname).append($lname).append($email).append($phone).append($del);

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
      var phone = $('#phone').val();
      var contact = { firstname: fName, lastname: lName, email: email, phone: phone};
      $('#newContact div input').val('');

      $.post("/contacts/new", contact, handlers.addToListAfterCreate, 'json');
    },
    removeFromList: function(contact) {
      contact.remove();
    },
    deleteContact: function() {
      var button = $(this);
      var parent = button.closest('tr');
      $.ajax({
        url: "/contacts/"+button.data('contactid'),
        method: 'DELETE',
        success: function(result) {
          handlers.removeFromList(parent);
        }
      });
    },
    filterList: function() {
      if(!$('tbody tr').length) return;
      $term = $(this).val();
      if($term) {
        $hide = $contacts.find('td:not(:Contains('+$term+'))');
        $hide.closest('tr').hide();
        $show = $contacts.find('td:Contains('+$term+')');
        $show.closest('tr').show();
      }
      else {
        $contacts.find('td').closest('tr').show();
      }
    }
  };

  function bindEvents() {
    $('#btn-new-contact').on("click", handlers.addContact);

    $.getJSON("/contacts", handlers.getContacts);

    $('table').on("click", '.delete', handlers.deleteContact);

    $('#term').on("keyup", handlers.filterList);

    $('[data-toggle]').on('click', function() {
      $($(this).data('toggle')).toggle();
    });
  }


  bindEvents();

  jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(arg) {
    return function( elem ) {
      return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
  });

});