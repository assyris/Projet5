basketPreview();
// getApi();

// function getApi() {
//     fetch('http://localhost:3000/api/teddies/')
//     .then(function(res) {
//        return res.json()
//     })
//     .then(function(data) {
//         blocProducts(data);
//     })
//     .catch(function(err) {
//         alert("Erreur : " + err);
//         apiErr = document.querySelector('#bloc_products');
//         apiErr.classList.add('msg__error');
//         apiErr.innerHTML = "Veuillez démarrer le serveur";
//         console.error(err);
//     });
// }

const endpoints = "api/teddies/";

 const manageEnvironment = (endpoints) => {
    if(!endpoints){
      console.error("no endpoints");
      return;
    }
    let urlBaseApi = `http://localhost:3000/${endpoints}`;
    const urlSite = location.hostname;
    if(urlSite.includes('github')) {
        urlBaseApi = "/public/data/data.json";
    }
    return urlBaseApi;
}

 const requestApi = async(urlApi) => {
    return await fetch(urlApi).then( (response) => response.json()).catch(error => {
        console.error(error);
        throw new Error(`Error: ${error.message}`);
      });
  }
  
 try {
      const url = manageEnvironment('api/teddies');
      requetsApi(url).then( (data) => {
       const template = createTpl(data);
       document.querySelector(".listing").innerHTML = template;
     });
  } catch(error) {
    console.log(error);
  }

function blocProducts(data) {
    for (product of data) {
        const bloc = document.getElementById("bloc_products");       
        bloc.innerHTML += `
      <div class="jumbotron col-sm-12 col-md-6 col-lg-4">
          <div class="card border bg-light shadow p-3 mb-5 bg-body empty" >
              <div class="card-body">
                  <div class="row">
                      <a class="blocimg" href="./pages/produit.html?_id=${product._id}"><img src="${product.imageUrl}" class="imgindex img-fluid img-thumbnail p-1" height="100" alt="${product.name}"></a>
                      <div class="col-6 col-sm-7 mt-3" >
                          <h5 class="card-title">${product.name}</h5>
                      </div>
                      <div class="col-6 col-sm-5 text-end mt-3">
                          <h5 class="card-title">${product.price / 100 + "€"}</h5>
                      </div>
                  </div>
                  <p class="card-text text-truncate">${product.description}</p>
                  <a href="./pages/produit.html?_id=${product._id}" class="btn btn-primary">Acheter ce produit</a>
              </div>
          </div>
      </div>`;
    }
}
