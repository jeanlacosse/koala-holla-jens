console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 

  $(document).on('click', '.transferbtn', transferKoala);
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}

function transferKoala() {
     // this is the same path to the tr that the delete used
     let koalaId = $(this).parents('tr').data('data-id');
     let transfered = $(this).parents('tr').data('data-ready_to_transfer');

     console.log('in transfer Koala', transfered)
     const updatedKoala = {
         transfered: true
     }
 
     $.ajax({
         method: 'PUT',
         url: `/koalas/${koalaId}`,
         data: updatedKoala
     })
     .then((res) => {
         console.log('PUT request working');
         getKoalas();
     }).catch((err) => {
         console.log('error is ', err)
     })
 
     
}
