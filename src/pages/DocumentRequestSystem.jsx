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
import { AnimatePresence, motion } from "framer-motion";
import {
  creerAttente,
  fetchTypesDocuments,
  getAttentesParUtilisateur,
} from "../api/apiService";

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

  const [newRequest, setNewRequest] = useState({
    destinataire: "",
    typeDocument: "",
    objet: "",
    proprietaire: "", // Dans la réalité, ce serait automatiquement l'utilisateur connecté
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

    // validations simples
    if (!newRequest.destinataire)
      errorsTemp.destinataire = "Destinataire  requis";
    if (!newRequest.typeDocument) errorsTemp.typeDocument = "Type requis";
    if (!newRequest.objet) errorsTemp.objet = "Objet requis";

    if (Object.keys(errorsTemp).length > 0) {
      setErrors(errorsTemp);
      return;
    }

    try {
      const data = {
        ...newRequest,
        proprietaire: utilisateur.id,
        proprietaireModel: utilisateur.role,
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
      });
      setErrors({});
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
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
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          EduDoc Portal
        </h1>

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
                <span>{notification}</span>
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
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                          <FiEye />
                        </button>

                        {request.status === "Rejeté" && (
                          <button className="p-1 text-red-600 hover:text-red-800 dark:hover:text-red-400">
                            <FiX />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucune demande trouvée correspondant à vos critères
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default DocumentRequestSystem;
