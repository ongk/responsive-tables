$(document).ready(function() {

  var lastWidth = 0;

  $(window).load(function() {
    lastWidth = $(window).width();
  });

  $(".expand-table").on("click", ".fa-chevron-right, .fa-chevron-down", function(e) {
    var icon = $(this);
    var summaryRow = icon.closest("tr");
    var detailRow = summaryRow.next();

    icon.toggleClass("fa-chevron-down");
    detailRow.toggleClass("expanded");

    if (detailRow.closest("table").hasClass("action-table")) {
      if (detailRow.hasClass("expanded")) {
        var actionColHeight = detailRow.offset().top + detailRow.height() - summaryRow.offset().top - 18;
        summaryRow.find("td:last-child").css("height", actionColHeight);
      } else {
        summaryRow.find("td:last-child").css("height", "inherit");
      }
    }
  });

  $(window).resize(function() {
    var curWidth = $(window).width();
    if (lastWidth !== curWidth) {
      $(".action-table .expanded").each(function() {
        var detailRow = $(this);
        var summaryRow = detailRow.prev();
        var actionColHeight = detailRow.offset().top + detailRow.height() - summaryRow.offset().top - 18;
        summaryRow.find("td:last-child").css("height", actionColHeight);
      });
    }
  });

});