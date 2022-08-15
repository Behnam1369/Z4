import React, { useEffect, useState, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { RiCloseLine } from "react-icons/ri";
import { BiDotsVerticalRounded } from "react-icons/bi";
import style from "./Main.module.scss";
// import Samplepage from "../pages/sample";
import { AppContext } from "../App";
import { translatedMessage } from "../general";
import { MdMenu } from "react-icons/md";
import Menu from "./Menu";
import { toggleShowMenu } from "./MenuReducer";
import { useDispatch, useSelector } from "react-redux";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function useOutsideAlerter(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

const Main = (props) => {
  const [tabs, setTabs] = useState(props.tabs);
  const [maxId, setMaxId] = useState(0);
  const { lang, langDir, isMobile, langFont } = useContext(AppContext);
  const [showTabs, setShowTabs] = useState(false);
  const [activeTabs, setActiveTabs] = useState([]);
  const [closingTabs, setClosingTabs] = useState([]);
  const [showMoreItems, setShowMoreItems] = useState(false);
  const moreItems = useRef(null);
  const menuState = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  useOutsideAlerter(moreItems, () => {
    setShowMoreItems(false);
  });

  const componentStyle = {
    position: "relative",
    right: langDir === "ltr" ? "auto" : "0px",
    left: langDir === "ltr" ? "280px" : "auto",
    width: "calc( 100% - 280px )",
  };

  const tabsStyle = {
    direction: langDir,
  };

  const tabStyle = {
    borderRadius: langDir === "ltr" ? "0 8px 0 0" : "8px 0 0 0",
  };

  const moreStyle = {
    marginRight: langDir === "ltr" ? "0" : "auto",
    marginLeft: langDir === "ltr" ? "auto" : "0",
  };

  const moreItemsStyle = {
    right: langDir === "ltr" ? "10px" : "auto",
    left: langDir === "ltr" ? "auto" : "10px",
  };

  const openTab = (tab) => {
    setMaxId(maxId + 1);
    tab.id = maxId + 1;
    setActiveTabs([...activeTabs, tab.id]);
    setTabs([...tabs, tab]);
  };

  const closeTab = (tab, e) => {
    e.stopPropagation();
    setActiveTabs([...activeTabs.filter((t) => t !== tab.id)]);
    setTabs(tabs.filter((t) => t.id !== tab.id));
    setClosingTabs([...closingTabs, {}]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setClosingTabs([]);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [tabs]);

  const handleShowMoreItems = () => {
    setShowMoreItems(true);
  };

  useEffect(() => {
    setTabs(
      tabs.map((t) => {
        if (t.id === activeTabs[activeTabs.length - 1]) {
          return { ...t, active: true };
        } else {
          return { ...t, active: false };
        }
      })
    );
  }, [activeTabs]);

  const tabClicked = (id) => {
    setActiveTabs([...activeTabs.filter((t) => t !== id), id]);
  };

  const handleCloseAll = () => {
    setActiveTabs([]);
    setTabs([]);
    setShowMoreItems(false);
  };

  const handleCloseAllButThis = () => {
    let id = activeTabs[activeTabs.length - 1];
    setActiveTabs([id]);
    setTabs(tabs.filter((t) => t.id === id));
    setShowMoreItems(false);
  };

  const handleCloseNextTabs = () => {
    let id = activeTabs[activeTabs.length - 1];
    let activeIndex = tabs.indexOf(tabs.find((t) => t.id === id));
    setTabs(
      tabs.filter((t, i) => {
        if (i > activeIndex) {
          setActiveTabs(activeTabs.filter((a) => a !== t.id));
        }
        return i <= activeIndex;
      })
    );
    setShowMoreItems(false);
  };

  const handleClosePreviousTabs = () => {
    let id = activeTabs[activeTabs.length - 1];
    let activeIndex = tabs.indexOf(tabs.find((t) => t.id === id));
    setTabs(
      tabs.filter((t, i) => {
        if (i < activeIndex) {
          setActiveTabs(activeTabs.filter((a) => a !== t.id));
        }
        return i >= activeIndex;
      })
    );
    setShowMoreItems(false);
  };

  return (
    <div style={menuState.pinned ? componentStyle : {}}>
      {/* {menuState.pinned || menuState.showMenu ? <Menu /> : ""} */}
      <Menu onShowTabs={() => setShowTabs(true)} />
      <header style={{ height: "30px", direction: langDir }}>
        <MdMenu
          className={style.menuIcon}
          onClick={() => dispatch(toggleShowMenu())}
        />
        <button onClick={() => openTab({ title: "test" })}>Add New Tab</button>
      </header>
      {(!isMobile || (isMobile && showTabs)) && (
        <div className={style.tabs} style={tabsStyle}>
          {isMobile && showTabs && (
            <div>
              <span
                className={style.back}
                onClick={() => setShowTabs(false)}
                style={{ fontFamily: langFont }}
              >
                {langDir === "ltr" ? <BsChevronLeft /> : <BsChevronRight />}{" "}
                {translatedMessage(7, lang)}
                {/*Back*/}
              </span>
            </div>
          )}
          {tabs.map((tab) => {
            return (
              <div
                key={tab.id}
                className={`${style.tab} ${tab.active ? style.active : ""}`}
                onClick={() => {
                  tabClicked(tab.id);
                }}
                style={{
                  ...tabStyle,
                  visibility: tab.hidden ? "hidden" : "visible",
                }}
              >
                {tab.title}
                <RiCloseLine
                  onClick={(e) => closeTab(tab, e)}
                  className={style.closeTab}
                />
              </div>
            );
          })}
          {closingTabs.map((el, i) => {
            return (
              <div
                key={i}
                className={`${style.tab}`}
                style={{ visibility: "hidden" }}
              ></div>
            );
          })}
          {!isMobile && (
            <BiDotsVerticalRounded
              className={style.more}
              style={moreStyle}
              onClick={() => handleShowMoreItems()}
            />
          )}
          {showMoreItems && (
            <div
              ref={moreItems}
              className={style.moreItems}
              style={moreItemsStyle}
            >
              <div className={style.moreItem} onClick={() => handleCloseAll()}>
                {translatedMessage(1, lang)}
              </div>
              <div
                className={style.moreItem}
                onClick={() => handleCloseAllButThis()}
              >
                {translatedMessage(2, lang)}
              </div>
              <div
                className={style.moreItem}
                onClick={() => handleCloseNextTabs()}
              >
                {translatedMessage(3, lang)}
              </div>
              <div
                className={style.moreItem}
                onClick={() => handleClosePreviousTabs()}
              >
                {translatedMessage(4, lang)}
              </div>
            </div>
          )}
        </div>
      )}
      {/* <Samplepage /> */}
    </div>
  );
};

Main.defaultProps = {
  tabs: [],
  lang: "english",
};

Main.propTypes = {
  tabs: PropTypes.array,
  lang: PropTypes.string,
};

export default Main;
