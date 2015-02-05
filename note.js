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
    $('section').on('click', '.showEditItem', function(event){
      event.preventDefault();
      $(this).closest('article').find('.editItem').toggleClass('show');

    });

    $('section').on('submit', '.editItem', function(event){
      event.preventDefault();
      var toDoList = $(this).closest('article').data('idItem');
      var editedItem = {
        Item: $(this).find('input[name="editToDo"]').val(),

      };

      toDo.updateItem(toDoList, editedItem);
    });

    $('#createItem').on('submit', function(event){
      event.preventDefault();
        var newItem = {
          Item : $(this).find('input[name="newToDo"]').val(),
        };

        toDo.createItem(newItem);
    });

    $('section').on('click', '.deleteItem', function (event) {
    event.preventDefault();
     var toDoList = $(this).closest('article').data('idItem');
     console.log(toDoList);
     toDo.deleteItem(toDoList);
  });

  },

  config: {
    url: 'http://tiy-fee-rest.herokuapp.com/collections/lindsayeisberg',
  },


  renderItem: function () {
  $.ajax({
    url: toDo.config.url,
    type: 'GET',

      });
    },
    error: function (err) {
      console.log(err);
    }
  });
},

  createItem: function(item){ //POST (create)
    $.ajax ({
      url: toDo.config.url,
      data: item,
      type: "POST",
      success: function (data) {
        console.log(data);
        toDo.renderItem();
      },
      error: function(err) {
        console.log(err);
      }
    });

    $('input').val('');
  },

  deleteItem: function (id){//DELETE
    $.ajax ({
      url: toDo.config.url + '/' + id,
      type: "DELETE",
      success: function (data) {
        console.log(data);
        toDo.renderItem();
      },
      error: function(err) {
        console.log(err);
      }
    });
  },

  updateItem: function(id, item){//PUT (update)
    $.ajax({
      url: toDo.config.url + '/' + id,
      data: item,
      type: "PUT",
      success: function(data) {
        console.log(data);
        toDo.renderItem();
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
};
