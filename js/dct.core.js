(function(wnd){
  'use strict';

  function init(){
    wnd.DynamicCalendarTask = wnd.DynamicCalendarTask ? wnd.DynamicCalendarTask : {}; 
  }

  function construct(){
    wnd.DynamicCalendarTask.View = wnd.DynamicCalendarTask.View ? wnd.DynamicCalendarTask.View : {};
    wnd.DynamicCalendarTask.Component = wnd.DynamicCalendarTask.Component ? wnd.DynamicCalendarTask.Component : {};
  }

  init();
  construct();
})(window);