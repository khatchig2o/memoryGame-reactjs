import React from "react";
import {NavLink} from "react-router-dom";

export default function Header(){
    return <header>
        <h2>this is header</h2>
        <ul className="navbar">
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/About">About</NavLink>
            </li>
            <li>
                <NavLink to="/Game">Game</NavLink>
            </li>
        </ul>
    </header>
}