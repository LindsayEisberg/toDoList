renderFooter: function () {
  var todoCount = this.todos.length;
  var activeTodoCount = this.getActiveTodos().length;
  var template = this.footerTemplate({
    activeTodoCount: activeTodoCount,
    activeTodoWord: util.pluralize(activeTodoCount, 'item'),
    completedTodos: todoCount - activeTodoCount,
    filter: this.filter
  });

  this.$footer.toggle(todoCount > 0).html(template);

  <script id="footer-template" type="text/x-handlebars-template">
      <span id="todo-count"><strong>{{activeTodoCount}}</strong> {{activeTodoWord}} left</span>
      <ul id="filters">
        <li>
          <a {{#eq filter 'all'}}class="selected"{{/eq}} href="#/all">All</a>
        </li>
        <li>
          <a {{#eq filter 'active'}}class="selected"{{/eq}}href="#/active">Active</a>
        </li>
        <li>
          <a {{#eq filter 'completed'}}class="selected"{{/eq}}href="#/completed">Completed</a>
        </li>
      </ul>
      {{#if completedTodos}}<button id="clear-completed">Clear completed ({{completedTodos}})</button>{{/if}}
    </script>


    var completedCount = parseInt($(".completed > .listItemCard").length)

          function completeNum(e){
            completedCount ++;

            document.getElementById('completedCount').innerHTML = completedCount-1;
            return true
          }

          completeNum()

        });

        },
