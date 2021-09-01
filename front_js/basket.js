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
        displayProductListTable(product);
    }

    function addProduct(event) {
        const index = event.target.getAttribute("data-index");
        basket[index].quantity++;
        localStorage.setItem("teddy", JSON.stringify(basket));
        location.reload();
    }

    const buttonAdd = document.getElementsByClassName("add");
    for (add of buttonAdd) {
        add.addEventListener("click", addProduct);
    }

    function clearProduct(event) {
        const index = event.target.getAttribute("data-index");
        if (basket[index].quantity > 1) {
            basket[index].quantity--;
        } else {
            basket.splice(index, 1);
        }
        localStorage.setItem("teddy", JSON.stringify(basket));
        location.reload();
    }

    const buttonClear = document.getElementsByClassName("clear");
    for (clear of buttonClear) {
        clear.addEventListener("click", clearProduct);
    }

    totalPrice();

    const validationBasket = document.getElementById("validationBasket");
    const hideButton = document.getElementById("hideButton");
    validationBasket.addEventListener("click", () => {
        orderForm.classList.toggle("d-none");
        hideButton.classList.add("d-none");
    });

    const buttonClearBasket = document.getElementById("clearBasket");
    buttonClearBasket.addEventListener("click", function() {
        clearBasket();
        location.reload();
    });

    const order = document.getElementById("order");
    const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
    const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
    const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;   
    const checkBox = document.getElementById("invalidCheck");

    order.addEventListener("click", function(event) {
        let contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
        };
        
    });
}
