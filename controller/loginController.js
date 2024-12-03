import { login } from "../Model/userModel.js"

$('#signInButton').click(function(){
    const email=$('#email').val()
    const password=$('#password').val()
    const formData= new FormData()
    formData.append("email",email)
    formData.append("password",password)
    login(formData).then((response)=>{
        alert("log una")
    window.location="/Pages/staffManagement.html"
    }).catch((response)=>{alert("log une na")})
})