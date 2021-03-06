console.log("js");

$(document).ready(function () {
  console.log("JQ");
  // Establish Click Listeners
  setupClickListeners();
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
      name: $("#nameIn").val(),
      gender: $("#genderIn").val(),
      age: $("#ageIn").val(),
      readyForTransfer: $("#readyForTransferIn").val(),
      notes: $("#notesIn").val(),
    };
    // call saveKoala with the new obejct

    saveKoala(koalaToSend);
  });
  $(document).on("click", ".delete-btn", deleteKoala);
  $(document).on("click", ".transferbtn", transferKoala);
  
}

function display(response) {
  $("#viewKoalas").empty();
  for (let i = 0; i < response.length; i++) {
    
    let koala = response[i];
    $("#viewKoalas").append(`

    <tr data-id=${koala.id} data-ready-to-transfer=${koala.ready_to_transfer}>
      <td>${koala.name}</td>
      <td>${koala.age}</td>
      <td>${koala.gender}</td>
      <td>${koala.ready_to_transfer}</td>
      <td>${koala.notes}</td>
      <td class="newbtn"></td>
      <td><button class="delete-btn">Delete</button></td>
    </tr>
    `);

    if (koala.ready_to_transfer === true) {
      $('newbtn').empty();
      $('.newbtn').last().append(`
      <button class="transferbtn">Ready for Transfer</button>
      `)
    }
    else if (koala.ready_to_transfer === false) {
      $('.newbtn').last().append(`
      <button class="transferbtn">Not Ready for Transfer</button>
      `)
    }
  }
  
}

function getKoalas() {
  // GET
  console.log("in getKoalas");
  // ajax call to server to get koalas
  $.ajax({
    type: "GET",
    url: "/koalas",
  })
    .then((response) => {
      console.log(response);
      display(response);
      // hideButton(response);
    })
    .catch((err) => {
      console.log("fuck...", err);
    });
} // end getKoalas

function saveKoala(newKoala) {
  // POST
  console.log("in saveKoala", newKoala);
  // ajax call to server to get koalas
  $.ajax({
    type: "POST",
    url: "/koalas",
    data: newKoala,
  })
    .then((response) => {
      console.log("POST from server:", response);
      getKoalas();
    })
    .catch((error) => {
      console.log("Error in POST on client side", error);
    });
}

function transferKoala() {
  // this is the same path to the tr that the delete used
  let koalaId = $(this).parents("tr").data("id");
  let transfered = $(this).parents("tr").data("ready-to-transfer");
  

  console.log("in transfer Koala", transfered);
  const updatedKoala = {
    transfered: true,
  };

  $.ajax({
    method: "PUT",
    url: `/koalas/${koalaId}`,
    data: updatedKoala,
  })
    .then((res) => {
      console.log("PUT request working");
      getKoalas();
    })
    .catch((err) => {
      console.log("error is ", err);
    });
}

// delete koala
function deleteKoala() {
  let tr = $(this).parents("tr");
  let koalaId = tr.data("id");
  console.log("In delete koala", koalaId);

  swal({
    title: "Are you sure?",
    text: "Once deleted, this koala will be no more",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      $.ajax({
        method: "DELETE",
        url: `/koalas/${koalaId}`,
      })
        .then(() => {
          console.log("DELETE /koalas Success");
          getKoalas();
        })
        .catch((err) => {
          alert("Failed to delete koala. Sorry");
          console.log("DELETE /koala failed:", err);
        });
      swal("Koala has been Killed based off your request!", {
        icon: "success",
      });
    } else {
      swal("No koala meat today");
    }
  });
}
