

var toDo = {

  config: {
    url: 'http://tiy-fee-rest.herokuapp.com/collections/lindsayeisberg',
  },

  init: function(){
    toDo.initStyling();
    toDo.initEvents();
  },

  initStyling: function(){
    toDo.renderItem();
  },

  initEvents: function(){


//EDIT TASK


  $('section').on('dblclick', '.listItem', function (event){
    event.preventDefault();
    $(this).closest('.listItem').replaceWith('<input type="text" class="updateListItem" name="updateListItem"</input>');

    $('.editItem').show()
  });

  $('.inputs').on('click', '#editedItem', function (event) {
    event.preventDefault();
    var itemId = $('.updateListItem').closest('article').data('itemid');
    var editedListItem = {
      title: $('.updateListItem').val()
    }
    toDo.updateItem(itemId, editedListItem);

  });



  //CREATE NEW TASK//

    $('.createItem').on('submit', function(event){
      event.preventDefault();
        var newItem = {
          title: $(this).find('input[name="newTitle"]').val()

        };
      toDo.createItem(newItem);
    });
  //
  //DELETE TASK//
    $('section').on('click', '.deleteItem', function (event){
      event.preventDefault();
      var taskId = $(this).closest('article').data('itemid');
      toDo.deleteItem(taskId);
  //
    });

    // $('.completeItem').on('click', 'button', function (event){
    //   event.preventDefault();
    //   $(this).closest('article').find('h3').toggleClass('complete');
    //   });
  },
  // '<a class="deleteItem" href=""><i class="fa fa-times"></i></a>',
  // '<a class="showEditItem" href="">Edit</a>',fa fa-pencil

  renderItem: function() {
    $.ajax({
      url: toDo.config.url,
      type: 'GET',
      success: function (toDo) {
        var template = _.template(templates.toDo);
        var markup = "";
        toDo.forEach(function(item, idx, arr){
          markup += template(item);
        });
        console.log('markup is...', markup);
        $('section').html(markup);
        //this is where I will add the completed tasks and amount of items left based on length
      },
      error: function (err) {
        console.log(err);
      }
    });
  },

  createItem: function(newItem) {
    $.ajax({
      url: toDo.config.url,
      data: newItem,
      type: 'POST',
      success: function (data) {
        console.log(data);
        toDo.renderItem();
      },
      error: function (err) {
        console.log(err);
      }
    });
    $('input').val('');

  },

  deleteItem: function(itemId) {
    $.ajax({
      url: toDo.config.url + "/" + itemId,
      type: 'DELETE',
      success: function (data) {
        console.log(data);
        toDo.renderItem();
      },
      error: function (err) {
        console.log(err);
      }
    });
  },

  updateItem: function(itemId, editedItem) {
    $.ajax({
      url: toDo.config.url + "/" + itemId,
      type: 'PUT',
      data: editedItem,
      success: function(data) {
        console.log(data);
        toDo.renderItem();
        //
      },

      error: function(err) {
        console.log(err);
      }
    });
  }
};




$(document).ready(function(){
  toDo.init();


  // toDo.deleteItem('54da38c099ad1e030000001c');
  // toDo.deleteItem('54da3a1d99ad1e030000001e');

});
