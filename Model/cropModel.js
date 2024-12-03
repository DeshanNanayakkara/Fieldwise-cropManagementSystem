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
