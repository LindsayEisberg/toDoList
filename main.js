$(document).ready(function(){
  toDo.init();
});

var toDo = {

  init: function(){
    toDo.initStyling();
    toDo.initEvents();
  },

  initStyling: function(){
    toDo.renderItem();
  },

  initEvents: function(){

    $('.editToDoItem').on('click', '.showEditItem', function(event){
      event.preventDefault();
      $(this).find('.editItem').toggleClass('show');
    });

    $('.editItem').on('submit', function (event){
      event.preventDefault();
      var bookId = $(this).closest('article').data('itemid');
      var editedItem = {
        title: $(this).find('input[name="editTitle"]').val()
      };

      toDo.updateItem(bookId, editedItem);
    });

    $('.createItem').on('submit', function(event){
      event.preventDefault();
        var newItem = {
          title: $(this).find('input[name="newTitle"]').val()
        };
      toDo.createItem(newItem);
    });

    $('.deleteBook').on('click', function (event){
      event.preventDefault();
      var bookId = $(this).closest('article').data('itemid');
      toDo.deleteItem(bookId);

    });
  },

    config: {
      url: 'http://tiy-fee-rest.herokuapp.com/collections/lindsayeisberg',
    },

  render: function(template, data, $el) {
    var markup = _.template(template, data);

    $el.append(template);
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
        $('.inputs').html(markup);
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

  updateItem: function(itemId, updatedItem) {
    $.ajax({
      url: toDo.config.url + "/" + itemId,
      type: 'PUT',
      data: updatedItem,
      success: function(data) {
        console.log(data);
        toDo.renderItem();
      },
      error: function(err) {
        console.log(err);
      }
    });
  }
};
