import {getCookie}from "../Model/tokenModel.js"
// Crop Model Functions
export function saveCrop(cropData) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:8080/cropmonitor/api/v1/crop",
        type: "POST",
        processData: false,  // Important for FormData
        contentType: false,  // Important for FormData
        data: cropData,
        success: (response) => {
          console.log("Crop saved successfully:", response);
          resolve(response);
        },
        error: (jqXHR, textStatus, errorThrown) => {
          console.error(`Failed to save crop: ${textStatus}, ${errorThrown}`);
          reject(`Request failed with status: ${jqXHR.status}`);
        },
      });
    });
  }
  
  export function getAllCrops() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:8080/cropmonitor/api/v1/crop",
        type: "GET",
        success: (response) => {
          console.log("Raw Response:", response);
          resolve(response);
        },
        error: (jqXHR, textStatus, errorThrown) => {
          console.error("Get Crops Error Details:", {
            status: jqXHR.status,
            statusText: jqXHR.statusText,
            responseText: jqXHR.responseText,
            textStatus: textStatus,
            errorThrown: errorThrown
          });
          reject(jqXHR);
        },
      });
    });
  }
  
  export function getCropById(cropId) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:8080/cropmonitor/api/v1/crop/${cropId}`,
        type: "GET",
        success: (response) => {
          resolve(response);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }
  
  export function updateCrop(cropId, cropData) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:8080/cropmonitor/api/v1/crop/${cropId}`,
        type: "PUT",
        processData: false,  // Important for FormData
        contentType: false,  // Important for FormData
        headers: {
            Authorization: "Bearer " + getCookie("authToken"),
          },
        data: cropData,
        success: (response) => {
          console.log("Crop updated successfully:", response);
          resolve(response);
        },
        error: (jqXHR, textStatus, errorThrown) => {
          console.error(`Failed to update crop: ${textStatus}, ${errorThrown}`);
          reject(`Request failed with status: ${jqXHR.status}`);
        },
      });
    });
  }
  
  export function deleteCrop(cropId) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:8080/cropmonitor/api/v1/crop/${cropId}`,
        type: "DELETE",
        success: (response) => {
          console.log("Crop deleted successfully:", response);
          resolve(response);
        },
        error: (jqXHR, textStatus, errorThrown) => {
          console.error(`Failed to delete crop: ${textStatus}, ${errorThrown}`);
          reject(`Request failed with status: ${jqXHR.status}`);
        },
      });
    });
  }