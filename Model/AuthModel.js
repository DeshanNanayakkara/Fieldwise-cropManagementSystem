export function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
  
    for (let cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) {
        return value;
      }
    }
  
    return null;
  }
  
  export function tokenRefresh() {
    const token = getCookie("authToken");
    console.log("Token: in service", token);
  
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:8080/cropmonitor/api/v1/auth?refreshToken=${token}`,
        type: "POST",
        success: function (result) {
          console.log("Token refresh response:", result);
          document.cookie = `authToken=${result.token}; path=/;`; // Update cookie
          resolve(result.token);
        },
        error: function (xhr, status, error) {
          console.error(`Error: ${status} - ${error}`);
          reject(error);
        },
      });
    });
  }
  