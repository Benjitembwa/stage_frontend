import { useEffect, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import {
  approuverAttente,
  getAttentesEnAttente,
  rejeterAttente,
} from "../api/apiService";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const RequestsTab = ({ darkMode }) => {
  // Données mock alignées avec votre modèle Attente
  const [documentRequests, setDocumentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttentes = async () => {
      try {
        const data = await getAttentesEnAttente();
        setDocumentRequests(data);
        console.log(data);
      } catch (err) {
        setError("Impossible de récupérer les attentes.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttentes();
  }, [loading]);

  const handleApprove = async (id) => {
    try {
      await approuverAttente(id);
      setLoading(true);
    } catch (err) {
      console.error("Erreur lors de l'approbation :", err);
    }
  };

  const handleReject = async (id) => {
    try {
      setLoading(true);
      await rejeterAttente(id);
    } catch (error) {
      console.error("Erreur lors du rejet :", error);
    }
  };

  return (
    <div
      className={`p-6 rounded-xl shadow ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h3 className="text-lg font-semibold mb-4">Demandes en attente</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr
              className={`${
                darkMode ? "border-gray-700" : "border-gray-200"
              } border-b`}
            >
              <th className="text-left py-3 px-4">Destinataire </th>
              <th className="text-left py-3 px-4">Type de document</th>
              <th className="text-left py-3 px-4">Propriétaire</th>
              <th className="text-left py-3 px-4">Date de demande</th>
              <th className="text-left py-3 px-4">Statut</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documentRequests
              .filter((r) => r.status === "En attente")
              .map((request) => (
                <tr
                  key={request._id}
                  className={`${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } border-b`}
                >
                  <td className="py-3 px-4">{request.destinataire}</td>
                  <td className="py-3 px-4">{request.typeDocument.nom}</td>
                  <td className="py-3 px-4">
                    {request.proprietaire.nom} {request.proprietaire?.prenom} (
                    {request.proprietaireModel})
                  </td>
                  <td className="py-3 px-4">
                    {format(new Date(request.createdAt), "dd/MM/yyyy", {
                      locale: fr,
                    })}
                  </td>{" "}
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs">
                      {request.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(request._id)}
                        className="flex items-center px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded hover:bg-green-200 dark:hover:bg-green-800"
                      >
                        <FiCheck className="mr-1" /> Approuver
                      </button>

                      <button
                        onClick={() => handleReject(request._id)}
                        className="flex items-center px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800"
                      >
                        <FiX className="mr-1" /> Rejeter
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestsTab;
