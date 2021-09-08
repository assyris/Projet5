const order = JSON.parse(localStorage.getItem("order")) || [];

const informations = document.getElementById("contact");
informations.innerHTML += `
    <p class="fs-5">Merci pour votre achat sur notre site !</p>
    <p class="fs-5">Votre commande d'un montant total de <span class="fw-bold">${totalBasket() / 100 + "€"}</span> a été validée.</p>
    <p class="fs-5">Votre facture sera envoyé par mail à : <span class="fw-bold">${order.contact.email}</span>.</p>
    <p class="fs-5">Votre commande sera envoyée à l'adresse suivante :
    <div class=" fs-5 text-center fw-bold">
        <p class="text-capitalize">${order.contact.firstName} ${order.contact.lastName}</p>
        <p class="text-capitalize">${order.contact.address}</p>
        <p class="text-capitalize">${order.contact.city}</p>
    </div>
    `;

for (product of basket) {
    productListTable(product);
}    

totalPrice();

const deletedItem = document.getElementsByClassName("empty");
for(element of deletedItem){
    element.classList.add("d-none");
}

const clickHome = document.getElementById("accueil");
clickHome.addEventListener("click", function() {
    clearBasket();
});