  document.write('<div id="audio-web-player" class="audio-web-player-paused"></div>');
  var audioWebPlayerContainer = document.getElementById('audio-web-player');

  var audioWebPlayerModalWindowWrapperElement = document.createElement('div');
  audioWebPlayerModalWindowWrapperElement.setAttribute('id', 'audio-web-player-modal-window-wrapper');
  audioWebPlayerModalWindowWrapperElement.setAttribute('class', 'not-displayed');
  var audioWebPlayerModalWindowElement = document.createElement('div');
  audioWebPlayerModalWindowElement.setAttribute('class', 'audio-web-player-modal-window');
  audioWebPlayerModalWindowWrapperElement.appendChild(audioWebPlayerModalWindowElement);
  var audioWebPlayerModalWindowCloseIconElement = document.createElement('img');
  audioWebPlayerModalWindowCloseIconElement.setAttribute('id', 'audio-web-player-modal-window-close-icon');
  audioWebPlayerModalWindowCloseIconElement.setAttribute('src', 'audio-web-player/audio-web-player-sources/close.svg');
  audioWebPlayerModalWindowCloseIconElement.setAttribute('alt', 'Ikona do zamykania podglądu okładki albumu');
  audioWebPlayerModalWindowCloseIconElement.setAttribute('title', 'Zamknij podgląd okładki albumu');
  audioWebPlayerModalWindowElement.appendChild(audioWebPlayerModalWindowCloseIconElement);
  var audioWebPlayerModalWindowMainImageElement = document.createElement('img');
  audioWebPlayerModalWindowMainImageElement.setAttribute('id', 'audio-web-player-modal-window-main-image');
  audioWebPlayerModalWindowMainImageElement.setAttribute('src', 'audio-web-player/audio-web-player-sources/album-cover.png');
  audioWebPlayerModalWindowMainImageElement.setAttribute('alt', 'Okładka albumu');
  audioWebPlayerModalWindowMainImageElement.setAttribute('title', 'Okładka albumu');
  audioWebPlayerModalWindowElement.appendChild(audioWebPlayerModalWindowMainImageElement);
  var audioElement = document.createElement('audio');
  audioWebPlayerContainer.appendChild(audioElement);
  var h1Element = document.createElement('h1');
  h1Element.innerHTML = 'Odtwarzacz muzyki';
  audioWebPlayerContainer.appendChild(h1Element);
  var audioWebPlayerSubElement = document.createElement('div');
  audioWebPlayerContainer.appendChild(audioWebPlayerSubElement);
  var audioWebPlayerCoverImageElement = document.createElement('div');
  audioWebPlayerCoverImageElement.setAttribute('id', 'audio-web-player-cover-image');
  audioWebPlayerCoverImageElement.setAttribute('title', 'Okładka albumu');
  audioWebPlayerSubElement.appendChild(audioWebPlayerCoverImageElement);
  var audioWebPlayerCoverImageElementSubElement = document.createElement('img');
  audioWebPlayerCoverImageElementSubElement.setAttribute('src', 'audio-web-player/audio-web-player-sources/album-cover.png');
  audioWebPlayerCoverImageElementSubElement.setAttribute('alt', 'Okładka albumu');
  audioWebPlayerCoverImageElementSubElement.setAttribute('title', 'Okładka albumu');
  audioWebPlayerCoverImageElement.appendChild(audioWebPlayerCoverImageElementSubElement);
  var audioWebPlayerControlsElement = document.createElement('div');
  audioWebPlayerSubElement.appendChild(audioWebPlayerControlsElement);
  var audioWebPlayerControlsSubElement = document.createElement('div');
  audioWebPlayerControlsElement.appendChild(audioWebPlayerControlsSubElement);
  var audioWebPlayerTrackTitleElement = document.createElement('div');
  audioWebPlayerTrackTitleElement.setAttribute('id', 'audio-web-player-track-title');
  audioWebPlayerTrackTitleElement.innerHTML = 'Tytuł utworu';
  audioWebPlayerControlsSubElement.appendChild(audioWebPlayerTrackTitleElement);
  var audioWebPlayerArtistNameElement = document.createElement('div');
  audioWebPlayerArtistNameElement.setAttribute('id', 'audio-web-player-artist-name');
  audioWebPlayerArtistNameElement.innerHTML = 'Nazwa artysty';
  audioWebPlayerControlsSubElement.appendChild(audioWebPlayerArtistNameElement);
  var audioWebPlayerControlsSubTwoElement = document.createElement('div');
  audioWebPlayerControlsElement.appendChild(audioWebPlayerControlsSubTwoElement);
  var audioWebPlayerPrevIconElement = document.createElement('div');
  audioWebPlayerPrevIconElement.setAttribute('id', 'audio-web-player-prev-icon');
  audioWebPlayerPrevIconElement.setAttribute('class', 'disabled');
  audioWebPlayerPrevIconElement.setAttribute('title', 'Przejdź do poprzedniego utworu');
  audioWebPlayerControlsSubTwoElement.appendChild(audioWebPlayerPrevIconElement);
  var audioWebPlayerPlayPauseIconElement = document.createElement('div');
  audioWebPlayerPlayPauseIconElement.setAttribute('id', 'audio-web-player-play-pause-icon');
  audioWebPlayerPlayPauseIconElement.setAttribute('class', 'disabled');
  audioWebPlayerPlayPauseIconElement.setAttribute('title', 'Rozpocznij odtwarzanie utworu');
  audioWebPlayerControlsSubTwoElement.appendChild(audioWebPlayerPlayPauseIconElement);
  var audioWebPlayerNextIconElement = document.createElement('div');
  audioWebPlayerNextIconElement.setAttribute('id', 'audio-web-player-next-icon');
  audioWebPlayerNextIconElement.setAttribute('class', 'disabled');
  audioWebPlayerNextIconElement.setAttribute('title', 'Przejdź do następnego utworu');
  audioWebPlayerControlsSubTwoElement.appendChild(audioWebPlayerNextIconElement);
  var audioWebPlayerProgressTimeElement = document.createElement('div');
  audioWebPlayerProgressTimeElement.setAttribute('id', 'audio-web-player-progress-time');
  audioWebPlayerProgressTimeElement.innerHTML = '00:00 / 00:00';
  audioWebPlayerControlsSubTwoElement.appendChild(audioWebPlayerProgressTimeElement);
  var audioWebPlayerProgressBarElement = document.createElement('div');
  audioWebPlayerProgressBarElement.setAttribute('id', 'audio-web-player-progress-bar');
  audioWebPlayerControlsElement.appendChild(audioWebPlayerProgressBarElement);
  var audioWebPlayerProgressBarSubElement = document.createElement('div');
  audioWebPlayerProgressBarElement.appendChild(audioWebPlayerProgressBarSubElement);

  if (window.location.protocol == 'http:' || window.location.protocol == 'https:') {
    var request = new XMLHttpRequest();
    request.open('GET', 'audio-web-player/audio-web-player-sources/playlist.json', true);
    request.send(null);
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        try {
          playlistObject = JSON.parse(request.responseText);
          var audioWebPlayerSubtitleElement = document.createElement('div');
          audioWebPlayerSubtitleElement.innerHTML = 'Kliknij poniżej wybrany utwór, aby rozpocząć jego odtwarzanie:';
          audioWebPlayerContainer.appendChild(audioWebPlayerSubtitleElement);
          generatePlaylist();
        } catch(error) {
          var audioWebPlayerSubtitleElement = document.createElement('div');
          audioWebPlayerSubtitleElement.innerHTML = 'Wystąpił błąd podczas wczytywania listy utworów!';
          audioWebPlayerContainer.appendChild(audioWebPlayerSubtitleElement);
        }
      }
    };
  } else {
    var audioWebPlayerSubtitleElement = document.createElement('div');
    audioWebPlayerSubtitleElement.innerHTML = 'Nie można uruchomić aplikacji lokalnie!<br />Proszę najpierw umieścić ją na serwerze WWW.';
    audioWebPlayerContainer.appendChild(audioWebPlayerSubtitleElement);
  }

  audioWebPlayerContainer.after(audioWebPlayerModalWindowWrapperElement);

  audioWebPlayerPlayPauseIconElement.addEventListener('click', function() {
    if (this.hasAttribute('class') && this.classList.contains('enabled')) {
      playPauseTrack(playingTrackNumber, false);
    }
  }, false);

  audioWebPlayerPrevIconElement.addEventListener('click', function() {
    if (this.hasAttribute('class') && this.classList.contains('enabled')) {
      if (audioWebPlayerPlaylistElement.firstElementChild.children[playingTrackNumber].hasAttribute('class') && audioWebPlayerPlaylistElement.firstElementChild.children[playingTrackNumber].classList.contains('row-playing')) {
        playingTrackNumber--;
        playPauseTrack(playingTrackNumber, true);
      }
    }
  }, false);

  audioWebPlayerNextIconElement.addEventListener('click', function() {
    if (this.hasAttribute('class') && this.classList.contains('enabled')) {
      if (audioWebPlayerPlaylistElement.firstElementChild.children[playingTrackNumber].hasAttribute('class') && audioWebPlayerPlaylistElement.firstElementChild.children[playingTrackNumber].classList.contains('row-playing')) {
        playingTrackNumber++;
        playPauseTrack(playingTrackNumber, true);
      }
    }
  }, false);

  audioWebPlayerProgressBarElement.addEventListener('click', function(e) {
    if (audioWebPlayerContainer.hasAttribute('class') && audioWebPlayerContainer.classList.contains('audio-web-player-playing')) {
      var rect = e.target.getBoundingClientRect();
      var xCursorPosition = e.clientX - rect.left;
      audioElement.currentTime = xCursorPosition / this.offsetWidth * audioElement.duration;
      refreshPlayerProgress();
    }
  }, false);

  audioWebPlayerCoverImageElement.addEventListener('click', function() {
    if (audioWebPlayerModalWindowWrapperElement.hasAttribute('class') && audioWebPlayerModalWindowWrapperElement.classList.contains('not-displayed')) {
      audioWebPlayerModalWindowWrapperElement.classList.remove('not-displayed');
      audioWebPlayerModalWindowWrapperElement.classList.add('displayed');
    }
  }, false);

  audioWebPlayerModalWindowCloseIconElement.addEventListener('click', function() {
    if (audioWebPlayerModalWindowWrapperElement.hasAttribute('class') && audioWebPlayerModalWindowWrapperElement.classList.contains('displayed')) {
      audioWebPlayerModalWindowWrapperElement.classList.remove('displayed');
      audioWebPlayerModalWindowWrapperElement.classList.add('not-displayed');
    }
  }, false);

  audioElement.addEventListener('ended', function() {
    clearInterval(refreshPlayerProgressInterval);
    this.currentTime = 0;
    if (audioWebPlayerContainer.hasAttribute('class') && audioWebPlayerContainer.classList.contains('audio-web-player-playing')) {
      audioWebPlayerContainer.classList.remove('audio-web-player-playing');
      audioWebPlayerContainer.classList.add('audio-web-player-paused');
    }
    audioWebPlayerPlayPauseIconElement.setAttribute('title', 'Rozpocznij odtwarzanie utworu');
    refreshPlayerProgress();
  });

  function generatePlaylist() {
    audioWebPlayerPlaylistElement = document.createElement('table');
    audioWebPlayerPlaylistElement.setAttribute('id', 'audio-web-player-playlist');
    audioWebPlayerContainer.appendChild(audioWebPlayerPlaylistElement);
    var audioWebPlayerPlaylistBodyElement = document.createElement('tbody');
    audioWebPlayerPlaylistElement.appendChild(audioWebPlayerPlaylistBodyElement);
    for (var loop = 0; loop < playlistObject.length; loop++) {
      var tableTrElement = document.createElement('tr');
      var tableTdOneElement = document.createElement('td');
      var tableTdTwoElement = document.createElement('td');
      tableTdOneElement.innerHTML = (loop + 1) + '.';
      tableTdTwoElement.innerHTML = playlistObject[loop].artistName + ' &ndash; ' + playlistObject[loop].trackName + '<br /><small>z albumu ' + playlistObject[loop].albumName + ' [' + playlistObject[loop].releaseYear + ']</small></td>';
      tableTrElement.setAttribute('class', 'row-paused');
      audioWebPlayerPlaylistBodyElement.appendChild(tableTrElement).appendChild(tableTdOneElement);
      audioWebPlayerPlaylistBodyElement.appendChild(tableTrElement).appendChild(tableTdTwoElement);
    }
    var audioWebPlayerPlaylistElementCells = audioWebPlayerPlaylistElement.getElementsByTagName('td');
    for (var loop = 0; loop < audioWebPlayerPlaylistElementCells.length; loop++) {
      var tableCurrentCell = audioWebPlayerPlaylistElementCells[loop];
      tableCurrentCell.addEventListener('click', function() {
        playingTrackNumber = this.parentNode.rowIndex;
        if (this.parentNode.hasAttribute('class') && this.parentNode.classList.contains('row-paused')) {
          playPauseTrack(playingTrackNumber, true);
        }
      }, false);
    }
  }

  function refreshPlayerProgress() {
    var secondsCurrentTime = Math.floor(audioElement.currentTime % 60);
    var minutesCurrentTime = Math.floor((audioElement.currentTime / 60) % 60);
    var secondsDuration = Math.floor(audioElement.duration % 60);
    var minutesDuration = Math.floor((audioElement.duration / 60) % 60);
    secondsDuration = (secondsDuration < 10) ? '0' + secondsDuration : secondsDuration;
    secondsCurrentTime = (secondsCurrentTime < 10) ? '0' + secondsCurrentTime : secondsCurrentTime;
    minutesDuration = (minutesDuration < 10) ? '0' + minutesDuration : minutesDuration;
    minutesCurrentTime = (minutesCurrentTime < 10) ? '0' + minutesCurrentTime : minutesCurrentTime;
    audioWebPlayerProgressTimeElement.innerText = minutesCurrentTime + ':' + secondsCurrentTime + ' / ' + minutesDuration + ':' + secondsDuration;
    audioWebPlayerProgressBarElement.firstElementChild.style.width = (audioElement.currentTime / audioElement.duration * 100) + '%';
  }

  function playPauseTrack(trackNumber, fromBeginning) {
    audioWebPlayerTrackTitleElement.innerText = playlistObject[trackNumber].trackName;
    audioWebPlayerArtistNameElement.innerText = playlistObject[trackNumber].artistName;
    if (fromBeginning === true) {
      audioWebPlayerProgressTimeElement.innerText = '00:00 / ' + playlistObject[trackNumber].durationTime;
      audioWebPlayerProgressBarElement.firstElementChild.style.width = '0';
    }
    if (audioWebPlayerPlayPauseIconElement.hasAttribute('class') && audioWebPlayerPlayPauseIconElement.classList.contains('disabled')) {
      audioWebPlayerPlayPauseIconElement.classList.remove('disabled');
      audioWebPlayerPlayPauseIconElement.classList.add('enabled');
    }
    if (trackNumber > 0 && audioWebPlayerPrevIconElement.hasAttribute('class') && audioWebPlayerPrevIconElement.classList.contains('disabled')) {
      audioWebPlayerPrevIconElement.classList.remove('disabled');
      audioWebPlayerPrevIconElement.classList.add('enabled');
    } else if (trackNumber <= 0 && audioWebPlayerPrevIconElement.hasAttribute('class') && audioWebPlayerPrevIconElement.classList.contains('enabled')) {
      audioWebPlayerPrevIconElement.classList.remove('enabled');
      audioWebPlayerPrevIconElement.classList.add('disabled');
    }
    if (trackNumber < audioWebPlayerPlaylistElement.rows.length - 1 && audioWebPlayerNextIconElement.hasAttribute('class') && audioWebPlayerNextIconElement.classList.contains('disabled')) {
      audioWebPlayerNextIconElement.classList.remove('disabled');
      audioWebPlayerNextIconElement.classList.add('enabled');
    } else if (trackNumber >= audioWebPlayerPlaylistElement.rows.length - 1 && audioWebPlayerNextIconElement.hasAttribute('class') && audioWebPlayerNextIconElement.classList.contains('enabled')) {
      audioWebPlayerNextIconElement.classList.remove('enabled');
      audioWebPlayerNextIconElement.classList.add('disabled');
    }
    var audioWebPlayerPlaylistElementRows = audioWebPlayerPlaylistElement.rows;
    for (var loop = 0; loop < audioWebPlayerPlaylistElementRows.length; loop++) {
      if (audioWebPlayerPlaylistElementRows[loop].hasAttribute('class') && audioWebPlayerPlaylistElementRows[loop].classList.contains('row-playing')) {
        audioWebPlayerPlaylistElementRows[loop].classList.remove('row-playing');
        audioWebPlayerPlaylistElementRows[loop].classList.add('row-paused');
      }
    }
    audioWebPlayerPlaylistElement.firstElementChild.children[trackNumber].classList.remove('row-paused');
    audioWebPlayerPlaylistElement.firstElementChild.children[trackNumber].classList.add('row-playing');
    if (fromBeginning === true) {
      var albumTitleAlt = 'Okładka albumu ' + playlistObject[trackNumber].artistName + ' – ' + playlistObject[trackNumber].albumName + ' [' + playlistObject[trackNumber].releaseYear + ']';
      audioWebPlayerCoverImageElement.firstElementChild.setAttribute('title', albumTitleAlt);
      audioWebPlayerModalWindowMainImageElement.setAttribute('title', albumTitleAlt);
      audioWebPlayerModalWindowMainImageElement.setAttribute('alt', albumTitleAlt);
      audioWebPlayerCoverImageElement.firstElementChild.src = 'audio-web-player/audio-web-player-thumbnails/' + playlistObject[trackNumber].coverFile;
      audioWebPlayerModalWindowMainImageElement.src = 'audio-web-player/audio-web-player-covers/' + playlistObject[trackNumber].coverFile;
      audioElement.src = 'audio-web-player/audio-web-player-tracks/' + playlistObject[trackNumber].trackFile;
    }
    if (audioWebPlayerContainer.hasAttribute('class') && audioWebPlayerContainer.classList.contains('audio-web-player-paused')) {
      audioWebPlayerContainer.classList.remove('audio-web-player-paused');
      audioWebPlayerContainer.classList.add('audio-web-player-playing');
      audioWebPlayerPlayPauseIconElement.setAttribute('title', 'Wstrzymaj odtwarzanie utworu');
      audioElement.play();
      refreshPlayerProgressInterval = setInterval(refreshPlayerProgress, 1000);
    } else if (audioWebPlayerContainer.hasAttribute('class') && audioWebPlayerContainer.classList.contains('audio-web-player-playing')) {
      if (fromBeginning === true) {
        audioWebPlayerPlayPauseIconElement.setAttribute('title', 'Wstrzymaj odtwarzanie utworu');
        audioElement.play();
        refreshPlayerProgressInterval = setInterval(refreshPlayerProgress, 1000);
      } else if (fromBeginning === false) {
        audioWebPlayerContainer.classList.remove('audio-web-player-playing');
        audioWebPlayerContainer.classList.add('audio-web-player-paused');
        audioWebPlayerPlayPauseIconElement.setAttribute('title', 'Kontynuuj odtwarzanie utworu');
        audioElement.pause();
        clearInterval(refreshPlayerProgressInterval);
      }
    }
  }
