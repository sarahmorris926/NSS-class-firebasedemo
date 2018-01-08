"use strict";

const fbURL = "https://class-demo-project.firebaseio.com/";

// firebase module
function getCats() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "https://class-demo-project.firebaseio.com/categories.json"
    })
      .done(cats => {
        resolve(cats);
      })
      .fail(error => {
        console.log("uh-oh", error.statusText);
        reject(error);
      });
  });
}

function updateCat(id, description) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${fbURL}/categories/${id}.json`,
      method: "PATCH",
      data: JSON.stringify({ description })
    }).done(data => {
      console.log("updated obj", data);
    });
  });
}

function deleteCat(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://class-demo-project.firebaseio.com/categories/${id}.json`,
      method: "DELETE"
    })
      .done(data => {
        resolve(data);
      })
      .fail(error => {
        console.log("uh-oh", error.statusText);
        reject(error);
      });
  });
}

function getCustomers() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://class-demo-project.firebaseio.com/customers.json`
    })
    .done(custs => {
      console.log(custs);
      resolve(custs);
    })
    .fail(error => {
      console.log("uh-oh", error.statusText);
      reject(error);
    });
  });
}
getCustomers();

function addCustomer(newCustomer) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${fbURL}/customers.json`,
      method: "POST",
      data: JSON.stringify(newCustomer)
    }).done(customerId => {
      console.log(customerId);
    });
  });
}

function deleteCustomer(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://class-demo-project.firebaseio.com/customers/${id}.json`,
      method: "DELETE"
    })
    .done(data => {
      resolve(data);
    })
    .fail(error => {
      console.log('uh-oh', error.statusText);
      reject(error);
    });
  });
}





// end of FB module

function listCats(catData) {
  console.log("cats", catData);
  let catsArr = [];
  let keys = Object.keys(catData);
  keys.forEach(key => {
    catData[key].id = key;
    catsArr.push(catData[key]);
  });
  console.log(catsArr);
  $("#categories").html("");
  catsArr.forEach(cat => {
    $("#categories").append(
      `<h4>${cat.name}</h4>
      <input type="text" class="catForm" placeholder="description">
      <button id="${cat.id}" class="updateCat">updateCat</button>
        <button id="${
          cat.id
        }" class="deleteCat">delete</button>`
    );
  });
}

getCats().then(catData => {
  listCats(catData);
});

$(document).on("click", ".deleteCat", function() {
  let catId = $(this).attr("id");
  console.log("catId", catId);
  deleteCat(catId)
    .then(() => {
      alert("Category deleted");
      return getCats();
    })
    .then(cats => {
      listCats(cats);
    })
    .catch(err => {
      console.log("oops", err);
    });
});

$(document).on("click", ".updateCat", function(){
  console.log('updateCat clicked');

  let id = $(this).attr("id");
  updateCat(id, $(this).prev(".catForm").val());
});

///////////////////////////////////////


$("#addCustomer").click(function() {
  console.log("addCust called");

  let custObj = {
    age: $("#custAge").val(),
    name: $("#custName").val(),
    member_level: $("#custLevel").val(),
    active: true
  };
  addCustomer(custObj);
});



function listCusts(custData) {
  console.log("custs", custData);
  let custArr = [];
  let keys = Object.keys(custData);
  keys.forEach(key => {
    custData[key].id = key;
    custArr.push(custData[key]);
  });
  console.log(custArr);
  $("#customers").html("");
  custArr.forEach(cust => {
    $("#customers").append(
      `<h4>${cust.name}</h4><button id="${cust.id}" class="deleteCust">delete</button>`
    );
  });
}

getCustomers().then(custData => {
  listCusts(custData);
});

$(document).on("click", ".deleteCust", function() {
  let custId = $(this).attr("id");
  console.log("custId", custId);
  deleteCustomer(custId)
    .then(() => {
      alert("Customer deleted");
      return getCustomers();
    })
    .then(custs => {
      listCusts(custs);
    })
    .catch(err => {
      console.log("oops", err);
    });
});



