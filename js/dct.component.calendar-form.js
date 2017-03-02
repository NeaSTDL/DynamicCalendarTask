(function(App, Component){

  function define(){
    if(Component && !Component.CalendarForm){
      construct();
    }
  }

  function construct(){
    Component.CalendarForm = function(View){
      
      var handler = null,
          config = {},
          dom = {
            buttons: {},
            fields: []
          };

      function init(me, settings){
        handler = me;

        _initConfiguration(settings);
        _initDomElements();
        _initEventBindings();
      }

      function _initConfiguration(settings){
        $.extend(true, config, settings);
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
        var initialDate = $("#startDate").val(),
            amountOfDays = $("#noOfDays").val(),
            countryCode = $("#countryCode").val(),
            lastDate = addDays(initialDate, amountOfDays),
            currentDate = initialDate,
            dateLimits = []; 

        // Loop to get date limits by month
        while(moment(currentDate).isBefore(lastDate)){
          var initialDay = moment(currentDate).format(),
              lastDay = moment(currentDate).month() !== moment(lastDate).month() ? moment(currentDate).endOf("month").format() : moment(currentDate).year() !== moment(lastDate).year() ? moment(currentDate).endOf("month").format() : lastDate.format(),
              month = moment(currentDate).format("MMMM Y");
          
          dateLimits.push({
            initialDay: initialDay,
            lastDay: lastDay,
            month: month
          });
          
          currentDate = moment(currentDate).add(1, "month").startOf("month");
        }

        // Clear past results
        $(config.container).empty();

        // Append resulting calendar
        dateLimits.map(function(element, index){
          $(config.container).append( drawCalendar( element.initialDay, element.lastDay, element.month ) );
        });
      }

      function addDays(date, days){
        return moment(date).add(days, "days");
      }

      function drawCalendar(initialDate, lastDate, month){
        var currentDate = initialDate,
            currentWeekDay = 0;
            markup = $("<table></table>"),
            headers = ["S", "M", "T", "W", "T", "F", "S"],
            head = $("<tr></tr>");

        headers.map(function(element, index){
          var header = $("<th></th>").html(element);
          head.append(header);
        });
        markup.append(head);
        markup.append( $("<tr></tr>").addClass("table-month").append( $("<td colspan=7></td>").html(month) ));
        while( moment(currentDate).isBefore(lastDate) ){ 
          var row = $("<tr></tr>");
          for(var i = 0; i < 7; i++){
            var item = $("<td></td>"),
                currentWeekDay = moment(currentDate).weekday();
            if( currentWeekDay === i && moment(currentDate).isBefore(lastDate) ){
              if(i==0 || i==6){
                item.addClass("weekends");
              } else {
                item.addClass("weekday");
              }
              item.html(moment(currentDate).date());
              currentDate = moment(currentDate).add(1, "day").format();
            }
            row.append(item);
          }
          markup.append(row);
        }
        return markup;
      }

      return {
        Init: init
      };
    };
  }

  define();
})(DynamicCalendarTask, DynamicCalendarTask.Component);