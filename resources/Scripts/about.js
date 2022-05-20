$(document).ready(function ()
{
   $("#about_menu").click(function ()
   {
      $("#about_dialog").show();
   });

   $("#aboutBtnClose").click(function ()
   {
      $("#about_dialog").hide();
   });

   $(document).keydown(function (event) {
      if (event.keyCode === 27) {
         // close the about dialog by click on esc
          $("#about_dialog").hide();  
      }
   });

   $(document).mouseup(function(event) 
   {
       var container = $("#about_dialog");
       // if the target of the click isn't the container nor a descendant of the container
       if (!container.is(event.target) && container.has(event.target).length === 0) 
       {
           container.hide();
       }
   });
});



