
basketPreview();

fetch('http://localhost:3000/api/teddies/')
    .then(function(response) {
       return response.json()
    })
    .then(function(data) {
        blocProducts(data);
    })
    .catch(function(error) {
        alert("Erreur : " + error);
        apiError = document.querySelector('#bloc_products');
        apiError.classList.add('msg__error');
        apiError.innerHTML = "Veuillez démarrer le serveur";
        console.error(err);
    });

function blocProducts(data) {
    for (produit of data) {
        const bloc = document.getElementById("bloc_products");       
        bloc.innerHTML += `
      <div class="col-sm-12 col-md-6 col-lg-6 pb-3  ">
          <div class="card border bg-light shadow p-3 mb-5 bg-body rounded">
              <div class="card-body">
                  <div class="row">
                      <a href="./pages/produit.html?_id=${produit._id}"><img src="${produit.imageUrl}" class="img-fluid img-thumbnail p-1" alt="${produit.name}"></a>
                      <div class="col-6 col-sm-7 mt-3" >
                          <h5 class="card-title">${produit.name}</h5>
                      </div>
                      <div class="col-6 col-sm-5 text-end mt-3">
                          <h5 class="card-title">${produit.price / 100 + "€"}</h5>
                      </div>
                  </div>
                  <p class="card-text text-truncate">${produit.description}</p>
                  <a href="./pages/produit.html?_id=${produit._id}" class="btn btn-secondary">Acheter ce produit</a>
              </div>
          </div>
      </div>`;
    }
}
