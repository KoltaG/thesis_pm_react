import { jwtDecode } from "jwt-decode";

export interface Token {
  accessTokenID: string;
  exp: number;
  iss: string;
  role: string;
  userID: string;
}

export const tokenExpired = (
  tokenString: string,
  thresholdMilliseconds: number = 15000
): boolean => {
  try {
    let token = jwtDecode(tokenString) as Token;
    let timeNow = new Date().getTime();
    let timeFromToken = token.exp * 1000;
    return timeFromToken - timeNow < thresholdMilliseconds;
  } catch (error) {
    return true;
  }
};

// TODO for remember me functionality
export const getItemFromStorage = (itemName: string) => {
  // Try getting the item from localStorage first
  let item = localStorage.getItem(itemName);

  // If not found in localStorage, try sessionStorage
  if (!item) {
    item = sessionStorage.getItem(itemName);
  }

  return item;
};

export const setItemInStorage = (
  itemName: string,
  itemValue: string,
  rememberMe: boolean
) => {
  if (rememberMe) {
    localStorage.setItem(itemName, itemValue);
  } else {
    sessionStorage.setItem(itemName, itemValue);
  }
};
