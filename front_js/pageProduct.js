basketPreview();

const params = new URL(document.location).searchParams;
const id = params.get("_id");
console.log(id);

fetch('http://localhost:3000/api/teddies/' + id)
    .then(function(res) {
       return res.json()
    })
    .then(function(data) {
        const product = data;
        blocProduct(data);

        function blocProduct(product) {
    
                const bloc = document.getElementById("bloc_product");       
                bloc.innerHTML += `
                    <div class="col-sm-12 col-md-6 col-lg-6 pb-3  ">
                        <div class="card border bg-light shadow p-3 mb-5 bg-body empty">
                            <div class="card-body">
                                <div class="row">
                                    <img src="${product.imageUrl}" class="img-fluid img-thumbnail p-1" alt="${product.name}"></a>
                                    <div class="col-6 col-sm-7 mt-3" >
                                        <h5 class="card-title">${product.name}</h5>
                                    </div>
                                    <div class="col-6 col-sm-5 text-end mt-3">
                                        <h5 class="card-title">${product.price / 100 + "€"}</h5>
                                    </div>
                                    <div class="col-5 col-sm-3 col-md-5 col-lg-4 col-xl-3 my-auto">
                                        <p>Quantité :</p>
                                    </div>
                                    <div class="col-4 col-sm-3 col-md-4 col-lg-3 ">
                                        <input type="number" id="quantity" min="1" max="100" placeholder="0" class="form-select mb-3" aria-label="Quantité">
                                    </div>
                                    <select id="option" class="form-select mb-3" aria-label="choisir la version">
                                    </select>
                                    <button id="btnAddBasket" class="btn btn-secondary" data-toggle="modal" data-target="#myModal">Ajouter au panier
                                    </button>
                                </div>
                                <p class="card-text text-truncate">${product.description}</p>                
                            </div>
                        </div>
                    </div>`;
                    addcolor(product);
        }

        function addcolor(product) {
            const colorChoice = document.getElementById("option");
            for (let color of product.colors) {
                colorChoice.innerHTML += `<option value="${color}">${color}</option>`;
            }
        }
        const btnAddBasket = document.getElementById("btnAddBasket");
        btnAddBasket.addEventListener("click", function(e) {
            e.preventDefault();
            const option = document.getElementById("option");
            const quantity = document.getElementById("quantity");

            // créer un nouveau produit
            let objectProduct = new Product(
                id,
                product.name,
                product.description,
                product.price,
                option.value,
                quantity.value,
                product.imageUrl
            );
            // vérifie s'il est déja présent
            // si oui, dejaPresent en true et sauvegarde sa place dans le localStorage
            let productPresent = false;
            let modification;
            for (products of basket) {
                if (products.option == objectProduct.option) {
                        productPresent = true;
                        modification = basket.indexOf(products);
                }
            }

            // si déjaPresent incrémente seulement la quantité
            if (productPresent) {
                basket[modification].quantity = basket[modification].quantity += objectProduct.quantity;
                localStorage.setItem("teddy", JSON.stringify(basket));
                // si non, ajoute le produit au localStorage
            } else {
                basket.push(objectProduct);
                localStorage.setItem("teddy", JSON.stringify(basket));
            }
        });

});