import { LoginRequest } from "../../DTOs/login.request";
import { LoginResponse } from "../../DTOs/login.response";
import network from "../network";

class AuthService {
  postLogin = async (email: string, password: string) => {
    let loginRequest: LoginRequest = {
      email: email,
      password: password,
    };
    return await network.post<LoginResponse>("/users/login", loginRequest);
  };
}

const authService = new AuthService();
export default authService;
