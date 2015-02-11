

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
    $('.updateListItem').parent().siblings('.editItem').addClass('show');
  });

  $('.inputs').on('click', '#editedItem', function (event) {
    event.preventDefault();
    var itemId = $('.updateListItem').closest('article').data('itemid');
    var editedListItem = {
      title: $('.updateListItem').val(),
      complete: false
    }
    toDo.updateItem(itemId, editedListItem);

  });



  //CREATE NEW TASK//

    $('.createItem').on('submit', function(event){
      event.preventDefault();
        var newItem = {
          title: $(this).find('input[name="newTitle"]').val(),
          complete: false,

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



    $('section').on('click', '.completeItem', function(event){
      event.preventDefault();
      $(this).parent().siblings('h3').toggleClass('complete')

    });

//Delete All Items
  $('#completeAll').on('click', function(event){
    event.preventDefault();
    $(this).parent().parent().siblings().children().children().children('h3').toggleClass('complete')    });


  },





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
        var count = $('.listItem').length;
        $('#itemCount').html(count);
        // if($('.listItem').hasClass('complete')) {
        //   $(this).length === 0;
        // }
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
