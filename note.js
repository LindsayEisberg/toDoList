var tasks = {
  init: function(){
    tasks.initStyling(); //calls styling functions
    tasks.initEvents(); //calls Events functions

  },
  initStyling: function() {
    tasks.renderTasks(); //adds all to page by calling render function

  },
  initEvents: function() {

  $('section').on('click', '.showEditTask', function(event){
    event.preventDefault();
    $(this).closest('article').find('.editTask').toggleClass('show');
  }); //end click event for .showEditTask

  $('section').on('submit', '.editTask', function (event){
    event.preventDefault();
    var taskId = $(this).closest('article').data('taskId');
    var editedTask= {
    name: $(this).find('input[name="editName"]').val(),
    dueDate: $(this).find('input[name="editDueDate"]').val(),
    description: ($this).find('textarea[name="editDescription"]').val()
  }; //end editedTask
  tasks.updateTask(taskId, editedTask); //calls update function with taskId and new task info
  }); //end submit for .editTask

  $('#createTask').on('submit', function (event){
    event.preventDefault();
    var newTask = {
      name: $(this).find('input[name="newName"]').val(),
      dueDate: $(this).find('input[name="newDueDate"]').val(),
      description: $(this).find('textarea[name="editNewDescription"]').val()
    };//end newTask
    tasks.createTask(newTask);

  }); //end submit event for createTask Id

  $('section').on('click', '.deleteTask', function (event) {
    event.preventDefault();
    var taskId = $(this).closest('article').data('taskId');
    console.log(taskId);
    tasks.deleteTask(taskId);
  });//end deleteTask click function

},//end events functions
  config: {
    url: 'http://tiy-fee-rest.herokuapp.com/collections/valkharvey',
  },
  render: function (data, tmpl, $el) {
    var template = _.template(data, tmpl);

    $el.append(template);
  },
  renderTasks: function() {
    $.ajax({
      url: tasks.config.url,
      type:'GET',
      success: function(tasks) {
        console.log(tasks);
        var template = _.template($('#taskTmpl'));
        var markup = "";
        tasks.forEach(function (item, idx, arr) {
          console.log(idx)
          markup += template(item);
        });
        console.log('markup is....', markup);
        $('section').html(markup);
      },
      error: function (err) {
        console.log(err);
      }
    });//end ajax call for renderTasks
  },
  createTask: function(task) {
    $.ajax({
      url:tasks.config.url,
      data: task,
      type: 'POST', //adds info to server
      success: function (data) { //if info received from server...
        console.log(data);
        tasks.renderTasks(); //calls renderTasks function
      },
      error: function (err) {
        console.log("You f_d up. Do not pass go.")
      }
    });//end ajax for create task
  }, //end create
  deleteTask: function (id) {
    $.ajax({
      url: tasks.config.url + '/' + id,
      type: 'DELETE', //D is for Delete in CRUD
      success: function (data) {
        console.log(data);
        tasks.renderTasks();
      },
      error: function(err) {
        console.log(err); //You DONE BAD!
      }
    }); //end ajax for delete
  },
  updateTask: function (id, task) { //shit just got real, yo
    $.ajax({
      url: tasks.config.url + '/' + id, //baseUrl adds slash and Id to url. not sure why...
      data: task,
      type: 'PUT', //CRUD-update stage
      success: function (data) {
        console.log(data);
        tasks.renderTasks();
      },
      error: function (err) {
        console.log(err); //you f_d up. Try again.
      }
    });//end ajax for updateTask
  }//end update
}; //end tasks object

$(document).ready(function() {
  tasks.init();

});




// $(document).ready(function(){
//   toDo.init();
// });
//
// var toDo = {
//
//   init: function(){
//     toDo.initStyling();
//     toDo.initEvents();
//   },
//
//   initStyling: function(){
//     toDo.renderItem();
//   },
//
//   initEvents: function(){
//     $('section').on('click', '.showEditItem', function(event){
//       event.preventDefault();
//       $(this).closest('article').find('.editItem').toggleClass('show');
//
//     });
//
//     $('section').on('submit', '.editItem', function(event){
//       event.preventDefault();
//       var toDoList = $(this).closest('article').data('idItem');
//       var editedItem = {
//         Item: $(this).find('input[name="editTitle"]').val(),
//
//       };
//
//       toDo.updateItem(toDoList, editedItem);
//     });
//
//     $('#createItem').on('submit', function(event){
//       event.preventDefault();
//         var newItem = {
//           Item : $(this).find('input[name="newToDo"]').val(),
//         };
//
//         toDo.createItem(newItem);
//     });
//
//     $('section').on('click', '.deleteItem', function (event) {
//     event.preventDefault();
//      var toDoList = $(this).closest('article').data('idItem');
//      console.log(toDoList);
//      toDo.deleteItem(toDoList);
//   });
//
//   },
//
//   config: {
//     url: 'http://tiy-fee-rest.herokuapp.com/collections/lindsayeisberg',
//   },
//
//
//   renderItem: function () {
//   $.ajax({
//     url: toDo.config.url,
//     type: 'GET',
//
//       });
//     },
//     error: function (err) {
//       console.log(err);
//     }
//   });
// },
//
//   createItem: function(item){ //POST (create)
//     $.ajax ({
//       url: toDo.config.url,
//       data: item,
//       type: "POST",
//       success: function (data) {
//         console.log(data);
//         toDo.renderItem();
//       },
//       error: function(err) {
//         console.log(err);
//       }
//     });
//
//     $('input').val('');
//   },
//
//   deleteItem: function (id){//DELETE
//     $.ajax ({
//       url: toDo.config.url + '/' + id,
//       type: "DELETE",
//       success: function (data) {
//         console.log(data);
//         toDo.renderItem();
//       },
//       error: function(err) {
//         console.log(err);
//       }
//     });
//   },
//
//   updateItem: function(id, item){//PUT (update)
//     $.ajax({
//       url: toDo.config.url + '/' + id,
//       data: item,
//       type: "PUT",
//       success: function(data) {
//         console.log(data);
//         toDo.renderItem();
//       },
//       error: function(err) {
//         console.log(err);
//       }
//     });
//   },
// };
