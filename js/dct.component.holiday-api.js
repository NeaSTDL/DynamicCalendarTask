(function(App, Component){

  function define(){
    if(Component && !Component.HolidayApi){
      construct();
    }
  }

  function construct(){
    Component.HolidayApi = function(View){

      var handler = null,
          config = {
            mode: "test"
          },
          dom = {};

      function init(me, settings){
        handler = me;

        _initConfiguration(settings);
      }

      function _initConfiguration(settings){
        $.extend(true, config, settings);
      }

      function _assembleUrl(country, year){
        return "https://holidayapi.com/v1/holidays?key=" + config.key[config.mode] + "&country=" + country + "&year=" + year;
      }

      function getHolidays(query, success, error){
        $.ajax({
          url: _assembleUrl(query.country, query.year),
          type: "GET",
          success: success,
          error: error
        });
      }

      return {
        Init: init,
        Get: getHolidays,
      };

    }
  }

  define();
})(DynamicCalendarTask, DynamicCalendarTask.Component);
