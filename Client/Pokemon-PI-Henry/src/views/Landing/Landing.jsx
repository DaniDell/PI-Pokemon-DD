import { NavLink } from "react-router-dom";
import React from "react";
import video from "../../img/LANDING.mp4" ;
import "./Landing.css";

const Landing = () => {
    return (
        <>
        <div className="landing-container"> 
        <video src={video} autoPlay loop muted className="video"></video>

        <NavLink  to={'/home'}>
                    <button className="entrar">ENTRAR</button>
                </NavLink>
        </div>
        </>
    )
}

export default Landing;