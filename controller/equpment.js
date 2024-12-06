import { getAllEquipment, save, getEquipmentById ,updateEquipment,deleteEquipment} from "../Model/equipmentModel.js";
import { getCookie } from "../Model/tokenModel.js";
import{getAllStaff}from"../Model/staffModel.js"

// Toggle between table and add equipment form
document.getElementById('toggleAddEquipment').addEventListener('click', function() {
  const tableContainer = document.getElementById('equipmentTableContainer');
  const formContainer = document.getElementById('equipmentFormContainer');
  
  // Hide table and show form
  tableContainer.style.display = 'none';
  formContainer.style.display = 'block';
});

// Cancel button to return to table view
document.getElementById('cancelButton').addEventListener('click', function() {
  const tableContainer = document.getElementById('equipmentTableContainer');
  const formContainer = document.getElementById('equipmentFormContainer');
  
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
  const table = $(".equipment-table tbody");
  table.empty(); // Clear existing rows
  
  getAllEquipment()
    .then((response) => {
      response.forEach((element) => {
        table.append(`
          <tr>
            <td>${element.equipmentId}</td>
            <td>${element.name}</td>
            <td>${element.type}</td>
            <td>${element.status}</td>
            <td>
              <button class="edit-btn" data-id="${element.equipmentId}">Edit</button>
              <button class="delete-btn" data-id="${element.equipmentId}">Delete</button>
            </td>
          </tr>
        `);
      });
    })
    .catch((error) => {
      console.error("Error loading equipment:", error);
    });
}

// Event handler for Save button
$("#saveButton").on("click", () => {
  let equipmentName = $("#name").val();
  let equipmentType = $("#type").val();
  let equipmentStatus = $("#status").val();  // Get status as well

  if (!equipmentName || !equipmentType || !equipmentStatus) {
      alert("Please fill in all fields.");
      return;
  }

  let equipment = {
    name: equipmentName,
    type: equipmentType,
    status: equipmentStatus,
};


  save(equipment)
      .then((response) => {
          alert("Equipment saved successfully!");
          console.log("Save successful:", response);
          loadTable();  // Refresh the table dynamically instead of reloading the page
      })
      .catch((error) => {
          console.error("Save error:", error);
          alert("There was an error saving the equipment.");
      });
});

/// Load equipment form for editing
$(".equipment-table").on("click", ".edit-btn", function () {
  loadStaffID()
  const equipmentId = $(this).data("id");

  // Clear existing form state to avoid conflicts
  $("#name").val("");
  $("#type").val("");
  $("#status").val("");
  $("#name, #type, #status").removeAttr("readonly");

  getEquipmentById(equipmentId)
    .then((equipmentDetails) => {
      // Populate the form fields with the fetched equipment details 
      $("#equipmentId").val(equipmentDetails.equipmentId);
      $("#name").val(equipmentDetails.name);
      $("#type").val(equipmentDetails.type);
      $("#status").val(equipmentDetails.status);

      // Show the form container and hide the table container
      const tableContainer = document.getElementById("equipmentTableContainer");
      const formContainer = document.getElementById("equipmentFormContainer");
      tableContainer.style.display = "none";
      formContainer.style.display = "block";

      // Show "Update" button and hide "Save" button
      $("#saveButton").hide();
      $("#updateButton").show().data("id", equipmentId);
    })
    .catch((error) => {
      console.error("Error loading equipment for editing:", error);
      alert("Failed to load equipment details.");
    });
});

/// Update equipment on clicking "Update" button
$("#updateButton").on("click", function () {
  const equipmentId = $(this).data("id"); // Get the equipment ID
  const updatedEquipment = {
    name: $("#name").val(),
    type: $("#type").val(),
    status: $("#status").val(),
    staffId:$("#staffId").val()
  };

  if (!updatedEquipment.name || !updatedEquipment.type || !updatedEquipment.status) {
    alert("Please fill in all fields.");
    return;
  }

  updateEquipment(equipmentId, updatedEquipment)
    .then(() => {
      alert("Equipment updated successfully!");
      loadTable(); // Refresh the table with updated data
      // Navigate back to the table view
      const tableContainer = document.getElementById("equipmentTableContainer");
      const formContainer = document.getElementById("equipmentFormContainer");
      formContainer.style.display = "none";
      tableContainer.style.display = "block";
    })
    .catch((error) => {
      console.error("Update error:", error);
      alert("Failed to update equipment.");
    });
});

$(document).on("click", ".delete-btn", function () {
  const equipmentId = $(this).data("id"); // Extract equipment ID from button's data attribute

  if (confirm(`Are you sure you want to delete equipment with ID: ${equipmentId}?`)) {
      deleteEquipment(equipmentId) // Call the model function
          .then(() => {
              alert("Equipment deleted successfully!");
              loadTable(); // Reload the table to reflect changes
          })
          .catch((error) => {
              console.error("Error deleting equipment:", error);
              alert("Failed to delete equipment. Please try again.");
          });
  }
});
$("#search-equipment").on("keyup",function(){
  var searchValue=$(this).val()
  $(".equipment-table tbody > tr").each(function(){
    const equipmentId = $(this).children(":nth-child(1)").text()
    if(equipmentId.includes(searchValue)){
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