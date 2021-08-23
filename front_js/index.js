
const URL = "http://localhost:3000/teddies/";

let Params = new URLSearchParams(window.location.search);
let id = Params.get('id');
if (id === null) {
    Params = "";
} else {
    Params = id;
}

// promise pour la requete API avec méthode Fetch
getApiData = () => {
    return new Promise((objectList) => {
        let requestOptions = {
            method: 'GET', // utilisation de la methode GET
            redirect: 'follow'
        };
        fetch((URL + Params), requestOptions)
            .then(response => response.json())
            .then(result => objectList(result))
            .catch(error => {
                // en cas d'erreur de chargement de l'API affichage d'un message sur l'écran de l'utilisateur + message d'erreur dans la console
                apiFail = document.querySelector('.bloc');
                apiFail.classList.add('fail__msg');
                apiFail.innerHTML = "Veuillez démarrer le serveur";
                console.error(error);
            });
    });
};

//fonction pour l'affichage des produits sur la page index
async function objectsList() {
    let teddies = await getApiData();
    console.log(teddies);

    let teddiesList = document.querySelector('.bloc');
    let blocTitle = document.createElement('h2');
    blocTitle.textContent = "Choisissez votre ours en peluche";

    teddiesList.appendChild(blocTitle);

    // création d'une boucle pour l'affichage en liste des objets
    for (let teddy of teddies) {

        let cardElt = document.createElement('article');
        let contentElt = document.createElement('div');
        let picElt = document.createElement('img')
        let nameElt = document.createElement('h3');
        let descriptionElt = document.createElement('p');
        let btnElt = document.createElement('a');
        
        picElt.src = teddy.imageUrl;
        nameElt.textContent = teddy.name;
        descriptionElt.textContent = teddy.description;
        btnElt.textContent = "Acheter le produit";

        teddiesList.appendChild(cardElt);
        cardElt.appendChild(picElt);
        cardElt.appendChild(contentElt)
        contentElt.appendChild(nameElt);
        contentElt.appendChild(descriptionElt);
        contentElt.appendChild(btnElt);

        cardElt.classList.add('card');
        picElt.classList.add('card__pics');
        contentElt.classList.add('card__content');
        btnElt.classList.add('card__btn');

      
    };
};
