document.onreadystatechange = function () {
  if (document.readyState === 'complete') {

    var settingsObject;
    var isMouseDown = false;
    var playingTrackNumber;
    var refreshPlayerProgressInterval1;
    var refreshPlayerProgressInterval2;
    var refreshPlayerProgressInterval3;

    var audioWebPlayerContainer = document.getElementById('audio-web-player');
    var audioWebPlayerModalWindowWrapperElement = document.createElement('div');
    audioWebPlayerModalWindowWrapperElement.id = 'audio-web-player-modal-window-wrapper';
    audioWebPlayerModalWindowWrapperElement.className = 'not-displayed';
    var audioWebPlayerModalWindowElement = document.createElement('div');
    audioWebPlayerModalWindowElement.className = 'audio-web-player-modal-window';
    audioWebPlayerModalWindowWrapperElement.appendChild(audioWebPlayerModalWindowElement);
    var audioWebPlayerModalWindowCloseIconElement = document.createElement('img');
    audioWebPlayerModalWindowCloseIconElement.id = 'audio-web-player-modal-window-close-icon';
    audioWebPlayerModalWindowCloseIconElement.setAttribute('src', 'audio-web-player/awp-sources/close.svg');
    audioWebPlayerModalWindowCloseIconElement.setAttribute('alt', 'Ikona do zamykania podglądu okładki albumu');
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
    audioWebPlayerSubElement.appendChild(audioWebPlayerCoverImageElement);
    var audioWebPlayerCoverImageElementSubElement = document.createElement('img');
    audioWebPlayerCoverImageElement.appendChild(audioWebPlayerCoverImageElementSubElement);
    var audioWebPlayerControlsElement = document.createElement('div');
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
    var audioWebPlayerPrevIconElement = document.createElement('div');
    audioWebPlayerPrevIconElement.id = 'audio-web-player-prev-icon';
    audioWebPlayerPrevIconElement.setAttribute('class', '');
    audioWebPlayerPrevIconElement.setAttribute('title', 'Przejdź do poprzedniego utworu');
    audioWebPlayerControlsSubTwoElement.prepend(audioWebPlayerPrevIconElement);
    var audioWebPlayerPlayPauseIconElement = document.createElement('div');
    audioWebPlayerPlayPauseIconElement.id = 'audio-web-player-play-pause-icon';
    audioWebPlayerPlayPauseIconElement.setAttribute('class', '');
    audioWebPlayerPlayPauseIconElement.style.display = 'block';;
    audioWebPlayerPlayPauseIconElement.setAttribute('title', 'Rozpocznij odtwarzanie utworu');
    audioWebPlayerControlsSubTwoElement.appendChild(audioWebPlayerPlayPauseIconElement);
    var audioWebPlayerStopIconElement = document.createElement('div');
    audioWebPlayerStopIconElement.id = 'audio-web-player-stop-icon';
    audioWebPlayerStopIconElement.className = 'disabled';
    audioWebPlayerStopIconElement.setAttribute('title', 'Zatrzymaj odtwarzanie utworu');
    audioWebPlayerControlsSubTwoElement.appendChild(audioWebPlayerStopIconElement);
    audioWebPlayerControlsElement.appendChild(audioWebPlayerControlsSubTwoElement);
    var audioWebPlayerNextIconElement = document.createElement('div');
    audioWebPlayerNextIconElement.id = 'audio-web-player-next-icon';
    audioWebPlayerNextIconElement.setAttribute('class', '');
    audioWebPlayerNextIconElement.setAttribute('title', 'Przejdź do następnego utworu');
    audioWebPlayerControlsSubTwoElement.appendChild(audioWebPlayerNextIconElement);
    audioWebPlayerVolumeKnobIconElement = document.createElement('div');
    audioWebPlayerVolumeKnobIconElement.id = 'audio-web-player-volume-knob-icon';
    audioWebPlayerVolumeKnobIconElement.setAttribute('title', 'Zmień poziom głośności');
    var audioWebPlayerProgressTimeElement = document.createElement('div');
    audioWebPlayerProgressTimeElement.id = 'audio-web-player-progress-time';
    audioWebPlayerControlsSubTwoElement.appendChild(audioWebPlayerProgressTimeElement);
    var audioWebPlayerProgressBarElement = document.createElement('div');
    audioWebPlayerProgressBarElement.id = 'audio-web-player-progress-bar';
    audioWebPlayerControlsElement.appendChild(audioWebPlayerProgressBarElement);
    var audioWebPlayerProgressBarSubElement = document.createElement('div');
    audioWebPlayerProgressBarElement.appendChild(audioWebPlayerProgressBarSubElement);
    var audioWebPlayerHeaderSubtitleElement = document.createElement('div');
    var audioWebPlayerPlaylistElement = document.createElement('table');

    if (window.location.protocol == 'http:' || window.location.protocol == 'https:') {
      var request = new XMLHttpRequest();
      request.open('GET', 'audio-web-player/awp-sources/settings.json', true);
      request.send(null);
      request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
          try {
            settingsObject = JSON.parse(request.responseText);
            if (settingsObject.interface.setVolumeOfSound == "full") {
              audioElement.volume =  1;
            } else {
              audioElement.volume =  parseFloat(settingsObject.interface.setVolumeOfSound) / 100;
            }
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
                  audioWebPlayerModalWindowMainImageElement.setAttribute('src', 'audio-web-player/awp-sources/album-cover.png');
                  audioWebPlayerModalWindowMainImageElement.setAttribute('alt', settingsObject.interface.coverImageTitle);
                  audioWebPlayerModalWindowMainImageElement.setAttribute('title', settingsObject.interface.coverImageTitle);
                  audioWebPlayerCoverImageElementSubElement.setAttribute('src', 'audio-web-player/awp-sources/album-cover.png');
                  audioWebPlayerCoverImageElementSubElement.setAttribute('alt', settingsObject.interface.coverImageTitle);
                  audioWebPlayerCoverImageElementSubElement.setAttribute('title', settingsObject.interface.coverImageTitle);
                  if (audioWebPlayerPrevIconElement.hasAttribute('class') && audioWebPlayerPrevIconElement.classList.contains('enabled')) {
                    audioWebPlayerPrevIconElement.classList.remove('enabled');
                    audioWebPlayerPrevIconElement.classList.add('disabled');
                  }
                  if (audioWebPlayerPlayPauseIconElement.hasAttribute('class') && audioWebPlayerPlayPauseIconElement.classList.contains('enabled')) {
                    audioWebPlayerPlayPauseIconElement.classList.remove('enabled');
                    audioWebPlayerPlayPauseIconElement.classList.add('disabled');
                  }
                  if (audioWebPlayerNextIconElement.hasAttribute('class') && audioWebPlayerNextIconElement.classList.contains('enabled')) {
                    audioWebPlayerNextIconElement.classList.remove('enabled');
                    audioWebPlayerNextIconElement.classList.add('disabled');
                  }
                  if (audioWebPlayerStopIconElement.hasAttribute('class') && audioWebPlayerStopIconElement.classList.contains('enabled')) {
                    audioWebPlayerStopIconElement.classList.remove('enabled');
                    audioWebPlayerStopIconElement.classList.add('disabled');
                  }
                  audioWebPlayerPlayPauseIconElement.setAttribute('title', 'Rozpocznij odtwarzanie utworu');
                  var audioWebPlayerPlaylistElementRows = audioWebPlayerPlaylistElement.rows;
                  for (var loop = 0; loop < audioWebPlayerPlaylistElementRows.length; loop++) {
                    if (audioWebPlayerPlaylistElementRows[loop].hasAttribute('class') && audioWebPlayerPlaylistElementRows[loop].classList.contains('row-playing')) {
                      audioWebPlayerPlaylistElementRows[loop].classList.remove('row-playing');
                      audioWebPlayerPlaylistElementRows[loop].classList.add('row-paused');
                    }
                  }
                }
                refreshPlayerProgressFromSettingsFile();
              }, false);
            }
            if (settingsObject.interface.showVolumeKnob == true) {
              audioWebPlayerVolumeKnobIconElement.style.display = 'block';
              document.body.addEventListener('mouseup', function() {
                isMouseDown = false;
                audioWebPlayerTooltipElement.style.display = 'none';
              }, true);
              audioWebPlayerVolumeKnobIconElement.addEventListener('mousedown', e => {
                e.preventDefault();
                isMouseDown = true;
                audioWebPlayerTooltipElement.style.display = 'block';
              });
              audioWebPlayerVolumeKnobIconElement.addEventListener('mouseup', e => {
                e.preventDefault();
                isMouseDown = false;
                audioWebPlayerTooltipElement.style.display = 'none';
              });
              audioWebPlayerVolumeKnobIconElement.addEventListener('mousemove', e => {
                if (isMouseDown === true) {
                  let mousePointerAngle = (Math.atan2((window.scrollY + audioWebPlayerVolumeKnobIconElement.getBoundingClientRect().top + audioWebPlayerVolumeKnobIconElement.getBoundingClientRect().height / 2) - e.clientY, (window.scrollX + audioWebPlayerVolumeKnobIconElement.getBoundingClientRect().left + audioWebPlayerVolumeKnobIconElement.getBoundingClientRect().width / 2) -  e.clientX)  * 180 / Math.PI);
                  if (mousePointerAngle > -45 || mousePointerAngle < -135) {
                    audioWebPlayerVolumeKnobIconElement.firstChild.style.transform = 'rotate(' + (mousePointerAngle - 45).toString() + 'deg)';
                    if (mousePointerAngle  > -45) {
                      audioElement.volume = (mousePointerAngle + 45) / 270;
                      audioWebPlayerTooltipElement.innerHTML = 'Głośność:&nbsp;' + Math.floor((mousePointerAngle + 45) / 270 * 100).toString() + '% ';
                    } else if (mousePointerAngle < -135) {
                      audioElement.volume = (mousePointerAngle + 405) / 270;
                      audioWebPlayerTooltipElement.innerHTML = 'Głośność:&nbsp;' + Math.ceil((mousePointerAngle + 405) / 270 * 100).toString() + '%';
                    }
                    audioWebPlayerTooltipElement.style.left = (e.clientX - audioWebPlayerContainer.getBoundingClientRect().left + 10).toString() + 'px';
                    audioWebPlayerTooltipElement.style.top = (e.clientY - audioWebPlayerContainer.getBoundingClientRect().top + 15).toString() + 'px';
                  }
                }
              });
              audioWebPlayerArrowElement = document.createElement('img');
              audioWebPlayerArrowElement.setAttribute('src', 'audio-web-player/awp-sources/arrow.svg');
              audioWebPlayerArrowElement.setAttribute('alt', 'Strzałka');
              if (settingsObject.interface.setVolumeOfSound == "full") {
                audioWebPlayerArrowElement.style.transform = 'rotate(' + (180).toString() + 'deg)';
              } else {
                audioWebPlayerArrowElement.style.transform = 'rotate(' + (parseFloat(settingsObject.interface.setVolumeOfSound) / 100 * 270 - 90).toString() + 'deg)';
              }
              audioWebPlayerVolumeKnobIconElement.appendChild(audioWebPlayerArrowElement);
              audioWebPlayerControlsSubTwoElement.appendChild(audioWebPlayerVolumeKnobIconElement);
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
                let playlistItemTitle = settingsObject.interface.playlistItemTitleFormat.replace('$artist_name$', settingsObject.playlist[loop].artistName).replace('$track_name$', settingsObject.playlist[loop].trackName).replace('$album_name$', settingsObject.playlist[loop].albumName).replace('$release_year$', settingsObject.playlist[loop].releaseYear).replace('$dur_min_1$', durationTimeMinutes).replace('$dur_min_2$', durationMin2).replace('$dur_sec_1$', durationTimeSeconds).replace('$dur_sec_2$', durationSec2).replace('$full_dur_sec_1$', fullDurationSecNumber).replace('$full_dur_sec_2$', fullDurationSec2).replace('$full_dur_sec_3$', fullDurationSec3);
                let playlistItemSubitle = settingsObject.interface.playlistItemSubitleFormat.replace('$artist_name$', settingsObject.playlist[loop].artistName).replace('$track_name$', settingsObject.playlist[loop].trackName).replace('$album_name$', settingsObject.playlist[loop].albumName).replace('$release_year$', settingsObject.playlist[loop].releaseYear).replace('$dur_min_1$', durationTimeMinutes).replace('$dur_min_2$', durationMin2).replace('$dur_sec_1$', durationTimeSeconds).replace('$dur_sec_2$', durationSec2).replace('$full_dur_sec_1$', fullDurationSecNumber).replace('$full_dur_sec_2$', fullDurationSec2).replace('$full_dur_sec_3$', fullDurationSec3);
                let outputPlaylistItemText = playlistItemTitle + '<br /><small>' + playlistItemSubitle + '</small>';
                tableTdOneElement.innerHTML = (loop + 1) + '.';
                tableTdTwoElement.innerHTML = outputPlaylistItemText;
                tableTrElement.className = 'row-paused';
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
              }
            }
            if (settingsObject.interface.selectedTrack == 'none') {
              audioWebPlayerContainer.className = 'audio-web-player-stopped';
              audioWebPlayerTrackTitleElement.innerText = settingsObject.interface.trackTitleStopped;
              audioWebPlayerArtistNameElement.innerText = settingsObject.interface.artistNameStopped;
              audioWebPlayerModalWindowMainImageElement.setAttribute('src', 'audio-web-player/awp-sources/album-cover.png');
              audioWebPlayerModalWindowMainImageElement.setAttribute('alt', settingsObject.interface.coverImageTitle);
              audioWebPlayerModalWindowMainImageElement.setAttribute('title', settingsObject.interface.coverImageTitle);
              audioWebPlayerCoverImageElementSubElement.setAttribute('src', 'audio-web-player/awp-sources/album-cover.png');
              audioWebPlayerCoverImageElementSubElement.setAttribute('alt', settingsObject.interface.coverImageTitle);
              audioWebPlayerCoverImageElementSubElement.setAttribute('title', settingsObject.interface.coverImageTitle);
              audioWebPlayerCoverImageElement.setAttribute('title', settingsObject.interface.coverImageTitle);
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
              playingTrackNumber = settingsObject.interface.selectedTrack - 1;
              let artistName = settingsObject.playlist[playingTrackNumber].hasOwnProperty('artistName') ? settingsObject.playlist[playingTrackNumber].artistName : 'Nieznany artysta';
              let trackName = settingsObject.playlist[playingTrackNumber].hasOwnProperty('trackName') ? settingsObject.playlist[playingTrackNumber].trackName : 'Nieznany utwór';
              audioWebPlayerArtistNameElement.innerText = artistName;
              audioWebPlayerTrackTitleElement.innerText = trackName;
              if (settingsObject.playlist[playingTrackNumber].hasOwnProperty('coverFile')) {
                var albumTitleAlt = (settingsObject.playlist[playingTrackNumber].hasOwnProperty('albumName') ? settingsObject.interface.coverImageTitle + ' ' + settingsObject.playlist[playingTrackNumber].albumName : settingsObject.interface.noCoverImageTitle) + ' ' + (settingsObject.playlist[playingTrackNumber].hasOwnProperty('releaseYear') ? ('z roku ' + settingsObject.playlist[playingTrackNumber].releaseYear) : 'z nieznanego roku') + (settingsObject.playlist[playingTrackNumber].hasOwnProperty('artistName') ? (' artysty ' + settingsObject.playlist[playingTrackNumber].artistName) : ' nieznanego artysty');
                audioWebPlayerCoverImageElement.firstElementChild.src = 'audio-web-player/awp-thumbnails/' + settingsObject.playlist[playingTrackNumber].coverFile;
                audioWebPlayerModalWindowMainImageElement.src = 'audio-web-player/awp-covers/' + settingsObject.playlist[playingTrackNumber].coverFile;
              } else {
                audioWebPlayerCoverImageElement.firstElementChild.src = 'audio-web-player/awp-sources/album-cover-thumbnail.png';
                audioWebPlayerModalWindowMainImageElement.src = 'audio-web-player/awp-sources/album-cover.png';
                var albumTitleAlt = 'Brak okładki';
              }
              audioWebPlayerCoverImageElement.firstElementChild.setAttribute('title', albumTitleAlt);
              audioWebPlayerModalWindowMainImageElement.setAttribute('title', albumTitleAlt);
              audioWebPlayerModalWindowMainImageElement.setAttribute('alt', albumTitleAlt);
              audioElement.src = 'audio-web-player/awp-tracks/' + settingsObject.playlist[playingTrackNumber].trackFile;
              if (audioWebPlayerPlayPauseIconElement.hasAttribute('class')) {
                audioWebPlayerPlayPauseIconElement.classList.add('enabled');
              }
              if ((settingsObject.interface.selectedTrack - 1) > 0 && audioWebPlayerPrevIconElement.hasAttribute('class')) {
                audioWebPlayerPrevIconElement.classList.add('enabled');
              } else if ((settingsObject.interface.selectedTrack - 1) <= 0 && audioWebPlayerPrevIconElement.hasAttribute('class')) {
                audioWebPlayerPrevIconElement.classList.add('disabled');
              }
              if ((settingsObject.interface.selectedTrack - 1) < settingsObject.playlist.length - 1 && audioWebPlayerNextIconElement.hasAttribute('class')) {
                audioWebPlayerNextIconElement.classList.add('enabled');
              } else if ((settingsObject.interface.selectedTrack - 1) >= settingsObject.playlist.length - 1 && audioWebPlayerNextIconElement.hasAttribute('class')) {
                audioWebPlayerNextIconElement.classList.add('disabled');
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
    }

    if (!!audioWebPlayerPrevIconElement) {
      audioWebPlayerPrevIconElement.addEventListener('click', function() {
        if (this.hasAttribute('class') && this.classList.contains('enabled')) {
          playingTrackNumber--;
          playPauseTrack(playingTrackNumber, true);
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
    }

    if (!!audioWebPlayerCoverImageElement) {
      audioWebPlayerCoverImageElement.addEventListener('click', function() {
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
        audioWebPlayerPlayPauseIconElement.setAttribute('title', 'Rozpocznij odtwarzanie utworu');
        refreshPlayerProgressFromSettingsFile(true);
      });
    }

    function refreshPlayerProgressFromSourceFile() {
      let currentTimeMinutes = Math.floor(audioElement.currentTime / 60);
      let currentTimeSeconds = Math.floor(audioElement.currentTime % 60);
      let durationTimeMinutes = Math.floor(audioElement.duration / 60);
      let durationTimeSeconds = Math.floor(audioElement.duration % 60);
      audioWebPlayerProgressBarElement.firstElementChild.style.width = (audioElement.currentTime / audioElement.duration * 100) + '%';
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
      audioWebPlayerProgressBarElement.firstElementChild.style.width = '0';
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
      }
      if (audioWebPlayerStopIconElement.hasAttribute('class') && audioWebPlayerStopIconElement.classList.contains('disabled')) {
        audioWebPlayerStopIconElement.classList.remove('disabled');
        audioWebPlayerStopIconElement.classList.add('enabled');
      }
      if (trackNumber > 0 && audioWebPlayerPrevIconElement.hasAttribute('class') && audioWebPlayerPrevIconElement.classList.contains('disabled')) {
        audioWebPlayerPrevIconElement.classList.remove('disabled');
        audioWebPlayerPrevIconElement.classList.add('enabled');
      } else if (trackNumber <= 0 && audioWebPlayerPrevIconElement.hasAttribute('class') && audioWebPlayerPrevIconElement.classList.contains('enabled')) {
        audioWebPlayerPrevIconElement.classList.remove('enabled');
        audioWebPlayerPrevIconElement.classList.add('disabled');
      }
      if (trackNumber < settingsObject.playlist.length - 1 && audioWebPlayerNextIconElement.hasAttribute('class') && audioWebPlayerNextIconElement.classList.contains('disabled')) {
        audioWebPlayerNextIconElement.classList.remove('disabled');
        audioWebPlayerNextIconElement.classList.add('enabled');
      } else if (trackNumber >= settingsObject.playlist.length - 1 && audioWebPlayerNextIconElement.hasAttribute('class') && audioWebPlayerNextIconElement.classList.contains('enabled')) {
        audioWebPlayerNextIconElement.classList.remove('enabled');
        audioWebPlayerNextIconElement.classList.add('disabled');
      }
      let audioWebPlayerPlaylistElementRows = audioWebPlayerPlaylistElement.rows;
      for (let loop = 0; loop < audioWebPlayerPlaylistElementRows.length; loop++) {
        if (audioWebPlayerPlaylistElementRows[loop].hasAttribute('class') && audioWebPlayerPlaylistElementRows[loop].classList.contains('row-playing')) {
          audioWebPlayerPlaylistElementRows[loop].classList.remove('row-playing');
          audioWebPlayerPlaylistElementRows[loop].classList.add('row-paused');
        }
      }
      if (settingsObject.interface.showPlaylist == true) {
        audioWebPlayerPlaylistElement.firstElementChild.children[trackNumber].classList.remove('row-paused');
        audioWebPlayerPlaylistElement.firstElementChild.children[trackNumber].classList.add('row-playing');
      }
      if (fromBeginning === true) {
        let artistName = settingsObject.playlist[trackNumber].hasOwnProperty('artistName') ? settingsObject.playlist[trackNumber].artistName : 'Nieznany artysta';
        let trackName = settingsObject.playlist[trackNumber].hasOwnProperty('trackName') ? settingsObject.playlist[trackNumber].trackName : 'Nieznany utwór';
        audioWebPlayerArtistNameElement.innerText = artistName;
        audioWebPlayerTrackTitleElement.innerText = trackName;
        if (settingsObject.playlist[trackNumber].hasOwnProperty('coverFile')) {
          var albumTitleAlt = (settingsObject.playlist[trackNumber].hasOwnProperty('albumName') ? settingsObject.interface.coverImageTitle + ' ' + settingsObject.playlist[trackNumber].albumName : settingsObject.interface.noCoverImageTitle) + ' ' + (settingsObject.playlist[playingTrackNumber].hasOwnProperty('releaseYear') ? ('z roku ' + settingsObject.playlist[trackNumber].releaseYear) : 'z nieznanego roku') + (settingsObject.playlist[trackNumber].hasOwnProperty('artistName') ? (' artysty ' + settingsObject.playlist[trackNumber].artistName) : ' nieznanego artysty');
          audioWebPlayerCoverImageElement.firstElementChild.src = 'audio-web-player/awp-thumbnails/' + settingsObject.playlist[trackNumber].coverFile;
          audioWebPlayerModalWindowMainImageElement.src = 'audio-web-player/awp-covers/' + settingsObject.playlist[trackNumber].coverFile;
        } else {
          audioWebPlayerCoverImageElement.firstElementChild.src = 'audio-web-player/awp-sources/album-cover-thumbnail.png';
          audioWebPlayerModalWindowMainImageElement.src = 'audio-web-player/awp-sources/album-cover.png';
          var albumTitleAlt = 'Brak okładki';
        }
        audioWebPlayerCoverImageElement.firstElementChild.setAttribute('title', albumTitleAlt);
        audioWebPlayerModalWindowMainImageElement.setAttribute('title', albumTitleAlt);
        audioWebPlayerModalWindowMainImageElement.setAttribute('alt', albumTitleAlt);
        audioElement.src = 'audio-web-player/awp-tracks/' + settingsObject.playlist[trackNumber].trackFile;
        refreshPlayerProgressFromSettingsFile(true);
      }
      if (audioWebPlayerContainer.hasAttribute('class') && audioWebPlayerContainer.classList.contains('audio-web-player-stopped')) {
        audioWebPlayerContainer.classList.remove('audio-web-player-stopped');
        audioWebPlayerContainer.classList.add('audio-web-player-playing');
        audioWebPlayerPlayPauseIconElement.setAttribute('title', 'Wstrzymaj odtwarzanie utworu');
        audioElement.play();
        refreshPlayerProgressInterval1 = setInterval(refreshPlayerProgressFromSourceFile, 1000);
      } else if (audioWebPlayerContainer.hasAttribute('class') && audioWebPlayerContainer.classList.contains('audio-web-player-paused')) {
        audioWebPlayerContainer.classList.remove('audio-web-player-paused');
        audioWebPlayerContainer.classList.add('audio-web-player-playing');
        audioWebPlayerPlayPauseIconElement.setAttribute('title', 'Wstrzymaj odtwarzanie utworu');
        audioElement.play();
        refreshPlayerProgressInterval2 = setInterval(refreshPlayerProgressFromSourceFile, 1000);
      } else if (audioWebPlayerContainer.hasAttribute('class') && audioWebPlayerContainer.classList.contains('audio-web-player-playing')) {
        if (fromBeginning === true) {
          audioWebPlayerPlayPauseIconElement.setAttribute('title', 'Wstrzymaj odtwarzanie utworu');
          audioElement.play();
          refreshPlayerProgressInterval3 = setInterval(refreshPlayerProgressFromSourceFile, 1000);
        } else if (fromBeginning === false) {
          audioWebPlayerContainer.classList.remove('audio-web-player-playing');
          audioWebPlayerContainer.classList.add('audio-web-player-paused');
          audioWebPlayerPlayPauseIconElement.setAttribute('title', 'Kontynuuj odtwarzanie utworu');
          audioElement.pause();
        }
      }
    }

  }
}
