/**
 * The function constructor the Task
 * **/
function Task(title, date, description) {
    this.title = title;
    this.date = date;
    this.description = description;

    /**
     * The function return information using in a DOM with the command:
     " return '' +
     '<div class="task">' +
     '    <h3>' + this.title + '</h3>' +
     '    <time>' + this.date + '</time>' +
     '    <p>' + this.description + '</p>' +
     '</div>'; "
     * **/
    this.generateHTML = function () {
        return '' +
            '<div class="task">' +
            '<span>' +
                '<a class="remove-icon">' +
                    '<i class="fa fa-remove"></i>' +
                '</a>' +
            '</span>' +
            '<span>' +
                '<a class="edit-icon">' +
                    '<i class="fa fa-pencil"></i>' +
                '</a>' +
            '</span>' +
            '    <h3>' + this.title + '</h3>' +
            '    <time>' + this.date + '</time>' +
            '    <p>' + this.description + '</p>' +
            '</div>';
    }
}