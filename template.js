var templates = {};


templates.toDo = [
'<article data-itemid="<%= _id %>">',
'<h3 class="showEditItem"><%= title %></h3>',
'<div class="tempBtns">',
'<a class="deleteItem" href="">Delete</a>',
'<a class="showEditItem" href="">Edit</a>',
'</div>',
'<div class="editItem">',
'<button type="submit" class="btn btn-primary">Edit Item</button>',
'</div>',
'</article>'


].join("");


//<i class="fa fa-times"></i>
//REMOVE

//<i class="fa fa-pencil"></i>
//edit

//<i class="fa fa-check"></i>
//checkmark

//
