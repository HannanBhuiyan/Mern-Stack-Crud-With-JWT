import axios from "axios"
import { getLocalEmail } from "../helpers/SessionHelper"

const BASE_URL = 'http://localhost:4000/api/v1'

export const sendOTPRequest = (email) => {
    let postBody = {email}
    let url = BASE_URL + '/send-otp'
    return axios.post(url, postBody)
    .then(res => {
        if(res.status === 200) {
            return true
        }
    })
    .catch(error => {
        console.log(error)
        return false
    })
}

export const otpVerificationRequest = (otp, email) => {
    let postBody = {otp, email}
    let url = BASE_URL + '/verify-otp'
    return axios.post(url, postBody)
        .then(res => {
           if(res.status === 200) {
                return true
           }
           else {
                return false
           }
        })
        .catch(err => {
            return err
        })
}

export const createNewPasswordRequest = (password) => {
    let email = getLocalEmail();
    let postBody = {password, email}
    let url = BASE_URL + '/create-password'
    return axios.post(url, postBody)
    .then(res => {
        if(res.status === 200){
            return true
        }
        else {
            return false
        }
    })
    .catch(err => {
        return err
    });
}