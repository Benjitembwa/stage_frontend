import { FiDownload, FiEye, FiArchive, FiSearch } from "react-icons/fi";

const ArchivesTab = ({ darkMode }) => {
  // Données factices pour les archives (à remplacer par vos données réelles)
  const archivedDocuments = [
    {
      id: 1,
      reference: "ARC-2023-1001",
      title: "Diplôme Licence",
      type: "diplome",
      student: "Marie Durand",
      faculty: "Droit",
      promotion: "2023",
      date: "15/06/2023",
    },
    {
      id: 2,
      reference: "ARC-2023-1002",
      title: "Relevé S2",
      type: "releve",
      student: "Jean Martin",
      faculty: "Sciences",
      promotion: "2023",
      date: "10/06/2023",
    },
    {
      id: 3,
      reference: "ARC-2023-1003",
      title: "Attestation de scolarité",
      type: "attestation",
      student: "Sophie Lambert",
      faculty: "Médecine",
      promotion: "2022",
      date: "05/06/2023",
    },
    {
      id: 4,
      reference: "ARC-2023-1004",
      title: "Certificat de réussite",
      type: "certificat",
      student: "Pierre Leroy",
      faculty: "Économie",
      promotion: "2023",
      date: "01/06/2023",
    },
    {
      id: 5,
      reference: "ARC-2023-1005",
      title: "Diplôme Master",
      type: "diplome",
      student: "Lucie Petit",
      faculty: "Lettres",
      promotion: "2023",
      date: "30/05/2023",
    },
  ];

  return (
    <div
      className={`p-6 rounded-xl shadow ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h3 className="text-2xl font-semibold">Archives des documents</h3>

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

          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center gap-2">
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
            <option value="diplome">Diplôme</option>
            <option value="releve">Relevé de notes</option>
            <option value="attestation">Attestation</option>
            <option value="certificat">Certificat</option>
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
            <option value="droit">Droit</option>
            <option value="medecine">Médecine</option>
            <option value="sciences">Sciences</option>
            <option value="lettres">Lettres</option>
            <option value="economie">Économie</option>
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
            <option value="2020">2020</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Année académique
          </label>
          <select
            className={`w-full p-2 rounded border ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            }`}
          >
            <option value="">Toutes années</option>
            <option value="2022-2023">2022-2023</option>
            <option value="2021-2022">2021-2022</option>
            <option value="2020-2021">2020-2021</option>
          </select>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div
          className={`p-4 rounded-lg ${
            darkMode ? "bg-gray-700" : "bg-blue-50"
          } border border-blue-100 dark:border-blue-900`}
        >
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Documents archivés
          </p>
          <p className="text-2xl font-bold">1,842</p>
        </div>
        <div
          className={`p-4 rounded-lg ${
            darkMode ? "bg-gray-700" : "bg-green-50"
          } border border-green-100 dark:border-green-900`}
        >
          <p className="text-sm text-green-600 dark:text-green-400">Diplômes</p>
          <p className="text-2xl font-bold">672</p>
        </div>
        <div
          className={`p-4 rounded-lg ${
            darkMode ? "bg-gray-700" : "bg-purple-50"
          } border border-purple-100 dark:border-purple-900`}
        >
          <p className="text-sm text-purple-600 dark:text-purple-400">
            Relevés
          </p>
          <p className="text-2xl font-bold">892</p>
        </div>
        <div
          className={`p-4 rounded-lg ${
            darkMode ? "bg-gray-700" : "bg-yellow-50"
          } border border-yellow-100 dark:border-yellow-900`}
        >
          <p className="text-sm text-yellow-600 dark:text-yellow-400">Autres</p>
          <p className="text-2xl font-bold">278</p>
        </div>
      </div>

      {/* Tableau des archives */}
      <div className="overflow-x-auto mb-6">
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
              <th className="text-left py-3 px-4">Étudiant</th>
              <th className="text-left py-3 px-4">Faculté</th>
              <th className="text-left py-3 px-4">Promotion</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {archivedDocuments.map((doc) => (
              <tr
                key={doc.id}
                className={`${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } border-b`}
              >
                <td className="py-3 px-4">{doc.reference}</td>
                <td className="py-3 px-4">{doc.title}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      doc.type === "diplome"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : doc.type === "releve"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : doc.type === "attestation"
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}
                  >
                    {doc.type === "diplome"
                      ? "Diplôme"
                      : doc.type === "releve"
                      ? "Relevé"
                      : doc.type === "attestation"
                      ? "Attestation"
                      : "Certificat"}
                  </span>
                </td>
                <td className="py-3 px-4">{doc.student}</td>
                <td className="py-3 px-4">{doc.faculty}</td>
                <td className="py-3 px-4">{doc.promotion}</td>
                <td className="py-3 px-4">{doc.date}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      className="p-1 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
                      title="Voir"
                    >
                      <FiEye />
                    </button>
                    <button
                      className="p-1 text-green-600 hover:text-green-800 dark:hover:text-green-400"
                      title="Télécharger"
                    >
                      <FiDownload />
                    </button>
                    <button
                      className="p-1 text-gray-600 hover:text-gray-800 dark:hover:text-gray-400"
                      title="Archiver"
                    >
                      <FiArchive />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination et export */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Affichage de 1 à 5 sur 1,842 documents
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
            {[2, 3, 4].map((page) => (
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
  );
};

export default ArchivesTab;
