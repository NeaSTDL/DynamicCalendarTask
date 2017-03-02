(function(App, View, Component){
  'use strict';

  var Wrapper = {
    Component: {}
  };

  function define(){
    if(View && !View.Main){
      construct();
    }
  }

  function construct(){
    View.Main = Wrapper;
  }

  function init(){
    _initCalendarForm();
  }

  function _initCalendarForm(){
    var element = $("#calendarForm"),
        settings = {
          container: ".results"
        };
    if(Component.CalendarForm){
      Wrapper.Component.CalendarForm = new Component.CalendarForm( Wrapper );
      Wrapper.Component.CalendarForm.Init(element, settings);
    }
  }

  define();
  init();
})(DynamicCalendarTask, DynamicCalendarTask.View, DynamicCalendarTask.Component);