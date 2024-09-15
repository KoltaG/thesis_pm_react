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
