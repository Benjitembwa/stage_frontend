import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardTab = ({ darkMode, documentRequests }) => {
  // Chart data
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Documents émis",
        data: [120, 190, 170, 220, 250, 180],
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const pieChartData = {
    labels: ["Relevés", "Attestations", "Diplômes", "Autres"],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className={`p-6 rounded-xl shadow ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-gray-500 dark:text-gray-400">Documents émis</h3>
          <p className="text-3xl font-bold mt-2">1,254</p>
          <div className="h-2 bg-blue-100 dark:bg-blue-900 rounded-full mt-4">
            <div className="h-2 bg-blue-500 rounded-full w-3/4"></div>
          </div>
        </div>
        <div
          className={`p-6 rounded-xl shadow ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-gray-500 dark:text-gray-400">
            Demandes en attente
          </h3>
          <p className="text-3xl font-bold mt-2">32</p>
          <div className="h-2 bg-yellow-100 dark:bg-yellow-900 rounded-full mt-4">
            <div className="h-2 bg-yellow-500 rounded-full w-1/2"></div>
          </div>
        </div>
        <div
          className={`p-6 rounded-xl shadow ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-gray-500 dark:text-gray-400">
            Utilisateurs actifs
          </h3>
          <p className="text-3xl font-bold mt-2">487</p>
          <div className="h-2 bg-green-100 dark:bg-green-900 rounded-full mt-4">
            <div className="h-2 bg-green-500 rounded-full w-2/3"></div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className={`p-6 rounded-xl shadow ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">
            Évolution des documents émis
          </h3>
          <Line data={lineChartData} options={{ responsive: true }} />
        </div>
        <div
          className={`p-6 rounded-xl shadow ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">
            Répartition des types de documents
          </h3>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Recent Activity */}
      <div
        className={`p-6 rounded-xl shadow ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr
                className={`${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } border-b`}
              >
                <th className="text-left py-3 px-4">Étudiant</th>
                <th className="text-left py-3 px-4">Document</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Statut</th>
              </tr>
            </thead>
            <tbody>
              {documentRequests.slice(0, 5).map((request) => (
                <tr
                  key={request.id}
                  className={`${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } border-b`}
                >
                  <td className="py-3 px-4">{request.student}</td>
                  <td className="py-3 px-4">{request.type}</td>
                  <td className="py-3 px-4">{request.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs 
                              ${
                                request.status === "approved"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : request.status === "rejected"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              }`}
                    >
                      {request.status === "approved"
                        ? "Approuvé"
                        : request.status === "rejected"
                        ? "Rejeté"
                        : "En attente"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
