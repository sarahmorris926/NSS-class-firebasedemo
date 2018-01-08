'use strict';
// firebase module
function getCats() { 
  return new Promise( (resolve, reject) => {
    $.ajax({
      url: "https://class-demo-project.firebaseio.com/categories.json"
    })
    .done(cats => {
      resolve(cats);
    })
    .fail(error => {
      console.log('uh-oh', error.statusText);
      reject(error);
    });
  });
}

function deleteCat(id) {
  return new Promise( (resolve, reject) => {
    $.ajax({
      url: `https://class-demo-project.firebaseio.com/categories/${id}.json`,
      method: "DELETE"
    })
    .done(cats => {
      resolve(cats);
    })
    .fail(error => {
      console.log('uh-oh', error.statusText);
      reject(error);
    });
  });
}

// end of firebase module

function listCats(catData) {
  console.log('cats', catData);
  let catsArr = [];
  let keys = Object.keys(catData);
  keys.forEach(key => {
    catData[key].id = key;
    catsArr.push(catData[key])
  });
  $('#categories').html("")
  catsArr.forEach(cat => {
    $('#categories').append(`<h3>${cat.name}</h3><button id="${cat.id}">delete</button>`);
  })
  
}

getCats().then(catData => {
  listCats(catData);
});

$(document).on("click", "button", function() {
  let catId = $(this).attr("id")
  console.log('catID', catId);
  deleteCat(catId)
  .then( () => {
    alert("Category deleted")
    return getCats()
  })
  .then( (cats) => {
    listCats(cats);
  })
  .catch( (err) => {
    console.log('oops', err);
    
  })
})

