console.log("js");

$(document).ready(function () {
  console.log("JQ");
  // Establish Click Listeners
  // setupClickListeners();
  // load existing koalas on page load
  getKoalas();
}); // end doc ready

function setupClickListeners() {
  $("#addButton").on("click", function () {
    console.log("in addButton on click");
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: "testName",
      age: "testName",
      gender: "testName",
      readyForTransfer: "testName",
      notes: "testName",
    };
    // call saveKoala with the new obejct
    saveKoala(koalaToSend);
  });
}

function getKoalas() {
  console.log("in getKoalas");
  // ajax call to server to get koalas
  $.ajax({
    type: "GET",
    url: "/koalas",
  })
    .then((response) => {
      console.log(response);
      display(response);
    })
    .catch((err) => {
      console.log("fuck...", err);
    });
} // end getKoalas

function display(response) {
  for (let i = 0; i < response.length; i++) {
    let koala = response[i];
    $("#viewKoalas").append(`
    <tr data-id=${koala.id}>
      <td>${koala.name}</td>
      <td>${koala.age}</td>
      <td>${koala.ready_to_transfer}</td>
      <td>${koala.notes}</td>
    </tr>
    `);
  }
}

function saveKoala(newKoala) {
  console.log("in saveKoala", newKoala);
  // ajax call to server to get koalas
}
