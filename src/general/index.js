import { languages } from "./lang";
import { messages } from "../general/dic";

export const languageDir = (lang) => {
  return languages[lang].direction;
};

export const languageFont = (lang) => {
  return languages[lang].defaultFont;
};

export const translatedMessage = (id, lang) => {
  return messages.filter((m) => m.id === id)[0][lang];
};
