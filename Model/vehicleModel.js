export function getAllVehicles() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:8080/cropmonitor/api/v1/vehicle`,
            type: "GET",
            headers: {
                Authorization: `Bearer ${getCookie("authToken")}`,
            },
            success: function (response) {
                resolve(response);
            },
            error: function (xhr, status, error) {
                console.error(`Error fetching vehicles: ${error}`);
                reject(error);
            },
        });
    });
}

export function getVehicleById(vehicleId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:8080/cropmonitor/api/v1/vehicle/${vehicleId}`,
            type: "GET",
            headers: {
                Authorization: `Bearer ${getCookie("authToken")}`,
            },
            success: function (response) {
                resolve(response);
            },
            error: function (xhr, status, error) {
                console.error(`Error fetching vehicle by ID: ${error}`);
                reject(error);
            },
        });
    });
}

export function saveVehicle(vehicleData) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:8080/cropmonitor/api/v1/vehicle`,
            type: "POST",
            contentType: "application/json",
            headers: {
                Authorization: `Bearer ${getCookie("authToken")}`,
            },
            data: JSON.stringify(vehicleData),
            success: function () {
                resolve();
            },
            error: function (xhr, status, error) {
                console.error(`Error saving vehicle: ${error}`);
                reject(error);
            },
        });
    });
}

export function updateVehicle(vehicleId, vehicleData) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:8080/cropmonitor/api/v1/vehicle/${vehicleId}`,
            type: "PATCH",
            contentType: "application/json",
            headers: {
                Authorization: `Bearer ${getCookie("authToken")}`,
            },
            data: JSON.stringify(vehicleData),
            success: function () {
                resolve();
            },
            error: function (xhr, status, error) {
                console.error(`Error updating vehicle: ${error}`);
                reject(error);
            },
        });
    });
}

export function deleteVehicle(vehicleId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:8080/cropmonitor/api/v1/vehicle/${vehicleId}`,
            type: "DELETE",
            headers: {
                Authorization: `Bearer ${getCookie("authToken")}`,
            },
            success: function () {
                resolve();
            },
            error: function (xhr, status, error) {
                console.error(`Error deleting vehicle: ${error}`);
                reject(error);
            },
        });
    });
}
