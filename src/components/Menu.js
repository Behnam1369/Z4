import React, { useState, useContext, useEffect } from "react";
import style from "./Menu.module.scss";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { RiPushpinLine, RiPushpinFill } from "react-icons/ri";
import { translatedMessage } from "../general";
import { AppContext } from "../App";
import { togglePinned, toggleShowMenu } from "./MenuReducer";
import { useDispatch, useSelector } from "react-redux";
import { host } from "../general/host";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

function Menu(props) {
  const { lang, langDir, langFont, isMobile } = useContext(AppContext);
  const menuState = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const [menuItems, setMenuItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const navStyle = {
    left:
      langDir === "rtl"
        ? "auto"
        : menuState.pinned || menuState.showMenu
        ? "0"
        : "-280px",
    right:
      langDir === "ltr"
        ? "auto"
        : menuState.pinned || menuState.showMenu
        ? "0"
        : "-280px",
    width: menuState.pinned || menuState.showMenu ? "280px" : "0",
    dis: menuState.pinned || menuState.showMenu ? "280px" : "0",
    fontFamily: langFont,
    fontSize: "14px",
  };

  const searchContainer = {
    direction: langDir,
    borderBottom: "1px solid #ccc",
  };

  const inputStyle = {
    direction: langDir,
    fontFamily: langFont,
  };

  useEffect(() => {
    const loadMenuItems = async () => {
      const data = await getData(lang);
      setMenuItems(data);
    };
    loadMenuItems();
  }, [lang]);

  return (
    <nav style={navStyle}>
      <div>
        <div className={style.searchContainer} style={searchContainer}>
          <input
            type="text"
            className="txtSearch"
            placeholder={translatedMessage(5, lang)}
            style={inputStyle}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          {!isMobile ? (
            menuState.pinned ? (
              <RiPushpinFill
                className={`${style.pin} ${style.icon}`}
                onClick={() => dispatch(togglePinned())}
              />
            ) : (
              <RiPushpinLine
                className={`${style.pin} ${style.icon}`}
                onClick={() => dispatch(togglePinned())}
              />
            )
          ) : null}
          {langDir === "rtl" ? (
            <BsChevronRight
              className={style.icon}
              onClick={() => dispatch(toggleShowMenu())}
            />
          ) : (
            <BsChevronLeft
              className={style.icon}
              onClick={() => dispatch(toggleShowMenu())}
            />
          )}
        </div>
        {/* {menuItems.map((el) => (
          <MenuItem key={el.id} title={el.title} />
        ))} */}
        {isMobile && (
          <button
            className={style.showTabs}
            onClick={props.onShowTabs}
            style={{ fontFamily: langFont }}
          >
            {translatedMessage(6, lang)}
            {/* Show Tabs */}
          </button>
        )}
        <ul dir={langDir} style={{ padding: 0, margin: 0 }}>
          {renderMenuItem(menuItems, 0, langDir, searchValue)}
        </ul>
      </div>
    </nav>
  );
}

function MenuItem(props) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    if (props.children.length > 0) {
      setExpanded(!expanded);
    }
  };

  return (
    <li
      className={style.menuItem}
      style={{ display: props.visible ? "" : "none" }}
    >
      <span
        style={{
          paddingRight:
            props.langDir === "rtl" ? 5 + props.level * 15 + "px" : 0,
          paddingLeft:
            props.langDir === "ltr" ? 5 + props.level * 15 + "px" : 0,
          backgroundColor: `rgba(255, 255, 255,  ${0.8 - props.level * 0.35})`,
        }}
        onClick={() => handleClick()}
      >
        {props.title}
        {props.children.length > 0 &&
          (expanded ? (
            <BiChevronUp className={style.icon} />
          ) : (
            <BiChevronDown className={style.icon} />
          ))}
      </span>
      {props.children.length > 0 && expanded && (
        <ul>
          {renderMenuItem(
            props.children,
            props.level + 1,
            props.langDir,
            props.searchValue
          )}
        </ul>
      )}
    </li>
  );
}

const renderMenuItem = (
  items,
  level = 0,
  langDir = "ltr",
  searchValue = ""
) => {
  return (
    <>
      {items.map((el) => (
        <MenuItem
          key={el.id}
          title={el.title}
          children={el.children}
          level={level}
          langDir={langDir}
          searchValue={searchValue}
          visible={contains(el, searchValue)}
        />
      ))}
    </>
  );
};

const getData = async (lang) => {
  const response = await fetch(host + `/menu_items_lang/${lang}`)
    .then((response) => response.json())
    .then((res) => res.data);
  return response;
};

const contains = (el, value) => {
  if (el.title.toLowerCase().includes(value.toLowerCase())) return true;
  if (el.children.length > 0) {
    var res = false;
    el.children.forEach((child) => {
      console.log(`value: ${value}`);
      if (contains(child, value)) res = true;
    });
    return res;
  }

  return false;
};

export default Menu;
