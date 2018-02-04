[![GitHub release][badge-github-pre-release]][winair-latest-release]
[![Downloads total][badge-downloads-total]][winair-latest-release]

**Note:** FOR ENGLISH PLEASE SCROLL DOWN THE DOCUEMNT

# WinAir

Winair to mała aplkacja przeznaczona dla komputerów z systemem operacyjnym Windows 7 lub nowszym.
Aplikacja działa w tle i informuje użytkownika o jakości powietrza w okolicy.

<p align="center">
<img src="https://raw.githubusercontent.com/Stachuu87/WinAir/master/screenshots/WinAir.png" align="center" height="350px">
</p>


## Instalacja

Aby rozpocząć korzystanie z WinAir, wystarczy pobrać plik WinAir.zip <a href="https://github.com/Stachuu87/winair/releases" target="_blank"> tej strony </a> i rozpakować go w dowolnym miejscu na komputerze. Następnie uruchomić plik WinAir.exe.

**Note:** Aplikacja samoczynnie doda się do autostartu systemu. Jeśli nie chcesz, aby uruchamiała się przy każdym włączeniu komputera możesz wyłączyć tą funkcję. Aby to zrobić, wciśnij klawisze:``Ctrl + Alt + Del``, wejdź do `Menadżera Zadań`, przejdź do zakładki `Uruchamianie` i zaznaczyć opcję `Wyłączone` obok ikony aplikacji.


## Funkcje

Aplikacja po uruchomieniu, na podstawie adresu IP ustala pozycję na mapie i odnajduje najbliższy czujnik jakości powietrza Airly.
Następnie co 10 minut aplikacja będzie sprawdzała aktualny stan i w razie zmian jakości powietrza, zostanie wyświetlone powiadomienie.

Istnieje również możliwość wyszukania dowolnego adresu w PL i ustalenie najbliższej stacji pomiarowej Airly.

## Aktualizacje

Jeśli pojawi się nowa wersja aplikacji, w prawym górnym rogu, na pasku zostanie wyświetlona informacja: "Pobierz nową wersję". Wystarczy kliknąć w tą informację, a strona pobierania otworzy się automatycznie. Następnie pobieramy aktualną wersję pliku ZIP i rozpakowujemy go, podmieniając starą wersję WinAir.


## Prywatność

WinAir nie zbiera i nie zapisuje żadnych danych na temat jego użytkowników.

## Licencja

Copyright 2018 Piotr Stanisławski

Licencja <a href="http://www.apache.org/licenses/LICENSE-2.0.html" targe="_blank">Apache v:2.0</a>



# WinAir

Its a small tray aplication created for Windows running machines.

<p align="center">
<img src="https://raw.githubusercontent.com/Stachuu87/WinAir/master/screenshots/WinAir.png" align="center" height="350px">
</p>


## Installation

There is no need to install it at all. Simply download the latest aplication release from<a href="https://github.com/Stachuu87/winair/releases" target="_blank"> HERE </a>and save it whereever You want.
After that just unzip it and run WinAir.exe file.

**Note:** App automaticly will add itself to system autostart. If You wish to switch it off, just go to `Task Manager` and set the autostart to `Disabled`.


## Features

App is running in the background. It will automaticly find nearest <a href="https://airly.eu/pl/" target="_blank">Airly</a> Station and get it's measurements if possible.

If You wish to change the station, simply use searchbar in the bottom of the app.
At the moment there is no option to save it, so after restarting the app (or Your machine), it will again autodetect Your position.

You will be notified about every change of major air pollution index.


## Updates

When new relase will show up, You will find notification in the top right corner of app window. Simply follow the link, download new release, overwrite in You app path and run it.


## Privacy

WinAir is not collecting any data about users, machines etc.


## License

Copyright 2018 Piotr Stanisławski

Licensed under the <a href="http://www.apache.org/licenses/LICENSE-2.0.html" targe="_blank">Apache License v:2.0</a>


[badge-downloads-total]: https://img.shields.io/github/downloads/stachuu87/winair/total.svg
[winair-latest-release]: https://github.com/stachuu87/winair/releases/latest
[badge-github-pre-release]: https://img.shields.io/github/release/stachuu87/winair/all.svg
