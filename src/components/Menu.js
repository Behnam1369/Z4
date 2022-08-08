import React, { useState, useContext, useReducer } from "react";
import style from "./Menu.module.scss";
import { RiCloseLine } from "react-icons/ri";
import { RiPushpinLine, RiPushpinFill } from "react-icons/ri";
import { translatedMessage } from "../general";
import { AppContext } from "../App";
import { togglePinned, toggleShowMenu } from "./MenuReducer";
import { useDispatch, useSelector } from "react-redux";

function Menu() {
  const { lang, langDir } = useContext(AppContext);
  const menuState = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const navStyle = {
    left: langDir === "ltr" ? "0" : "auto",
    right: langDir === "ltr" ? "auto" : "0",
  };

  const searchContainer = {
    direction: langDir,
  };

  const inputStyle = {
    direction: langDir,
  };

  return (
    <nav style={navStyle}>
      <div>
        <div className={style.searchContainer} style={searchContainer}>
          <input
            type="text"
            className="txtSearch"
            placeholder={translatedMessage(5, lang)}
            style={inputStyle}
          />

          {menuState.pinned ? (
            <RiPushpinFill
              className={`${style.pin} ${style.icon}`}
              onClick={() => dispatch(togglePinned())}
            />
          ) : (
            <RiPushpinLine
              className={`${style.pin} ${style.icon}`}
              onClick={() => dispatch(togglePinned())}
            />
          )}
          <RiCloseLine
            className={style.icon}
            onClick={() => dispatch(toggleShowMenu())}
          />
        </div>
        <h2>Basic Information</h2>
        <ul>
          <li>Center Types</li>
          <li>Center Types</li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
