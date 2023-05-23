import React, { useEffect, useState } from "react";
import {BiMoon} from "react-icons/bi";
import {BiSun} from "react-icons/bi";
import "./switchTheme.css";
export default function SwitchTheme (){

  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(()=>{
      const body = document.body;
      isDarkMode ? body.classList.add("dark") : body.classList.remove("dark");
  }, [isDarkMode]);

  function toggleTheme(){
    setDarkMode(!isDarkMode);
  }

  return (
    <>
      <input type="checkbox" name="switch-theme" id="switch-theme" onChange={toggleTheme}/>
      <label htmlFor="switch-theme">
      { isDarkMode ? <BiSun/> : <BiMoon/>}
      </label>
    </>
  )
}