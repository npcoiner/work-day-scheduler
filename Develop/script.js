//current day formated
var currentDay = dayjs().format('MMM D, YYYY, hh:mm:ss a');
var currentHour = dayjs().hour();


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $('.time-block').on("click", '.saveBtn', function(e) {
    var $this = $(this)
    var timeIndex = parseInt($this.attr('id')); //gives id of button
    console.log(timeIndex)
    var events = readEventsFromStorage();
    if (!events){
      events = [];
    }
    var input = ($this.parent().children('textarea').val());
    console.log(input);
    events[timeIndex] = input;
    saveEventsToStorage(events);
    console.log(events);
    getAndSetFromStorage();
  });
  
  //TODO: Add a function which saves all events to storage
  function saveEventsToStorage(events){
    localStorage.setItem('events', JSON.stringify(events));
  }
  //TODO: Add a function which reads all events from storage and displays them
  //onto the page. Should create a div element following the guidelines of the HTML 
  //with an hourly block for each standard business hour
  function readEventsFromStorage(){
    var events = localStorage.getItem('events');
    if (events) {
      events = JSON.parse(events);
    } else {
      events = [];
    }
    return events;
  }

  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  function getTense(blockTime){
    console.log(blockTime);
    console.log(currentHour)
    if( blockTime < currentHour){
      return "past";
    }
    if(blockTime == currentHour){
      return "present";
    }
    else{
      return "future";
    }
  }
  $('.time-block').each(function(i) {
    var blockTime = parseInt($(this).attr('id'));
    console.log("this" + blockTime)
    $(this).attr('tense',  getTense(blockTime))
  });


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  function getAndSetFromStorage(){
    var events = readEventsFromStorage();
    console.log(events)
    if (events) {
      $('.time-block').each(function() {
        var $this = $(this);
        var index = $this.attr('id');
        console.log("index" + index)
        if (events[index]){
          console.log("Setting: " + events[index])
          $this.children("textarea").val(events[index]);
        }
      });
    } else {
      return;
    }
  };
  // TODO: Add code to display the current date in the header of the page.
  function showDate(){
    $('#currentDay').text(currentDay)
  } 
  //call getAndSetFromStorage
  getAndSetFromStorage();
  //call showDate
  showDate();
});


