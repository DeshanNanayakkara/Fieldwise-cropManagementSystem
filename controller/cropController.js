import { getAllCrops, saveCrop,getCropById ,getAllCrops} from "../Model/cropModel.js";
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
  getCropById(cropId)
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
      console.error("Error fetching staff details:", error);
      alert("Failed to load crop details.");
    });
    
}


$(document).ready(function () {
  $(document).ready(function () {
    // Event listener for closing the form
    $('#closeStaffFormButton').on('click', function () {
        // Hide the popup form (assuming popup has id "staffPopup")
        $('#staffPopup').css('display', 'none');
    });
});

  // Event listener for clicking on a staff row (to show the form)
  $(".crop-table").on("click", "tr", function () {
      const cropId = $(this).find("td:first").text(); // Assuming staffId is in the first column
      loadForm(cropId); // Load the form with the clicked staff details
  });
});

function loadTable() {
  const table = $(".crop-table tbody");
  table.empty();
  getAllCrops().then((response) => {
      response.forEach((element) => {
          table.append(`
              <tr>
                <td>${element.commonName}</td>
                <td>${element.scientificName}</td>
                <td>${element.category}</td>
                <td>${element.season}</td>
                <td>${element.fieldCode}</td>
                <td>
                  <button class="edit-btn" data-id="${element.id}">Edit</button>
                  <button class="delete-btn" data-id="${element.id}">Delete</button>
                </td>
              </tr>
          `);
      });
  });
}

$(document).ready(function () {
  $('#saveButton').on('click', function () {
      const formData = new FormData();
      formData.append("commonName", $('#commonName').val());
      formData.append("scientificName", $('#scientificName').val());
      formData.append("category", $('#category').val());
      formData.append("season", $('#season').val());
      formData.append("fieldCode", $('#fieldCode').val());

      // Handle the crop image input
      const cropImage = $('#cropImage')[0].files[0];
      if (cropImage) {
          formData.append("cropImage", cropImage);
      }

      saveCrop(formData).then((response) => {
          alert("Crop saved successfully");
          loadTable(); // Reload the table after saving
      }).catch((error) => {
          console.error("Error saving crop:", error);
          alert("Failed to save crop");
      });
  });

  // Delegate event handling for edit and delete buttons
  $(".crop-table").on("click", ".edit-btn", function () {
      const cropId = $(this).data("id");
      getCropById(cropId).then((crop) => {
          $('#commonName').val(crop.commonName);
          $('#scientificName').val(crop.scientificName);
          $('#category').val(crop.category);
          $('#season').val(crop.season);
          $('#fieldCode').val(crop.fieldCode);
          // Handle crop image separately if needed
          $('#cropImage').val(null); // Clear file input as it can't be prefilled
      });
  });

  $(".crop-table").on("click", ".delete-btn", function () {
      const cropId = $(this).data("id");
      if (confirm("Are you sure you want to delete this crop?")) {
          deleteCrop(cropId).then(() => {
              alert("Crop deleted successfully");
              loadTable(); // Reload the table after deletion
          }).catch((error) => {
              console.error("Error deleting crop:", error);
              alert("Failed to delete crop");
          });
      }
  });

  loadTable(); // Load the crop table on page load
});

  
  // Toggle between table and add crop form
document.getElementById('toggleAddCrop').addEventListener('click', function() {
    const tableContainer = document.getElementById('cropTableContainer');
    const formContainer = document.getElementById('cropFormContainer');
    
    // Hide table and show form
    tableContainer.style.display = 'none';
    formContainer.style.display = 'block';
});

// Cancel button to return to table view
document.getElementById('cancelCropButton').addEventListener('click', function() {
    const tableContainer = document.getElementById('cropTableContainer');
    const formContainer = document.getElementById('cropFormContainer');
    
    // Hide form and show table
    formContainer.style.display = 'none';
    tableContainer.style.display = 'block';
});


  

// jhsjhs
