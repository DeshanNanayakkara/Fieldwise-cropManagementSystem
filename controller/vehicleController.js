import { getAllVehicle, save, getVehicleById ,updateVehicle,deleteVehicle} from "../Model/vehicleModel.js";
import { getCookie } from "../Model/tokenModel.js";
import{getAllStaff}from"../Model/staffModel.js"

// Toggle between table and add equipment form
document.getElementById('toggleAddVehicle').addEventListener('click', function() {
  const tableContainer = document.getElementById('vehicleTableContainer');
  const formContainer = document.getElementById('vehicleFormContainer');
  
  // Hide table and show form
  tableContainer.style.display = 'none';
  formContainer.style.display = 'block';
});

// Cancel button to return to table view
document.getElementById('cancelButton').addEventListener('click', function() {
  const tableContainer = document.getElementById('vehicleTableContainer');
  const formContainer = document.getElementById('vehicleFormContainer');
  
  // Hide form and show table
  formContainer.style.display = 'none';
  tableContainer.style.display = 'block';
});

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

  loadTable();  // Load the equipment list when the page is ready
});

function loadTable() {
  const table = $(".vehicle-table tbody");
  table.empty(); // Clear existing rows
  
  getAllVehicle()
    .then((response) => {
      response.forEach((element) => {
        table.append(`
          <tr>
            <td>${element.vehicleCode}</td>
            <td>${element.licensePlateNumber}</td>
            <td>${element.vehicleCategory}</td>
            <td>${element.fuelType}</td>
            <td>${element.status}</td>
            <td>${element.remarks}</td>
            <td>
              <button class="edit-btn" data-id="${element.vehicleCode}">Edit</button>
              <button class="delete-btn" data-id="${element.vehicleCode}">Delete</button>
            </td>
          </tr>
        `);
      });
    })
    .catch((error) => {
      console.error("Error loading Vehicle:", error);
    });
}

// Event handler for Save button
$("#saveButton").on("click", () => {
  let vehicleCode = $("#vehicleCode").val();
  let licensePlateNumber = $("#licensePlateNumber").val();
  let vehicleCategory=$("#vehicleCategory").val();
  let fuelType = $("#fuelType").val();
  let vehicleStatus = $("#status").val();  // Get status as well
  let remarks =$("#remarks").val();

  if (!vehicleCategory || !fuelType || !vehicleStatus || !remarks || !licensePlateNumber) {
      alert("Please fill in all fields.");
      return;
  }

  let vehicle = {
    vehicleCode: vehicleName,
    licensePlateNumber:licensePlateNumber,
    vehicleCategory: vehicleType,
    fuelType: vehiclefuelType,
    status: vehicleStatus,
    remarks:vehicleRemarks,
};


  save(vehicle)
      .then((response) => {
          alert("Vehicle saved successfully!");
          console.log("Save successful:", response);
          loadTable();  // Refresh the table dynamically instead of reloading the page
      })
      .catch((error) => {
          console.error("Save error:", error);
          alert("There was an error saving the Vehicle.");
      });
});

/// Load equipment form for editing
$(".vehicle-table").on("click", ".edit-btn", function () {
  loadVIDehicle()
  const vehicleCode = $(this).data("id");

  // Clear existing form state to avoid conflicts
  $("#licensePlateNumber").val("");
  $("#vehicleCategory").val("");
  $("#fuelType").val("");
  $("#status").val("");
  $("#remarks").val("");
  $("#licensePlateNumber, #vehicleCategory, #fuelType,#status,#remarks").removeAttr("readonly");

  getEquipmentById(vehicleCode)
    .then((vehicleDetails) => {
      // Populate the form fields with the fetched equipment details 
      $("#vehicleCode").val(vehicleDetails.vehicleCode);
      $("#licensePlateNumber").val(vehicleDetails.licensePlateNumber);
      $("#vehicleCategory").val(vehicleDetails.vehicleCategory);
      $("#fuelType").val(vehicleDetails.fuelType);
      $("#status").val(vehicleDetails.status);
      $("#remarks").val(vehicleDetails.remarks);

      // Show the form container and hide the table container
      const tableContainer = document.getElementById("vehicleTableContainer");
      const formContainer = document.getElementById("vehicleFormContainer");
      tableContainer.style.display = "none";
      formContainer.style.display = "block";

      // Show "Update" button and hide "Save" button
      $("#saveButton").hide();
      $("#updateButton").show().data("id", vehicleCode);
    })
    .catch((error) => {
      console.error("Error loading equipment for editing:", error);
      alert("Failed to load equipment details.");
    });
});

/// Update equipment on clicking "Update" button
$("#updateButton").on("click", function () {
  const vehicleCode = $(this).data("id"); // Get the equipment ID
  const updatedVehicle = {
    licensePlateNumber: $("#licensePlateNumber").val(),
    vehicleCategory: $("#vehicleCategory").val(),
    fuelType: $("#stfuelTypeatus").val(),
    status: $("#status").val(),
    remarks: $("#remarks").val(),
    staffId:$("#staffId").val()
  };

  if (!updateVehicle.vehicleCode || !updateVehicle.vehicleCategory || !updateVehicle.fuelType || !updateVehicle.vehicleStatus || !updateVehicle.remarks || !updateVehicle.licensePlateNumber) {
    alert("Please fill in all fields.");
    return;
}
  updateVehicle(vehicleCode, updatedVehicle)
    .then(() => {
      alert("Vehicle updated successfully!");
      loadTable(); // Refresh the table with updated data
      // Navigate back to the table view
      const tableContainer = document.getElementById("vehicleTableContainer");
      const formContainer = document.getElementById("vehicleFormContainer");
      formContainer.style.display = "none";
      tableContainer.style.display = "block";
    })
    .catch((error) => {
      console.error("Update error:", error);
      alert("Failed to update vehicle.");
    });
});

$(document).on("click", ".delete-btn", function () {
  const vehicleCode = $(this).data("id"); // Extract equipment ID from button's data attribute

  if (confirm(`Are you sure you want to delete vehicle with ID: ${vehicleCode}?`)) {
      deleteVehicle(vehicleCode) // Call the model function
          .then(() => {
              alert("Vehicle deleted successfully!");
              loadTable(); // Reload the table to reflect changes
          })
          .catch((error) => {
              console.error("Error deleting vehicle:", error);
              alert("Failed to delete vehicle. Please try again.");
          });
  }
});
$("#search-vehicle").on("keyup",function(){
  var searchValue=$(this).val()
  $(".vehicle-table tbody > tr").each(function(){
    const vehicleCode = $(this).children(":nth-child(1)").text()
    if(vehicleCode.includes(searchValue)){
      $(this).show()

    }else{
      $(this).hide()
    }
  })
})
function loadStaffID(){
  getAllStaff().then((staffMembers)=>{
    const staffDropdown = $("#staffId");
    // staffDropdown.empty(); // Clear any existing options
    staffDropdown.append('<option value="null">Hand-Overed</option>'); // Option to hand over
    staffDropdown.append('<option value="" disabled selected>Assign Staff</option>'); // Default option
    $.each(staffMembers, function (index, staff) {
      staffDropdown.append(
        `<option value="${staff.staffId}">${staff.staffId} - ${staff.firstName}</option>` // Customize as per your API response
      );
    });
  })
 
}