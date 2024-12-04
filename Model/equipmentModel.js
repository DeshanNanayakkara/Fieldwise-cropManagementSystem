import {getCookie} from "../Model/tokenModel.js" //metnin import
export function getAllEquipment(){
    console.log(getCookie("authToken"))
    return new Promise((resolve, reject) => {
        $.ajax({
            url : "http://localhost:8080/cropmonitor/api/v1/equipment",
            type : "GET",
            headers: {
                Authorization: "Bearer " + getCookie("authToken"),
            },
            success: function(result){
                resolve(result);
            },
            error: function(xhr, status, error){
                reject(error);
            },
        })
    })
} 
export function save(equipment) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:8080/cropmonitor/api/v1/equipment",
            type: "POST", // HTTP method
            headers: {
                Authorization: `Bearer ${getCookie("authToken")}`, // Ensure token is valid
            },
            contentType: "application/json",
            data: JSON.stringify(equipment), // Convert equipment object to JSON
            success: function (response) {
                console.log("Equipment saved successfully:", response);
                resolve(response); // Resolve with response data
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(`Save failed: ${textStatus}, ${errorThrown}`);
                reject(`Save failed: ${textStatus}, ${errorThrown}`); // Reject with error details
            },
        });
    });
}
