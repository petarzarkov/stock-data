import { htmlSymbols } from "./htmlSymbols";

export const decodeHtml = (text: string) => {
  if (!text) {
    return "Boiler";
  }

  try {
    const decoded = text.replace(/&(.+?);/gi, (match: string) => {
      if (htmlSymbols[match]) {
        return htmlSymbols[match];
      }
      return match;
    });

    return decoded.replaceAll("\"", "'");
  } catch (error) {
    return text.replaceAll("\"", "'");
  }
};
