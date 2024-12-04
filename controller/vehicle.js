import { getAllVehicle } from "../Model/vehicleModel.js";
import { save } from "../Model/vehicleModel.js";
// Toggle between table and add staff form
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
      loadTable()
    });
  
});
function loadTable() {
  const table = $(".vehicle-table tbody");
  table.empty(); // Clear existing rows
  getAllVehicle()
    .then((response) => {
      response.forEach((element) => {
        table.append(`
          <tr>
            <td>${element.licensePlateNumber}</td>
            <td>${element.vehicleCategory}</td>
            <td>${element.fuelType}</td>
            <td>${element.status}</td>
            <td>${element.remarks}</td>
            <td>
              <button class="edit-btn">Edit</button>
              <button class="delete-btn">Delete</button>
            </td>
          </tr>
        `);
      });
    })
    .catch((error) => {
      console.error("Error loading vehicle:", error);
    });
}


$("#saveButton").on("click", () => {
  let licensePlateNumber = $("#licensePlateNumber").val();
  let vehicleCategory = $("#vehicleCategory").val();
  let fuelType = $("#fuelType").val();
  let status = $("#status").val();
  let remarks =$("#remarks").val();
  let vehicle = {
    licensePlateNumber: licensePlateNumber,
    vehicleCategory:vehicleCategory,
    fuelType: fuelType,
    status: status,
    remarks:remarks
  };

  save(vehicle)
    .then((response) => {
      alert("Vehicle saved successfully!");
      console.log("Save successful:", response);
      location.reload();
    })
    .catch((error) => {
      console.error("Save error:", error);
    });
});
