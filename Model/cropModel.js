export function saveCrop(cropData) {
    console.log(cropData);
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:8080/cropmonitor/api/v1/crop",
            type: "POST",
            contentType: "application/json", // Specify the content type as JSON
            data: JSON.stringify(cropData), // Convert the staff data object to a JSON string
            success: (response) => {
                console.log("Crop member saved successfully:", response);
                resolve(response); // Resolves the promise with the server's response
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.error(`Failed to crop staff member: ${textStatus}, ${errorThrown}`);
                reject(`Request failed with status: ${jqXHR.status}`);
            },
        });
    });
}
function getAllCrops() {
    // Simulate an API call to fetch crop data
    return new Promise((resolve, reject) => {
        // Example data (replace with actual API call)
        const crops = [
            { id: 1, commonName: "Wheat", scientificName: "Triticum", category: "Cereal", season: "Winter", fieldCode: "F001" },
            { id: 2, commonName: "Rice", scientificName: "Oryza sativa", category: "Cereal", season: "Rainy", fieldCode: "F002" }
        ];
        resolve(crops);
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
