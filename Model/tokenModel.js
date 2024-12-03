// Function to get a specific cookie value by name
export function getCookie(name) {
    const cookieString = document.cookie; // Get all cookies as a string
    const cookies = cookieString.split("; "); // Split string into individual cookies
  
    for (let cookie of cookies) {
      const [key, value] = cookie.split("="); // Split each cookie into name and value
      if (key === name) {
        return value; // Return value if the name matches
      }
    }
  
    return null; // Return null if the cookie is not found
  }
  
  // Function to refresh the token by making an API request
  export function tokenRefresh() {
    const token = getCookie("authToken");
    console.log("Token: in service", token);
  
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:8080/cropmonitor/api/v1/auth?refreshToken=${token}`, // Proper string interpolation
        type: "POST",
        success: function (result) {
          console.log("Token refresh response:", result);
          resolve(result); // Resolve promise with API response
        },
        error: function (xhr, status, error) {
          console.error(`Error: ${status} - ${error}`); // Fixed string interpolation error
          reject(error); // Reject promise with error
        },
      });
    });
  }
  
  // Function to save a cookie with a specific name and value
  export function saveCookie(name, value) {
    document.cookie = `${name}=${value}; path=/`; // Proper string interpolation
    console.log(`Cookie saved: ${name}=${value}`);
  }
  