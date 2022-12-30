function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    openFullscreen(fullscreen);
}

function openFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
    element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE11 */
    element.msRequestFullscreen();
    }

    fullscreenIconDisappear();
  }

  function fullscreenIconDisappear() {
    document.getElementById('fullscreen-icon').classList.add('d-none');
    document.getElementById('nofullscreen-icon').classList.remove('d-none');
  }


  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }

    fullscreenIconAppear();
  }

  function fullscreenIconAppear() {
    document.getElementById('fullscreen-icon').classList.remove('d-none');
    document.getElementById('nofullscreen-icon').classList.add('d-none');
  }