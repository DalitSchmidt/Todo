// @Todo: writing some notes

Todo = {
    /**
     * tasks array
     **/
    tasks: [],
    counter: 0,

    /**
     * The function saves the tasks
     * **/
    saveTask: function () {
        /**
         * Takes the values that are in input - title, date and description to their name
         **/
        var title = $('input[name=title]').val();
        var date = $('input[name=date]').val();
        var description = $('textarea[name=description]').val();

        /**
         * Add a new Task (title, date, description)
         * **/
        var task = new Task(title, date, description);

        /**
         * Adding the values entered in the system via push
         **/
        this.tasks.push(task);

        this.getCounter();

        this.editTask();

        /**
         * Calling the function of reset fields
         * **/
        this.resetFields();

        /**
         * Running role of maintaining the information in localStorage
         * **/
        this.saveTasksToLocalStorage();

        /**
         * Activating which claims all information is stored in localStorage
         * **/
        this.loadTasksFromLocalStorage();

        /**
         * View the tasks[] in console.log
         * **/
        console.log(this.tasks);
    },

    getCounter: function () {
        this.counter = this.counter+1;

        var counter = document.getElementById("counter");
        $('#counter').text("You have" + " " + (this.tasks.length) + " " + "tasks");
    },

    removeTask: function( e ) {
        /**
         * 'e' is the description of the whole event
         * one of the properties in the event is 'target'
         * e.target is the element that we clicked on
         *
         * So e.target is the native (js) element, not yet
         * with the jQuery functionality, we have to put the element (e.target)
         * inside jQuery: $(e.target) - and now we can use the jQuery methods
         *
         * '.closest('.task')' find the closest element to the given one (in this case
         * the given element is a.remove) with the class called 'task'
         *
         * The var 'task' is now the element we need (the element that contains the
         * <a> we clicked on.
         * 'task.index()' finds the index of the element among the other similar
         * elements (in this case it looks for the index of the task element among
         * the other '.task' elements)
         * 
         * 'this.tasks' is the array inside the object, and splice just remove the
         * current item - remember that the items in the DOM (i mean, .task elements)
         * are arranged by the same order as in the array (this.tasks array)
         * The array actually reflects the DOM, it kinda saves a "copy" of the DOM
         * 
         * Finally, we encode the array to be json (using the stringify method)
         * and put it in the store, thus, we override the last value that was
         * exist in the store before
         **/
        var task = $(e.target).closest('.task');
        var index = task.index();
        this.tasks.splice( index, 1 );
        localStorage.setItem('tasks', JSON.stringify( this.tasks ));

        var confirmDelete = confirm("Are you sure you want to delete your task?");

        if (confirmDelete == true) {

            event.target.parentElement.parentElement.parentElement.remove();
            /*var indexToRemoveFromArray = event.target;

            for (var i=0; i<this.tasks.length; i++) {
                if (this.tasks[i] == indexToRemoveFromArray) {
                    this.tasks.splice(i, 1);
                    break;
                }
            }*/

        }
        this.getCounter();
        console.log(this.tasks);
    },

    editTask: function () {

        // Get the modal
        var modal = document.getElementById('myModal');

        // Get the button that opens the modal
        //var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        //var span = document.getElementsByClassName("close")[0];

        // When the user clicks on the button, open the modal
        $('#board').on('click', '.edit-icon', function () {
            modal.style.display = "block";
        });
        /*btn.onclick = function() {
            modal.style.display = "block";
        }*/

        // When the user clicks on <span> (x), close the modal
        $('.close').on('click', function () {
            modal.style.display = "none";
        });
        /*span.onclick = function() {
            modal.style.display = "none";
        }*/

        // When the user clicks anywhere outside of the modal, close it
        $(document).on('click', function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
        /*window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }*/
    },

    // @Todo: write this function
    /**
     * The function saved the tasks in localStorage
     * **/
    saveTasksToLocalStorage: function () {
    /**
     * Saved missions in localStorage, when values are stored in the values entered in input (set of tasks) using an array of tasks JSON.stringify
     * **/
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },

    /**
     * The function displays all the information from the localStorage in DOM
     * **/
    loadTasksFromLocalStorage: function () {
        /**
         * Cleaning #board with the command empty
         * **/
        $('#board').empty();

        /**
         * Reading an array of tasks using: 'this.tasks = [];' - driven dual display of tasks each adding a new task
         * **/
        this.tasks = [];

        /**
         * Loading information stored in LocalStorage using the command JSON.parse (localStorage.getItem ('tasks'));
         * **/
        var load = JSON.parse(localStorage.getItem('tasks'));

        if (load == null) {
            localStorage.setItem('tasks', '[]');
            return;
        }

        /**
         * For loop which claims all information is saved in localStorage
         * **/
        for (var i = 0; i < load.length; i++) {
            var title = load[i].title;
            var date = load[i].date;
            var description = load[i].description;

            /**
             * Add a new Task (title, date, description)
             * **/
            var task = new Task(title, date, description);

            /**
             * * Adding the values entered in the system via push
             * **/
            this.tasks.push(task);

            /**
             * Making append to #board and bringing information of task by running the command task.generateHTML
             *  **/
            $('#board').append(task.generateHTML());
        }
    },

    /**
     *The function reset the input fields that in #form
     *  **/
    resetFields: function () {
        $('#form input').val('');
        $('#form textarea').val('');
    },

    /**
     * The function 'BindEvents()' operates all the elements and events page when clicking on the button with the command $('button').On('click', $.proxy this.saveTask, Todo));
     * The function 'BindEvents()' must register every object literal.
     *  **/
    bindEvents: function () {
        $('button').on('click', $.proxy(this.saveTask, Todo));
        $('#board').on('click', '.remove-icon', $.proxy(this.removeTask, Todo));
        $('#board').on('click', '.edit-icon', $.proxy(this.editTask, Todo));
    },

    /**
     * * The function 'init()' performs initialization by calling (activation) of the function 'BindEvents()' and 'loadTasksFromLocalStorage()'.
     * The function 'init()' must register every object literal.
     * **/
    init: function () {
        this.bindEvents();
        this.loadTasksFromLocalStorage();
        this.getCounter();
    }
};

/**
 * Boot each object 'Todo.init()'
 * **/
Todo.init();