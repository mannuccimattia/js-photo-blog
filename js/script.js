// RECUPERO ELEMENTI DAL DOM
const cardsRow = document.getElementById("cards-row");

// DEFINIZIONE VARIABILI
// endpoint della chiamata AJAX
let endpoint = "https://lanciweb.github.io/demo/api/pictures/";

// DEFINIZIONE FUNZIONI
// funzione per creare la singola card
const createCard = (obj) => {
  const { id, title, date, url } = obj;

  const card = `<div class="col-12 col-md-6 col-lg-4">
                  <div class="card">
                    <img src="${url}" class="card-img" alt="${id}">
                    <div class="card-content">
                      <p>${date}</p>
                      <h6 class="display-6 fs-2 fw-semibold">${title}</h6>
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
  let showedCards = "";
  array.forEach(item => {
    showedCards += createCard(item);
  });
  cardsRow.innerHTML = showedCards;
};

// CORPO DEL PROGRAMMA
// Chiamata AJAX
axios.get(endpoint).then(res => {
  // stampa di controllo
  console.log("response:", res.data);

  // chiamo la funzione renderCards e le passo i data della risposta della chiamata
  renderCards(res.data);

  // recupero le immagini dal DOM
  const cardImg = document.querySelectorAll(".card-img");
  // recupero l'overlay dal DOM
  const overlay = document.querySelector(".overlay");
  // recupero il contenitore dell'immagine in overlay
  const overlayContent = document.querySelector(".overlay-content");

  // stampa di controllo
  console.log("cardImg", cardImg);
  console.log("overlay", overlay);

  // EventListener al click di ogni immagine per mostrare l'overlay con la suddetta
  cardImg.forEach(image => {
    image.addEventListener("click", () => {
      overlay.classList.remove("hidden");

      overlayContent.innerHTML = `<div class="overlay-image-wrapper">
                          <img src="${image.src}" alt="Enlarged image">
                          <div id="close-btn">
                            <i class="fa-regular fa-rectangle-xmark"></i>
                          </div>
                        </div>`;
      const closeBtn = document.getElementById("close-btn");

      closeBtn.addEventListener("click", () =>{
        overlay.classList.add("hidden");
        overlayContent.innerHTML = "";
      })
    });
  });
});
