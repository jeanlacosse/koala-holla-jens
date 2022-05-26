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
      name: $('#nameIn').val(),
      gender: $('#genderIn').val(),
      age: $('#ageIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala(koalaToSend);
  });
  $(document).on('click', '.delete-btn', deleteKoala)
}


function getKoalas(){ // GET
  console.log( 'in getKoalas' );
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


function saveKoala( newKoala ){ // POST
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala,
  })
  .then(response => {
    console.log('POST from server:', response);
    getKoalas();
  })
  .catch(error => {
    console.log('Error in POST on client side', error);
  });

function display(response) {
  for (let i = 0; i < response.length; i++) {
    let koala = response[i];
    $("#viewKoalas").append(`
    <tr data-id=${koala.id}>
      <td>${koala.name}</td>
      <td>${koala.age}</td>
      <td>${koala.ready_to_transfer}</td>
      <td>${koala.notes}</td>
      <td> <button class="delete-btn">Delete</button> </td>
    </tr>
    `);
  }
}



}


// delete koala
function deleteKoala() {
  let tr = $(this).parents('tr');
  let koalaId = tr.data('id');
  console.log('In delete koala',koalaId);

  $.ajax({
    method: 'DELETE',
    url: `/koala/${koalaId}`,
  })
  .then(() => {
    console.log('DELETE /koala Success');
  })
  .catch((err) => {
    alert('Failed to delete koala. Sorry')
    console.log('DELETE /koala failed:', err);

  })
}