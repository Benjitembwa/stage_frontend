import { useEffect, useState } from "react";
import {
  FiFileText,
  FiClock,
  FiDownload,
  FiUser,
  FiMail,
  FiCheck,
  FiX,
  FiSearch,
  FiFilter,
  FiBell,
  FiEye,
} from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import { MdBlock } from "react-icons/md"; // Pour une icône "🚫"

import { AnimatePresence, motion } from "framer-motion";
import {
  creerAttente,
  fetchDocumentsByProprietaire,
  fetchTypesDocuments,
  getAttentesParUtilisateur,
} from "../api/apiService";
import mobile from "../assets/mobile.png";
import { pdf } from "@react-pdf/renderer";

import MissionOrderPreview from "../components/MissionOrderPreview";
import LetterStagePreview from "../components/LetterStagePreview";
import MissionOrderTemplate from "../components/MissionOrderTemplate";
import LetterStageTemplate from "../components/LetterStageTemplate";
import Modal from "../components/Modal";

const DocumentRequestSystem = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [requests, setRequests] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [documents, setDocuments] = useState([]);

  const [previewDocument, setPreviewDocument] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [newRequest, setNewRequest] = useState({
    destinataire: "",
    typeDocument: "",
    objet: "",
    proprietaire: "",
    lieuMission: "",
    dateDebut: "",
    dateFin: "",
    motifMission: "",
  });

  useEffect(() => {
    const loadTypes = async () => {
      try {
        const data = await fetchTypesDocuments();
        setTypes(data);
      } catch (error) {
        // Gestion de l'erreur si nécessaire
      } finally {
        setLoading(false);
      }
    };

    loadTypes();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({ ...newRequest, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsTemp = {};
    const selectedType = types.find((t) => t._id === newRequest.typeDocument);

    // validations simples
    if (!newRequest.destinataire)
      errorsTemp.destinataire = "Destinataire requis";
    if (!newRequest.typeDocument) errorsTemp.typeDocument = "Type requis";
    if (!newRequest.objet) errorsTemp.objet = "Objet requis";

    // Validations spécifiques pour les ordres de mission
    if (selectedType?.nom === "Ordre de mission") {
      if (!newRequest.lieuMission)
        errorsTemp.lieuMission = "Lieu de mission requis";
      if (!newRequest.dateDebut) errorsTemp.dateDebut = "Date de début requise";
      if (!newRequest.dateFin) errorsTemp.dateFin = "Date de fin requise";
      if (!newRequest.motifMission)
        errorsTemp.motifMission = "Motif de mission requis";

      // Validation que la date de fin est après la date de début
      if (
        newRequest.dateDebut &&
        newRequest.dateFin &&
        new Date(newRequest.dateFin) < new Date(newRequest.dateDebut)
      ) {
        errorsTemp.dateFin =
          "La date de fin doit être postérieure à la date de début";
      }
    }

    if (Object.keys(errorsTemp).length > 0) {
      setErrors(errorsTemp);
      return;
    }

    try {
      const data = {
        ...newRequest,
        proprietaire: utilisateur.id,
        proprietaireModel: utilisateur.role,
        // On inclut les champs spécifiques même s'ils sont vides
        // (le backend peut les ignorer si nécessaire)
        detailsSpecifiques:
          selectedType?.nom === "Ordre de mission"
            ? {
                lieuMission: newRequest.lieuMission,
                dateDebut: newRequest.dateDebut,
                dateFin: newRequest.dateFin,
                motifMission: newRequest.motifMission,
              }
            : null,
      };

      const response = await creerAttente(data);
      console.log("Demande enregistrée :", response);
      setLoading(true);

      // Reset formulaire
      setNewRequest({
        destinataire: "",
        typeDocument: "",
        objet: "",
        proprietaire: "",
        lieuMission: "",
        dateDebut: "",
        dateFin: "",
        motifMission: "",
      });
      setErrors({});

      // Notification de succès
      setNotification({
        type: "success",
        message: "Demande créée avec succès",
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      setNotification({
        type: "error",
        message: "Erreur lors de la création de la demande",
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("utilisateur");

    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUtilisateur(parsedUser);
      } catch (err) {
        console.error("Erreur de parsing JSON :", err);
      }
    } else {
      console.warn("Aucun utilisateur trouvé dans le localStorage");
      // navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchAttentes = async () => {
      try {
        const utilisateurString = localStorage.getItem("utilisateur");
        if (utilisateurString) {
          const utilisateur = JSON.parse(utilisateurString);
          if (utilisateur?.id) {
            const data = await getAttentesParUtilisateur(utilisateur.id);
            setRequests(data);
            console.log(data);
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement des demandes :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttentes();
  }, [loading]);

  useEffect(() => {
    const loadDocs = async () => {
      try {
        const utilisateurString = localStorage.getItem("utilisateur");
        if (utilisateurString) {
          const utilisateur = JSON.parse(utilisateurString);
          if (utilisateur?.id) {
            const data = await fetchDocumentsByProprietaire(utilisateur.id);
            setDocuments(data);
            console.log(data);
          }
        }
      } catch (err) {
        console.error("Erreur lors du chargement des documents", err);
      } finally {
        setLoading(false);
      }
    };

    loadDocs();
  }, [loading]);

  // Filter requests
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.destinataire.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.proprietaire.nom
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request._id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || request.status === filterStatus;
    const matchesType =
      filterType === "all" || request.typeDocument.nom === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const filteredRequests2 = documents.filter((request) => {
    const matchesSearch =
      request.destinataire.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.proprietaire.nom
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request._id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || request.status === filterStatus;
    const matchesType =
      filterType === "all" || request.typeDocument.nom === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handlePreview = (doc) => {
    if (
      doc.typeDocument?.nom === "Lettre de stage" ||
      doc.typeDocument?.nom === "Ordre de mission"
    ) {
      setPreviewDocument(doc);
      setIsPreviewOpen(true);
    } else {
      alert(
        "Prévisualisation disponible uniquement pour les lettres de stage et ordres de mission"
      );
    }
  };

  const handleDownload = async (doc) => {
    try {
      if (doc.typeDocument?.nom === "Lettre de stage") {
        const pdfBlob = await pdf(
          <LetterStageTemplate documentData={doc} />
        ).toBlob();
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Lettre_Stage_${doc.proprietaire?.nom || ""}_${
          doc.codeUnique || ""
        }.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else if (doc.typeDocument?.nom === "Ordre de mission") {
        const pdfBlob = await pdf(
          <MissionOrderTemplate documentData={doc} />
        ).toBlob();
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Ordre_Mission_${doc.proprietaire?.nom || ""}_${
          doc.codeUnique || ""
        }.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        alert(
          "Téléchargement spécifique disponible uniquement pour les lettres de stage et ordres de mission"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la génération du PDF", error);
      alert("Une erreur est survenue lors du téléchargement");
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Header (inchangé) */}
      <header
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-sm p-4 flex items-center justify-between`}
      >
        <div className="flex items-center">
          <div className="block">
            <img src={mobile} alt="logo" className="h-8 w-auto mr-2" />
          </div>

          <span className="text-xl font-semibold text-gray-800 dark:text-white hidden md:block">
            Fac des Sciences
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <FiUser />
            </div>
            {utilisateur && (
              <span className="hidden md:inline">{utilisateur.nom}</span>
            )}{" "}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-6 space-y-6">
        {/* Notification (inchangé) */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-blue-50"
              } border border-blue-200 dark:border-blue-900`}
            >
              <div className="flex items-center">
                <FiCheck className="text-blue-600 dark:text-blue-400 mr-2" />
                <span>{notification.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Document Request Form - MODIFIÉ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`p-6 rounded-xl shadow ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-xl font-semibold mb-6">
            Demander un document académique
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Destinataire
                </label>
                <input
                  type="text"
                  name="destinataire"
                  value={newRequest.destinataire}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded border ${
                    errors.destinataire
                      ? "border-red-500"
                      : darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                />
                {errors.destinataire && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.destinataire}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Type de document*
                </label>
                <select
                  name="typeDocument"
                  value={newRequest.typeDocument}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded border ${
                    errors.typeDocument
                      ? "border-red-500"
                      : darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <option value="">Sélectionnez un type de document...</option>
                  {types.map((type) => (
                    <option key={type._id} value={type._id}>
                      {type.nom}
                    </option>
                  ))}
                </select>
                {errors.typeDocument && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.typeDocument}
                  </p>
                )}
              </div>

              {/* Champs supplémentaires pour Ordre de mission */}
              {newRequest.typeDocument &&
                types.find((t) => t._id === newRequest.typeDocument)?.nom ===
                  "Ordre de mission" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Lieu de la mission*
                      </label>
                      <input
                        type="text"
                        name="lieuMission"
                        value={newRequest.lieuMission || ""}
                        onChange={handleInputChange}
                        className={`w-full p-2 rounded border ${
                          errors.lieuMission
                            ? "border-red-500"
                            : darkMode
                            ? "bg-gray-700 border-gray-600"
                            : "bg-white border-gray-300"
                        }`}
                      />
                      {errors.lieuMission && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lieuMission}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Date de début*
                        </label>
                        <input
                          type="date"
                          name="dateDebut"
                          value={newRequest.dateDebut || ""}
                          onChange={handleInputChange}
                          className={`w-full p-2 rounded border ${
                            errors.dateDebut
                              ? "border-red-500"
                              : darkMode
                              ? "bg-gray-700 border-gray-600"
                              : "bg-white border-gray-300"
                          }`}
                        />
                        {errors.dateDebut && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.dateDebut}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Date de fin*
                        </label>
                        <input
                          type="date"
                          name="dateFin"
                          value={newRequest.dateFin || ""}
                          onChange={handleInputChange}
                          className={`w-full p-2 rounded border ${
                            errors.dateFin
                              ? "border-red-500"
                              : darkMode
                              ? "bg-gray-700 border-gray-600"
                              : "bg-white border-gray-300"
                          }`}
                        />
                        {errors.dateFin && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.dateFin}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Motif de la mission*
                      </label>
                      <textarea
                        name="motifMission"
                        value={newRequest.motifMission || ""}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full p-2 rounded border ${
                          errors.motifMission
                            ? "border-red-500"
                            : darkMode
                            ? "bg-gray-700 border-gray-600"
                            : "bg-white border-gray-300"
                        }`}
                      ></textarea>
                      {errors.motifMission && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.motifMission}
                        </p>
                      )}
                    </div>
                  </>
                )}

              <div>
                <label className="block text-sm font-medium mb-1">
                  Objet de la demande*
                </label>
                <textarea
                  name="objet"
                  value={newRequest.objet}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full p-2 rounded border ${
                    errors.objet
                      ? "border-red-500"
                      : darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                ></textarea>
                {errors.objet && (
                  <p className="text-red-500 text-xs mt-1">{errors.objet}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setNewRequest({
                    destinataire: "",
                    typeDocument: "",
                    objet: "",
                    proprietaire: "",
                    lieuMission: "",
                    dateDebut: "",
                    dateFin: "",
                    motifMission: "",
                  });
                  setErrors({});
                }}
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Soumettre la demande
              </button>
            </div>
          </form>
        </motion.div>

        {/* Request Tracking - MODIFIÉ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`p-6 rounded-xl shadow ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-xl font-semibold mb-4">
            Vos demandes de documents
          </h3>

          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  placeholder="Rechercher des demandes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>
              <div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`w-full p-2 rounded border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="En attente">En attente</option>
                  <option value="Approuvé">Approuvé</option>
                  <option value="Rejeté">Rejeté</option>
                </select>
              </div>
              <div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className={`w-full p-2 rounded border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <option value="all">Tous les types</option>
                  {types.map((type) => (
                    <option key={type._id} value={type.nom}>
                      {type.nom}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr
                  className={`${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } border-b`}
                >
                  <th className="text-left py-3 px-4">Object</th>
                  <th className="text-left py-3 px-4">Type document</th>
                  <th className="text-left py-3 px-4">Demandeur</th>
                  <th className="text-left py-3 px-4">Statut</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr
                    key={request._id}
                    className={`${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    } border-b`}
                  >
                    <td className="py-3 px-4">{request.objet}</td>
                    <td className="py-3 px-4">{request.typeDocument?.nom}</td>
                    <td className="py-3 px-4">
                      {request.proprietaire?.prenom} {request.proprietaire?.nom}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs 
                ${
                  request.status === "Rejeté"
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2 items-center">
                        {request.status === "En attente" && (
                          <FaRegClock className="text-yellow-500" />
                        )}
                        {request.status === "Rejeté" && (
                          <MdBlock className="text-red-600" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredRequests2.map((request) => (
                  <tr
                    key={request._id}
                    className={`${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    } border-b`}
                  >
                    <td className="py-3 px-4">{request.objet}</td>
                    <td className="py-3 px-4">{request.typeDocument?.nom}</td>
                    <td className="py-3 px-4">
                      {request.proprietaire?.prenom} {request.proprietaire?.nom}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {request.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handlePreview(request)}
                          className="p-1 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
                        >
                          <FiEye />
                        </button>
                        <button
                          className="p-1.5 text-green-600 hover:text-green-800 dark:hover:text-green-400 rounded-full hover:bg-green-50 dark:hover:bg-green-900/50"
                          title="Télécharger"
                          onClick={() => handleDownload(request)}
                        >
                          <FiDownload />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRequests.length === 0 && filteredRequests2.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucune demande trouvée correspondant à vos critères
            </div>
          )}
        </motion.div>
      </main>

      {isPreviewOpen && (
        <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
          {previewDocument?.typeDocument?.nom === "Lettre de stage" ? (
            <LetterStagePreview
              documentData={previewDocument}
              onClose={() => setIsPreviewOpen(false)}
              darkMode={darkMode}
            />
          ) : previewDocument?.typeDocument?.nom === "Ordre de mission" ? (
            <MissionOrderPreview
              documentData={previewDocument}
              onClose={() => setIsPreviewOpen(false)}
              darkMode={darkMode}
            />
          ) : null}
        </Modal>
      )}
    </div>
  );
};

export default DocumentRequestSystem;
