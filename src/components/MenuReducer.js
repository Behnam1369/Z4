export const TOGGLE_PINNED = "TOGGLE_PINNED";
export const TOGGLE_SHOW_MENU = "TOGGLE_SHOW_MENU";

export const defaultState = {
  pinned: localStorage["pinned"] === "true",
  showMenu: localStorage["pinned"] === "true",
};

export function reducer(state = defaultState, action) {
  switch (action.type) {
    case TOGGLE_PINNED:
      localStorage["pinned"] = !state.pinned;

      return {
        ...state,
        showMenu: !state.pinned === true ? true : false,
        pinned: !state.pinned,
      };
    case TOGGLE_SHOW_MENU:
      localStorage["pinned"] = false;
      return { ...state, showMenu: !state.showMenu, pinned: false };
    default:
      return state;
  }
}

export function togglePinned() {
  return { type: TOGGLE_PINNED };
}

export function toggleShowMenu() {
  return { type: TOGGLE_SHOW_MENU };
}
