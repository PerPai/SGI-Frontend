import axios from "axios";

export class AuthServiceReportes {

  static async GetReportes() {
    try {
      const response = await axios.get(
        `https://sgi-production.up.railway.app/api/reportes`
      );
     
      console.log(response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return "No hay Reportes";
        }
        throw new Error(error.response?.data?.error || "Error fetching assigned incidences");
      } else {
        throw new Error("An unknown error occurred during fetching assigned incidences");
      }
    }
  }
}