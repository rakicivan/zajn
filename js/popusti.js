$(function() {
  var $container = $('#container');
  $container.mixItUp();
  $("button.nofloat").click(function() {
    $container.find(".mix").css({
      "float": "none",
      "margin": "0 0 4px 0"
    });
    $container.find(".clear").css("clear", "none");
  });
  $("button.float").click(function() {
    $container.find(".mix").css({
      "float": "left",
      "margin": "0 4px 4px 0"
    });
    $container.find(".clear").css(
      "clear", "both");
  });
});