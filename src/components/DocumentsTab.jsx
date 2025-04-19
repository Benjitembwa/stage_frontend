import { useEffect, useState } from "react";
import {
  FiDownload,
  FiEdit,
  FiTrash2,
  FiEye,
  FiFile,
  FiSearch,
} from "react-icons/fi";
import { getAllDocuments } from "../api/apiService";

const DocumentsTab = ({ darkMode, documents }) => {
  const deleteDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const [loading, setLoading] = useState(true);
  const [document, setDocument] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docs = await getAllDocuments();
        setDocument(docs);
        console.log(docs);
        setLoading(false);
      } catch (error) {
        console.error("Erreur de récupération des documents", error);
      }
    };

    fetchData();
  }, [loading]);

  return (
    <div className="space-y-6">
      {/* Documents Table */}
      <div
        className={`p-6 rounded-xl shadow ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h3 className="text-2xl font-semibold">Gestion des documents</h3>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div
              className={`relative ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              } rounded-lg p-2 flex-1 md:flex-none`}
            >
              <FiSearch className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Rechercher..."
                className={`pl-10 pr-4 py-1 w-full ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                } focus:outline-none`}
              />
            </div>

            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center justify-center gap-2">
              <FiDownload />
              <span>Exporter</span>
            </button>
          </div>
        </div>

        {/* Filtres avancés */}
        <div
          className={`p-4 rounded-lg mb-6 ${
            darkMode ? "bg-gray-700" : "bg-gray-50"
          } grid grid-cols-1 md:grid-cols-4 gap-4`}
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Type de document
            </label>
            <select
              className={`w-full p-2 rounded border ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
            >
              <option value="">Tous les types</option>
              <option value="Relevé">Relevé</option>
              <option value="Attestation">Attestation</option>
              <option value="Diplôme">Diplôme</option>
              <option value="Certificat">Certificat</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Faculté</label>
            <select
              className={`w-full p-2 rounded border ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
            >
              <option value="">Toutes facultés</option>
              <option value="Droit">Droit</option>
              <option value="Médecine">Médecine</option>
              <option value="Sciences">Sciences</option>
              <option value="Lettres">Lettres</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Promotion</label>
            <select
              className={`w-full p-2 rounded border ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
            >
              <option value="">Toutes promotions</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
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
                <th className="text-left py-3 px-4">Référence</th>
                <th className="text-left py-3 px-4">Titre</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Destinataire</th>
                <th className="text-left py-3 px-4">Faculté</th>
                <th className="text-left py-3 px-4">Promotion</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr
                  key={doc.id}
                  className={`${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } border-b hover:bg-gray-50 dark:hover:bg-gray-700`}
                >
                  <td className="py-3 px-4">
                    DOC-{doc.id.toString().padStart(4, "0")}
                  </td>
                  <td className="py-3 px-4 font-medium">{doc.title}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs 
                    ${
                      doc.type === "Relevé"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : doc.type === "Attestation"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : doc.type === "Diplôme"
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}
                    >
                      {doc.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">{doc.recipient}</td>
                  <td className="py-3 px-4">{doc.faculty || "-"}</td>
                  <td className="py-3 px-4">{doc.promotion || "-"}</td>
                  <td className="py-3 px-4">{doc.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        className="p-1.5 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/50"
                        title="Voir le document"
                      >
                        <FiEye />
                      </button>
                      <button
                        className="p-1.5 text-yellow-600 hover:text-yellow-800 dark:hover:text-yellow-400 rounded-full hover:bg-yellow-50 dark:hover:bg-yellow-900/50"
                        title="Modifier"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => deleteDocument(doc.id)}
                        className="p-1.5 text-red-600 hover:text-red-800 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/50"
                        title="Supprimer"
                      >
                        <FiTrash2 />
                      </button>
                      <button
                        className="p-1.5 text-green-600 hover:text-green-800 dark:hover:text-green-400 rounded-full hover:bg-green-50 dark:hover:bg-green-900/50"
                        title="Télécharger"
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

        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Affichage de 1 à {documents.length} sur {documents.length} documents
          </p>

          <div className="flex items-center gap-4">
            <select
              className={`p-2 rounded border ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-300"
              } text-sm`}
            >
              <option>Exporter en CSV</option>
              <option>Exporter en Excel</option>
              <option>Exporter en PDF</option>
            </select>

            <div className="flex space-x-2">
              <button
                className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-50"
                disabled
              >
                Précédent
              </button>
              <button className="px-3 py-1 rounded bg-blue-600 text-white">
                1
              </button>
              {documents.length > 5 &&
                [2, 3].map((page) => (
                  <button
                    key={page}
                    className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600"
                  >
                    {page}
                  </button>
                ))}
              <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600">
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsTab;
