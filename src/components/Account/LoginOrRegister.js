import { Component } from "react";
import { Navigate, useParams } from "react-router-dom";
import Register from "./Register";

export function RegisterOrLogin()
{
    
    let {id} = useParams()
    let retVal = [] 
    retVal.push(id == "register" ? <Register intent="REGISTER" key="reg"/> : <Register intent="LOGIN" key="log"/>)
    return (
        <>
            {retVal}
        </>
        )
}