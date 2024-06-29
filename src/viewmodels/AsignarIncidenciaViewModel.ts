import { useRef, useState } from "react";
import { AuthServiceIncidencia } from "../services/AuthServices.Incidencia";
import { AuthServiceU } from "../services/AuthServices";
import { IncidenciaModel } from "../models/incidencia.model";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { IncidenciaAsignada, Usuarios, IncidenciaCompleta } from "./Types";
import { useIonToast } from "@ionic/react";
import { IncidenciaModelA } from "../models/incidenciaAsignacion.model";
import { DiagnosticosCreados } from "./Types";
import { AuthServiceDiagnostico } from "../services/AuthServices.Diagnostico";

export function useAsignarIncidenciaViewModel() {
  const [CT_ID_INCIDENCIA, setIncidencia] = useState("");
  const [CF_FECHA_HORA_REGISTRO, setFechaHora] = useState("");
  const [CT_DESCRIPCION_INCIDENCIA, setDescripcion] = useState("");
  const [CT_LUGAR, setLugar] = useState("");
  const [CN_PRIORIDAD, setPrioridad] = useState("");
  const [CN_RIESGO, setRiesgo] = useState("");
  const [CN_AFECTACION, setAfectacion] = useState("");
  const [CN_CATEGORIA, setCategoria] = useState("");
  const [CD_COSTO, setCosto] = useState("");
  const [CN_DURACION_GESTION, setDuracion] = useState("");
  const [CT_TITULO, setTitulo] = useState("");
  const [CT_TECNICO, setTecnico] = useState<Usuarios[]>([]);
  const [CT_TECNICOS, setTecnicos] = useState<Usuarios[]>([]);
  const [asignadas, setAsignadas] = useState<IncidenciaAsignada[]>([]);
  const [incidencias, setIncidencias] = useState<IncidenciaAsignada[]>([]);
  const history = useHistory();
  const [present] = useIonToast(); // Destructura la función `present` del hook `useIonToast`
  const [diagnosticos, setDiagnosticos] = useState<DiagnosticosCreados[]>([]);
  const [DataCompleteIncidencia, setDataCompleteIncidencia] = useState<
    IncidenciaCompleta[]
  >([]);
  const [selectedDiagnostico, setSelectedDiagnostico] =
    useState<DiagnosticosCreados | null>(null);
  const modal = useRef<HTMLIonModalElement>(null);

  const [DataCompleteUsuario, setDataCompleteUsuario] = useState<Usuarios[]>(
    []
  );

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

  const handleTecnicoChange = (e: CustomEvent) => {
    const selectedTecnico = e.detail.value as Usuarios;
    setTecnico((prevTecnicos) => [...prevTecnicos, selectedTecnico]);
  };

  const handlePrioridadChange = (e: CustomEvent) => {
    setPrioridad(e.detail.value as string);
  };

  const handleRiesgoChange = (e: CustomEvent) => {
    setRiesgo(e.detail.value as string);
  };
  const handleAfectacionChange = (e: CustomEvent) => {
    setAfectacion(e.detail.value as string);
  };
  const handleCategoriaChange = (e: CustomEvent) => {
    setCategoria(e.detail.value as string);
  };
  const handleCostoChange = (e: CustomEvent) => {
    setCosto(e.detail.value as string);
  };
  const handleDuracionChange = (e: CustomEvent) => {
    setDuracion(e.detail.value as string);
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

  const handleAsignacionChange = async (dato: any) => {
    console.log(dato);
    localStorage.setItem("CT_ID_INCIDENCIA_local", JSON.stringify(dato));

    history.push("/asignar/incidencia");
    window.location.reload();
  };

  const handleIncidenciaChange = (e: CustomEvent) => {
    setIncidencia(e.detail.value as string);
  };

  const handleOpenModal = (diagnostico: DiagnosticosCreados) => {
    setSelectedDiagnostico(diagnostico);
    modal.current?.present();
  };

  const handleCloseModal = () => {
    setSelectedDiagnostico(null);
    modal.current?.dismiss();
  };

  const presentToast = (position: "top" | "middle" | "bottom") => {
    present({
      message:
        'Se ha asignado la incidecnia la incidencia "' +
        CT_ID_INCIDENCIA +
        '" con exito',
      duration: 1500,
      position: position,
    });
    setCosto("");
    setDuracion("");
    setCategoria("");
    setAfectacion("");
    setRiesgo("");
    setPrioridad("");
  };

  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 1:
        return "Bajo";
      case 2:
        return "Medio";
      case 3:
        return "Alto";
      default:
        return "Desconocido";
    }
  };

  const getCategoriaLabel = (priority: number) => {
    switch (priority) {
      case 0:
        return "Reparacion";
      case 1:
        return "Intervencion por causa natural ";
      case 2:
        return "Atencion al mobiliario";
      default:
        return "Desconocido";
    }
  };

  const handleCambioEstado = async (estado: string) => {
    const CN_ESTADO = estado;
    const CT_ID_INCIDENCIA = JSON.parse(
      localStorage.getItem("CT_ID_INCIDENCIA_local") || "{}"
    );
    const CT_CEDULA = JSON.parse(
      localStorage.getItem("User") || "{}"
    );
    try {
      await AuthServiceIncidencia.CambioEstado(CT_ID_INCIDENCIA, CN_ESTADO, CT_CEDULA.CT_CEDULA);
      await presentToast("top");
      await handleVerDiagnosticosCreados();

        history.push("/supervision/incidencias")

      
    } catch (error) {
      console.error("Error creating incidencia:", error);
    }
  };

  const handleCrear = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission

    const incidencia = JSON.parse(
      localStorage.getItem("CT_ID_INCIDENCIA_local") || "{}"
    );

    const CT_ID_INCIDENCIA = incidencia.CT_ID_INCIDENCIA;
    const CN_ID_ESTADO = "1";

    if (!CN_AFECTACION || !CN_PRIORIDAD) {
      present({
        message: "Todos los campos son obligatorios",
        duration: 2000,
        position: "top",
        color: "danger",
      });
      return;
    } else {
      for (let i = 0; i < CT_TECNICO.length; i++) {
        let cedulaTecnico: any;
        cedulaTecnico = CT_TECNICO[i];
        const CT_CEDULA = cedulaTecnico;
        const Usurio = JSON.parse(
          localStorage.getItem("User") || "{}"
        );
        const CT_CEDULA_Asignador = Usurio.CT_CEDULA
    
        const correo =
          CT_TECNICO.length > 0 ? CT_TECNICO[0].CT_CORREO : "No Data";
        try {
          const IncidenciaAsi: IncidenciaModelA = {
            CT_CEDULA,
            CT_ID_INCIDENCIA,
            CN_PRIORIDAD,
            CN_RIESGO,
            CN_AFECTACION,
            CN_ID_ESTADO,
            CD_COSTO,
            CN_DURACION_GESTION,
            CN_CATEGORIA,
            correo,
          };
          console.log("DATOS: ", IncidenciaAsi);
          await AuthServiceIncidencia.asignar(IncidenciaAsi, CT_CEDULA_Asignador);
          await AuthServiceIncidencia.bitacora(CT_CEDULA,CT_ID_INCIDENCIA, CN_AFECTACION, false,"0",2);
          presentToast("top");
        } catch (error) {
          console.error("Error creating incidencia:", error);
        }
      }
    }
    history.push("/incidencias");
    window.location.reload();
  };

  const handleVerDiagnosticosCreados = async () => {
    try {
      const vacio: any = [];
      const CT_ID_INCIDENCIA = JSON.parse(
        localStorage.getItem("CT_ID_INCIDENCIA_local") || "{}"
      );
      console.log("CT_ID_INCIDENCIA: ", CT_ID_INCIDENCIA);

      const response = await AuthServiceDiagnostico.GetDiagnosticos(
        CT_ID_INCIDENCIA
      );
      console.log(response);

      if (
        !response ||
        response.length === 0 ||
        response[0].message === "No hay Diagnosticos"
      ) {
        setDiagnosticos(vacio);
      } else {
        setDiagnosticos(response); // Guardar los datos en el estado
      }
    } catch (error) {
      console.error("Error creando incidencia:", error);
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

  const handleVerDatosSupervision = async () => {
    try {
      const CT_ID_INCIDENCIA = JSON.parse(
        localStorage.getItem("CT_ID_INCIDENCIA_local") || "{}"
      );
      console.log("CT_ID_INCIDENCIA: ", CT_ID_INCIDENCIA);

      const response = await AuthServiceIncidencia.getDataSupervision(
        CT_ID_INCIDENCIA
      );

      // Asegúrate de que `response` tiene las propiedades que esperas
      if (
        response &&
        Array.isArray(response.incidencia) &&
        Array.isArray(response.usuarios)
      ) {
        const { incidencia, usuarios } = response;

        // Verifica si los arreglos no están vacíos
        if (incidencia.length > 0 && usuarios.length > 0) {
          console.log("Incidencia: ", incidencia[0]); // Accede al primer elemento del arreglo incidencia
          setDataCompleteIncidencia(incidencia); // Guardar los datos en el estado como un arreglo
          console.log(DataCompleteIncidencia);

          console.log("Usuarios: ", usuarios[0]); // Accede al primer elemento del arreglo usuarios
          setDataCompleteUsuario(usuarios); // Guardar los datos en el estado como un arreglo
        } else {
          console.error('Los arreglos "incidencia" o "usuarios" están vacíos.');
        }
      } else {
        console.error("La estructura de la respuesta no es la esperada.");
      }
    } catch (error) {
      console.error("Error creando incidencia:", error);
    }
  };

  const handleIncidencias = async () => {
    const vacio: any = [];
    try {
      const response = await AuthServiceIncidencia.getIncidencias();
      if (
        !response ||
        response.length === 0 ||
        response[0].message === "No hay Incidencias"
      ) {
        setIncidencias(vacio);
      } else {
        setIncidencias(response); // Guardar los datos en el estado
      }
    } catch (error) {
      console.error("Error creating incidencia:", error);
    }
  };
  const handleTecnicos = async () => {
    try {
      const response = await AuthServiceU.GetTecnicos();

      setTecnicos(response); // Guardar los datos en el estado
    } catch (error) {
      console.error("Error creating incidencia:", error);
    }
  };

  return {
    CT_ID_INCIDENCIA,
    CF_FECHA_HORA_REGISTRO,
    CT_DESCRIPCION_INCIDENCIA,
    CN_PRIORIDAD,
    CN_RIESGO,
    CN_AFECTACION,
    CN_CATEGORIA,
    CT_LUGAR,
    CD_COSTO,
    CN_DURACION_GESTION,
    images,
    imageUrls,
    getCategoriaLabel,
    CT_TITULO,
    incidencias,
    asignadas,
    diagnosticos,
    CT_TECNICOS,
    DataCompleteIncidencia,
    DataCompleteUsuario,
    selectedDiagnostico,
    modal,
    setFechaHora,
    handleOpenModal,
    handleCloseModal,
    handleCambioEstado,
    formatDateTime,
    getPriorityLabel,
    handleTituloChange,
    handleImageChange,
    handleIncidenciaChange,
    handleAsignacionChange,
    handleFechaHoraChange,
    handleIncidencias,
    handleTecnicos,
    handleTecnicoChange,
    handleDescripcionChange,
    handleVerDatosSupervision,
    handleLugarChange,
    handleAfectacionChange,
    handleVerDiagnosticosCreados,
    handleRiesgoChange,
    handlePrioridadChange,
    handleCategoriaChange,
    handleCostoChange,
    handleDuracionChange,
    handleCrear,
  };
}
