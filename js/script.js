// RECUPERO ELEMENTI DAL DOM
const cardsRow = document.getElementById("cards-row");

// DEFINIZIONE VARIABILI
// endpoint della chiamata AJAX
let endpoint = "https://lanciweb.github.io/demo/api/pictures/"

// DEFINIZIONE FUNZIONI
// funzione per creare la singola card
const createCard = (obj) => {
  const { id, title, date, url } = obj;

  const card = `<div class="col-12 col-md-6 col-lg-4">
                  <div class="card">
                    <img src="${url}" class="card-img" alt="${id}">
                    <div class="card-content">
                      <h6 class="display-6 fs-2 fw-medium">${title}</h6>
                      <p>${date}</p>
                    </div>
                    <div class="pin">
                      <img src="./img/pin.svg" alt="pin">
                    </div>
                  </div>
                </div>`

  return card;                
}

// funzione per renderizzare il contenuto di cards-row
const renderCards = (array) => {
  let showedCards = "";
  array.forEach(item => {
    showedCards += createCard(item);
  })
  cardsRow.innerHTML = showedCards;
}

// CORPO DEL PROGRAMMA
// Chiamata AJAX
axios.get(endpoint).then(res => {
  console.log("response:", res.data);
  renderCards(res.data);
})


