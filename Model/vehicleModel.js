export function getAllVehicle(){
    return new Promise((resolve,reject) => {
        $.ajax({
            url:"http://localhost:8080/cropmonitor/api/v1/vehicle",
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