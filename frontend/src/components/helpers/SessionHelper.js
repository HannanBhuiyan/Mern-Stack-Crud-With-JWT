class SessionHelper {
    
    setToken(token){
        localStorage.setItem("token", token)
    }
    
    getToken(){
        return localStorage.getItem('token')
    }

    setLocalEmail(email){
        localStorage.setItem("email", email)
    }
    
    getLocalEmail(){
        return localStorage.getItem('email')
    }

    setUserDetails(userDetails) {
        localStorage.setItem('userDetails', JSON.stringify(userDetails))
    }

    getUserDetails(){
        return JSON.parse(localStorage.getItem('userDetails'))
    }

}

export const { 
    setLocalEmail, 
    getLocalEmail, 
    setToken, 
    getToken, 
    setUserDetails, 
    getUserDetails 
} = new SessionHelper()