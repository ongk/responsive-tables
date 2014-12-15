$(document).ready(function() {

  var lastWidth = 0;

  $(window).load(function() {
    lastWidth = $(window).width();
  });

  var initActionColumn = function() {
    var actionColWidth = $(".action-table tbody tr:first-child td:last-child").width();
    $(".action-table").css("padding-right", actionColWidth+14);
    $(".action-table thead tr th:last-child").width(actionColWidth);
  };

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

  $(".action-table th.multi-select-col input:checkbox").on("click", function() {
    var isChecked = $(this).is(":checked");
    if (isChecked) {
      $(".multi-select-col").closest("tr").addClass("row-selected").find("input:checkbox").attr("checked", "checked");
    } else {
      $(".multi-select-col").closest("tr").removeClass("row-selected").find("input:checkbox").removeAttr("checked");
    }
  });

  $(".action-table td.multi-select-col input:checkbox").on("click", function() {
    var isChecked = $(this).is(":checked");
    if (isChecked) {
      $(this).closest("tr").addClass("row-selected");
    } else {
      $(this).closest("tr").removeClass("row-selected");
      $(".action-table th.multi-select-col input:checkbox").removeAttr("checked");
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

  initActionColumn();

});