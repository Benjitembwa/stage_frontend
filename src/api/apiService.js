import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const registerEtudiant = async (etudiantData) => {
  try {
    const response = await axiosInstance.post(
      "etudiants/register",
      etudiantData
    );
    console.log(etudiantData);
    return response.data;
  } catch (error) {
    // Gestion centralisée de l’erreur
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

export const getAllPromotions = async () => {
  const response = await axiosInstance.get("/promotions");
  return response.data;
};

export const getAllMentions = async () => {
  try {
    const response = await axiosInstance.get("mentions");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

export const registerPersonnel = async (data) => {
  try {
    const response = await axiosInstance.post("personnels/register", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

export const fetchTypesDocuments = async () => {
  try {
    const response = await axiosInstance.get("types-documents");
    return response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des types de documents :", error);
    throw error;
  }
};

export const loginEtudiant = async (data) => {
  const response = await axiosInstance.post("/etudiants/login", data);
  return response.data;
};

export const loginPersonnel = async (credentials) => {
  const response = await axiosInstance.post("/personnels/login", credentials);
  return response.data;
};

export const creerAttente = async (data) => {
  try {
    const response = await axiosInstance.post("/attentes", data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la demande :", error);
    throw error;
  }
};

export const getAttentesParUtilisateur = async (userId) => {
  try {
    const response = await axiosInstance.get(`/attentes/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des demandes :", error);
    throw error;
  }
};

export const getTousUtilisateurs = async () => {
  try {
    const response = await axiosInstance.get(`/utilisateurs/tous`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    throw error;
  }
};

export const getAttentesEnAttente = async () => {
  try {
    const response = await axiosInstance.get(`attentes/enAttente`);
    return response.data; // Renvoie les attentes récupérées
  } catch (error) {
    console.error("Erreur lors de la récupération des attentes :", error);
    throw error;
  }
};

export const approuverAttente = async (id) => {
  const res = await axiosInstance.post(`/attentes/approuver/${id}`);
  return res.data;
};

export const rejeterAttente = async (id) => {
  const response = await axiosInstance.post(`/attentes/${id}/rejeter`);
  return response.data;
};

export const getAllDocuments = async () => {
  const response = await axiosInstance.get("/documents");
  return response.data;
};

export const loginAdmin = async (credentials) => {
  const response = await axiosInstance.post("/admin/login", credentials);
  return response.data;
};

export const fetchDocumentsByProprietaire = async (proprietaireId) => {
  const response = await axiosInstance.get(
    `/documents/proprietaire/${proprietaireId}`
  );
  return response.data;
};

export const fetchStatistics = async () => {
  try {
    const response = await axiosInstance.get(`/stats`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques :", error);
    throw error;
  }
};

export const fetchPieChartData = async () => {
  try {
    const response = await axiosInstance.get(`/stats/piechart`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données pie chart :",
      error
    );
    throw error;
  }
};

export const fetchLineChartData = async () => {
  try {
    const response = await axiosInstance.get(`/stats/linechart`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données line chart :",
      error
    );
    throw error;
  }
};

export const fetchAdvancedStats = async () => {
  const response = await axiosInstance.get("/stats/advanced-stats");
  return response.data;
};

export const fetchDocumentsByMentionAndType = async () => {
  try {
    const response = await axiosInstance.get(
      `/stats/documents-by-mention-and-type`
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors du fetch des stats:", error);
    throw error;
  }
};
