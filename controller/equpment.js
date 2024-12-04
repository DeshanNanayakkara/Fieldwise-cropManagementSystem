import { getAllEquipment, save, getEquipmentById } from "../Model/equipmentModel.js";
import { getCookie } from "../Model/tokenModel.js";

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

// Load form with equipment details when editing
function loadForm(equipmentId) {
  getEquipmentById(equipmentId)
    .then((equipmentDetails) => {
      console.log(equipmentDetails);  // Check if the details are correct
      for (const key in equipmentDetails) {
        const element = document.getElementById(key);
        if (element) {
          element.value = equipmentDetails[key] || "";  // Set the value
          element.setAttribute("readonly", "true");  // Make fields read-only
        }
      }
      document.getElementById("equipmentPopup").style.display = "block";  // Show the form
    })
    .catch((error) => {
      console.error("Error fetching equipment details:", error);
      alert("Failed to load equipment details.");
    });
}

// Event listener for closing the equipment form
$('#closeEquipmentFormButton').on('click', function () {
    $('#equipmentPopup').css('display', 'none');  // Hide the form
});

// Event listener for clicking on an equipment row (to show the form for editing)
$(".equipment-table").on("click", "tr", function () {
    const equipmentId = $(this).find("td:first").text(); // Get the equipment ID from the first column
    loadForm(equipmentId); // Load the form with the clicked equipment details
});
