const basket = JSON.parse(localStorage.getItem("teddy")) || [];
console.log(basket);

function totalBasket() {
    let totalBasket = 0;
    basket.forEach( function(product) {
        totalBasket = totalBasket + product.price * product.quantity;
    });
    return totalBasket;
}


function productListTable(product) {
    const indexProduct = basket.indexOf(product);
    const productList = document.getElementById("productsBasket");
    productList.innerHTML += `
    <tr class="text-center">
        <td class="w-25">
            <img src="${product.imageUrl}" class="img-fluid img-thumbnail" alt="${product.name}">
        </td>
        <td class="align-middle">
            <span>${product.name}</span>
        </td>
        <td class="align-middle">
            <span>${product.option}</span>
        </td>
        <td class="align-middle productQuantity">
            <button type="button" class="empty minus" data-toggle="modal" data-target="#exampleModal" data-index="${indexProduct}"><span class="fas fa-minus-square text-danger" data-index="${indexProduct}"></span></button>
            <span class="mx-0 mx-lg-3"> ${product.quantity}</span>
            <button type="button" class="empty add" data-toggle="modal" data-target="#exampleModal" data-index="${indexProduct}"><span class="fas fa-plus-square text-success" data-index="${indexProduct}"></span></button>
            <button type="button" class="empty clear" data-toggle="modal" data-target="#exampleModal" data-index="${indexProduct}"><span class="fas fa-times-circle text-danger" data-index="${indexProduct}"></span></button>
        </td>
        <td class="align-middle">
            <span>${(product.price / 100 + "€")}</span>
        </td>
        <td class="align-middle bg-light">
            <span>${(product.quantity * product.price  / 100 + "€")}</span>
        </td>
    </tr>`;
}

function totalPrice() {
    const totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML += `${(totalBasket() / 100 + "€")}`;
}

function basketPreview() {
    if (basket.length === 0) {
        console.log("Le panier est vide !");
        return;
    } if (basket.length > 0 && basket[0] !== null) {
        let addBasketPreview = document.getElementById("basketPreview");
        let calculBasketPreview = 0;
        console.log(basket);
        for (product of basket) {          
            calculBasketPreview += product.quantity;
        }
        addBasketPreview.innerHTML = `Panier <span class="badge rounded-pill bg-secondary align-middle my-auto">${calculBasketPreview}</span>`;
    }
}

function clearBasket() {
    localStorage.clear();
}