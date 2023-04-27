var user = "6c42cdbbbba5ef8df6d80ea0c851fcde9ae211e7"; //token
var pass = "X";

getProduct();
//this function will get product with per_page parameter
function getProduct() {
  const url =
    "https://imonggo_community.c3.imonggo.com/api/products.json?per_page=10";
  fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/xml",
      "Content-Type": "application/xml",
      Authorization: `Basic ${btoa(`${user}:${pass}`)}`,
    },
  })
    .then((response) => response.text())
    .then((data) => {
      // Handle the response data here
      let array = JSON.parse(data); //  parsing data into json format
      let arrData = []; //iniatialize array

      //looping array to get name and price product
      for (let index = 0; index < array.length; index++) {
        arrData.push({
          name: array[index].name,
          retail_price: array[index].retail_price,
        });
      }

      console.log(arrData);
    })
    .catch((error) => {
      // Handle any errors here
      console.log(error);
    });
}

postNewProduct(); // calling postNewProduct function

//create product function
function postNewProduct() {
  const url = "https://imonggo_community.c3.imonggo.com/api/products.json";
  const body =
    "<product><name>Earl Grey Tea</name><cost>20</cost><stock_no>294-LLE29</stock_no><retail_price>50.22</retail_price></product>"; //Create new product details

  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/xml",
      "Content-Type": "application/xml",
      Authorization: `Basic ${btoa(`${user}:${pass}`)}`,
    },
    body: body,
  })
    .then(
      (response) => response.text()
      // Handle the response here
    )
    .then((result) => {
      console.log(JSON.parse(result));
      let parse = JSON.parse(result); //parsing data into json format
      getProductById(parse.id, false); //calling getProductById function with product id parameters and false if you continue the process true if not
    })
    .catch((error) => {
      // Handle any errors here
      console.log(error);
    });
}

//get product by id function
function getProductById(id, getOnly) {
  const url = `https://imonggo_community.c3.imonggo.com/api/products/${id}.json`;

  fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/xml",
      "Content-Type": "application/xml",
      Authorization: `Basic ${btoa(`${user}:${pass}`)}`,
    },
  })
    .then(
      (response) => response.text()
      // Handle the response here
    )
    .then((result) => {
      console.log(JSON.parse(result));
      if (getOnly == false) {
        // get only is ffalse it will not continue the process into another function
        updateProductById(id); // calling updateProductById function with parameter Id of the product
      }
    })
    .catch((error) => {
      // Handle any errors here
      console.log(error);
    });
}

//update product by id function
function updateProductById(id) {
  const url = `https://imonggo_community.c3.imonggo.com/api/products/${id}.json`;
  const body =
    "<product><retail_price>75.22</retail_price><description>Hot tea bag infused with biscuit</description></product>";

  fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/xml",
      "Content-Type": "application/xml",
      Authorization: `Basic ${btoa(`${user}:${pass}`)}`,
    },
    body: body,
  })
    .then(
      (response) => response.text()
      // Handle the response here
    )
    .then((result) => {
      console.log(JSON.parse(result));

      deleteProductById(id); //
    })
    .catch((error) => {
      // Handle any errors here
    });
}

//Delete Product by Id function
function deleteProductById(id) {
  const url = `https://imonggo_community.c3.imonggo.com/api/products/${id}.json`;

  fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/xml",
      "Content-Type": "application/xml",
      Authorization: `Basic ${btoa(`${user}:${pass}`)}`,
    },
  })
    .then(
      (response) => response.text()
      // Handle the response here
    )
    .then((result) => {
      console.log(JSON.parse(result));

      getProductById(id, true); // calling getProductById function with parameter product id and true to not continue the process and get only the details the product
    })
    .catch((error) => {
      // Handle any errors here
      console.log(error);
    });
}
