import { getAllStaff, saveStaffMember } from "../Model/staffModel.js";
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


// $("#saveButton").on("click", () => {
//     const formData = {
//         staffId: $('#staffId').val(),
//         firstName: $('#firstName').val(),
//         lastName: $('#lastName').val(),
//         designation: $('#designation').val(),
//         gender: $('#gender').val(),
//         dob: $('#dob').val(),
//         joinedDate: $('#joinedDate').val(),
//         addressLine01: $('#addressLine1').val(),
//         addressLine02: $('#addressLine2').val(),
//         addressLine03: $('#addressLine3').val(),
//         addressLine04: $('#addressLine4').val(),
//         addressLine05: $('#addressLine5').val(),
//         contactNo: $('#contactNo').val(),
//         email: $('#email').val(),
//         role: $('#role').val()
//       };
//     saveStaffMember(formData);
// })
function loadTable(){
    const table=$(".staff-table tbody")
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
                <button class="edit-btn">Edit</button>
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
   document.getElementById('toggleAddStaff').addEventListener('click', function() {
    const tableContainer = document.getElementById('staffTableContainer');
    const formContainer = document.getElementById('staffFormContainer');
    
    // Hide table and show form
    tableContainer.style.display = 'none';
    formContainer.style.display = 'block';
  });

  // Cancel button to return to table view
  document.getElementById('cancelButton').addEventListener('click', function() {
    const tableContainer = document.getElementById('staffTableContainer');
    const formContainer = document.getElementById('staffFormContainer');
    
    // Hide form and show table
    formContainer.style.display = 'none';
    tableContainer.style.display = 'block';
  });

  