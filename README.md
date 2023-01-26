# express-api

## Tietokannasta

UniServerin voi ladata sivulta http://www.uniformserver.com/.
Se on yksi versio ns. WAMPP paketista eli Windows Apache MySQL PHP. Sen etu on, että sitä ei tarvitse asentaa, vaan riittää että paketin purkaa. Älä kuitenkaan laita sitä sellaisen kansion sisään, jonka nimessä on välilyönti (esim. ladatut tiedostot).

UniServerin MySQL sallii oletuksena yhteydet vain osoitteesta 127.0.0.1. Konfiguroidaan se sallimaan yhteydet myös osoitteesta ::1 eli ipv6-version "localhost".

Tämä onnistuu kirjoittamalla tiedostoon my.ini (windows) rivi
bind-address=127.0.0.1,::1 

Jos laitat näin bind-address=0.0.0.0 niin MySQL päästää sisään mistä hyvänsä tulevat pyynnöt.

Kannattaa myös suuurentaa thread-stack määrä seuraavasti <br>
thread_stack = 256K tällöin voit suorittaa proseduureja.