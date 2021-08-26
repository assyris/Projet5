const params = new URL(document.location).searchParams;
const id = params.get("id");
console.log(id);

const getTeddies = async function() {
    try {
        let response = await fetch('http://localhost:3000/teddies/' + id);
        if (response.ok) {
            let teddy = await response.json();
            console.log(teddy);

            const main = document.getElementById('product_page');
            const h2 = document.createElement('h2');
            main.appendChild(h2);
            h2.textContent = teddy.name;

            const div = document.createElement('div');
            main.appendChild(div);
            div.className = 'teddy_ref';

            const img = document.createElement('img');
            div.appendChild(img);
            img.setAttribute('src', teddy.imageUrl);

            const divInfo = document.createElement('div');
            div.appendChild(divInfo);
            divInfo.className = 'teddy_info';

            const h3 = document.createElement('h3');
            divInfo.appendChild(h3);
            h3.textContent = teddy.name;

            const parag = document.createElement('p');
            divInfo.appendChild(parag);
            parag.textContent = teddy.description;

            const price = document.createElement('p');
            divInfo.appendChild(price);
            price.textContent = "Son prix : " + teddy.price / 100 + " €";
            price.className = 'teddy_price';

            const form = document.createElement('form');
            divInfo.appendChild(form);
            const formDiv = document.createElement('div');
            form.appendChild(formDiv);
            formDiv.className = 'colors_choice';

            const label = document.createElement('label');
            formDiv.appendChild(label);
            label.textContent = "Personnalisez sa couleur : ";
            label.setAttribute('for', "Choix de couleurs de " + teddy.name);

            const select = document.createElement('select');
            formDiv.appendChild(select);
            select.setAttribute('name', "Choix de couleurs de " + teddy.name);
            select.setAttribute('id', "select_1 ");
 
            const colors = teddy.colors;

            for (i = 0; i < colors.length; i++) {
                const selectOption = document.createElement('option');
                select.appendChild(selectOption);
                selectOption.textContent = colors[i];
                selectOption.setAttribute("value", colors[i]);
            }     
        } else {
            alert('Erreur rencontrée : ' + response.status);
        } 
    } catch (error) {
        alert("Erreur : " + error);
    }
};

//appel de la fonction getTeddies
getTeddies();