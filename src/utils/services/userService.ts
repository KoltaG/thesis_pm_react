import { User } from "../../DTOs/login.response";
import network from "../network";

class UserService {
  // Fetch all users
  fetchUsers = async (): Promise<User[]> => {
    try {
      const response = await network.get<User[]>(`/users`);
      return response.data;
    } catch (error) {
      console.error("Error fetching projects", error);
      throw error;
    }
  };

  // Delete a user
  deleteUser = async (userId: string): Promise<void> => {
    try {
      await network.delete(`/users/${userId}`);
    } catch (error) {
      console.error("Error deleting user", error);
      throw error;
    }
  };
}

const userService = new UserService();
export default userService;
