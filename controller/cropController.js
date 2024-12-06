import { getAllStaff, saveStaffMember,getStaffById ,deleteStaff, updateStaff} from "../Model/cropModel.js";
$(document).ready(function () {
    const popup = $('#popup');
    const openPopup = $('#openPopup');
    const closePopup = $('#closePopup');

    openPopup.on('click', function () {
        popup.css('display', 'flex'); // Show the popup
    });

    closePopup.on('click', function () {
        popup.css('display', 'none'); // Hide the popup
    });

    $(window).on('click', function (event) {
        if ($(event.target).is(popup)) {
            popup.css('display', 'none'); // Close popup if clicked outside content
        }
    });
});
function loadForm(cropId) {
  getStaffById(cropId)
    .then((cropDetails) => {
      console.log(cropDetails);  // Check if the details are correct
      for (const key in cropDetails) {
        const element = document.getElementById(key);
        if (element) {
          element.value = cropDetails[key] || "";  // Set the value
          element.setAttribute("readonly", "true");  // Make fields read-only
        }
      }
      document.getElementById("cropPopup").style.display = "block";  // Show the form
    })
    .catch((error) => {
      console.error("Error fetching crop details:", error);
      alert("Failed to load staff details.");
    });
    
}

$(document).ready(function () {
  $(".crop-table").on("click", "tr", function (event) {
    const target = $(event.target);

    // Check if the clicked cell is in the action column (buttons)
    if (target.is("button") || target.closest("td").is(":last-child")) {
      // If the click is on the buttons or the last cell, do nothing
      return;
    }
    $('#closeCropFormButton').on('click', function () {
      // Hide the popup form (assuming popup has id "staffPopup")
      $('#cropPopup').css('display', 'none');
  });
    // Otherwise, load the staff details
    const cropId = $(this).find("td:first").text(); // Assuming staffId is in the first column
    loadForm(cropId); // Load the form with the clicked staff details
  });
});
function loadTable(){
    const table=$(".crop-table tbody")
    table.empty()
    getAllStaff().then((response)=>{
        response.forEach(element => {
            table.append(`
                
                <tr>
              <td>${element.staffId}</td>
              <td>${element.firstName}</td>
              <td>${element.role}</td>
              <td>${element.contactNo}</td>
              <td>
                <button class="edit-btn" data-id=${element.staffId}>Edit</button>
                <button class="delete-btn">Delete</button>
              </td>
            </tr>
            `)
        });
    })
}
$(document).ready(function () {
    $('#saveButton').on('click', function () {
      const formData = {
        "staffId": $('#staffForm #staffId').val(),
        "firstName": $('#staffForm #firstName').val(),
        "lastName": $('#staffForm #lastName').val(),
        "designation": $('#staffForm #designation').val(),
        "gender": $('#staffForm #gender').val(),
        "joinedDate": $('#staffForm #joinedDate').val(),
        "dob": $('#staffForm #dob').val(),
        "addressLine01": $('#staffForm #addressLine1').val(),
        "addressLine02": $('#staffForm #addressLine2').val(),
        "addressLine03": $('#staffForm #addressLine3').val(),
        "addressLine04": $('#staffForm #addressLine4').val(),
        "addressLine05": $('#staffForm #addressLine5').val(),
        "contactNo":$('#staffForm #contactNo').val(),
        "email": $('#staffForm #email').val(),
        "role": $('#staffForm #role').val()
      }
      
  
      saveStaffMember(formData).then(r => {
          alert("Staff member saved successfully");
      })
    });
    loadTable()
  });
  
   // Toggle between table and add staff form
   document.getElementById('toggleAddCrop').addEventListener('click', function() {
    const tableContainer = document.getElementById('cropTableContainer');
    const formContainer = document.getElementById('cropFormContainer');
    
    // Hide table and show form
    tableContainer.style.display = 'none';
    formContainer.style.display = 'block';
  });
  document.getElementById('cancelButton').addEventListener('click', function() {
    const tableContainer = document.getElementById('cropTableContainer');
    const formContainer = document.getElementById('cropFormContainer');
    
    // Hide form and show table
    formContainer.style.display = 'none';
    tableContainer.style.display = 'block';
  });

