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
