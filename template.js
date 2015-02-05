var templates = {};


templates.toDo = [
'<article data-itemid="<%= _id %>">',
'<h3><%= title %></h3>',
'<div class="tempBtns">',
'<button class="deleteItem">Delete</button>',
'<button class="showEditItem">Edit</button>',
'</div>',
'<form class ="editItem" action="">',
'<input type="text" name="editTitle" value="<%= title %>">',
'<button type="submit" class="btn btn-primary">Edit Item</button>',
'</form>',
'</article>'


].join("");
