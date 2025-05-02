let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let searchByTitle = document.getElementById("searchByTitle");
let searchByCategory = document.getElementById("searchByCategory");

let mod = "create";
let temp;
let searchMod = "title";

// get total

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02 ";
  }
}

// create product

let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function createProduct() {
  let newItem = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  // count

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newItem.count < 100
  ) {
    if (mod === "create") {
      if (newItem.count > 1) {
        for (let i = 0; i < newItem.count; i++) {
          dataPro.push(newItem);
        }
      } else {
        dataPro.push(newItem);
      }
    } else {
      mod = "create";
      dataPro[temp] = newItem;
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    total.style.background = "#a00d02";
    clearInput();
  }

  // save localstorage
  localStorage.setItem("product", JSON.stringify(dataPro));
  showData();
};

// clear inputs
function clearInput() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read

function showData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
        <tr>
            <td>${i + 1}</td>
            <td> ${dataPro[i].title} </td>
            <td> ${dataPro[i].price}</td>
            <td> ${dataPro[i].taxes}</td>
            <td> ${dataPro[i].ads}</td>
            <td> ${dataPro[i].discount}</td>
            <td> ${dataPro[i].total}</td>
            <td> ${dataPro[i].category}</td>
            <td><button onClick="updateData(${i})" id="update">update</button></td>
            <td><button onClick="deletePro(${i})" id="delete">delete</button></td>
        </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;

  if (dataPro.length > 0) {
    let deleteAll = document.getElementById("deleteAll");
    deleteAll.style.display = "block";
    deleteAll.innerHTML = `Delete All ( ${dataPro.length} )`;
  } else {
    deleteAll.style.display = "none";
  }
}
showData();

// delete
function deletePro(i) {
  dataPro.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(dataPro));
  showData();
}

// Delete All
function deleteData() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// update

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  submit.innerHTML = "Update";
  mod = "update";
  count.style.display = "none";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  getTotal();
}

// search

function searchMood(id) {
  if (id == "searchByTitle") {
    searchMod = "title";
  } else {
    searchMod = "category";
    search.innerHTML = "search by category";
  }
  search.placeholder = "search by " + searchMod;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    if (searchMod == "title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
            <td>${i}</td>
            <td> ${dataPro[i].title} </td>
            <td> ${dataPro[i].price}</td>
            <td> ${dataPro[i].taxes}</td>
            <td> ${dataPro[i].ads}</td>
            <td> ${dataPro[i].discount}</td>
            <td> ${dataPro[i].total}</td>
            <td> ${dataPro[i].category}</td>
            <td><button onClick="updateData(${i})" id="update">update</button></td>
            <td><button onClick="deletePro(${i})" id="delete">delete</button></td>
        </tr>
        `;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
            <td>${i}</td>
            <td> ${dataPro[i].title} </td>
            <td> ${dataPro[i].price}</td>
            <td> ${dataPro[i].taxes}</td>
            <td> ${dataPro[i].ads}</td>
            <td> ${dataPro[i].discount}</td>
            <td> ${dataPro[i].total}</td>
            <td> ${dataPro[i].category}</td>
            <td><button onClick="updateData(${i})" id="update">update</button></td>
            <td><button onClick="deletePro(${i})" id="delete">delete</button></td>
        </tr>
        `;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}

