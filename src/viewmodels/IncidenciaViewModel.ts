import { useState } from "react";
import { AuthServiceIncidencia } from "../services/AuthServices.Incidencia";
import { IncidenciaModel } from "../models/incidencia.model";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { IncidenciaAsignada } from "./Types";
import { useIonToast } from "@ionic/react";

export function useIncidenciaViewModel() {
  const [CT_ID_INCIDENCIA, setIncidencia] = useState("");
  const [CF_FECHA_HORA_REGISTRO, setFechaHora] = useState("");
  const [CT_DESCRIPCION_INCIDENCIA, setDescripcion] = useState("");
  const [CT_LUGAR, setLugar] = useState("");
  const [CT_TITULO, setTitulo] = useState("");
  const [asignadas, setAsignadas] = useState<IncidenciaAsignada[]>([]);
  const history = useHistory();
  const [present] = useIonToast(); // Destructura la función `present` del hook `useIonToast`

  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      const imageUrl = URL.createObjectURL(selectedImage);
      setImages([...images, selectedImage]);
      setImageUrls([...imageUrls, imageUrl]);
    }
  };

  const handleIncidenciaChange = (e: CustomEvent) => {
    setIncidencia(e.detail.value as string);
  };

  const handleFechaHoraChange = (e: CustomEvent) => {
    setFechaHora(e.detail.value as string);
  };
  const handleTituloChange = (e: CustomEvent) => {
    setTitulo(e.detail.value as string);
  };

  const handleDescripcionChange = (e: CustomEvent) => {
    setDescripcion(e.detail.value as string);
  };

  const handleLugarChange = (e: CustomEvent) => {
    setLugar(e.detail.value as string);
  };
  const handleDiagnosticoChange = async (dato: any) => {
    localStorage.setItem("CT_ID_INCIDENCIA_local", JSON.stringify(dato));
    history.push("/diagnostico");
    window.location.reload();
  };
  const handleTerminadosChange = async (dato: any) => {
    localStorage.setItem("CT_ID_INCIDENCIA_local", JSON.stringify(dato));
    history.push("/supervision");
    window.location.reload();
  };

  const presentToast = (position: "top" | "middle" | "bottom") => {
    present({
      message: 'Se ha creado la incidencia "' + CT_TITULO + '" con exito',
      duration: 1500,
      position: position,
    });
  };

  const handleVerAsignado = async () => {
    const vacio: any = [];
    try {
      const CT_CEDULA = JSON.parse(
        localStorage.getItem("User") || "{}"
      ).CT_CEDULA;
      console.log("CT_CEDULA: ", CT_CEDULA);
      const response = await AuthServiceIncidencia.getAsignado(CT_CEDULA);
      if (
        !response ||
        response.length === 0 ||
        response[0].message === "No hay Incidencias"
      ) {
        setAsignadas(vacio);
      } else {
        setAsignadas(response); // Guardar los datos en el estado
      }
    } catch (error) {
      console.error("Error creating incidencia:", error);
    }
  };

  const handleVerTerminado = async () => {
    const vacio: any = [];
    try {
      const response = await AuthServiceIncidencia.getTerminado();
      if (
        !response ||
        response.length === 0 ||
        response[0].message === "No hay Diagnosticos"
      ) {
        setAsignadas(vacio);
      } else {
        setAsignadas(response); // Guardar los datos en el estado
      }
    } catch (error) {
      console.error("Error creating incidencia:", error);
    }
  };

  const formatDateTime = (dateTimeStr: string | number | Date) => {
    const date = new Date(dateTimeStr);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return date.toLocaleString(undefined, options);
  };

  const handleCrear = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission
    const vacio: any = [];
    let formattedDate = "";
    if (CF_FECHA_HORA_REGISTRO !== "") {
      formattedDate = CF_FECHA_HORA_REGISTRO;
      console.log(formattedDate);
    } else {
      formattedDate = moment().format("YYYY-MM-DD HH:mm:ss");
      console.log(formattedDate);
    }
    if (!CT_TITULO || !CT_DESCRIPCION_INCIDENCIA || !CT_LUGAR) {
      present({
        message: "Todos los campos son obligatorios",
        duration: 2000,
        position: "top",
        color: "danger",
      });
      return;
    } else {
      try {
        const usuario = JSON.parse(localStorage.getItem("User") || "{}");
        const CT_CEDULA = usuario.CT_CEDULA;
        const incidencia: IncidenciaModel = {
          CT_ID_INCIDENCIA,
          CF_FECHA_HORA_REGISTRO: formattedDate,
          CT_TITULO,
          CT_DESCRIPCION_INCIDENCIA,
          CT_LUGAR,
          CT_CEDULA,
        };
        console.log("incidencia: ", incidencia);
        let response = await AuthServiceIncidencia.crear(incidencia);
        console.log(response);
        await AuthServiceIncidencia.bitacora(CT_CEDULA,response.message,"1",false,"0",1);
     
        await handleVerAsignado();
        setTitulo("");
        setDescripcion("");
        setLugar("");
        presentToast("top");
      } catch (error) {
        console.error("Error creating incidencia:", error);
      }
    }
  };

  return {
    CT_ID_INCIDENCIA,
    CF_FECHA_HORA_REGISTRO,
    CT_DESCRIPCION_INCIDENCIA,
    CT_LUGAR,
    images,
    imageUrls,
    CT_TITULO,
    setFechaHora,
    handleTituloChange,
    asignadas,
    handleImageChange,
    formatDateTime,
    handleVerAsignado,
    handleVerTerminado,
    handleIncidenciaChange,
    handleDiagnosticoChange,
    handleFechaHoraChange,
    handleDescripcionChange,
    handleTerminadosChange,
    handleLugarChange,
    handleCrear,
  };
}
