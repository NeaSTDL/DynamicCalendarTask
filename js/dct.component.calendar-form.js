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
            buttons: {},
            fields: []
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

      function _clearErrorMessages(){
        $(".errorMessage").html("");
        $(".errorMessage").removeClass("shown");
      }

      function _validateFields(){
        if(dom.fields.startDate.val() == ""){
          _showErrorMessage("startDate", "Please, select a date value!");
          return false;
        }
        if(dom.fields.noOfDays.val() == ""){
          _showErrorMessage("noOfDays", "Please, input a number!");
          return false;
        }
        if(dom.fields.noOfDays.val() < 1){
          _showErrorMessage("noOfDays", "Please, input a value higher or equal than one!");
          return false;
        }
        if(dom.fields.countryCode.val() == ""){
          _showErrorMessage("countryCode", "Please, input a country code string!");
          return false;
        }
        return true;
      }

      function _showErrorMessage(field, message){
        $(".errorMessage[for='" + field + "']").addClass("shown");
        $(".errorMessage[for='" + field + "']").html(message);        
      }

      function onSubmitButtonClick(event){
        event.preventDefault();
        _clearErrorMessages();
        if(_validateFields()){
          _calculateCalendars();
        }
      }

      function _calculateCalendars(){
        console.log("Calculated calendars");
      }

      return {
        Init: init
      };
    };
  }

  define();
})(DynamicCalendarTask, DynamicCalendarTask.Component);