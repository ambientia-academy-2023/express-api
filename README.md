# express-api

## Tietokannasta
UniServerin MySQL sallii oletuksena yhteydet vain osoitteesta 127.0.0.1. Konfiguroidaan se sallimaan yhteydet myös osoitteesta ::1 eli ipv6-version "localhost".

Tämä onnistuu kirjoittamalla tiedostoon my.ini (windows) rivi
bind-address=127.0.0.1,::1