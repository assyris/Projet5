const getTeddies =  async function() {
    try {
        let response = await fetch('http://localhost:3000/teddies/');
        if (response.ok) {
            let teddies = await response.json();
            console.log(teddies);

            for (let teddy of teddies) {
                const bloc = document.getElementById('bloc');
        
                const div = document.createElement('div');
                bloc.appendChild(div);
                div.className = 'teddies';
        
                const productLink = document.createElement("a");
                productLink.href = "produit.html?id=" + teddy._id;
                div.appendChild(productLink);
                productLink.className = 'produit';

                const img = document.createElement('img');
                productLink.appendChild(img);
                img.setAttribute('src', teddy.imageUrl);

                const ref = document.createElement('div');
                productLink.appendChild(ref);
                ref.className = 'teddiesRef';
        
                const titleRef = document.createElement('h3');
                ref.appendChild(titleRef);
                titleRef.textContent = teddy.name;
        
                const paragRef = document.createElement('p');
                ref.appendChild(paragRef);
                paragRef.textContent = teddy.price / 100 + " €";
            }
        } 
    } catch (error) {
        alert("Erreur : " + error);
        apiError = document.querySelector('.bloc');
        apiError.classList.add('msg__error');
        apiError.innerHTML = "Veuillez démarrer le serveur";
        console.error(err);
    }
}

getTeddies();