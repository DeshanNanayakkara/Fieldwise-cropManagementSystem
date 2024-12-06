import { getCookie } from "../Model/tokenModel.js";

// Get all equipment from the server
export function getAllEquipment() {
    console.log("Auth Token:", getCookie("authToken"));  // Log the token for debugging
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:8080/cropmonitor/api/v1/equipment",
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

// Save new equipment data
export function save(equipment) {
    console.log("Saving equipment:", equipment);
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:8080/cropmonitor/api/v1/equipment",
            type: "POST",
            headers: {
                Authorization: `Bearer ${getCookie("authToken")}`,
            },
            contentType: "application/json",
            data: JSON.stringify(equipment),
            success: function (response) {
                console.log("Equipment saved successfully:", response);
                resolve(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Save failed:", jqXHR.responseJSON || textStatus);
                alert(jqXHR.responseJSON?.message || "Failed to save equipment.");
                reject(errorThrown);
            },
        });
    });
}



// Get equipment by ID
export function getEquipmentById(equipmentId) {
    console.log("Fetching details for equipment ID:", equipmentId);  // Debug log
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:8080/cropmonitor/api/v1/equipment/${equipmentId}`,
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
export function updateEquipment(equipmentId, updatedEquipment) {
    console.log("Updating equipment:", equipmentId, updatedEquipment); // Debug log
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:8080/cropmonitor/api/v1/equipment/${equipmentId}`,
        type: "PATCH", // Changed from PUT to PATCH
        headers: {
          Authorization: `Bearer ${getCookie("authToken")}`,
        },
        contentType: "application/json",
        data: JSON.stringify(updatedEquipment),
        success: function (response) {
          console.log("Equipment updated successfully:", response);
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
  export function deleteEquipment(equipmentId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:8080/cropmonitor/api/v1/equipment/${equipmentId}`, // API endpoint
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
  