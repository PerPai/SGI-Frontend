import axios from "axios";
import {
  IncidenciaModel,
  IncidenciaTerminadaModel,
} from "../models/incidencia.model";
import { IncidenciaModelA } from "../models/incidenciaAsignacion.model";

export class AuthServiceIncidencia {
  static async crear(incidencia: IncidenciaModel) {
    try {
      const response = await axios.post(
        "https://sgi-frontend-production.up.railway.app/api/incidencia",
        incidencia
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
  

  static async asignar(incidencia: IncidenciaModelA, asignador: string) {
    try {
      const response = await axios.post(
        `https://sgi-frontend-production.up.railway.app/api/incidencia/asignar`,
        incidencia
      );
      AuthServiceIncidencia.CambioEstado(incidencia.CT_ID_INCIDENCIA, incidencia.CN_ID_ESTADO, asignador);
      return response.data;
    } catch (error: unknown) {
      console.log(error);
    }
  }
  static async bitacora( CT_CEDULA: string, CT_ID_INCIDENCIA: string, CN_AFECTACION: string, CB_REQUIERE_COMPRA: boolean, CN_TIEMPO_ESTIMADO: string, tipo: number) {
    try {
      const response = await axios.post(
        `https://sgi-frontend-production.up.railway.app/api/bitacora`,{
          CT_CEDULA, CT_ID_INCIDENCIA, CN_AFECTACION, CB_REQUIERE_COMPRA, CN_TIEMPO_ESTIMADO, tipo
        }
      );
      return response.data;
    } catch (error: unknown) {
      console.log(error);
    }
  }

  static async CambioEstado(CT_ID_INCIDENCIA: string, CN_ID_ESTADO: string, CT_CEDULA: string) {
    console.log(CT_ID_INCIDENCIA, CN_ID_ESTADO, CT_CEDULA);
    try {
      const response = await axios.post(
        `https://sgi-frontend-production.up.railway.app/api/incidencia/cambio?CT_ID_INCIDENCIA=${CT_ID_INCIDENCIA}&CN_ID_ESTADO=${CN_ID_ESTADO}&CT_CEDULA=${CT_CEDULA}`
      );
      return response.data;
    } catch (error: unknown) {
      console.log(error);
    }
  }

  static async getAsignado(CT_CEDULA: string) {
    try {
      const response = await axios.get(`https://sgi-frontend-production.up.railway.app/api/asignada`, {
        params: {
          CT_CEDULA,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "Error fetching assigned incidences"
        );
      } else {
        throw new Error(
          "An unknown error occurred during fetching assigned incidences"
        );
      }
    }
  }

  static async getDataSupervision(CT_ID_INCIDENCIA: string) {
    console.log("entró en getDataSupervision");
    try {
      const response = await axios.get(`https://sgi-frontend-production.up.railway.app/api/supervision/data?CT_ID_INCIDENCIA=${CT_ID_INCIDENCIA}`);
      console.log(response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "Error fetching assigned incidences"
        );
      } else {
        throw new Error(
          "An unknown error occurred during fetching assigned incidences"
        );
      }
    }
  }

  static async getTerminado() {
    try {
      const response = await axios.get(
        `https://sgi-frontend-production.up.railway.app/api/incidencias/terminadas`,
        {}
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "Error fetching assigned incidences"
        );
      } else {
        throw new Error(
          "An unknown error occurred during fetching assigned incidences"
        );
      }
    }
  }

  static async getIncidencias() {
    try {
      const response = await axios.get(
        `https://sgi-frontend-production.up.railway.app/api/incidencias`,
        {}
      );
      console.log(response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "Error fetching assigned incidences"
        );
      } else {
        throw new Error(
          "An unknown error occurred during fetching assigned incidences"
        );
      }
    }
  }
}
