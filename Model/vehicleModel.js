import {getCookie} from "../Model/tokenModel.js" //metnin import
export function getAllVehicle(){
    console.log(getCookie("authToken"))
    return new Promise((resolve, reject) => {
        $.ajax({
            url : "http://localhost:8080/cropmonitor/api/v1/vehicle",
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