export function getAllEquipment(){
    return new Promise((resolve,reject) => {
        $.ajax({
            url:"http://localhost:8080/cropmonitor/api/v1/equipment",
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