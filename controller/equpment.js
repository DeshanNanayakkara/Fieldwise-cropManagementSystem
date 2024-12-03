import { getAllEquipment } from "../Model/equipmentModel.js";

 // Toggle between table and add staff form
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
  loadTable()
});
function loadTable(){
  const table = $(".equipment-table tbody")
  table.empty()
  getAllEquipment().then((response)=> {
    console.log(response)
    response.forEach(element => {
      table.append(
        `
      <tr>
              <td>${element.equipmentId}</td>
              <td>${element.name}</td>
              <td>${element.type}</td>
              <td>${element.status}</td>
              <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
              </td>
            </tr>`
      )
    });
  }).catch((error)=>{console.log(error)})
}