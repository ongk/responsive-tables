$(document).ready(function() {

  var lastWidth = 0;

  $(window).load(function() {
    lastWidth = $(window).width();
  });

  $(".expand-table").on("click", ".summary-only td:first-child, .multi-select-col + td", function(e) {
    var point = e.clientX;
    var leftBound = e.target.offsetLeft + 15;
    var rightBound = e.target.offsetLeft + 30;

    if (point > leftBound && point < rightBound) {
      var summaryRow = $(this).parent();
      var detailRow = summaryRow.next();

      detailRow.toggleClass("expanded");

      if (detailRow.closest("table").hasClass("action-table")) {
        if (detailRow.hasClass("expanded")) {
          var actionColHeight = detailRow.offset().top + detailRow.height() - summaryRow.offset().top - 18;
          summaryRow.find("td:last-child").css("height", actionColHeight);
        } else {
          summaryRow.find("td:last-child").css("height", "inherit");
        }
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