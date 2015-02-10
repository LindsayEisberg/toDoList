var templates = {};


templates.toDo = [
'<article data-itemid="<%= _id %>">',
'<h3 class="listItem"><%= title %></h3><span><a class="deleteItem" href=""><i class="fa fa-times fa-2x"></i></a></span>',
'<div class="editItem">',
'<button id="editedItem" class="btn btn-primary">Edit Item</button>',
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
