$(document).ready(function () {
  // add toggle functionality to abstract, award and bibtex buttons
  $("a.abstract").click(function () {
    $(this).parent().parent().find(".abstract.hidden").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.award").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.bibtex").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden").toggleClass("open");
  });

  $(".publication-card[data-paper-url]").each(function () {
    const card = $(this);
    const item = card.closest("li");

    item.addClass("publication-card-clickable");
    item.attr("tabindex", "0");
    item.attr("role", "link");
    item.attr("aria-label", card.attr("aria-label"));
  });

  function shouldSkipPublicationCardOpen(target) {
    return $(target).closest("a, button, input, textarea, select, label, .more-authors, .hidden, pre, code").length > 0;
  }

  $(".publication-card-clickable").on("click", function (event) {
    if (shouldSkipPublicationCardOpen(event.target)) {
      return;
    }

    const url = $(this).find(".publication-card[data-paper-url]").attr("data-paper-url");
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  });

  $(".publication-card-clickable").on("keydown", function (event) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    if (shouldSkipPublicationCardOpen(event.target)) {
      return;
    }

    const url = $(this).find(".publication-card[data-paper-url]").attr("data-paper-url");
    if (url) {
      event.preventDefault();
      window.open(url, "_blank", "noopener,noreferrer");
    }
  });

  $("a").removeClass("waves-effect waves-light");

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let theme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (theme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });
});
