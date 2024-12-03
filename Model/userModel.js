export function login(formData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:8080/cropmonitor/api/v1/auth/login", // API URL
      type: "POST",
      data: formData, // FormData object passed as data
      processData: false, // Prevents jQuery from processing the data
      contentType: false, // Ensures the proper content type is set for FormData
      success: function (result) {
        console.log("Login successful:", result);
        resolve(result); // Resolving with the response result
      },
      error: function (xhr, status, error) {
        console.error(`Login failed: ${status} - ${error}`);
        reject(error); // Rejecting on error
      },
    });
  });
}