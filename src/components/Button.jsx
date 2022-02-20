import React from "react";
import './Button.css'
const Button=({click})=>{
    return(
        <>
            <button onClick={click}>Get New User</button>
        </>
    )
}

export default Button