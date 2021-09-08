basketPreview();

const orderForm = document.getElementById("orderForm");
const emptyBasket = document.getElementById("emptyBasket");

if (basket.length < 1) {
    orderForm.classList.add("d-none");
} else {
    orderForm.classList.add("d-none");
    emptyBasket.classList.add("d-none");
    const fullBasket = document.getElementById("basket");
    fullBasket.classList.toggle("d-none");
    for (product of basket) {
        productListTable(product);
    }

    function addProduct(e) {
        const index = e.target.getAttribute("data-index");
        basket[index].quantity++;
        localStorage.setItem("teddy", JSON.stringify(basket));
        location.reload();
    }

    const buttonAdd = document.getElementsByClassName("add");
    for (add of buttonAdd) {
        add.addEventListener("click", addProduct);
    }

    function minusProduct(e) {
        const index = e.target.getAttribute("data-index");
        if (basket[index].quantity > 1) {
            basket[index].quantity--;
        } else {
            basket.splice(index, 1);
        }
        localStorage.setItem("teddy", JSON.stringify(basket));
        location.reload();
    }

    const buttonMinus = document.getElementsByClassName("minus");
    for (minus of buttonMinus) {
        minus.addEventListener("click", minusProduct);
    }

    function clearProduct(e) {
        const index = e.target.getAttribute("data-index");
        if (basket[index].quantity > 0) {
            basket.splice(index, 1);
        }
        localStorage.setItem("teddy", JSON.stringify(basket));
        location.reload();
    }

    const buttonclear = document.getElementsByClassName("clear");
    for (clear of buttonclear) {
        clear.addEventListener("click", clearProduct);
    }


    totalPrice();

    const validationBasket = document.getElementById("validationBasket");
    const hideButton = document.getElementById("hideButton");
    validationBasket.addEventListener("click", function() {
        orderForm.classList.toggle("d-none");
        hideButton.classList.add("d-none");
    });

    const buttonClearBasket = document.getElementById("clearBasket");
    buttonClearBasket.addEventListener("click", function() {
        clearBasket();
        location.reload();
    });

    const order = document.getElementById("order");
    const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    const checkBox = document.getElementById("check");

    order.addEventListener("click", function(e) {
        
        let contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
        };

        if (
            (contact.firstName.length > 1) &
            (contact.lastName.length > 1) &
            (regexMail.test(contact.email) == true) &
            (contact.address.length > 1) &
            (contact.city.length > 1) &
            (checkBox.checked == true)) {
                
            e.preventDefault();        
            
            let products = [];
            for (listId of basket) {
                products.push(listId.id);
            }

            fetch("http://localhost:3000/api/teddies/order", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ contact, products }),
            })
                .then( function(res) {
                    return res.json()
                })
                .then( function(data) {
                    localStorage.setItem("order", JSON.stringify(data));
                    document.location.href = "order.html";
                })
                .catch( function(err) {
                    console.log("erreur : " + err)
                });
        } else {
            alert( "Veuillez correctement renseigner l'entièreté du formulaire pour valider votre commande."
            );
        }
    });

}