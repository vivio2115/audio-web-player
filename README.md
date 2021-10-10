# Audio Web Player wersja 2
**Audio Web Player** to prosty odtwarzacz plików muzycznych MP3, który w prosty sposób każdy może dodać do swojej strony internetowej zupełnie za darmo. Stawiając nacisk na jego prostotę, posiada intuicyjny w obsłudze interfejs, który umożliwia łatwą zmianę aktualanie odtwarzanego utworu za pomocą przycisków nawigacyjnych oraz za pomocą dowolnej ułożonej przez użytkownika listy odtwarzania. Aplikacja w czasie rzeczywistym wyświetla postęp odtwarzanego utworu, który można w prosty sposób przewinąć do dowolnego miejsca klikając pasek postępu. Ponadto program nie tylko wyświetla informacje o nazwach wykonawców, tytułów utworów, albumów oraz lat ich wydania, ale pozwala na dodawanie okładek albumów w tym ich odpowiedników o wysokiej rozdzielczości, które są powiększane po kliknięciu miniaturki.

Poniżej przedstawiono zrzut ekranu aplikacji z ciemnym motywem:

![screen-1](https://user-images.githubusercontent.com/63713887/136063217-0ff79cea-847b-40c6-bdb2-6d3995c5124a.png)

Poniżej przedstawiono zrzut ekranu aplikacji ze starym jasnym motywem:

![screen-2](https://user-images.githubusercontent.com/63713887/136063362-3b1f8100-49a8-4db5-94c6-3e0f2b74aa81.png)

## Historia zmian
W drugiej odsłonie aplikacji dodano pokrętło do regulacji głośności, możliwość dostosowania interfejsu użytkownika (m.in. etykiet tekstowych, w tym formatu wyświetlanego czasu utworu), a także wprowadzono motyw o ciemnej kolorystyce, który obecnie jest domyślny (oczywiście, istnieje możliwość powrotu do starej jasnej szaty graficznej).

## Instrukcja instalacji
1. Pierwszą czynnością jest skopiowanie katalogu *audio-web-player* do katalogu z Twoją stroną internetową, na której ma być zamieszczony Audio Web Player.

2. Wszystkie pliki muzyczne MP3 należy skopiować do katalogu *audio-web-player/awp-tracks/* pod dowolną nazwą. Aplikacja domyślnie zawiera trzy przykładowe utwory w formacie MP3 @ 192kb/s, które należy skasować, bądź zamienić na inne.

3. Wszystkie pliki graficzne z okładkami albumów należy skopiować do katalogu *audio-web-player/awp-covers/* pod dowolną nazwą. Zaleca się wykorzystanie obrazów wysokiej rozdzielczości (na przykład 1000 pikseli na 1000 pikseli), aby uniknąć efektu rozmycia przy ich powiększaniu.

4. Wszystkie pliki graficzne z miniaturami okładek albumów należy skopiować do katalogu *audio-web-player/awp-thumbnails/*, każdy pod identyczną nazwą i rozszerzeniem jak w katalogu wymienionym powyżej (czyli w tym katalogu z okładkami wysokiej rozdzielczości). Zaleca się wykorzystanie obrazów niższej rozdzielczości (na przykład 300 pikseli na 300 pikseli) oraz silniejszej kompresji, aby zapobiec opóźnieniom w ich wczytywaniu przy zmianie odtwarzanego utworu.

5. Dodaj plik arkusza stylów CSS (podając właściwą ścieżkę do tego pliku) oraz plik skryptu JavaScript (również podając właściwą ścieżkę do tego pliku) wewnątrz sekcji  `<head>` i `</head>` na stronie, na której ma zostać umieszczony Audio Web Player, wklajając poniższy kod HTML, na przykład:
      ```
      <link href="audio-web-player/awp-sources/awp-dark-theme.min.css" rel="stylesheet" />
      <script src="audio-web-player/awp-sources/awp.min.js"></script>
      ```

      Wskazówka: Plik *awp-dark-theme.min.css* to motyw o ciemnym wyglądzie, jeśli zechcesz użyć jasnego motywu, zamiast niego wpisz *awp-light-theme.min.css*.

6. Dodaj informacje ustawieniach interfejsu odtwarzacza oraz o liście utworów wyświetlanych w odtwarzaczu. Dane te są przechowywane w pliku *audio-web-player/awp-sources/settings.json*. Obowiązuje w nim zapis w formacie JSON dzielącego się na obiekt *interface* (którego nie ma konieczności zmieniać) oraz *playlist* składającego się z tablicy obiektów (w poniższym przykładzie zamieszczono trzy utwory), na przykład:
      ```
      {
         "interface": {
            "headerTitle": "Odtwarzacz muzyki",
            "trackTitleStopped": "Tytuł utworu",
            "artistNameStopped": "Nazwa artysty",
            "coverImageTitle": "Okładka albumu",
            "noCoverImageTitle": "Okładka nieznanego albumu",
            "playlistHeaderSubtitle": "Kliknij poniżej wybrany utwór, aby rozpocząć jego odtwarzanie:",
            "showPlaylist": true,
            "showPreviousButton": true,
            "showNextButton": true,
            "showStopButton": true,
            "showVolumeKnob": true,
            "setVolumeOfSound": "full",
            "timeFormat": "$cur_min_1$:$cur_sec_2$ / $dur_min_1$:$dur_sec_2$",
            "playlistItemTitleFormat": "$artist_name$ &ndash; $track_name$ [$dur_min_1$:$dur_sec_2$]",
            "playlistItemSubitleFormat": "z&nbsp;albumu $album_name$ z&nbsp;roku $release_year$",
            "selectedTrack": "none"
          },
         "playlist": [
            {
               "artistName": "Shpongle",
               "trackName": "Divine Moments Of Truth",
               "albumName": "Are You Shpongled?",
               "releaseYear": "1998",
               "coverFile": "shpongle-are-you-shpongled.jpg",
               "trackFile": "shpongle-divine-moments-of-truth.mp3",
               "durationTimeMinutes": 10,
               "durationTimeSeconds": 20
            },
            {
               "artistName": "Infected Mushroom",
               "trackName": "Heavyweight",
               "albumName": "Vicious Delicious",
               "releaseYear": "2007",
               "coverFile": "infected-mushroom-vicious-delicious.jpg",
               "trackFile": "infected-mushroom-heavyweight.mp3",
               "durationTimeMinutes": 8,
               "durationTimeSeconds": 41
            },
            {

               "trackName": "All I Want",
               "albumName": "The Last Days Of Gravity",
               "releaseYear": "2007",
               "coverFile": "younger-brother-the-last-days-of-gravity.jpg",
               "trackFile": "younger-brother-all-i-want.mp3",
               "durationTimeMinutes": 9,
               "durationTimeSeconds": 4
            }
         ]
      }
      ```
      Obiekt *interface* reprezentujący strukturę interfejsu aplikacji obowiązkowo musi składać się z 12 następujących pól wraz z przypisanymi wartościami:
      - `"headerTitle":` - dowolny tytuł aplikacji
      - `"trackTitleStopped":` - dowolny tekst wyświetlany w miejscu tytułu utworu, gdy odtwarzanie jest zatrzymane
      - `"artistNameStopped":` - dowolny tekst wyświetlany w miejscu nazwy artysty, gdy odtwarzanie jest zatrzymane
      - `"coverImageTitle":` - dowolny tekst dodawany przed nazwą albumu
      - `"playlistHeaderSubtitle":` - dowolny tekst wyświetlany przed listą odtwarzania
      - `"showPreviousButton":` - ustawić *true* jeśli przycisk zmiany utworu na poprzedni ma być wyświetlany lub *false* w przeciwnym wypadku
      - `"showNextButton":` - ustawić *true* jeśli przycisk zmiany utworu na następny ma być wyświetlany lub *false* w przeciwnym wypadku
      - `"showStopButton":` - ustawić *true* jeśli przycisk zatrzymania odtwarzania utworu ma być wyświetlany lub *false* w przeciwnym wypadku
      - `"showVolumeKnob":` - ustawić *true* jeśli pokrętło zmiany poziomu głośności ma być wyświetlane lub *false* w przeciwnym wypadku
      - `"setVolumeOfSound":` - poziom poziomu głośności po uruchomieniu aplikacji ustawianej za pomocą wartości od *0* do *100* (sama liczba bez innych dodakowych znaków), wpisanie *"full"* oznacza pełną głośność (jest to domyślne ustawienie)
      - `"timeFormat":` - określa format wyświetlanego formatu czasu, gdzie *cur* to czas, który upłyną, a *dur* to czas trwania utworu, *min* to liczba minut, a *sec* to liczba sekund, cyfra *2* na końcu dodaje w razie potrzeby zero wiodące w przeciwieństwie to cyfry *1*, która tego nie robi - poniżej przykładowe prawidłowe zapisy:
          - `"$cur_min_1$:$cur_sec_2$ / $dur_min_1$:$dur_sec_2$"` - wyświetla czas w formacie *0:00 / 0:00*
          - `$cur_min_2$:$cur_sec_2$ / $dur_min_2$:$dur_sec_2$"` - wyświetla czas w formacie *00:00 / 00:00*
          - `"upłynęło $cur_min_1$ minut i $dur_sec_1$ sekund"` - wyświetla czas w formacie *upłynęło 0 minut i 0 sekund*
          - `"czas trwania: $dur_min_1$ min. i $dur_sec_2$ sek."` - wyświetla czas w formacie *czas trwania: 0 min. i 00 sek.*
          - `"$full_cur_sec_1$ sek. z $full_dur_sec_3$ sek."` – wyświetla czas w formacie *0 sek. z 000 sek.*
      - `"selectedTrack":` - numer domyślnie wczytywanego i wybieranego utworu z listy odtwarzania po uruchomieniu aplikacji (*1* oznacza pierwszy utwór, *3* to trzeci utwór, itd., wpisanie *"none"* oznacza, że żaden utwór nie zostanie wstępnie wczytany i wybrany (jest to domyślne ustawienie)

     Każdy obiekt z tablicy obiektów *playlist* reprezentujący poszczególny utwór z listy odtwarzania obowiązkowo musi składać się z 8 następujących pól wraz z przypisanymi wartościami:
      - `"artistName":` - nazwa artysty utworu
      - `"trackName":` - nazwa utworu
      - `"albumName":` - nazwa albumu z którego pochodzi utwór
      - `"releaseYear":` - rok wydania albumu
      - `"coverFile":` - pełna nazwa pliku okładki albumu (zarówno miniaturki jak i obrazu w wysokiej rozdzielczości)
      - `"trackFile":` - pełna nazwa pliku utworu
      - `"durationTimeMinutes":` - liczba określająca długość czasu trwania utworu w minutach
      - `"durationTimeSeconds":` - liczba określająca dłogość czasu trwania utworu w sekundach (reszta z minut)

7. Ostatnim krokiem jest umieszczenie aplikacji Audio Web Player na Twojej stronie internetowej. W tym celu należy wkleić krótki poniższy kod HTML, dokładnie w tym miejscu, gdzie ma się wyświetlić odtwarzacz:
      ```
      <div id="audio-web-player"></div>
      ```
      Wskazówka: Aby zapobiec ewentualnym problemom związanych z uruchomieniem aplikacji, plik JavaScript *awp.min.js* powinien zostć umieszczony przed elementem `<div id="audio-web-player"></div>` będącym kontenerem dla całej aplikacji.
8. Opcjonalnie, wygląd odtwarzacza można dowolnie dostosowywać do własnych potrzeb (w szczególności jego kolory interfejsu), poprzez odpowiednią edycję pliku stylu CSS (dołączonego do strony w sekcji  `<head>` i `</head>`.

Życzę miłego użytkowania i zapraszam o opiniowanie na moim blogu: http://wlasocha.pl/portfolio/audio-web-player
