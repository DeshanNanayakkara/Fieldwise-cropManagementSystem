import {getCookie}from "../Model/tokenModel.js"
export function saveCrop(cropData) {
    console.log(cropData);
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:8080/cropmonitor/api/v1/crop",
            type: "POST",
            contentType: "application/json", // Specify the content type as JSON
            data: JSON.stringify(cropData), // Convert the staff data object to a JSON string
            success: (response) => {
                console.log("Crop saved successfully:", response);
                resolve(response); // Resolves the promise with the server's response
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.error(`Failed to save Crop: ${textStatus}, ${errorThrown}`);
                reject(`Request failed with status: ${jqXHR.status}`);
            },
        });
    });
}
export function getAllCrop(){
    return new Promise((resolve,reject) => {
        $.ajax({
            url:"http://localhost:8080/cropmonitor/api/v1/crop",
            type :"GET",
            success:(response)=>{
                resolve(response)
            },
            error:(error)=> {
                reject(error)
            }
        })
    })
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
export function deleteCrop(cropId) {
    console.log(cropId)
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:8080/cropmonitor/api/v1/staff/${cropId}`,
            type: "DELETE",
            success: (response) => {
                console.log("Crop deleted successfully:", response);
                resolve(response);
            },
            error: (error) => {
                console.error(`Failed to delete Crop: ${error}`);
                reject(error);
            },
        });
    });
}

export function updateCrop(crop_id, crop){
    return new Promise((resolve, reject) => {
      $.ajax({
        url:   `http://localhost:8080/cropmonitor/api/v1/crop/${crop_id}`,
        type: "PATCH",
        contentType: "application/json",
        headers: {
          Authorization: "Bearer " + getCookie("authToken"),
        },
        data: JSON.stringify(crop),
        success: function (result) {
          console.log(result);
          resolve(result);
        },
        error: function (xhr, status, error) {
          reject(error);
        },
      });
    });
  }