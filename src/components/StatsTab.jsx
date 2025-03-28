import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { FiDownload } from "react-icons/fi";

const StatsTab = ({ darkMode }) => {
  // Données pour les graphiques
  const documentsByTypeData = {
    labels: ["Relevés", "Attestations", "Diplômes", "Certificats", "Autres"],
    datasets: [
      {
        data: [425, 380, 215, 120, 85],
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#8b5cf6",
          "#f59e0b",
          "#ef4444",
        ],
        borderWidth: 0,
      },
    ],
  };

  const documentsByFacultyData = {
    labels: ["Droit", "Médecine", "Sciences", "Lettres", "Économie"],
    datasets: [
      {
        label: "Documents",
        data: [120, 180, 240, 90, 60],
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
      },
    ],
  };

  const statusDistributionData = {
    labels: ["Approuvées", "Rejetées", "En attente"],
    datasets: [
      {
        data: [65, 15, 20],
        backgroundColor: ["#10b981", "#ef4444", "#f59e0b"],
        borderWidth: 0,
      },
    ],
  };

  const programDistributionData = {
    labels: ["Licence", "Master", "Doctorat"],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: ["#3b82f6", "#10b981", "#8b5cf6"],
        borderWidth: 0,
      },
    ],
  };

  const evolutionData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Relevés",
        data: [45, 60, 55, 70, 65, 80],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
      },
      {
        label: "Attestations",
        data: [30, 40, 35, 50, 45, 60],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.3,
      },
      {
        label: "Diplômes",
        data: [15, 20, 25, 30, 35, 40],
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div
        className={`p-6 rounded-xl shadow ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h3 className="text-2xl font-semibold">
            Statistiques des documents académiques
          </h3>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center gap-2">
              <FiDownload />
              <span>Exporter le rapport</span>
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
              <option value="">Tous types</option>
              <option value="releve">Relevé de notes</option>
              <option value="attestation">Attestation de scolarité</option>
              <option value="diplome">Diplôme</option>
              <option value="certificat">Certificat</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Faculté/Département
            </label>
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
            <label className="block text-sm font-medium mb-1">Programme</label>
            <select
              className={`w-full p-2 rounded border ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
            >
              <option value="">Tous programmes</option>
              <option value="licence">Licence</option>
              <option value="master">Master</option>
              <option value="doctorat">Doctorat</option>
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

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-blue-50"
            } border border-blue-100 dark:border-blue-900`}
          >
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Documents générés
            </p>
            <p className="text-2xl font-bold">1,254</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              +12% vs période précédente
            </p>
          </div>
          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-green-50"
            } border border-green-100 dark:border-green-900`}
          >
            <p className="text-sm text-green-600 dark:text-green-400">
              Demandes traitées
            </p>
            <p className="text-2xl font-bold">1,150</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Taux de complétion: 92%
            </p>
          </div>
          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-purple-50"
            } border border-purple-100 dark:border-purple-900`}
          >
            <p className="text-sm text-purple-600 dark:text-purple-400">
              Moyenne journalière
            </p>
            <p className="text-2xl font-bold">24</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Pic à 56 documents
            </p>
          </div>
          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-yellow-50"
            } border border-yellow-100 dark:border-yellow-900`}
          >
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              Délai moyen
            </p>
            <p className="text-2xl font-bold">1.2j</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              90% en moins de 2 jours
            </p>
          </div>
        </div>

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div
            className={`p-4 rounded-lg border ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium">
                Évolution des documents par type
              </h4>
              <select
                className={`text-sm p-1 rounded ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <option>Par mois</option>
                <option>Par semaine</option>
                <option>Par jour</option>
              </select>
            </div>
            <div className="h-80">
              <Bar
                data={evolutionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: "top" },
                    tooltip: { mode: "index", intersect: false },
                  },
                  scales: {
                    y: { beginAtZero: true },
                  },
                }}
              />
            </div>
          </div>

          <div
            className={`p-4 rounded-lg border ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium">Répartition par faculté</h4>
              <select
                className={`text-sm p-1 rounded ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <option>Par type</option>
                <option>Par programme</option>
              </select>
            </div>
            <div className="h-80">
              <Bar
                data={documentsByFacultyData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: { mode: "index" },
                  },
                  scales: {
                    y: { beginAtZero: true },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Statistiques détaillées */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className={`p-4 rounded-lg border ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h4 className="text-lg font-medium mb-4">Top 5 des documents</h4>
            <div className="space-y-3">
              {documentsByTypeData.labels.map((label, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{label}</span>
                    <span className="font-medium">
                      {documentsByTypeData.datasets[0].data[i]}
                    </span>
                  </div>
                  <div
                    className={`h-2 rounded-full ${
                      darkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${
                          (documentsByTypeData.datasets[0].data[i] / 1254) * 100
                        }%`,
                        backgroundColor:
                          documentsByTypeData.datasets[0].backgroundColor[i],
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`p-4 rounded-lg border ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h4 className="text-lg font-medium mb-4">
              Répartition par programme
            </h4>
            <div className="h-64">
              <Doughnut
                data={programDistributionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: "right" },
                  },
                }}
              />
            </div>
          </div>

          <div
            className={`p-4 rounded-lg border ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h4 className="text-lg font-medium mb-4">Statut des demandes</h4>
            <div className="h-64">
              <Pie
                data={statusDistributionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: "right" },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return `${context.label}: ${context.raw}%`;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Tableau des données */}
        <div
          className={`p-4 rounded-lg border ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <h4 className="text-lg font-medium mb-4">Détails par département</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr
                  className={`${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } border-b`}
                >
                  <th className="text-left py-3 px-4">Département</th>
                  <th className="text-left py-3 px-4">Relevés</th>
                  <th className="text-left py-3 px-4">Attestations</th>
                  <th className="text-left py-3 px-4">Diplômes</th>
                  <th className="text-left py-3 px-4">Total</th>
                  <th className="text-left py-3 px-4">% du total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    department: "Droit",
                    releves: 120,
                    attestations: 80,
                    diplomes: 45,
                  },
                  {
                    department: "Médecine",
                    releves: 180,
                    attestations: 95,
                    diplomes: 60,
                  },
                  {
                    department: "Sciences",
                    releves: 240,
                    attestations: 120,
                    diplomes: 90,
                  },
                  {
                    department: "Lettres",
                    releves: 90,
                    attestations: 60,
                    diplomes: 30,
                  },
                  {
                    department: "Économie",
                    releves: 60,
                    attestations: 40,
                    diplomes: 15,
                  },
                ].map((row, i) => {
                  const total = row.releves + row.attestations + row.diplomes;
                  const percent = ((total / 1254) * 100).toFixed(1);

                  return (
                    <tr
                      key={i}
                      className={`${
                        darkMode ? "border-gray-700" : "border-gray-200"
                      } border-b`}
                    >
                      <td className="py-3 px-4">{row.department}</td>
                      <td className="py-3 px-4">{row.releves}</td>
                      <td className="py-3 px-4">{row.attestations}</td>
                      <td className="py-3 px-4">{row.diplomes}</td>
                      <td className="py-3 px-4 font-medium">{total}</td>
                      <td className="py-3 px-4">{percent}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsTab;
