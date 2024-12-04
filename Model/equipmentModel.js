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
    console.log("Saving equipment:", equipment);  // Debug log for the equipment data
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:8080/cropmonitor/api/v1/equipment",
            type: "POST",
            headers: {
                Authorization: `Bearer ${getCookie("authToken")}`, 
            },
            contentType: "application/json",
            data: JSON.stringify(equipment),
            success: function(response) {
                console.log("Equipment saved successfully:", response);
                resolve(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Save failed. jqXHR:", jqXHR);  // Log the full jqXHR object for more details
                console.error("Status:", textStatus);  // Log the status
                console.error("Error Thrown:", errorThrown);  // Log any error message
                alert(`Save failed: ${textStatus}, ${errorThrown}`);  // Alert user with error info
                reject(`Save failed: ${textStatus}, ${errorThrown}`);
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
