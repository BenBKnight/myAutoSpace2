import React, { useContext, useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import jwt from "jsonwebtoken";
import { AuthContext } from "./authContext";

export default function ProtectedRoute({ component: Component, ...rest }) {
    const [userId, SetUserId] = useContext(AuthContext)
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    useEffect(() => {
        let token = localStorage.getItem("jwt.Token");
        if (token) {
            let expirationDate = jwt.decode(token).exp;
            console.log("***********************", jwt.decode(token))
            let currentId = jwt.decode(token).id
            let newDate = new Date();
            if (expirationDate < newDate.getTime() / 1000) {
                setIsAuthenticated(false)
            } if (expirationDate > newDate.getTime() / 1000) {
                SetUserId({
                    ...userId,
                    id: currentId
                })
                setIsAuthenticated(true)
            } else (
                console.log("Could not Authenicate")
            );

        } else {
            setIsAuthenticated(false)
        }

    }, [userId.token])
    if (isAuthenticated === null) {
        return <></>
    }
    return (
        <Route {...rest} render={props =>
            !isAuthenticated ? (
                <Redirect to="/" />
            ) : (
                    <Component {...props} />
                )} />
    )
}