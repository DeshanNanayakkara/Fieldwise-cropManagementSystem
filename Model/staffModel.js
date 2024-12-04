import {getCookie}from "../Model/tokenModel.js"
export function saveStaffMember(staffData) {
    console.log(staffData);
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:8080/cropmonitor/api/v1/staff",
            type: "POST",
            contentType: "application/json", // Specify the content type as JSON
            data: JSON.stringify(staffData), // Convert the staff data object to a JSON string
            success: (response) => {
                console.log("Staff member saved successfully:", response);
                resolve(response); // Resolves the promise with the server's response
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.error(`Failed to save staff member: ${textStatus}, ${errorThrown}`);
                reject(`Request failed with status: ${jqXHR.status}`);
            },
        });
    });
}
export function getAllStaff(){
    return new Promise((resolve,reject) => {
        $.ajax({
            url:"http://localhost:8080/cropmonitor/api/v1/staff",
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

export function getStaffById(staffId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:8080/cropmonitor/api/v1/staff/${staffId}`,
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
export function deleteStaff(staffId) {
    console.log(staffId)
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:8080/cropmonitor/api/v1/staff/${staffId}`,
            type: "DELETE",
            success: (response) => {
                console.log("Staff member deleted successfully:", response);
                resolve(response);
            },
            error: (error) => {
                console.error(`Failed to delete staff member: ${error}`);
                reject(error);
            },
        });
    });
}

export function updateStaff(staff_id, staff){
    return new Promise((resolve, reject) => {
      $.ajax({
        url:   `http://localhost:8080/cropmonitor/api/v1/staff/${staff_id}`,
        type: "PATCH",
        contentType: "application/json",
        headers: {
          Authorization: "Bearer " + getCookie("authToken"),
        },
        data: JSON.stringify(staff),
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