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

### Tietokanta tätä esimerkkiä varten

Luodaan ajamalla komennot 
<pre>
CREATE DATABASE netdb;
CREATE USER 'netuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'netpass';
GRANT ALL on netdb.* to 'netuser'@'localhost';

USE netdb;

CREATE TABLE book(
id_book INT primary key auto_increment,
name VARCHAR(255),
author VARCHAR(255),
isbn VARCHAR(20)
);

INSERT INTO book(name,author,isbn) VALUES('PHP Basic','Bob Jones','123-456-789-111-x');
INSERT INTO book(name,author,isbn) VALUES('Statistics','Lisa Smith','222-333-444-555-y');

CREATE TABLE user_table(
  id_user INT primary key auto_increment,
  username VARCHAR(20),
  password VARCHAR(255),
  UNIQUE (username)
);
</pre>

## express-generator
Alustetaan sovellus komennolla **npx express-generator --no-view**

Suoritetaan komento **npm install**

Kokeillaan sovellusta käynnistämällä se komennolla **npm start**. Sovelluksessa on "endpointit" 
http://localhost:3000 ja http://localhost:/users

## dotenv
Asennetaan komennolla **npm install dotenv**

## mysql
Asennetaan komennolla **npm install mysql**

## env
Luodaan tiedosto **.env** ja kirjoitetaan sinne rivi 
<pre>
MYSQL_SERVER=mysql://netuser:netpass@server:3306/netdb
</pre>
Tiedosto .env jätetään yleensä pois reposta lisäämällä se .gitignore:en

## database.js
Luo sovelluksen juureen tiedosto **database.js** ja kirjoita sinne rivit 
<pre>
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
const connection = mysql.createPool(process.env.MYSQL_SERVER);
module.exports = connection;
</pre>