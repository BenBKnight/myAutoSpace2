import axios from "axios";
import setAuthorizationToken from "./setAuthorizationToken";



const serverUrl = "";
// const serverUrl = "http://localhost:8080";


export default {
    // Post Routes
    loginUser: function (user) {
        return axios.post(serverUrl + "/api/login", user)
            .then(res => {
                const token = res.data.token;
                localStorage.setItem("jwt.Token", token);
                setAuthorizationToken(token);
                return res;
            });
    },
    signUp: function (data) {
        return axios.post(serverUrl + "/api/signup", data)
            .then(res => {
                const token = res.data.token;
                localStorage.setItem("jwt.Token", token);
                setAuthorizationToken(token);
                return res;
            });
    },
    newVehicle: function (data) {
        return axios.post(serverUrl + "/api/postVehicle", data, {
            headers: {
                Authorization: localStorage.getItem("jwt.Token")
            }
        })
    },
    maintRecord: function (data) {
        return axios.post(serverUrl + "/api/maintenance/:id", data, {
            headers: {
                Authorization: localStorage.getItem("jwt.Token")
            }
        })
    },

    // Get Routes
    allVehicles: function (data) {
        // Data is equal to user Id
        return axios.get(serverUrl + "/vehiclefind/" + data, {
            headers: {
                Authorization: localStorage.getItem("jwt.Token")
            }
        }).then(res => {
            return res;
        })
    },
    userData: function (data) {
        return axios.get(serverUrl + "/api/user")
    },
    vehicleById: function (data) {
        // Data is Equal to Vehicle Id
        return axios.get(serverUrl + "/vehicleOnefind/" + data, {
            headers: {
                Authorization: localStorage.getItem("jwt.Token")
            }
        })
    },
    getMaintRecords: function (data) {
        // Data is Equal to vehicle Id
        return axios.get(serverUrl + "/maintenancefindvehicle/" + data, {
            headers: {
                Authorization: localStorage.getItem("jwt.Token")
            }
        })
    },
    getOneMaintRecord: function (data) {
        return axios.get(serverUrl + "/maintenancefind/" + data, {
            headers: {
                Authorization: localStorage.getItem("jwt.Token")
            }
        })
    },
    downloadPhoto: function (data) {
        return axios.post(serverUrl + '/api/photoUpload/', data, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
        })
            .then((response) => {
                if (200 === response.status) {
                    // If file size is larger than expected.
                    if (response.data.error) {
                        if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                            console.log('Max size: 2MB', 'red');
                        } else {
                            console.log(response.data);// If not the given file type
                            console.log(response.data.error, 'red');
                        }
                    } else {
                        // Success
                        let fileName = response.data;
                        console.log(response)
                        return fileName.image
                    }
                }
            }).catch((error) => {
                // If another error
                console.log(error, 'red');
            });
    },
    uploadPhoto: function (data) {
        return axios.get(serverUrl + "/api/photo/" + data)
            .then(res => {
                return (res.data)
            })
    },
    updateUserPic: function (data) {
        console.log(data)
        return axios.put(serverUrl + "/api/userPhoto/", data, {
            headers: {
                Authorization: localStorage.getItem("jwt.Token")
            }
        }).catch((error) => {
            // If another error
            console.log(error);
        });
    },
    deleteCar: function (data) {
        console.log(data)
        return axios.delete(serverUrl + "/api/vehicles/" + data, {
            headers: {
                Authorization: localStorage.getItem("jwt.Token")
            }
        })
            .then((res) => {
                console.log(res)
            })
    },
    updateMileage: function (data) {
        console.log(data)
        console.log(localStorage.getItem("jwt.Token"))
        return axios.put(serverUrl + "/api/vehicleMileage/", data, {
            headers: {
                Authorization: localStorage.getItem("jwt.Token")
            }
        })
            .then((res) => {
                console.log(res)
            })
    }
}



