$(function() {
  var $contacts = $('#contacts');
  
  var handlers = {
    addToList: function (contact) {
      var row = $('<tr>').addClass('u-full-width').appendTo($contacts);
      var $fname = $('<td>').attr('contentEditable', 'true').text(contact.firstname);
      var $lname = $('<td>').attr('contentEditable', 'true').text(contact.lastname);
      var $email = $('<td>').attr('contentEditable', 'true').text(contact.email);
      var $phone = $('<td>').attr('contentEditable', 'true').text(contact.phone);
      var $del = $('<td>');
      var $edit = $('<td>');

      $del.html($('<button>', {
        'class': 'button-primary delete',
        'data-contactid': contact.id,
        'text': "Delete"
      }));

      $edit.html($('<button>', {
        'class': 'button-primary edit',
        'data-contactid': contact.id,
        'text': "Save"
      }));

      row.append($fname).append($lname).append($email).append($phone).append($del).append($edit);

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

      $.ajax({
        url: "/contacts/new",
        method: 'POST',
        contentType: 'json',
        data: contact,
        success: handlers.addToListAfterCreate
        // error: function(xhr, status, error){}
      });
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
    },
    saveContact: function() {
      var button = $(this);
      var parent = button.closest('tr');
      var fName = button.closest('td').siblings(':eq(0)').text();
      var lName = button.closest('td').siblings(':eq(1)').text();
      var email = button.closest('td').siblings(':eq(2)').text();
      var phone = button.closest('td').siblings(':eq(3)').text();
      var contact = { id: button.data('contactid'), firstname: fName, lastname: lName, email: email, phone: phone};

      $.ajax({
        url: "/contacts/"+button.data('contactid'),
        method: 'PUT',
        data: contact,
        error: function(e) {
          console.log(e);
        }
      });
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

    $('tbody').on('click', '.edit', handlers.saveContact);
  }


  bindEvents();

  jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(arg) {
    return function( elem ) {
      return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
  });

});