import axios from "axios";
import { DiagnosticoModel } from "../models/diagnostico.model";

export class AuthServiceDiagnostico {
  static async crearDiagnostico(diagnostico: DiagnosticoModel) {
    try {
      const response = await axios.post(
        "https://sgi-frontend-production.up.railway.app/api/diagnostico",
        diagnostico
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || "Error logging in");
      } else {
        throw new Error("An unknown error occurred during login");
      }
    }
  }

  static async GetDiagnosticos(CT_ID_INCIDENCIA: string) {
    try {
      const response = await axios.get(
        `https://sgi-frontend-production.up.railway.app/api/diagnostico`, {
          params: {
            CT_ID_INCIDENCIA
          }
        }
      );
     
      console.log(response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return "No hay Diagnosticos";
        }
        throw new Error(error.response?.data?.error || "Error fetching assigned incidences");
      } else {
        throw new Error("An unknown error occurred during fetching assigned incidences");
      }
    }
  }
}