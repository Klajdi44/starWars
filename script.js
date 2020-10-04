"use strict";
window.addEventListener("DOMContentLoaded", start);

function start() {
  // Tried using a foor loop but that didn't work well with this specific api
  loadJson("https://swapi.dev/api/films/1/", displayFilm);
  loadJson("https://swapi.dev/api/films/2/", displayFilm);
  loadJson("https://swapi.dev/api/films/3/", displayFilm);
  loadJson("https://swapi.dev/api/films/4/", displayFilm);
  loadJson("https://swapi.dev/api/films/5/", displayFilm);
  loadJson("https://swapi.dev/api/films/6/", displayFilm);
  //add event listener to close modal
  document.querySelector('.closeBtn').addEventListener('click', closeModal);
}

function loadJson(url, callback) {
  fetch(url).then(resp => resp.json()).then(json => callback(json));
}

function displayFilm(filmData) {
  //clone movies template
  const clone = document.querySelector("#movie_template").content.cloneNode(true);
  //set data to the cloned fragments
  clone.querySelector("[data-field=title]").textContent = filmData.title;
  clone.querySelector('[ data-field=actorNumber]').textContent = filmData.characters.length;

  const characters = filmData.characters;
  // loop through all characters
  characters.forEach(characterurl => {
    // First create character placeholder - and append that to the movie-clone
    const placeholder = document.createElement("li");
    placeholder.textContent = "-placeholder-";
    clone.querySelector("#characters").appendChild(placeholder);

    // load the character-url
    loadJson(characterurl, displayCharacter);
     
    function displayCharacter(characterData) {
      // create a clone for each one
      const characterclone = document.querySelector("#character_template").content.cloneNode(true);
      // Put the real characterdata into the template
      characterclone.querySelector("[data-field=name]").textContent = characterData.name;
      characterclone.querySelector("[data-field=height]").textContent = characterData.gender;
      //add event listener to open the modal
      characterclone.querySelector('.modalBtn').addEventListener('click', () => {
        openModal(characterData.name, characterData.height, characterData.birth_year, characterData.eye_color, characterData.gender, characterData.hair_color, characterData.skin_color, characterData.mass);
      });
      // replace the placeholder with the characterclone
      placeholder.replaceWith(characterclone);
      // instead of trying to add it to the original - no longer existing - clone
      // clone.querySelector("#characters").appendChild(characterclone);
      // ERROR: this fails because the clone no longer exists ... !!!      
    }
  });
  //apened clone to the movies div
  document.querySelector("#movies").appendChild(clone);
}

//open modal
function openModal(name, height, birthYear, eyeColor, gender, hairColor, skinColor, mass) {
  //set data to the modal elements
  document.querySelector('.modal').style.display = 'block';
  document.querySelector('[data-field=modalName]').textContent = name;
  document.querySelector('[data-field=birthYear]').textContent = birthYear;
  document.querySelector('[data-field=gender]').textContent = gender;
  document.querySelector('[data-field=eyeColor]').textContent = eyeColor;
  document.querySelector('[data-field=hairColor]').textContent = hairColor;
  document.querySelector('[data-field=modalHeight]').textContent = height;
  document.querySelector('[data-field=mass]').textContent = mass;
  document.querySelector('[ data-field=skinColor]').textContent = skinColor;
}

//close modal
function closeModal() {
  document.querySelector('.modal').style.display = 'none';
}