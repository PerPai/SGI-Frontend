export interface IncidenciaModel {
    CT_ID_INCIDENCIA: string;
    CF_FECHA_HORA_REGISTRO: string;
    CT_TITULO: string;
    CT_DESCRIPCION_INCIDENCIA: string;
    CT_LUGAR: string;
    CT_CEDULA: string;
  }

  export interface IncidenciaTerminadaModel {
    CT_ID_INCIDENCIA: string;
    CN_ESTADO: string;
  }