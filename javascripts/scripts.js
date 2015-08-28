// Scripts
document.addEventListener("DOMContentLoaded", function () {
  Array.prototype.slice.call(document.querySelectorAll('.nav-toggle')).forEach(function (toggle) {
    toggle.addEventListener('click', add_active);
  })

  if (!!location.pathname) {
    document.head.querySelector('base').setAttribute('href', '/');
  }

  function add_active(e) {
    this.classList.toggle('active');
  }

  var header = document.querySelector('body > header'),
      offset = header.offsetTop;
  document.addEventListener("scroll", function (e) {
    if (this.scrollingElement.scrollTop > offset) {
      header.classList.add("fix");
    } else {
      header.classList.remove("fix");
    }
  });

  setTimeout((function () {
    var hidden = "hidden";

    // Standards:
    if (hidden in document)
      document.addEventListener("visibilitychange", onchange);
    else if ((hidden = "mozHidden") in document)
      document.addEventListener("mozvisibilitychange", onchange);
    else if ((hidden = "webkitHidden") in document)
      document.addEventListener("webkitvisibilitychange", onchange);
    else if ((hidden = "msHidden") in document)
      document.addEventListener("msvisibilitychange", onchange);
      // IE 9 and lower:
    else if ("onfocusin" in document)
      document.onfocusin = document.onfocusout = onchange;
      // All others:
    else
      window.onpageshow = window.onpagehide
      = window.onfocus = window.onblur = onchange;

    function onchange(evt) {
      var v = "visible", h = "hidden",
          evtMap = {
            focus: v, focusin: v, pageshow: v, blur: h, focusout: h, pagehide: h
          };

      evt = evt || window.event;
      if (evt.type in evtMap)
        document.body.className = evtMap[evt.type];
      else
        document.body.className = this[hidden] ? "hidden" : "visible";
    }

    // set the initial state (but only if browser supports the Page Visibility API)
    if (document[hidden] !== undefined)
      onchange({ type: document[hidden] ? "blur" : "focus" });
  }), 100);
});

