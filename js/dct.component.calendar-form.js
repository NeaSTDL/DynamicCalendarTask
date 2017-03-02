(function(App, Component){

  function define(){
    if(Component && !Component.CalendarForm){
      construct();
    }
  }

  function construct(){
    Component.CalendarForm = function(View){
      
      var handler = null,
          dom = {
            buttons: {}
            fields: {}
          };

      function init(me){
        handler = me;
        
        _initDomElements();
        _initEventBindings();
      }

      function _initDomElements(){
        dom.buttons.submit = handler.find("button");
        dom.fields.startDate = handler.find("#startDate");
        dom.fields.noOfDays = handler.find("#noOfDays");
        dom.fields.countryCode = handler.find("#countryCode");
      }

      function _initEventBindings(){
        dom.buttons.submit.on("click", onSubmitButtonClick);
      }

      function onSubmitButtonClick(event){
        event.preventDefault();
        console.log("Button clicked");
      }

      return {
        Init: init
      };
    };
  }

  define();
})(DynamicCalendarTask, DynamicCalendarTask.Component);