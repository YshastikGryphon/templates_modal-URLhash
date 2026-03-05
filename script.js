document.addEventListener('DOMContentLoaded', () => {



modalUrl();
function modalUrl() {
  // ***
  const renderLimit = 3; // How many windows can be rendered at a time 
  // 3 !recomended! - render: previous, current, next
  // 2 - render: current, next (back window flicker)
  // 1 - render: next (current window flicker)
  let _renderedWindows = []; // Array of elements with display flex. Other - display none
  // ***

  const modalWindows = $('.window-js');
  const modalWindowsBack = $('.window-js-back');
  const modalWindowsClear = $('.window-js-clear');

  // system back and clear buttons
  modalWindowsClear.on('click', () => {
    const fullURL = new URL(window.location.href);
    history.pushState(null, null, `${fullURL.pathname}${fullURL.search}`);
    openByUrl();
  });
  modalWindowsBack.on('click', () => {
    history.back();
  });

  
  // open based on Url hash
  openByUrl();
  function openByUrl() {
    const fullURL = new URL(window.location.href);
    // clear all modals
    modalWindows.each(function () {
      $(this).removeClass('active');
    });

    // select based on hash
    const selectedID = $(`${fullURL.hash}`);
    // id HTMLelement isn't a window
    if (!selectedID.hasClass('window-js')) {
      return;
    };

    const activeWindow = $(`${fullURL.hash}`);
    setTimeout(() => {
      activeWindow.addClass('active');   
    }, 0);
    
    // ***
    // Additional code. Can be removed if unnecessary
    // Sets display:none property to a modal window
    // Makes only {renderLimit} modal windows renderred at a time
    activeWindow.css('display', 'flex');

    // save as "rendered" in memory
    if (_renderedWindows.length > 0) {
      // push only different
      if(_renderedWindows[0][0] !== activeWindow[0]) {
        _renderedWindows.push(activeWindow);
      };
    } else {
      // push first
      _renderedWindows.push(activeWindow);
    };
    
    // disable over the limit
    if (_renderedWindows.length > renderLimit) {
      _renderedWindows.shift().css('display', 'none');
    };

    /*
    console.log(' These windows are rendered ');
    _renderedWindows.forEach(element => {
      console.log('#' + element[0].id)
    });
    console.log('*********');
    */
    // Additional code. Can be removed if unnecessary
    // ***
  };

  // listen url
  $(window).on('popstate', () => {
    openByUrl();
  });
};




});