var currentDay = document.querySelector("#currentDay");
var timeBlockList = document.querySelector("#time-block-list");

$('#currentDay').text(dayjs().format('ddd, DD MMM YYYY'));

for(var i=0; i<10; i++){
    var li = $('<li>').addClass("time-block");
    var daylength = 9 + i;
    var currentHour = dayjs().format("h");
    var textValue = "";

    // Create a Date() object with jQuery.
    var d = new Date(new Date().getFullYear(), 0, 0, daylength, 0, 0);

    var divLeft = $("<div></div>")
            .addClass('side-panel left hour').text(dayjs(d).format('h A'));
    
    li.append(divLeft);

    //  If data is stored in localStorage for the TimeBlock
    // print it to the textArea
    if(localStorage.getItem(dayjs(d).format('h A')) != null){
        textValue = localStorage.getItem(dayjs(d).format('h A'));
    }

    var textarea = $('<textarea>').text(textValue);
    var id = i+1;
    textarea.attr("id", id);

    li.append(textarea);

    var divRight = $("<div class='side-panel right'><i class='fa fa-save'></i></div>");
    divRight.addClass("saveBtn");

    li.append(divRight);
    
    $("#time-block-list").append(li);

    if(daylength < dayjs().format('H')){
        $('#'+id).addClass("past");
    } else if(daylength == dayjs().format('H')){
        $('#'+id).addClass("present");
    } else {
        $('#'+id).addClass("future");
    }

}

$("#time-block-list").on("click", 'i', function(event){
    event.preventDefault();
    
    localStorage.setItem($(this).parent().siblings().get(0).textContent,
                                        $(this).parent().siblings().get(1).value);
});