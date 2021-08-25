
const URL = "http://localhost:3000/teddies/";

let Params = new URLSearchParams(window.location.search);
let id = Params.get('id');


apiData = function() {
    return new Promise(function (productList) {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch((URL + Params), requestOptions)
            .then(function (response) { 
                return response.json();
            })
            .then(function (res) { 
                return productList(res);
            })
            .catch(function (err) {
                apiFail = document.querySelector('.bloc');
                apiFail.classList.add('msg__fail');
                apiFail.innerHTML = "Veuillez démarrer le serveur";
                console.error(err);
            });
    });
};

async function productList() {
    let teddies = await apiData();
    console.log(teddies);

    let teddiesList = document.querySelector('.bloc');
    let blocTitle = document.createElement('h2');
    blocTitle.textContent = "Choisissez votre ours en peluche";

    teddiesList.appendChild(blocTitle);

    for (let teddy of teddies) {

        let card = document.createElement('article');
        let content = document.createElement('div');
        let pic = document.createElement('img')
        let name = document.createElement('h3');
        let description = document.createElement('p');
        let btn = document.createElement('a');
        
        pic.src = teddy.imageUrl;
        name.textContent = teddy.name;
        description.textContent = teddy.description;
        btn.textContent = "Acheter le produit";

        teddiesList.appendChild(card);
        card.appendChild(pic);
        card.appendChild(content)
        content.appendChild(name);
        content.appendChild(description);
        content.appendChild(btn);

        card.classList.add('card');
        pic.classList.add('card__pics');
        content.classList.add('card__content');
        btn.classList.add('card__btn');

      
    };
};
