import { useEffect, useState } from "react";
import { FiDownload, FiTrash2, FiEye, FiSearch } from "react-icons/fi";
import {
  fetchTypesDocuments,
  getAllDocuments,
  getAllMentions,
} from "../api/apiService";
import { pdf } from "@react-pdf/renderer";
import LetterStageTemplate from "./LetterStageTemplate";
import LetterStagePreview from "./LetterStagePreview";
import MissionOrderTemplate from "./MissionOrderTemplate";
import MissionOrderPreview from "./MissionOrderPreview";
import Modal from "./Modal";
import DocumentPDF from "./react-pdf/renderer";

const DocumentsTab = ({ darkMode }) => {
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [types, setTypes] = useState([]);
  const [mentions, setMentions] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    mention: "",
    promotion: "",
  });
  const [previewDocument, setPreviewDocument] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState("csv");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docs = await getAllDocuments();
        setDocuments(docs);
        setFilteredDocuments(docs);
        setLoading(false);
      } catch (error) {
        console.error("Erreur de récupération des documents", error);
      }
    };

    fetchData();
  }, [loading]);

  useEffect(() => {
    const loadTypes = async () => {
      try {
        const data = await fetchTypesDocuments();
        setTypes(data);
      } catch (error) {
        console.error("Erreur de récupération des types de documents", error);
      } finally {
        setLoading(false);
      }
    };

    loadTypes();
  }, []);

  useEffect(() => {
    const fetchPromotionsAndMentions = async () => {
      try {
        const data2 = await getAllMentions();
        setMentions(data2);
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des promotions :",
          error.message
        );
      }
    };

    fetchPromotionsAndMentions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, documents]);

  const applyFilters = () => {
    let result = [...documents];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        (doc) =>
          doc.codeUnique?.toLowerCase().includes(searchTerm) ||
          doc.destinataire?.toLowerCase().includes(searchTerm) ||
          doc.objet?.toLowerCase().includes(searchTerm) ||
          (doc.proprietaire?.prenom + " " + doc.proprietaire?.nom)
            .toLowerCase()
            .includes(searchTerm)
      );
    }

    if (filters.type) {
      result = result.filter((doc) => doc.typeDocument?._id === filters.type);
    }

    if (filters.mention) {
      result = result.filter(
        (doc) => doc.proprietaire?.mention._id === filters.mention
      );
    }

    if (filters.promotion) {
      result = result.filter(
        (doc) => doc.proprietaire?.promotion._id === filters.promotion
      );
    }

    setFilteredDocuments(result);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: e.target.value,
    }));
  };

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

  const exportToCSV = () => {
    const headers = [
      "Code de référence",
      "Destinataire",
      "Propriétaire",
      "Objet",
      "Type",
      "Mention",
      "Date",
    ];

    const rows = filteredDocuments.map((doc) => [
      doc.codeUnique || "",
      doc.destinataire || "",
      `${doc.proprietaire?.prenom || ""} ${doc.proprietaire?.nom || ""}`,
      doc.objet || "",
      doc.typeDocument?.nom || "",
      doc.proprietaire?.mention?.nom || "",
      new Date(doc.createdAt).toLocaleDateString("fr-FR"),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((field) => `"${field}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `documents_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = async () => {
    try {
      const { pdf } = await import("@react-pdf/renderer");

      const blob = await pdf(
        <DocumentPDF documents={filteredDocuments} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `documents_${new Date().toISOString().slice(0, 10)}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors de la génération du PDF", error);
      alert("Une erreur est survenue lors de l'export PDF");
    }
  };

  const handleExport = () => {
    if (exportFormat === "csv") {
      exportToCSV();
    } else {
      exportToPDF();
    }
  };

  return (
    <div className="space-y-6">
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
                value={filters.search}
                onChange={handleSearchChange}
              />
            </div>

            <button
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center justify-center gap-2"
              onClick={handleExport}
            >
              <FiDownload />
              <span>Exporter</span>
            </button>
          </div>
        </div>

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
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="">Tous les types</option>
              {types.map((type) => (
                <option key={type._id} value={type._id}>
                  {type.nom}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mentions</label>
            <select
              className={`w-full p-2 rounded border ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
              name="mention"
              value={filters.mention}
              onChange={handleFilterChange}
            >
              <option value="">Toutes mentions</option>
              {mentions.map((mention) => (
                <option key={mention._id} value={mention._id}>
                  {mention.nom}
                </option>
              ))}
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
                <th className="text-left py-3 px-4">Code de référence</th>
                <th className="text-left py-3 px-4">Destinataire</th>
                <th className="text-left py-3 px-4">Propriétaire</th>
                <th className="text-left py-3 px-4">Objet</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Mention</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <tr
                    key={doc._id}
                    className={`${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    } border-b hover:bg-gray-50 dark:hover:bg-gray-700`}
                  >
                    <td className="py-3 px-4 font-medium">{doc.codeUnique}</td>
                    <td className="py-3 px-4">{doc.destinataire}</td>
                    <td className="py-3 px-4">
                      {doc.proprietaire?.prenom} {doc.proprietaire?.nom}
                    </td>
                    <td className="py-3 px-4">{doc.objet}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs 
                          ${
                            doc.typeDocument?.nom === "Relevé"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : doc.typeDocument?.nom === "Attestation"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : doc.typeDocument?.nom === "Diplôme"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                              : doc.typeDocument?.nom === "Lettre de stage"
                              ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                              : doc.typeDocument?.nom === "Ordre de mission"
                              ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                      >
                        {doc.typeDocument?.nom || "-"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {doc.proprietaire?.mention?.nom || "-"}
                    </td>

                    <td className="py-3 px-4">
                      {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          className="p-1.5 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/50"
                          title="Voir le document"
                          onClick={() => handlePreview(doc)}
                        >
                          <FiEye />
                        </button>

                        <button
                          className="p-1.5 text-green-600 hover:text-green-800 dark:hover:text-green-400 rounded-full hover:bg-green-50 dark:hover:bg-green-900/50"
                          title="Télécharger"
                          onClick={() => handleDownload(doc)}
                        >
                          <FiDownload />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="py-4 text-center text-gray-500">
                    Aucun document trouvé avec les critères de recherche
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Affichage de 1 à {filteredDocuments.length} sur{" "}
            {filteredDocuments.length} documents
          </p>

          <div className="flex items-center gap-4">
            <select
              className={`p-2 rounded border ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-300"
              } text-sm`}
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
            >
              <option value="csv">Exporter en CSV</option>
              <option value="pdf">Exporter en PDF</option>
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
              {filteredDocuments.length > 5 &&
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

export default DocumentsTab;
