// RECUPERO ELEMENTI DAL DOM
// contenitore delle card
const cardsRow = document.getElementById("cards-row");

// DEFINIZIONE VARIABILI
// endpoint della chiamata AJAX
let endpoint = "https://lanciweb.github.io/demo/api/pictures/";

// DEFINIZIONE FUNZIONI
// funzione per creare la singola card
const createCard = (obj) => {
  // destructuring del singolo oggetto dell'array di risposta
  const { id, title, date, url } = obj;
  // definizione del contenuto della card
  const card = `<div class="col-12 col-md-6 col-lg-4">
                  <div class="card">
                    <img src="${url}" class="card-img" alt="${id}">
                    <div class="card-content">
                      <p class="fw-medium">${date}</p>
                      <h6 class="display-6 fs-3 fw-bold">${title.toUpperCase()}</h6>
                    </div>
                    <div class="pin">
                      <img src="./img/pin.svg" alt="pin">
                    </div>
                  </div>
                </div>`

  return card;
};

// funzione per renderizzare il contenuto di cards-row
const renderCards = (array) => {
  // creo una variabile vuota
  let showedCards = "";
  // per ogni oggetto dell'array di risposta, lo passo alla funzione createCard e aggiungo il risultato alla variabile creata
  array.forEach(item => {
    showedCards += createCard(item);
  });
  // inserisco il contenuto della variabile dentro il contenitore delle cards
  cardsRow.innerHTML = showedCards;
};

// CORPO DEL PROGRAMMA
// Chiamata AJAX
axios.get(endpoint).then(res => {
  // chiamo la funzione renderCards e le passo i data della risposta della chiamata
  renderCards(res.data);

  // recupero le immagini renderizzate dal DOM
  const cardImg = document.querySelectorAll(".card-img");
  // recupero l'overlay dal DOM
  const overlay = document.querySelector(".overlay");
  // recupero il contenitore dell'immagine in overlay
  const overlayContent = document.querySelector(".overlay-content");

  // EventListener al click di ogni immagine per mostrare l'overlay con la suddetta
  cardImg.forEach(image => {
    image.addEventListener("click", () => {
      // mostro l'overlay
      overlay.classList.remove("hidden");
      // aggiungo al contenuto il bottone di chiusura e l'immagine cliccata
      overlayContent.innerHTML = `<div class="overlay-image-wrapper">  
                                    <button class="btn btn-light" id="close-btn">Chiudi</button>
                                    <img src="${image.src}" alt="Enlarged image">
                                  </div>`;
      // recupero il bottone di chiusura dal DOM                                  
      const closeBtn = document.getElementById("close-btn");
      // EventListener al click del bottone di chiusura
      closeBtn.addEventListener("click", () =>{
        // nascondo l'overlay
        overlay.classList.add("hidden");
        // svuoto il contenuto dell'overlay
        overlayContent.innerHTML = "";
      })
    });
  });
});
