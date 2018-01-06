/**
 * dynamic tab 
 */

  (function() {
    setTimeout(function () {

      var dynamicTabBar = window.dynamicTabBar = new mdc.tabs.MDCTabBar(document.querySelector('#dynamic-tab-bar'));
      var dots = document.querySelector('.dots');
      var panels = document.querySelector('.panels');

      dynamicTabBar.preventDefaultOnClick = true;

      function updateDot(index) {
        var activeDot = dots.querySelector('.dot.active');
        if (activeDot) {
          activeDot.classList.remove('active');
        }
        var newActiveDot = dots.querySelector('.dot:nth-child(' + (index + 1) + ')');
        if (newActiveDot) {
          newActiveDot.classList.add('active');
        }
      }

      function updatePanel(index) {
        var activePanel = panels.querySelector('.panel.active');
        if (activePanel) {
          activePanel.classList.remove('active');
        }
        var newActivePanel = panels.querySelector('.panel:nth-child(' + (index + 1) + ')');
        if (newActivePanel) {
          newActivePanel.classList.add('active');
        }
      }

      dynamicTabBar.listen('MDCTabBar:change', function (t) {
        var dynamicTabBar = t.detail;
        var nthChildIndex = dynamicTabBar.activeTabIndex;

        updatePanel(nthChildIndex);
        updateDot(nthChildIndex);
      });

      dots.addEventListener('click', function (evt) {
        if (!evt.target.classList.contains('dot')) {
          return;
        }

        evt.preventDefault();

        var dotIndex = [].slice.call(dots.querySelectorAll('.dot')).indexOf(evt.target);

        if (dotIndex >= 0) {
          dynamicTabBar.activeTabIndex = dotIndex;
        }

        updatePanel(dotIndex);
        updateDot(dotIndex);
      });
    },200)
  })();
    

/**
 * drawer left
 */

document.querySelector('.menu-left').addEventListener('click', function() {
  var leftmenu = new mdc.drawer.MDCTemporaryDrawer(document.querySelector('.mdc-temporary-drawer-left'));
  return leftmenu.open = !leftmenu.open;
});

/**
 * temporary drawer rtl
 */

document.querySelector('.menu-right').addEventListener('click', function() {
return new mdc.drawer.MDCTemporaryDrawer(document.querySelector('.mdc-temporary-drawer-right')).open = true;
});

/**
 * DIALOG
 */
 (function() {
var dialog = new mdc.dialog.MDCDialog(document.querySelector('#login-mdc-dialog'));
document.querySelector('#login-dialog-activation').addEventListener('click', function (evt) {
dialog.lastFocusedTarget = evt.target;
dialog.show();
});
})();
