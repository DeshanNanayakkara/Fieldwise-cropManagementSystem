import { getCookie } from "../Model/tokenModel.js";

// Get all equipment from the server
export function getAllVehicle() {
    console.log("Auth Token:", getCookie("authToken"));  // Log the token for debugging
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:8080/cropmonitor/api/v1/vehicle",
            type: "GET",
            headers: {
                Authorization: "Bearer " + getCookie("authToken"),
            },
            success: function(result) {
                resolve(result);
            },
            error: function(xhr, status, error) {
                reject(error);
            },
        });
    });
}

// Save new vehicle data
export function save(vehicle) {
    console.log("Saving vehicle:", vehicle);
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:8080/cropmonitor/api/v1/vehicle",
            type: "POST",
            headers: {
                Authorization: `Bearer ${getCookie("authToken")}`,
            },
            contentType: "application/json",
            data: JSON.stringify(vehicle),
            success: function (response) {
                console.log("Vehicle saved successfully:", response);
                resolve(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Save failed:", jqXHR.responseJSON || textStatus);
                alert(jqXHR.responseJSON?.message || "Failed to save vehicle.");
                reject(errorThrown);
            },
        });
    });
}



// Get vehicle by ID
export function getVehicleById(vehicleCode) {
    console.log("Fetching details for vehicle ID:", vehicleCode);  // Debug log
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:8080/cropmonitor/api/v1/equipment/${vehicleCode}`,
            type: "GET",
            headers: {
                Authorization: `Bearer ${getCookie("authToken")}`,
            },
            success: function(response) {
                resolve(response);
            },
            error: function(xhr, status, error) {
                console.error(`Error fetching equipment by ID: ${error}`);
                reject(error);
            },
        });
    });
}
export function updateVehicle(vehicleCode, updatedVehicleCode) {
    console.log("Updating equipment:", vehicleCode, updatedVehicleCode); // Debug log
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:8080/cropmonitor/api/v1/vehicle/${vehicleCode}`,
        type: "PATCH", // Changed from PUT to PATCH
        headers: {
          Authorization: `Bearer ${getCookie("authToken")}`,
        },
        contentType: "application/json",
        data: JSON.stringify(updatedVehicleCode),
        success: function (response) {
          console.log("Vehicle updated successfully:", response);
          resolve(response);
        },
        error: function (xhr, status, error) {
          console.error("Error updating equipment:", xhr.responseJSON || status);
          alert(xhr.responseJSON?.message || "Failed to update equipment.");
          reject(error);
        },
      });
    });
  }
  export function deleteVehicle(vehicleCode) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:8080/cropmonitor/api/v1/vehicle/${vehicleCode}`, // API endpoint
            type: "DELETE", // HTTP method
            headers: {
                Authorization: `Bearer ${getCookie("authToken")}`, // Include authentication token
            },
            success: function () {
                resolve(); // Resolve promise if request is successful
            },
            error: function (xhr, status, error) {
                console.error(`Error deleting equipment: ${error}`);
                reject(error); // Reject promise if an error occurs
            },
        });
    });
}
  