const basket = JSON.parse(localStorage.getItem("teddy")) || [];
console.log(basket);


// création de la class produit
class Product {
    constructor(id, name, description, price, option, quantity, imgurl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = +price;
        this.option = option;
        this.quantity = +quantity;
        this.imgurl = imgurl;
    }
}

// calcul du total
function displayTotalBasket() {
    let totalBasket = 0;
    basket.forEach( function(product) {
        totalBasket = totalBasket + product.price * product.quantity;
    });
    return totalBasket;
}

//ajoute le tableau de commande
function displayProductListTable(product) {
    const indexProduct = basket.indexOf(product);
    const productList = document.getElementById("productsBasket");
    productList.innerHTML += `
    <tr class="text-center">
        <td class="w-25">
            <img src="${product.imgurl}" class="img-fluid img-thumbnail" alt="${product.name}">
        </td>
        <td class="align-middle">
            <span>${product.name}</span>
        </td>
        <td class="align-middle">
            <span>${product.option}</span>
        </td>
        <td class="align-middle productQuantity">
            <button type="button" class="rounded clear data-toggle="modal" data-target="#exampleModal" data-index="${indexProduct}"><span class="fas fa-minus-square text-danger" data-index="${indexProduct}"></span></button>
            <span class="mx-0 mx-lg-3"> ${product.quantity}</span>
            <button type="button" class="rounded add" data-toggle="modal" data-target="#exampleModal" data-index="${indexProduct}"><span class="fas fa-plus-square text-success" data-index="${indexProduct}"></span></button>
        </td>
        <td class="align-middle">
            <span>${(product.price / 100 + "€")}</span>
        </td>
        <td class="align-middle bg-light">
            <span>${(product.quantity * product.price  / 100 + "€")}</span>
        </td>
    </tr>`;
}

//affiche le totalBasket
function totalPrice() {
    const totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML += `${(displayTotalBasket() / 100 + "€")}`;
}

// calcul du basketPreview
function basketPreview() {
    if (basket.length == 0) {
    } else {
        let addBasketPreview = document.getElementById("basketPreview");
        let calculBasketPreview = 0;
        for (product of basket) {
            calculBasketPreview += product.quantity;
        }
        addBasketPreview.innerHTML = `Panier <span class="badge rounded-pill bg-secondary align-middle my-auto">${calculBasketPreview}</span>`;
    }
}

// supprimer le Panier
function clearBasket() {
    localStorage.clear();
}
