var templates = {};


templates.toDo = [
'<article data-itemid="<%= _id %>">',
'<li><h3><%= title %><h3>',
'<div class="tempBtns">',
'<a class="deleteItem" href="">Delete</a>',
'<a class="showEditItem" href="">Edit</a>',
'</div>',
'</li>',
'<form class ="editItem" action="">',
'<input type="text" name="editTitle" value="<%= title %>">',
'<button type="submit" class="btn btn-primary">Edit Item</button>',
'</form>',
'</article>'


].join("");
