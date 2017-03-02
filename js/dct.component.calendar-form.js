(function(App, Component){

  function define(){
    if(Component && !Component.CalendarForm){
      construct();
    }
  }

  function construct(){
    Component.CalendarForm = function(View){
      
      function init(){
        console.log("Initiated");
      }

      return {
        Init: init
      };
    };
  }

  define();
})(DynamicCalendarTask, DynamicCalendarTask.Component);