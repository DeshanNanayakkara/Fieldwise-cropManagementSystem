import { getAllVehicles, getVehicleById, saveVehicle, updateVehicle, deleteVehicle } from "../Model/vehicleModel";

$(document).ready(function () {
    loadVehicles();

    // Load all vehicles
    function loadVehicles() {
        getAllVehicles()
            .then((vehicles) => {
                const tbody = $(".vehicle-table tbody");
                tbody.empty();

                vehicles.forEach((vehicle) => {
                    tbody.append(`
                        <tr>
                            <td>${vehicle.licensePlateNumber}</td>
                            <td>${vehicle.vehicleCategory}</td>
                            <td>${vehicle.fuelType}</td>
                            <td>${vehicle.status}</td>
                            <td>
                                <button class="edit-btn" data-id="${vehicle.vehicleId}">Edit</button>
                                <button class="delete-btn" data-id="${vehicle.vehicleId}">Delete</button>
                            </td>
                        </tr>
                    `);
                });
            })
            .catch((error) => {
                console.error("Failed to load vehicles:", error);
                alert("Could not load vehicles. Please try again.");
            });
    }

    // Show Add Vehicle form
    $("#toggleAddVehicle").on("click", function () {
        $("#vehicleTableContainer").hide();
        $("#vehicleFormContainer").show();
        $("#saveButton").show();
        $("#updateButton").hide();
    });

    // Save Vehicle
    $("#saveButton").on("click", function () {
        const vehicleData = {
            licensePlateNumber: $("#licensePlateNumber").val(),
            vehicleCategory: $("#vehicleCategory").val(),
            fuelType: $("#fuelType").val(),
            status: $("#status").val(),
            remarks: $("#remarks").val(),
        };

        saveVehicle(vehicleData)
            .then(() => {
                alert("Vehicle saved successfully!");
                loadVehicles();
                resetForm();
                $("#vehicleFormContainer").hide();
                $("#vehicleTableContainer").show();
            })
            .catch((error) => {
                console.error("Error saving vehicle:", error);
                alert("Failed to save vehicle. Please try again.");
            });
    });

    // Edit Vehicle
    $(document).on("click", ".edit-btn", function () {
        const vehicleId = $(this).data("id");

        getVehicleById(vehicleId)
            .then((vehicle) => {
                $("#licensePlateNumber").val(vehicle.licensePlateNumber);
                $("#vehicleCategory").val(vehicle.vehicleCategory);
                $("#fuelType").val(vehicle.fuelType);
                $("#status").val(vehicle.status);
                $("#remarks").val(vehicle.remarks);

                $("#saveButton").hide();
                $("#updateButton").show().data("id", vehicleId);

                $("#vehicleTableContainer").hide();
                $("#vehicleFormContainer").show();
            })
            .catch((error) => {
                console.error("Error fetching vehicle details:", error);
                alert("Could not fetch vehicle details. Please try again.");
            });
    });

    // Update Vehicle
    $("#updateButton").on("click", function () {
        const vehicleId = $(this).data("id");
        const vehicleData = {
            licensePlateNumber: $("#licensePlateNumber").val(),
            vehicleCategory: $("#vehicleCategory").val(),
            fuelType: $("#fuelType").val(),
            status: $("#status").val(),
            remarks: $("#remarks").val(),
        };

        updateVehicle(vehicleId, vehicleData)
            .then(() => {
                alert("Vehicle updated successfully!");
                loadVehicles();
                resetForm();
                $("#vehicleFormContainer").hide();
                $("#vehicleTableContainer").show();
            })
            .catch((error) => {
                console.error("Error updating vehicle:", error);
                alert("Failed to update vehicle. Please try again.");
            });
    });

    // Delete Vehicle
    $(document).on("click", ".delete-btn", function () {
        const vehicleId = $(this).data("id");

        if (confirm("Are you sure you want to delete this vehicle?")) {
            deleteVehicle(vehicleId)
                .then(() => {
                    alert("Vehicle deleted successfully!");
                    loadVehicles();
                })
                .catch((error) => {
                    console.error("Error deleting vehicle:", error);
                    alert("Failed to delete vehicle. Please try again.");
                });
        }
    });

    // Cancel and Reset Form
    $("#cancelButton").on("click", function () {
        resetForm();
        $("#vehicleFormContainer").hide();
        $("#vehicleTableContainer").show();
    });

    // Reset Form Fields
    function resetForm() {
        $("#licensePlateNumber").val("");
        $("#vehicleCategory").val("");
        $("#fuelType").val("");
        $("#status").val("");
        $("#remarks").val("");
    }
});
