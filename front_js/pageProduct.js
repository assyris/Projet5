basketPreview();

const params = new URL(document.location).searchParams;
const id = params.get("_id");
console.log(id);

fetch('http://localhost:3000/api/teddies/' + id)
    .then(function(res) {
       return res.json()
    })
    .then(function(data) {
        blocProduct(data);
        addNewProduct(data);      
});

// const endpoints = "api/teddies/";

// const manageEnvironment = (endpoints) => {
//     if (!endpoints) {
//         console.error("no endpoints");
//         return;
//     }
//     let urlBaseApi = `http://localhost:3000/${endpoints}`;
//     const urlSite = location.hostname;
//     if (urlSite.includes('github')) {
//         urlBaseApi = "./public/data/data.json";
//     }
//     return urlBaseApi;
// }

// const requestApi = async (urlApi) => {
//     return await fetch(urlApi).then((response) => response.json()).catch(error => {
//         console.error(error);
//         throw new Error(`Error: ${error.message}`);
//     });
// }

// try {
//     const url = manageEnvironment('api/teddies' + id);
//     requestApi(url).then((data) => {
//         blocProduct(data);
//         addNewProduct(data);
//     });
// } catch (error) {
//     console.log(error);
// }




function blocProduct(data) {   
    const bloc = document.getElementById("bloc_product");       
    bloc.innerHTML += `
        <div class="jumbotron mx-3 my-5">
            <div class="card px-0 mx-3 my-4 border-0 empty">
                <div class="row mx-0 g-0 shadow p-3 bg-body">
                    <div class="col-md-7">
                        <img src="${data.imageUrl}" class="img-fluid img-thumbnail shadow" alt="${data.name}">
                    </div>
                    <div class="col-md-5" >
                        <div class="card-body">
                            <div class="row">
                                <div class="col-6 col-sm-7 mt-3">
                                    <h5 class="card-title">${data.name}</h5>
                                </div>   
                                <div class="col-6 col-sm-5 text-end mt-3 pt-1">
                                    <h6 class="card-title">${data.price / 100 + "€"}</h6>
                                </div>
                            </div>
                            <select id="option" class="form-select mb-3" aria-label="choisir la version">
                            </select>
                            <div class="mb-3">
                                <p class="card-text">${data.description}</p>
                            </div>   
                            <div class="row">    
                                <div class="col-5 col-sm-3 col-md-5 col-lg-4 col-xl-3 my-auto">
                                    <p>Quantité :</p>
                                </div>
                                <div class="col-4 col-sm-3 col-md-4 col-lg-3">
                                    <input type="number" id="quantity" min="1" max="100" placeholder="0" class="form-select mb-3" aria-label="Quantité">
                                </div>
                            </div>    
                            <button id="btnAddBasket" class="btn btn-primary m-2" data-toggle="modal" data-target="#myModal">Ajouter au panier</button>
                        </div>
                    </div>
                                   
                </div>
            </div>
        </div>`;
        addColor(data);
}

function addColor(data) {
    const colorChoice = document.getElementById("option");
    for (let color of data.colors) {
        colorChoice.innerHTML += `<option value="${color}">${color}</option>`;
    }
}

function addNewProduct(data) {
    const btnAddBasket = document.getElementById("btnAddBasket");
        btnAddBasket.addEventListener("click", function(e) {
            e.preventDefault();
            const option = document.getElementById("option");
            const quantity = document.getElementById("quantity");

            const objFromProduct = {...data, _id: id, option: option.value, quantity: parseInt(quantity.value, 10)}
            const objectProduct = new Product(objFromProduct);

            let newBasket = [];
            if( basket.length === 0 ) {
                newBasket.push(objectProduct);
            }

            if( basket.length > 0 ) {
                newBasket = basket.map( item => {
                    if( item._id === objectProduct._id && item.option === objectProduct.option ){   
                        item.quantity += objectProduct.quantity;
                    }
                    return new Product({...item});
                });


                const findingClone = newBasket.find( item => objectProduct._id === item._id);
                if( !!findingClone ) {
                    if(objectProduct.option !== findingClone.option) {
                        newBasket.push(objectProduct);
                    }
                } else {
                    newBasket.push(objectProduct);
                }
            }
            localStorage.setItem("teddy", JSON.stringify(newBasket));
        });

}