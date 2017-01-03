Todo = {
    tasks: [],
    counter: 0,
    
    saveTask: function () {
        var title = $('input[name=title]').val();
        var date = $('input[name=date]').val();
        var description = $('textarea[name=description]').val();

        var task = new Task(title, date, description);

        this.tasks.push(task);

        this.getCounter();

        this.resetFields();

        $('#board').append(task.generateHTML());

        console.log(this.tasks);
    },

    getCounter: function () {
        this.counter = this.counter+1;

        var counter = document.getElementById('counter');
        $('#counter').text("You have" + " " + (this.tasks.length) + " " + "tasks");
    },

    removeTask: function ( e ) {
        var task = $(e.target).closest('.task');
        var index = task.index();
        this.tasks.splice( index, 1 );
        
        var confirmDelete = confirm("Are you sure you want to delete your task?");
        if (confirmDelete == true) {
            event.target.parentElement.parentElement.parentElement.remove();
        }

        this.getCounter();
        console.log(this.tasks);
    },

    resetFields: function () {
        $('#form input').val('');
        $('#form textarea').val('');
    },

    bindEvents: function () {
        $('button').on('click', $.proxy(this.saveTask, Todo));
        $('#board').on('click', '.remove-icon', $.proxy(this.removeTask, Todo));
    },

    init: function () {
        this.bindEvents();
        this.getCounter();
    }
};

Todo.init();