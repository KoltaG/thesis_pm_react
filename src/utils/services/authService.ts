import { LoginRequest } from "../../DTOs/login.request";
import { LoginResponse, User } from "../../DTOs/login.response";
import { RegisterRequest } from "../../DTOs/register.request";
import network from "../network";

class AuthService {
  postLogin = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      let loginRequest: LoginRequest = {
        email: email,
        password: password,
      };
      const response = await network.post<LoginResponse>(
        "/users/login",
        loginRequest
      );
      return response.data;
    } catch (error) {
      console.error("Error logging in", error);
      throw error;
    }
  };

  postRegister = async (request: RegisterRequest): Promise<User> => {
    try {
      const response = await network.post<User>("/users/register", {
        ...request,
      });
      return response.data;
    } catch (error) {
      console.error("Error registering", error);
      throw error;
    }
  };
}

const authService = new AuthService();
export default authService;
