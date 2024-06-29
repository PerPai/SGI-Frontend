import axios from "axios";
import { UserModel } from "../models/login.model";

export class AuthServiceU {
  static async login(user: UserModel) {
    try {
      const response = await axios.post(
        "https://sgi-production.up.railway.app/api/login",
        user
      );
      console.log(response.data);
      localStorage.setItem('User', JSON.stringify(response.data[0][0]));
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || "Error logging in");
      } else {
        throw new Error("An unknown error occurred during login");
      }
    }
  }

  static async GetTecnicos() {
    try {
      const response = await axios.get(
        "https://sgi-production.up.railway.app/api/users/tecnicos",
      );
      console.log(response.data);
      localStorage.setItem('Tecnicos', JSON.stringify(response.data[0][0]));
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || "Error logging in");
      } else {
        throw new Error("An unknown error occurred during login");
      }
    }
  }

  static async GetRoles(CT_CEDULA: string) {
    try {
      const response = await axios.get(
        `https://sgi-production.up.railway.app/api/rol?CT_CEDULA=${CT_CEDULA}`,
      );
      console.log(response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || "Error logging in");
      } else {
        throw new Error("An unknown error occurred during login");
      }
    }
  }
}