$(document).on("click", ".delete-btn", function () {
  const staffId = $(this).closest("tr").find("td:first").text(); // Get the staffId from the first column of the row

  // Show confirmation alert
  if (confirm("Are you sure you want to delete this crop?")) {
      deleteCrop(cropId)
          .then(() => {
              alert("Crop member deleted successfully.");
              loadTable(); // Refresh the table after deletion
          })
          .catch((error) => {
              alert("Failed to delete crop member.");
              console.error(error);
          });
  }
});

$(".crop-table tbody").on("click", ".edit-btn", function () {
  const staffId = $(this).data("id")
  alert(staffId)
  const tableContainer = document.getElementById('staffTableContainer');
  const formContainer = document.getElementById('staffFormContainer');
  
  // Hide table and show form
  tableContainer.style.display = 'none';
  formContainer.style.display = 'block'; 
  getStaffById(staffId).then((response)=>{
    console.log(response)
    $("#staffFormContainer #staffId").val(response.staffId)
    $("#staffFormContainer #firstName").val(response.firstName)
    $("#staffFormContainer #lastName").val(response.lastName)
    $("#staffFormContainer #designation").val(response.designation)
    $("#staffFormContainer #gender").val(response.gender)
    const formattedDob = new Date(response.dob).toISOString().split("T")[0];
    $("#staffFormContainer #dob").val(formattedDob)
    const joinedDate = new Date(response.joinedDate).toISOString().split("T")[0];
    $("#staffFormContainer #joinedDate").val(joinedDate)
    $("#staffFormContainer #addressLine1").val(response.addressLine01)
    $("#staffFormContainer #addressLine2").val(response.addressLine02)
    $("#staffFormContainer #addressLine3").val(response.addressLine03)
    $("#staffFormContainer #addressLine4").val(response.addressLine04)
    $("#staffFormContainer #addressLine5").val(response.addressLine05)
    $("#staffFormContainer #contactNo").val(response.contactNo)
    $("#staffFormContainer #email").val(response.email)
    $("#staffFormContainer #role").val(response.role)
  }).catch((error)=>{
    console.log(error)
  })
})
$("#updateButton").click(function(){
  const staff = {
    "firstName": $("#staffFormContainer #firstName").val(),
    "lastName":$("#staffFormContainer #lastName").val(),
    "designation":$("#staffFormContainer #designation").val(),
    "gender":$("#staffFormContainer #gender").val(),
    "joinedDate":$("#staffFormContainer #dob").val(),
    "dob": $("#staffFormContainer #joinedDate").val(),
    "addressLine01":$("#staffFormContainer #addressLine1").val(),
    "addressLine02":$("#staffFormContainer #addressLine2").val(),
    "addressLine03":$("#staffFormContainer #addressLine3").val(),
    "addressLine04":$("#staffFormContainer #addressLine4").val(),
    "addressLine05":$("#staffFormContainer #addressLine5").val(),
    "contactNo":$("#staffFormContainer #contactNo").val(),
    "email": $("#staffFormContainer #email").val(),
    "role": $("#staffFormContainer #role").val()
  }
  const staffId=$("#staffFormContainer #staffId").val()
  console.log(staff)
  updateStaff(staffId,staff).then((response)=>{
    alert("updated")
  })
  .catch((error) => {
    alert("Failed to update staff member.");
    console.error(error);
});
})  
// function convertAndSetDate(inputId, dateString) {
//   // Convert from dd-MM-yyyy to yyyy-MM-dd
//   const dateParts = dateString.split('-');
//   const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // Convert to yyyy-MM-dd

//   // Set the date on the input
//   document.getElementById(inputId).value = formattedDate;
// }

// // Example usage
// const date = "15-01-2020";  // dd-MM-yyyy format
// convertAndSetDate('myDateInput', date);

$("#search-crop").on("keyup",function(){
  var searchValue=$(this).val()
  $(".staff-table tbody > tr").each(function(){
    const staffId = $(this).children(":nth-child(1)").text()
    if(staffId.includes(searchValue)){
      $(this).show()

    }else{
      $(this).hide()
    }
  })
})