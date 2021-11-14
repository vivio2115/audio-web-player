document.onreadystatechange = function () {
  if (document.readyState === 'complete') {

    var settingsObject;
    var isMouseDown = false;
    var playingTrackNumber;
    var volumeControlAngle;
    var volumeCache;
    var refreshPlayerProgressInterval1;
    var refreshPlayerProgressInterval2;
    var refreshPlayerProgressInterval3;
    var startTabindexValue = 0;

    var audioWebPlayerContainer = document.getElementById('audio-web-player');
    var audioWebPlayerModalWindowWrapperElement = document.createElement('div');
    audioWebPlayerModalWindowWrapperElement.id = 'audio-web-player-modal-window-wrapper';
    audioWebPlayerModalWindowWrapperElement.className = 'not-displayed';
    var audioWebPlayerModalWindowElement = document.createElement('div');
    audioWebPlayerModalWindowElement.id = 'audio-web-player-modal-window';
    audioWebPlayerModalWindowWrapperElement.appendChild(audioWebPlayerModalWindowElement);
    var audioWebPlayerModalWindowCloseIconElement = document.createElement('img');
    audioWebPlayerModalWindowCloseIconElement.id = 'audio-web-player-modal-window-close-icon';
    audioWebPlayerModalWindowCloseIconElement.setAttribute('src', 'awp/sources/close.svg');
    audioWebPlayerModalWindowCloseIconElement.setAttribute('alt', 'Ikona do zamykania podglądu okładki albumu');
    audioWebPlayerModalWindowCloseIconElement.setAttribute('role', 'button');
    audioWebPlayerModalWindowCloseIconElement.setAttribute('aria-label', 'Zamknij podgląd okładki albumu');
    audioWebPlayerModalWindowCloseIconElement.setAttribute('title', 'Zamknij podgląd okładki albumu');
    audioWebPlayerModalWindowElement.appendChild(audioWebPlayerModalWindowCloseIconElement);
    var audioWebPlayerModalWindowMainImageElement = document.createElement('img');
    audioWebPlayerModalWindowElement.appendChild(audioWebPlayerModalWindowMainImageElement);
    var audioWebPlayerTooltipElement = document.createElement('div');
    audioWebPlayerTooltipElement.id = 'audio-web-player-tooltip';
    var audioElement = document.createElement('audio');
    var headerTitleElement = document.createElement('h1');
    var audioWebPlayerSubElement = document.createElement('div');
    var audioWebPlayerCoverImageElement = document.createElement('div');
    audioWebPlayerCoverImageElement.id = 'audio-web-player-cover-image';
    var audioWebPlayerCoverImageSubElement = document.createElement('div');
    audioWebPlayerCoverImageElement.appendChild(audioWebPlayerCoverImageSubElement);
    audioWebPlayerSubElement.appendChild(audioWebPlayerCoverImageElement);
    var audioWebPlayerControlsElement = document.createElement('div');
    audioWebPlayerControlsElement.id = 'audio-web-player-current-track';
    audioWebPlayerSubElement.appendChild(audioWebPlayerControlsElement);
    var audioWebPlayerControlsSubElement = document.createElement('div');
    audioWebPlayerControlsElement.appendChild(audioWebPlayerControlsSubElement);
    var audioWebPlayerTrackTitleElement = document.createElement('div');
    audioWebPlayerTrackTitleElement.id = 'audio-web-player-track-title';
    audioWebPlayerTrackTitleElement.innerHTML = 'Tytuł utworu';
    audioWebPlayerControlsSubElement.appendChild(audioWebPlayerTrackTitleElement);
    var audioWebPlayerArtistNameElement = document.createElement('div');
    audioWebPlayerArtistNameElement.id = 'audio-web-player-artist-name';
    audioWebPlayerArtistNameElement.innerHTML = 'Nazwa artysty';
    audioWebPlayerControlsSubElement.appendChild(audioWebPlayerArtistNameElement);
    var audioWebPlayerControlsSubTwoElement = document.createElement('div');
    var audioWebPlayerControlsContainerElement = document.createElement('div');
    audioWebPlayerControlsSubTwoElement.appendChild(audioWebPlayerControlsContainerElement);
    var audioWebPlayerPrevIconElement = document.createElement('div');
    audioWebPlayerPrevIconElement.id = 'audio-web-player-prev-icon';
    audioWebPlayerPrevIconElement.setAttribute('class', '');
    audioWebPlayerPrevIconElement.setAttribute('role', 'button');
    audioWebPlayerPrevIconElement.setAttribute('aria-label', 'Przejdź do poprzedniego utworu');
    audioWebPlayerPrevIconElement.setAttribute('title', 'Przejdź do poprzedniego utworu');
    audioWebPlayerControlsContainerElement.prepend(audioWebPlayerPrevIconElement);
    var audioWebPlayerPlayPauseIconElement = document.createElement('div');
    audioWebPlayerPlayPauseIconElement.id = 'audio-web-player-play-pause-icon';
    audioWebPlayerPlayPauseIconElement.setAttribute('class', '');
    audioWebPlayerPlayPauseIconElement.setAttribute('role', 'button');
    audioWebPlayerPlayPauseIconElement.setAttribute('aria-label', 'Rozpocznij odtwarzanie utworu');
    audioWebPlayerPlayPauseIconElement.setAttribute('title', 'Rozpocznij odtwarzanie utworu');
    audioWebPlayerPlayPauseIconElement.style.display = 'block';
    audioWebPlayerControlsContainerElement.appendChild(audioWebPlayerPlayPauseIconElement);
    var audioWebPlayerStopIconElement = document.createElement('div');
    audioWebPlayerStopIconElement.id = 'audio-web-player-stop-icon';
    audioWebPlayerStopIconElement.className = 'disabled';
    audioWebPlayerStopIconElement.setAttribute('role', 'button');
    audioWebPlayerStopIconElement.setAttribute('aria-label', 'Zatrzymaj odtwarzanie utworu');
    audioWebPlayerStopIconElement.setAttribute('title', 'Zatrzymaj odtwarzanie utworu');
    audioWebPlayerControlsContainerElement.appendChild(audioWebPlayerStopIconElement);
    audioWebPlayerControlsElement.appendChild(audioWebPlayerControlsSubTwoElement);
    var audioWebPlayerNextIconElement = document.createElement('div');
    audioWebPlayerNextIconElement.id = 'audio-web-player-next-icon';
    audioWebPlayerNextIconElement.setAttribute('class', '');
    audioWebPlayerNextIconElement.setAttribute('role', 'button');
    audioWebPlayerNextIconElement.setAttribute('aria-label', 'Przejdź do następnego utworu');
    audioWebPlayerNextIconElement.setAttribute('title', 'Przejdź do następnego utworu');
    audioWebPlayerControlsContainerElement.appendChild(audioWebPlayerNextIconElement);
    audioWebPlayerVolumeKnobIconElement = document.createElement('div');
    audioWebPlayerVolumeKnobIconElement.id = 'audio-web-player-volume-knob-icon';
    audioWebPlayerVolumeKnobIconElement.setAttribute('role', 'slider');
    audioWebPlayerVolumeKnobIconElement.setAttribute('aria-valuemin', '0');
    audioWebPlayerVolumeKnobIconElement.setAttribute('aria-valuemax', '100');
    audioWebPlayerVolumeKnobIconElement.setAttribute('aria-label', 'Zmień poziom głośności');
    audioWebPlayerVolumeKnobIconElement.setAttribute('title', 'Zmień poziom głośności');
    audioWebPlayerControlsContainerElement.appendChild(audioWebPlayerVolumeKnobIconElement);
    var audioWebPlayerProgressTimeElement = document.createElement('div');
    audioWebPlayerProgressTimeElement.id = 'audio-web-player-progress-time';
    audioWebPlayerControlsSubTwoElement.appendChild(audioWebPlayerProgressTimeElement);
    var audioWebPlayerProgressBarElement = document.createElement('div');
    audioWebPlayerProgressBarElement.id = 'audio-web-player-progress-bar';
    audioWebPlayerProgressBarElement.setAttribute('role', 'progressbar');
    audioWebPlayerProgressBarElement.setAttribute('aria-valuenow', '0');
    audioWebPlayerProgressBarElement.setAttribute('aria-valuemin', '0');
    audioWebPlayerProgressBarElement.setAttribute('aria-valuemax', '100');
    audioWebPlayerProgressBarElement.setAttribute('aria-label', 'Postęp odtwarzanego utworu');
    audioWebPlayerProgressBarElement.setAttribute('title', 'Postęp odtwarzanego utworu');
    audioWebPlayerControlsElement.appendChild(audioWebPlayerProgressBarElement);
    var audioWebPlayerProgressBarSubElement = document.createElement('div');
    audioWebPlayerProgressBarElement.appendChild(audioWebPlayerProgressBarSubElement);
    var audioWebPlayerHeaderSubtitleElement = document.createElement('div');
    var audioWebPlayerPlaylistElement = document.createElement('table');

    function audioWebPlayerVolumeKnobIconChange(pointerPositionX, pointerPositionY, deviceType) {
      if (deviceType === 'desktop') {
        volumeControlAngle = (Math.atan2((audioWebPlayerVolumeKnobIconElement.getBoundingClientRect().top + audioWebPlayerVolumeKnobIconElement.getBoundingClientRect().height / 2) - pointerPositionY, (audioWebPlayerVolumeKnobIconElement.getBoundingClientRect().left + audioWebPlayerVolumeKnobIconElement.getBoundingClientRect().width / 2) -  pointerPositionX)  * 180 / Math.PI);
        audioWebPlayerTooltipElement.style.left = (pointerPositionX - audioWebPlayerContainer.getBoundingClientRect().left + 10).toString() + 'px';
        audioWebPlayerTooltipElement.style.top = (pointerPositionY - audioWebPlayerContainer.getBoundingClientRect().top + 15).toString() + 'px';
      } else if (deviceType === 'mobile') {
        volumeControlAngle = (Math.atan2((window.scrollY + audioWebPlayerVolumeKnobIconElement.getBoundingClientRect().top + audioWebPlayerVolumeKnobIconElement.getBoundingClientRect().height / 2) - pointerPositionY, (window.scrollX + audioWebPlayerVolumeKnobIconElement.getBoundingClientRect().left + audioWebPlayerVolumeKnobIconElement.getBoundingClientRect().width / 2) -  pointerPositionX)  * 180 / Math.PI);
        audioWebPlayerTooltipElement.style.left = ((pointerPositionX - window.scrollX) - audioWebPlayerContainer.getBoundingClientRect().left + 30).toString() + 'px';
        audioWebPlayerTooltipElement.style.top = ((pointerPositionY - window.scrollY) - audioWebPlayerContainer.getBoundingClientRect().top - 75).toString() + 'px';
      }
      if (volumeControlAngle >= -45 || volumeControlAngle <= -135) {
        audioWebPlayerVolumeKnobIconElement.firstChild.style.transform = 'rotate(' + (volumeControlAngle - 90).toString() + 'deg)';
        if (volumeControlAngle >= -45) {
          audioElement.volume = (volumeControlAngle + 45) / 270;
          audioWebPlayerTooltipElement.innerHTML = 'Głośność:&nbsp;' + Math.floor((volumeControlAngle + 45) / 270 * 100).toString() + '% ';
          audioWebPlayerVolumeKnobIconElement.setAttribute('aria-valuenow', Math.floor((volumeControlAngle + 45) / 270 * 100));
        } else if (volumeControlAngle <= -135) {
          audioElement.volume = (volumeControlAngle + 405) / 270;
          audioWebPlayerTooltipElement.innerHTML = 'Głośność:&nbsp;' + Math.ceil((volumeControlAngle + 405) / 270 * 100).toString() + '%';
          audioWebPlayerVolumeKnobIconElement.setAttribute('aria-valuenow', Math.ceil((volumeControlAngle + 405) / 270 * 100));
        }
      }
    }

    var focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

    if (window.location.protocol == 'http:' || window.location.protocol == 'https:') {
      var request = new XMLHttpRequest();
      request.open('GET', 'awp/sources/settings.json', true);
      request.send(null);
      request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
          try {
            settingsObject = JSON.parse(request.responseText);
            if (settingsObject.interface.waiAriaStartTabIndex == 'auto') {
              for (let loop = 0; loop < focusableElements.length; loop++) {
                if (focusableElements[loop].hasAttribute('tabindex') && parseInt(focusableElements[loop].tabIndex) > startTabindexValue) {
                  startTabindexValue = focusableElements[loop].tabIndex + 1;
                }
              }
            } else {
              startTabindexValue = parseInt(settingsObject.interface.waiAriaStartTabIndex);
            }
            if (settingsObject.interface.setVolumeOfSound == 'full') {
              volumeControlAngle = 135;
              audioElement.volume =  1;
              audioWebPlayerVolumeKnobIconElement.setAttribute('aria-valuenow', '100');
            } else {
              volumeControlAngle = parseFloat(settingsObject.interface.setVolumeOfSound) / 100 * 270 - 135;
              audioElement.volume =  parseFloat(settingsObject.interface.setVolumeOfSound) / 100;
              audioWebPlayerVolumeKnobIconElement.setAttribute('aria-valuenow', Math.round(settingsObject.interface.setVolumeOfSound));
            }
            audioWebPlayerVolumeKnobIconElement.tabIndex = startTabindexValue + 4;
            headerTitleElement.innerHTML = settingsObject.interface.headerTitle;
            audioWebPlayerModalWindowMainImageElement.id = 'audio-web-player-modal-window-main-image';
            if (settingsObject.interface.showPreviousButton == true) {
              audioWebPlayerPrevIconElement.style.display = 'block';
            }
            if (settingsObject.interface.showNextButton == true) {
              audioWebPlayerNextIconElement.style.display = 'block';
            }
            if (settingsObject.interface.showStopButton == true) {
              audioWebPlayerStopIconElement.style.display = 'block';
              audioWebPlayerStopIconElement.addEventListener('click', function() {
                if (this.hasAttribute('class') && this.classList.contains('enabled')) {
                  stopTrack();
                }
              }, false);
              audioWebPlayerStopIconElement.addEventListener('keydown', function(e) {
                if (this.hasAttribute('class') && this.classList.contains('enabled')) {
                  if (e.keyCode === 13 || e.keyCode === 32) {
                    stopTrack();
                  }
                }
              }, false);
            }
            if (settingsObject.interface.showVolumeKnob == true) {
              audioWebPlayerVolumeKnobIconElement.style.display = 'block';
              ['mousedown', 'touchstart'].forEach(function(e) {
                audioWebPlayerVolumeKnobIconElement.addEventListener(e, function(e) {
                  e.preventDefault();
                  isMouseDown = true;
                  audioWebPlayerTooltipElement.style.display = 'block';
                }, false);
              });
              ['mouseup', 'touchend'].forEach(function(e) {
                audioWebPlayerVolumeKnobIconElement.addEventListener(e, function(e) {
                  e.preventDefault();
                  isMouseDown = false;
                  audioWebPlayerTooltipElement.style.display = 'none';
                }, false);
              });
              ['mouseup', 'touchend'].forEach(function(e) {
                document.body.addEventListener(e, function(e) {
                  isMouseDown = false;
                  audioWebPlayerTooltipElement.style.display = 'none';
                }, true);
              });
              audioWebPlayerVolumeKnobIconElement.addEventListener('dblclick', function() {
                if (audioElement.volume === 0) {
                  if (volumeControlAngle >= -45) {
                    audioWebPlayerVolumeKnobIconElement.firstChild.style.transform = 'rotate(' + (270 * volumeCache - 495).toString() + 'deg)';
                  } else if (volumeControlAngle <= -135) {
                    audioWebPlayerVolumeKnobIconElement.firstChild.style.transform = 'rotate(' + (270 * volumeCache - 135).toString() + 'deg)';
                  }
                  audioElement.volume = volumeCache;
                  audioWebPlayerVolumeKnobIconElement.setAttribute('aria-valuenow', Math.round(volumeCache));
                } else {
                  volumeCache = audioElement.volume;
                  audioWebPlayerVolumeKnobIconElement.firstChild.style.transform = 'rotate(-135deg)';
                  audioElement.volume = 0;
                  audioWebPlayerVolumeKnobIconElement.setAttribute('aria-valuenow', 0);
                }
              }, false);
              audioWebPlayerVolumeKnobIconElement.addEventListener('keydown', e => {
                var volume;
                if (e.keyCode === 33 || e.keyCode === 38 || e.keyCode === 39) {
                  if (volumeControlAngle <= 135 - 33.75) {
                    volumeControlAngle = volumeControlAngle + 33.75;
                    volume = (volumeControlAngle + 135) / 270;;
                  } else if (volumeControlAngle > 135 - 33.75) {
                    volumeControlAngle = 135;
                    volume = 1;
                    var valueNow = 100;
                  }
                  audioElement.volume = volume;
                  audioWebPlayerVolumeKnobIconElement.setAttribute('aria-valuenow', Math.round(volume * 100));
                  audioWebPlayerVolumeKnobIconElement.firstChild.style.transform = 'rotate(' + (volumeControlAngle).toString() + 'deg)';
                } else if (e.keyCode === 34 || e.keyCode === 37 || e.keyCode === 40) {
                  if (volumeControlAngle >= -135 + 33.75) {
                    volumeControlAngle = volumeControlAngle - 33.75;
                    volume = (volumeControlAngle + 135) / 270;
                  } else if (volumeControlAngle < -135 + 33.75) {
                    volumeControlAngle = -135;
                    volume = 0;
                    var valueNow = 0;
                  }
                  audioElement.volume = volume;
                  audioWebPlayerVolumeKnobIconElement.setAttribute('aria-valuenow', Math.round(volume * 100));
                  audioWebPlayerVolumeKnobIconElement.firstChild.style.transform = 'rotate(' + (volumeControlAngle).toString() + 'deg)';
                }
              }, false);
              document.addEventListener('mousemove', function(e) {
                if (isMouseDown === true) {
                  audioWebPlayerVolumeKnobIconChange(e.clientX, e.clientY, 'desktop');
                }
              }, false);
              document.addEventListener('touchmove', function(e) {
                if (isMouseDown === true) {
                  let evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
                  let touch = e.touches[0] || e.changedTouches[0];
                  audioWebPlayerVolumeKnobIconChange(touch.pageX, touch.pageY, 'mobile');
                }
              }, false);
              audioWebPlayerArrowElement = document.createElement('img');
              audioWebPlayerArrowElement.setAttribute('src', 'awp/sources/arrow.svg');
              audioWebPlayerArrowElement.setAttribute('alt', 'Strzałka');
              if (settingsObject.interface.setVolumeOfSound == "full") {
                audioWebPlayerArrowElement.style.transform = 'rotate(' + (135).toString() + 'deg)';
              } else {
                audioWebPlayerArrowElement.style.transform = 'rotate(' + (parseFloat(settingsObject.interface.setVolumeOfSound) / 100 * 270 - 135).toString() + 'deg)';
              }
              audioWebPlayerVolumeKnobIconElement.appendChild(audioWebPlayerArrowElement);
            }
            audioWebPlayerContainer.appendChild(audioElement);
            audioWebPlayerContainer.appendChild(audioWebPlayerTooltipElement);
            audioWebPlayerContainer.appendChild(headerTitleElement);
            audioWebPlayerContainer.appendChild(audioWebPlayerSubElement);
            audioWebPlayerContainer.after(audioWebPlayerModalWindowWrapperElement);
            if (settingsObject.interface.showPlaylist == true) {
              audioWebPlayerHeaderSubtitleElement.innerHTML = settingsObject.interface.playlistHeaderSubtitle;
              audioWebPlayerSubElement.after(audioWebPlayerHeaderSubtitleElement);
              audioWebPlayerPlaylistElement.id = 'audio-web-player-playlist';
              audioWebPlayerHeaderSubtitleElement.after(audioWebPlayerPlaylistElement);
              let audioWebPlayerPlaylistBodyElement = document.createElement('tbody');
              audioWebPlayerPlaylistElement.appendChild(audioWebPlayerPlaylistBodyElement);
              for (let loop = 0; loop < settingsObject.playlist.length; loop++) {
                let tableTrElement = document.createElement('tr');
                let tableTdOneElement = document.createElement('td');
                let tableTdTwoElement = document.createElement('td');
                let durationTimeSeconds = Math.floor(settingsObject.playlist[loop].durationTimeSeconds);
                let durationTimeMinutes = Math.floor(settingsObject.playlist[loop].durationTimeMinutes);
                let durationSec2 = (durationTimeSeconds < 10) ? '0' + durationTimeSeconds : durationTimeSeconds;
                let durationMin2 = (durationTimeMinutes < 10) ? '0' + durationTimeMinutes : durationTimeMinutes;
                let fullDurationSecNumber = (durationTimeMinutes * 60) + durationTimeSeconds;
                let fullDurationSec2 = (fullDurationSecNumber < 10) ? '0' + fullDurationSecNumber : fullDurationSecNumber;
                let fullDurationSec3 = ((fullDurationSecNumber < 100 && fullDurationSecNumber >= 10) ? '0' + fullDurationSecNumber : (fullDurationSecNumber < 10)) ? '00' + fullDurationSecNumber : fullDurationSecNumber;
                let playlistItemTitle = settingsObject.interface.playlistItemTitleFormat.replace('$artist_name$', (settingsObject.playlist[loop].artistName ? settingsObject.playlist[loop].artistName : 'Nieznany artysta')).replace('$track_name$', (settingsObject.playlist[loop].trackName ? settingsObject.playlist[loop].trackName : 'Nieznany utwór')).replace('$album_name$', (settingsObject.playlist[loop].albumName ? settingsObject.playlist[loop].albumName : 'nieznanego')).replace('$release_year$', (settingsObject.playlist[loop].releaseYear ? settingsObject.playlist[loop].releaseYear : 'nieznanego')).replace('$dur_min_1$', durationTimeMinutes).replace('$dur_min_2$', durationMin2).replace('$dur_sec_1$', durationTimeSeconds).replace('$dur_sec_2$', durationSec2).replace('$full_dur_sec_1$', fullDurationSecNumber).replace('$full_dur_sec_2$', fullDurationSec2).replace('$full_dur_sec_3$', fullDurationSec3);
                let playlistItemSubtitle = settingsObject.interface.playlistItemSubtitleFormat.replace('$artist_name$', (settingsObject.playlist[loop].artistName ? settingsObject.playlist[loop].artistName : 'Nieznany artysta')).replace('$track_name$', (settingsObject.playlist[loop].trackName ? settingsObject.playlist[loop].trackName : 'Nieznany utwór')).replace('$album_name$', (settingsObject.playlist[loop].albumName ? settingsObject.playlist[loop].albumName : 'nieznanego')).replace('$release_year$', (settingsObject.playlist[loop].releaseYear ? settingsObject.playlist[loop].releaseYear : 'nieznanego')).replace('$dur_min_1$', durationTimeMinutes).replace('$dur_min_2$', durationMin2).replace('$dur_sec_1$', durationTimeSeconds).replace('$dur_sec_2$', durationSec2).replace('$full_dur_sec_1$', fullDurationSecNumber).replace('$full_dur_sec_2$', fullDurationSec2).replace('$full_dur_sec_3$', fullDurationSec3);
                let outputPlaylistItemText = playlistItemTitle + '<br /><small>' + playlistItemSubtitle + '</small>';
                tableTdOneElement.innerHTML = (loop + 1) + '.';
                tableTdTwoElement.innerHTML = outputPlaylistItemText;
                tableTrElement.className = 'row-paused';
                tableTrElement.setAttribute('role', 'button');
                tableTrElement.setAttribute('aria-label', 'Rozpocznij odtwarzanie utworu numer ' + (loop + 1).toString());
                tableTrElement.tabIndex = startTabindexValue + 6;
                audioWebPlayerPlaylistBodyElement.appendChild(tableTrElement).appendChild(tableTdOneElement);
                audioWebPlayerPlaylistBodyElement.appendChild(tableTrElement).appendChild(tableTdTwoElement);
              }
              if (settingsObject.interface.showPlaylist == true && settingsObject.interface.selectedTrack != "none") {
                audioWebPlayerPlaylistElement.firstElementChild.children[settingsObject.interface.selectedTrack - 1].classList.remove('row-paused');
                audioWebPlayerPlaylistElement.firstElementChild.children[settingsObject.interface.selectedTrack - 1].classList.add('row-playing');
              }
              let audioWebPlayerPlaylistElementCells = audioWebPlayerPlaylistElement.getElementsByTagName('td');
              for (let loop = 0; loop < audioWebPlayerPlaylistElementCells.length; loop++) {
                var tableCurrentCell = audioWebPlayerPlaylistElementCells[loop];
                tableCurrentCell.addEventListener('click', function() {
                  playingTrackNumber = this.parentNode.rowIndex;
                  if (this.parentNode.hasAttribute('class') && this.parentNode.classList.contains('row-paused')) {
                    playPauseTrack(playingTrackNumber, true);
                  }
                }, false);
                audioWebPlayerPlaylistElement.addEventListener('keydown', function(e) {
                  e.stopImmediatePropagation();
                  if (e.target.hasAttribute('class') && e.target.classList.contains('row-paused')) {
                    if (e.keyCode === 13 || e.keyCode === 32) {
                      playingTrackNumber = e.target.rowIndex;
                      playPauseTrack(playingTrackNumber, true);
                    }
                  }
                }, false);
              }
            }
            audioWebPlayerProgressBarElement.tabIndex = -1;
            if (settingsObject.interface.selectedTrack == 'none') {
              audioWebPlayerContainer.className = 'audio-web-player-stopped';
              audioWebPlayerPrevIconElement.tabIndex = -1;
              audioWebPlayerPlayPauseIconElement.tabIndex = -1;
              audioWebPlayerStopIconElement.tabIndex = -1;
              audioWebPlayerNextIconElement.tabIndex = -1;
              audioWebPlayerTrackTitleElement.innerText = settingsObject.interface.trackTitleStopped;
              audioWebPlayerArtistNameElement.innerText = settingsObject.interface.artistNameStopped;
              audioWebPlayerModalWindowMainImageElement.src = 'awp/sources/album-cover.png';
              audioWebPlayerModalWindowMainImageElement.setAttribute('alt', settingsObject.interface.coverImageTitle);
              audioWebPlayerModalWindowMainImageElement.setAttribute('title', settingsObject.interface.coverImageTitle);
              audioWebPlayerCoverImageSubElement.style.backgroundImage = 'url(\'awp/sources/album-cover-thumbnail.png\')';
              audioWebPlayerCoverImageSubElement.setAttribute('title', settingsObject.interface.coverImageTitle);
              if (audioWebPlayerPlayPauseIconElement.hasAttribute('class')) {
                audioWebPlayerPlayPauseIconElement.classList.add('disabled');
              }
              if (audioWebPlayerPrevIconElement.hasAttribute('class')) {
                audioWebPlayerPrevIconElement.classList.add('disabled');
              }
              if (audioWebPlayerNextIconElement.hasAttribute('class')) {
                audioWebPlayerNextIconElement.classList.add('disabled');
              }
              refreshPlayerProgressFromSettingsFile();
            } else {
              audioWebPlayerContainer.className = 'audio-web-player-paused';
              audioWebPlayerPlayPauseIconElement.tabIndex = startTabindexValue + 1;
              audioWebPlayerStopIconElement.tabIndex = startTabindexValue + 2;
              playingTrackNumber = settingsObject.interface.selectedTrack - 1;
              let artistName = settingsObject.playlist[playingTrackNumber].hasOwnProperty('artistName') ? settingsObject.playlist[playingTrackNumber].artistName : 'Nieznany artysta';
              let trackName = settingsObject.playlist[playingTrackNumber].hasOwnProperty('trackName') ? settingsObject.playlist[playingTrackNumber].trackName : 'Nieznany utwór';
              audioWebPlayerArtistNameElement.innerText = artistName;
              audioWebPlayerTrackTitleElement.innerText = trackName;
              if (settingsObject.playlist[playingTrackNumber].hasOwnProperty('coverFile')) {
                var albumTitleAlt = settingsObject.interface.coverImageTitle  + ' ' + (settingsObject.playlist[playingTrackNumber].hasOwnProperty('artistName') ? (settingsObject.playlist[playingTrackNumber].artistName) : 'Nieznany artysta') + ' – ' + (settingsObject.playlist[playingTrackNumber].hasOwnProperty('albumName') ? (settingsObject.playlist[playingTrackNumber].albumName) : 'Nieznany album') + ' ' + (settingsObject.playlist[playingTrackNumber].hasOwnProperty('releaseYear') ? ('z roku ' + settingsObject.playlist[playingTrackNumber].releaseYear) : 'z nieznanego roku');
                audioWebPlayerCoverImageSubElement.style.backgroundImage = 'url(\'awp/thumbnails/' + settingsObject.playlist[playingTrackNumber].coverFile + '\')';
                audioWebPlayerModalWindowMainImageElement.src = 'awp/covers/' + settingsObject.playlist[playingTrackNumber].coverFile;
              } else {
                audioWebPlayerCoverImageSubElement.style.backgroundImage = 'url(\'awp/sources/album-cover-thumbnail.png\')';
                audioWebPlayerModalWindowMainImageElement.src = 'awp/sources/album-cover.png';
                var albumTitleAlt = 'Brak okładki';
              }
              audioWebPlayerCoverImageSubElement.setAttribute('title', albumTitleAlt);
              audioWebPlayerModalWindowMainImageElement.setAttribute('title', albumTitleAlt);
              audioWebPlayerModalWindowMainImageElement.setAttribute('alt', albumTitleAlt);
              audioElement.src = 'awp/tracks/' + settingsObject.playlist[playingTrackNumber].trackFile;
              if (audioWebPlayerPlayPauseIconElement.hasAttribute('class')) {
                audioWebPlayerPlayPauseIconElement.classList.add('enabled');
              }
              if ((settingsObject.interface.selectedTrack - 1) > 0 && audioWebPlayerPrevIconElement.hasAttribute('class')) {
                audioWebPlayerPrevIconElement.classList.add('enabled');
                audioWebPlayerPrevIconElement.tabIndex = startTabindexValue;
              } else if ((settingsObject.interface.selectedTrack - 1) <= 0 && audioWebPlayerPrevIconElement.hasAttribute('class')) {
                audioWebPlayerPrevIconElement.classList.add('disabled');
                audioWebPlayerPrevIconElement.tabIndex = -1;
              }
              if ((settingsObject.interface.selectedTrack - 1) < settingsObject.playlist.length - 1 && audioWebPlayerNextIconElement.hasAttribute('class')) {
                audioWebPlayerNextIconElement.classList.add('enabled');
                audioWebPlayerNextIconElement.tabIndex = startTabindexValue + 3;
              } else if ((settingsObject.interface.selectedTrack - 1) >= settingsObject.playlist.length - 1 && audioWebPlayerNextIconElement.hasAttribute('class')) {
                audioWebPlayerNextIconElement.classList.add('disabled');
                audioWebPlayerNextIconElement.tabIndex = -1;
              }
              refreshPlayerProgressFromSettingsFile(true);
            }
          } catch(error) {
            console.log(error);
            audioWebPlayerContainer.appendChild(headerTitleElement);
            audioWebPlayerHeaderSubtitleElement.innerHTML = 'Wystąpił błąd podczas wczytywania pliku JSON z&nbsp;ustawieniami!';
            headerTitleElement.after(audioWebPlayerHeaderSubtitleElement);
            headerTitleElement.innerHTML = 'Błąd aplikacji';
          }
        }
      };
    } else {
      audioWebPlayerContainer.appendChild(headerTitleElement);
      audioWebPlayerHeaderSubtitleElement.innerHTML = 'Nie można uruchomić aplikacji lokalnie!<br />Proszę najpierw umieścić ją na serwerze WWW.';
      headerTitleElement.after(audioWebPlayerHeaderSubtitleElement);
      headerTitleElement.innerHTML = 'Błąd aplikacji';
    }

    if (!!audioWebPlayerPlayPauseIconElement) {
      audioWebPlayerPlayPauseIconElement.addEventListener('click', function() {
        if (this.hasAttribute('class') && this.classList.contains('enabled')) {
          playPauseTrack(playingTrackNumber, false);
        }
      }, false);
      audioWebPlayerPlayPauseIconElement.addEventListener('keydown', function(e) {
        if (this.hasAttribute('class') && this.classList.contains('enabled')) {
          if (e.keyCode === 13 || e.keyCode === 32) {
            playPauseTrack(playingTrackNumber, false);
          }
        }
      }, false);
    }

    if (!!audioWebPlayerPrevIconElement) {
      audioWebPlayerPrevIconElement.addEventListener('click', function() {
        if (this.hasAttribute('class') && this.classList.contains('enabled')) {
          playingTrackNumber--;
          playPauseTrack(playingTrackNumber, true);
        }
      }, false);
      audioWebPlayerPrevIconElement.addEventListener('keydown', function(e) {
        if (this.hasAttribute('class') && this.classList.contains('enabled')) {
          if (e.keyCode === 13 || e.keyCode === 32) {
            playingTrackNumber--;
            playPauseTrack(playingTrackNumber, true);
          }
        }
      }, false);
    }

    if (!!audioWebPlayerNextIconElement) {
      audioWebPlayerNextIconElement.addEventListener('click', function() {
        if (this.hasAttribute('class') && this.classList.contains('enabled')) {
          playingTrackNumber++;
          playPauseTrack(playingTrackNumber, true);
          }
      }, false);
      audioWebPlayerNextIconElement.addEventListener('keydown', function(e) {
        if (this.hasAttribute('class') && this.classList.contains('enabled')) {
          if (e.keyCode === 13 || e.keyCode === 32) {
            playingTrackNumber++;
            playPauseTrack(playingTrackNumber, true);
          }
        }
      }, false);
    }

    if (!!audioWebPlayerProgressBarElement) {
      audioWebPlayerProgressBarElement.addEventListener('click', function(e) {
        if (audioWebPlayerContainer.hasAttribute('class') && audioWebPlayerContainer.classList.contains('audio-web-player-playing')) {
          let rect = e.target.getBoundingClientRect();
          let xCursorPosition = e.clientX - rect.left;
          audioElement.currentTime = xCursorPosition / this.offsetWidth * audioElement.duration;
          refreshPlayerProgressFromSourceFile();
        }
      }, false);
      audioWebPlayerProgressBarElement.addEventListener('keydown', e => {
        if (audioWebPlayerContainer.hasAttribute('class') && audioWebPlayerContainer.classList.contains('audio-web-player-playing')) {
          let currentTime = audioElement.currentTime;
          let duration = audioElement.duration;
          let durationPart = duration * 0.1;
          if (e.keyCode === 33 || e.keyCode === 38 || e.keyCode === 39) {
            if (settingsObject.interface.playlistContinuous == true) {
              if (currentTime >= duration - durationPart) {
                if (audioWebPlayerNextIconElement.hasAttribute('class') && audioWebPlayerNextIconElement.classList.contains('enabled')) {
                  playingTrackNumber++;
                  playPauseTrack(playingTrackNumber, true);
                } else if (audioWebPlayerStopIconElement.hasAttribute('class') && audioWebPlayerStopIconElement.classList.contains('enabled')) {
                  stopTrack();
                }
              } else {
                audioElement.currentTime = currentTime + durationPart;
                refreshPlayerProgressFromSourceFile();
              }
            } else {
              if (currentTime >= duration - durationPart) {
                if (refreshPlayerProgressInterval1) {
                  clearInterval(refreshPlayerProgressInterval1);
                }
                if (refreshPlayerProgressInterval2) {
                  clearInterval(refreshPlayerProgressInterval2);
                }
                if (refreshPlayerProgressInterval3) {
                  clearInterval(refreshPlayerProgressInterval3);
                }
                audioElement.currentTime = 0;
                audioElement.pause();
                if (audioWebPlayerContainer.hasAttribute('class') && audioWebPlayerContainer.classList.contains('audio-web-player-playing')) {
                  audioWebPlayerContainer.classList.remove('audio-web-player-playing');
                  audioWebPlayerContainer.classList.add('audio-web-player-paused');
                }
                audioWebPlayerPlayPauseIconElement.setAttribute('aria-label', 'Rozpocznij odtwarzanie utworu');
                audioWebPlayerPlayPauseIconElement.setAttribute('title', 'Rozpocznij odtwarzanie utworu');
                audioWebPlayerProgressBarElement.tabIndex = -1;
                refreshPlayerProgressFromSourceFile();
              } else {
                audioElement.currentTime = currentTime + durationPart;
                refreshPlayerProgressFromSourceFile();
              }
            }
          } else if (e.keyCode === 34 || e.keyCode === 37 || e.keyCode === 40) {
            if (currentTime <= durationPart) {
              audioElement.currentTime = 0;
            } else {
              audioElement.currentTime = currentTime - durationPart;
            }
            refreshPlayerProgressFromSourceFile();
          }
        }
      }, false);

      audioWebPlayerVolumeKnobIconElement.addEventListener('keydown', e => {
        let volume;
        if (e.keyCode === 33 || e.keyCode === 38 || e.keyCode === 39) {
          if (volumeControlAngle <= 135 - 33.75) {
            volumeControlAngle = volumeControlAngle + 33.75;
            volume = (volumeControlAngle + 135) / 270;;
          } else if (volumeControlAngle > 135 - 33.75) {
            volumeControlAngle = 135;
            volume = 1;
            var valueNow = 100;
          }
          audioElement.volume = volume;
          audioWebPlayerVolumeKnobIconElement.setAttribute('aria-valuenow', Math.round(volume * 100));
          audioWebPlayerVolumeKnobIconElement.firstChild.style.transform = 'rotate(' + (volumeControlAngle).toString() + 'deg)';
        } else if (e.keyCode === 34 || e.keyCode === 37 || e.keyCode === 40) {
          if (volumeControlAngle >= -135 + 33.75) {
            volumeControlAngle = volumeControlAngle - 33.75;
            volume = (volumeControlAngle + 135) / 270;
          } else if (volumeControlAngle < -135 + 33.75) {
            volumeControlAngle = -135;
            volume = 0;
            var valueNow = 0;
          }
          audioElement.volume = volume;
          audioWebPlayerVolumeKnobIconElement.setAttribute('aria-valuenow', Math.round(volume * 100));
          audioWebPlayerVolumeKnobIconElement.firstChild.style.transform = 'rotate(' + (volumeControlAngle).toString() + 'deg)';
        }
      });
    }

    if (!!audioWebPlayerCoverImageSubElement) {
      audioWebPlayerCoverImageSubElement.addEventListener('click', function() {
        if (audioWebPlayerModalWindowWrapperElement.hasAttribute('class') && audioWebPlayerModalWindowWrapperElement.classList.contains('not-displayed')) {
          audioWebPlayerModalWindowWrapperElement.classList.remove('not-displayed');
          audioWebPlayerModalWindowWrapperElement.classList.add('displayed');
        }
      }, false);
    }

    if (!!audioWebPlayerModalWindowCloseIconElement) {
      audioWebPlayerModalWindowCloseIconElement.addEventListener('click', function() {
        if (audioWebPlayerModalWindowWrapperElement.hasAttribute('class') && audioWebPlayerModalWindowWrapperElement.classList.contains('displayed')) {
          audioWebPlayerModalWindowWrapperElement.classList.remove('displayed');
          audioWebPlayerModalWindowWrapperElement.classList.add('not-displayed');
        }
      }, false);
    }

    if (!!audioElement) {
      audioElement.addEventListener('ended', function() {
        if (settingsObject.interface.playlistContinuous == true) {
          if (audioWebPlayerNextIconElement.hasAttribute('class') && audioWebPlayerNextIconElement.classList.contains('enabled')) {
            playingTrackNumber++;
            playPauseTrack(playingTrackNumber, true);
          } else if (audioWebPlayerStopIconElement.hasAttribute('class') && audioWebPlayerStopIconElement.classList.contains('enabled')) {
            stopTrack();
          }
        } else {
          if (refreshPlayerProgressInterval1) {
            clearInterval(refreshPlayerProgressInterval1);
          }
          if (refreshPlayerProgressInterval2) {
            clearInterval(refreshPlayerProgressInterval2);
          }
          if (refreshPlayerProgressInterval3) {
            clearInterval(refreshPlayerProgressInterval3);
          }
          this.currentTime = 0;
          if (audioWebPlayerContainer.hasAttribute('class') && audioWebPlayerContainer.classList.contains('audio-web-player-playing')) {
            audioWebPlayerContainer.classList.remove('audio-web-player-playing');
            audioWebPlayerContainer.classList.add('audio-web-player-paused');
          }
          audioWebPlayerPlayPauseIconElement.setAttribute('aria-label', 'Rozpocznij odtwarzanie utworu');
          audioWebPlayerPlayPauseIconElement.setAttribute('title', 'Rozpocznij odtwarzanie utworu');
          audioWebPlayerProgressBarElement.tabIndex = -1;
          refreshPlayerProgressFromSettingsFile(true);
        }
      });
    }

    function refreshPlayerProgressFromSourceFile() {
      let currentTimeMinutes = Math.floor(audioElement.currentTime / 60);
      let currentTimeSeconds = Math.floor(audioElement.currentTime % 60);
      let durationTimeMinutes = Math.floor(audioElement.duration / 60);
      let durationTimeSeconds = Math.floor(audioElement.duration % 60);
      audioWebPlayerProgressBarSubElement.style.width = (audioElement.currentTime / audioElement.duration * 100) + '%';
      audioWebPlayerProgressBarElement.setAttribute('aria-valuenow', Math.round(audioElement.currentTime / audioElement.duration * 100));
      refreshPlayerTimeProgress(currentTimeMinutes, currentTimeSeconds, durationTimeMinutes, durationTimeSeconds);
    }

    function refreshPlayerProgressFromSettingsFile(newTrack) {
      let currentTimeMinutes = 0;
      let currentTimeSeconds = 0;
      let durationTimeMinutes = 0;
      let durationTimeSeconds = 0;;
      if (newTrack == true) {
        durationTimeSeconds = Math.floor(settingsObject.playlist[playingTrackNumber].durationTimeSeconds);
        durationTimeMinutes = Math.floor(settingsObject.playlist[playingTrackNumber].durationTimeMinutes);
      }
      audioWebPlayerProgressBarSubElement.style.width = '0';
      audioWebPlayerProgressBarElement.setAttribute('aria-valuenow', '0');
      refreshPlayerTimeProgress(currentTimeMinutes, currentTimeSeconds, durationTimeMinutes, durationTimeSeconds);
    }

    function refreshPlayerTimeProgress(currentTimeMinutes, currentTimeSeconds, durationTimeMinutes, durationTimeSeconds) {
      let currentSec2 = (currentTimeSeconds < 10) ? '0' + currentTimeSeconds : currentTimeSeconds;
      let durationSec2 = (durationTimeSeconds < 10) ? '0' + durationTimeSeconds : durationTimeSeconds;
      let currentMin2 = (currentTimeMinutes < 10) ? '0' + currentTimeMinutes : currentTimeMinutes;
      let durationMin2 = (durationTimeMinutes < 10) ? '0' + durationTimeMinutes : durationTimeMinutes;
      let fullCurrentSecNumber = (currentTimeMinutes * 60) + currentTimeSeconds;
      let fullCurrentSec2 = (fullCurrentSecNumber < 10) ? '0' + fullCurrentSecNumber : fullCurrentSecNumber;
      let fullCurrentSec3 = ((fullCurrentSecNumber < 100 && fullCurrentSecNumber >= 10) ? '0' + fullCurrentSecNumber : (fullCurrentSecNumber < 10)) ? '00' + fullCurrentSecNumber : fullCurrentSecNumber;
      let fullDurationSecNumber = (durationTimeMinutes * 60) + durationTimeSeconds;
      let fullDurationSec2 = (fullDurationSecNumber < 10) ? '0' + fullDurationSecNumber : fullDurationSecNumber;
      let fullDurationSec3 = ((fullDurationSecNumber < 100 && fullDurationSecNumber >= 10) ? '0' + fullDurationSecNumber : (fullDurationSecNumber < 10)) ? '00' + fullDurationSecNumber : fullDurationSecNumber;
      let outputTimeText = settingsObject.interface.timeFormat.replace('$cur_min_1$', currentTimeMinutes).replace('$cur_min_2$', currentMin2).replace('$cur_sec_1$', currentTimeSeconds).replace('$cur_sec_2$', currentSec2).replace('$dur_min_1$', durationTimeMinutes).replace('$dur_min_2$', durationMin2).replace('$dur_sec_1$', durationTimeSeconds).replace('$dur_sec_2$', durationSec2).replace('$full_cur_sec_1$', fullCurrentSecNumber).replace('$full_cur_sec_2$', fullCurrentSec2).replace('$full_cur_sec_3$', fullCurrentSec3).replace('$full_dur_sec_1$', fullDurationSecNumber).replace('$full_dur_sec_2$', fullDurationSec2).replace('$full_dur_sec_3$', fullDurationSec3);
      audioWebPlayerProgressTimeElement.innerText = outputTimeText;
    }

    function playPauseTrack(trackNumber, fromBeginning) {
      if (refreshPlayerProgressInterval1) {
        clearInterval(refreshPlayerProgressInterval1);
      }
      if (refreshPlayerProgressInterval2) {
        clearInterval(refreshPlayerProgressInterval2);
      }
      if (refreshPlayerProgressInterval3) {
        clearInterval(refreshPlayerProgressInterval3);
      }
      if (audioWebPlayerPlayPauseIconElement.hasAttribute('class') && audioWebPlayerPlayPauseIconElement.classList.contains('disabled')) {
        audioWebPlayerPlayPauseIconElement.classList.remove('disabled');
        audioWebPlayerPlayPauseIconElement.classList.add('enabled');
        audioWebPlayerPlayPauseIconElement.tabIndex = startTabindexValue + 1;
      }
      if (audioWebPlayerStopIconElement.hasAttribute('class') && audioWebPlayerStopIconElement.classList.contains('disabled')) {
        audioWebPlayerStopIconElement.classList.remove('disabled');
        audioWebPlayerStopIconElement.classList.add('enabled');
        audioWebPlayerStopIconElement.tabIndex = startTabindexValue + 2;
      }
      if (trackNumber > 0 && audioWebPlayerPrevIconElement.hasAttribute('class') && audioWebPlayerPrevIconElement.classList.contains('disabled')) {
        audioWebPlayerPrevIconElement.classList.remove('disabled');
        audioWebPlayerPrevIconElement.classList.add('enabled');
        audioWebPlayerPrevIconElement.tabIndex = startTabindexValue;
      } else if (trackNumber <= 0 && audioWebPlayerPrevIconElement.hasAttribute('class') && audioWebPlayerPrevIconElement.classList.contains('enabled')) {
        audioWebPlayerPrevIconElement.classList.remove('enabled');
        audioWebPlayerPrevIconElement.classList.add('disabled');
        audioWebPlayerPrevIconElement.tabIndex = -1;
      }
      if (trackNumber < settingsObject.playlist.length - 1 && audioWebPlayerNextIconElement.hasAttribute('class') && audioWebPlayerNextIconElement.classList.contains('disabled')) {
        audioWebPlayerNextIconElement.classList.remove('disabled');
        audioWebPlayerNextIconElement.classList.add('enabled');
        audioWebPlayerNextIconElement.tabIndex = startTabindexValue + 3;
      } else if (trackNumber >= settingsObject.playlist.length - 1 && audioWebPlayerNextIconElement.hasAttribute('class') && audioWebPlayerNextIconElement.classList.contains('enabled')) {
        audioWebPlayerNextIconElement.classList.remove('enabled');
        audioWebPlayerNextIconElement.classList.add('disabled');
        audioWebPlayerNextIconElement.tabIndex = -1;
      }
      var audioWebPlayerPlaylistElementRows = audioWebPlayerPlaylistElement.rows;
      for (let loop = 0; loop < audioWebPlayerPlaylistElementRows.length; loop++) {
        if (audioWebPlayerPlaylistElementRows[loop].hasAttribute('class') && audioWebPlayerPlaylistElementRows[loop].classList.contains('row-playing')) {
          audioWebPlayerPlaylistElementRows[loop].classList.remove('row-playing');
          audioWebPlayerPlaylistElementRows[loop].classList.add('row-paused');
        }
      }
      if (audioWebPlayerPlaylistElementRows[trackNumber].hasAttribute('class') && audioWebPlayerPlaylistElementRows[trackNumber].classList.contains('row-paused')) {
        audioWebPlayerPlaylistElementRows[trackNumber].classList.remove('row-paused');
        audioWebPlayerPlaylistElementRows[trackNumber].classList.add('row-playing');
      }
      if (fromBeginning === true) {
        let artistName = settingsObject.playlist[trackNumber].hasOwnProperty('artistName') ? settingsObject.playlist[trackNumber].artistName : 'Nieznany artysta';
        let trackName = settingsObject.playlist[trackNumber].hasOwnProperty('trackName') ? settingsObject.playlist[trackNumber].trackName : 'Nieznany utwór';
        audioWebPlayerArtistNameElement.innerText = artistName;
        audioWebPlayerTrackTitleElement.innerText = trackName;
        if (settingsObject.playlist[trackNumber].hasOwnProperty('coverFile')) {
          var albumTitleAlt = settingsObject.interface.coverImageTitle  + ' ' + (settingsObject.playlist[playingTrackNumber].hasOwnProperty('artistName') ? (settingsObject.playlist[playingTrackNumber].artistName) : 'Nieznany artysta') + ' – ' + (settingsObject.playlist[playingTrackNumber].hasOwnProperty('albumName') ? (settingsObject.playlist[playingTrackNumber].albumName) : 'Nieznany album') + ' ' + (settingsObject.playlist[playingTrackNumber].hasOwnProperty('releaseYear') ? ('z roku ' + settingsObject.playlist[playingTrackNumber].releaseYear) : 'z nieznanego roku');
          audioWebPlayerCoverImageSubElement.style.backgroundImage = 'url(\'awp/thumbnails/' + settingsObject.playlist[trackNumber].coverFile + '\')';
          audioWebPlayerModalWindowMainImageElement.src = 'awp/covers/' + settingsObject.playlist[trackNumber].coverFile;
        } else {
          audioWebPlayerCoverImageSubElement.style.backgroundImage = 'url(\'awp/sources/album-cover-thumbnail.png\')';
          audioWebPlayerModalWindowMainImageElement.src = 'awp/sources/album-cover.png';
          var albumTitleAlt = 'Brak okładki';
        }
        audioWebPlayerCoverImageSubElement.setAttribute('title', albumTitleAlt);
        audioWebPlayerModalWindowMainImageElement.setAttribute('title', albumTitleAlt);
        audioWebPlayerModalWindowMainImageElement.setAttribute('alt', albumTitleAlt);
        audioElement.src = 'awp/tracks/' + settingsObject.playlist[trackNumber].trackFile;
        refreshPlayerProgressFromSettingsFile(true);
      }
      if (audioWebPlayerContainer.hasAttribute('class') && audioWebPlayerContainer.classList.contains('audio-web-player-stopped')) {
        audioWebPlayerContainer.classList.remove('audio-web-player-stopped');
        audioWebPlayerContainer.classList.add('audio-web-player-playing');
        audioWebPlayerProgressBarElement.tabIndex = startTabindexValue + 5;
        audioWebPlayerPlaylistElementRows[trackNumber].tabIndex = -1;
        audioWebPlayerPlayPauseIconElement.setAttribute('aria-label', 'Wstrzymaj odtwarzanie utworu');
        audioWebPlayerPlayPauseIconElement.setAttribute('title', 'Wstrzymaj odtwarzanie utworu');
        audioElement.play();
        refreshPlayerProgressInterval1 = setInterval(refreshPlayerProgressFromSourceFile, 1000);
      } else if (audioWebPlayerContainer.hasAttribute('class') && audioWebPlayerContainer.classList.contains('audio-web-player-paused')) {
        audioWebPlayerPlaylistElementRows[trackNumber].tabIndex = -1;
        audioWebPlayerContainer.classList.remove('audio-web-player-paused');
        audioWebPlayerContainer.classList.add('audio-web-player-playing');
        audioWebPlayerProgressBarElement.tabIndex = startTabindexValue + 5;
        audioWebPlayerPlayPauseIconElement.setAttribute('aria-label', 'Wstrzymaj odtwarzanie utworu');
        audioWebPlayerPlayPauseIconElement.setAttribute('title', 'Wstrzymaj odtwarzanie utworu');
        audioElement.play();
        refreshPlayerProgressInterval2 = setInterval(refreshPlayerProgressFromSourceFile, 1000);
      } else if (audioWebPlayerContainer.hasAttribute('class') && audioWebPlayerContainer.classList.contains('audio-web-player-playing')) {
        for (let loop = 0; loop < audioWebPlayerPlaylistElementRows.length; loop++) {
          if (loop == trackNumber) {
            audioWebPlayerPlaylistElementRows[loop].tabIndex = -1;
          } else {
            audioWebPlayerPlaylistElementRows[loop].tabIndex = loop + startTabindexValue + 6;
          }
        }
        if (fromBeginning === true) {
          audioWebPlayerProgressBarElement.tabIndex = startTabindexValue + 5;
          audioWebPlayerPlayPauseIconElement.setAttribute('aria-label', 'Wstrzymaj odtwarzanie utworu');
          audioWebPlayerPlayPauseIconElement.setAttribute('title', 'Wstrzymaj odtwarzanie utworu');
          audioElement.play();
          refreshPlayerProgressInterval3 = setInterval(refreshPlayerProgressFromSourceFile, 1000);
        } else if (fromBeginning === false) {
          audioWebPlayerContainer.classList.remove('audio-web-player-playing');
          audioWebPlayerContainer.classList.add('audio-web-player-paused');
          audioWebPlayerProgressBarElement.tabIndex = -1;
          audioWebPlayerPlaylistElementRows[trackNumber].tabIndex = -1;
          audioWebPlayerPlayPauseIconElement.setAttribute('aria-label', 'Kontynuuj odtwarzanie utworu');
          audioWebPlayerPlayPauseIconElement.setAttribute('title', 'Kontynuuj odtwarzanie utworu');
          audioElement.pause();
        }
      }
    }

    function stopTrack() {
      if (refreshPlayerProgressInterval1) {
        clearInterval(refreshPlayerProgressInterval1);
      }
      if (refreshPlayerProgressInterval2) {
        clearInterval(refreshPlayerProgressInterval2);
      }
      if (refreshPlayerProgressInterval3) {
        clearInterval(refreshPlayerProgressInterval3);
      }
      if (audioWebPlayerContainer.hasAttribute('class') && (audioWebPlayerContainer.classList.contains('audio-web-player-playing') || audioWebPlayerContainer.classList.contains('audio-web-player-paused'))) {
        if (audioWebPlayerContainer.classList.contains('audio-web-player-playing')) {
          audioWebPlayerContainer.classList.remove('audio-web-player-playing');
        }
        if (audioWebPlayerContainer.classList.contains('audio-web-player-paused')) {
          audioWebPlayerContainer.classList.remove('audio-web-player-paused');
        }
        audioWebPlayerContainer.classList.add('audio-web-player-stopped');
        audioElement.pause();
        audioElement.currentTime = 0;
        audioWebPlayerTrackTitleElement.innerText = settingsObject.interface.trackTitleStopped;
        audioWebPlayerArtistNameElement.innerText = settingsObject.interface.artistNameStopped;
        audioWebPlayerModalWindowMainImageElement.id = 'audio-web-player-modal-window-main-image';
        audioWebPlayerModalWindowMainImageElement.src = 'awp/sources/album-cover.png';
        audioWebPlayerModalWindowMainImageElement.setAttribute('alt', settingsObject.interface.coverImageTitle);
        audioWebPlayerModalWindowMainImageElement.setAttribute('title', settingsObject.interface.coverImageTitle);
        audioWebPlayerCoverImageSubElement.style.backgroundImage = 'url(\'awp/sources/album-cover-thumbnail.png\')';
        audioWebPlayerCoverImageSubElement.setAttribute('title', settingsObject.interface.coverImageTitle);
        if (audioWebPlayerPrevIconElement.hasAttribute('class') && audioWebPlayerPrevIconElement.classList.contains('enabled')) {
          audioWebPlayerPrevIconElement.classList.remove('enabled');
          audioWebPlayerPrevIconElement.classList.add('disabled');
          audioWebPlayerPrevIconElement.tabIndex = -1;
        }
        if (audioWebPlayerPlayPauseIconElement.hasAttribute('class') && audioWebPlayerPlayPauseIconElement.classList.contains('enabled')) {
          audioWebPlayerPlayPauseIconElement.classList.remove('enabled');
          audioWebPlayerPlayPauseIconElement.classList.add('disabled');
          audioWebPlayerPlayPauseIconElement.tabIndex = -1;
        }
        if (audioWebPlayerNextIconElement.hasAttribute('class') && audioWebPlayerNextIconElement.classList.contains('enabled')) {
          audioWebPlayerNextIconElement.classList.remove('enabled');
          audioWebPlayerNextIconElement.classList.add('disabled');
          audioWebPlayerNextIconElement.tabIndex = -1;
        }
        if (audioWebPlayerStopIconElement.hasAttribute('class') && audioWebPlayerStopIconElement.classList.contains('enabled')) {
          audioWebPlayerStopIconElement.classList.remove('enabled');
          audioWebPlayerStopIconElement.classList.add('disabled');
          audioWebPlayerStopIconElement.tabIndex = -1;
        }
        audioWebPlayerProgressBarElement.tabIndex = -1;
        audioWebPlayerPlayPauseIconElement.setAttribute('aria-label', 'Rozpocznij odtwarzanie utworu');
        audioWebPlayerPlayPauseIconElement.setAttribute('title', 'Rozpocznij odtwarzanie utworu');
        var audioWebPlayerPlaylistElementRows = audioWebPlayerPlaylistElement.rows;
        for (var loop = 0; loop < audioWebPlayerPlaylistElementRows.length; loop++) {
          if (audioWebPlayerPlaylistElementRows[loop].hasAttribute('class') && audioWebPlayerPlaylistElementRows[loop].classList.contains('row-playing')) {
            audioWebPlayerPlaylistElementRows[loop].classList.remove('row-playing');
            audioWebPlayerPlaylistElementRows[loop].classList.add('row-paused');
            audioWebPlayerPlaylistElementRows[loop].tabIndex = loop + startTabindexValue + 6;
          }
        }
      }
      refreshPlayerProgressFromSettingsFile();
    }

  }
}
