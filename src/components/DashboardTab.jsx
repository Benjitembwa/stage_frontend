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
import { useEffect, useState } from "react";
import {
  fetchLineChartData,
  fetchPieChartData,
  fetchStatistics,
} from "../api/apiService";

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

const DashboardTab = ({ darkMode }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);
  const [chartData2, setChartData2] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchStatistics();
        setStats(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Impossible de charger les statistiques");
      }
    };
    getStats();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPieChartData();
        setChartData(data);
        console.log(data);
      } catch (error) {
        console.error("Erreur chargement PieChart");
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchLineChartData();
        setChartData2(data);
      } catch (error) {
        console.error("Erreur chargement LineChart");
      }
    };
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          // Skeletons
          [...Array(3)].map((_, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow animate-pulse ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-8 w-1/3 bg-gray-300 dark:bg-gray-700 rounded mt-4"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-6">
                <div className="h-2 bg-gray-400 dark:bg-gray-600 rounded-full w-3/4"></div>
              </div>
            </div>
          ))
        ) : (
          // Real content
          <>
            <div
              className={`p-6 rounded-xl shadow ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3 className="text-gray-500 dark:text-gray-400">
                Documents émis
              </h3>
              <p className="text-3xl font-bold mt-2">{stats.documentsCount} </p>
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
              <p className="text-3xl font-bold mt-2">{stats.attenteCount} </p>
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
              <p className="text-3xl font-bold mt-2">{stats.totalUsers} </p>
              <div className="h-2 bg-green-100 dark:bg-green-900 rounded-full mt-4">
                <div className="h-2 bg-green-500 rounded-full w-2/3"></div>
              </div>
            </div>
          </>
        )}
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
          {!chartData2 ? (
            <div className="animate-pulse w-full h-[300px] bg-gray-200 rounded-md relative overflow-hidden">
              <div className="absolute w-full h-full grid grid-cols-12 items-end gap-1 p-4">
                {Array(12)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-300 rounded w-full"
                      style={{ height: `${50 + Math.random() * 100}px` }}
                    />
                  ))}
              </div>
            </div>
          ) : (
            <Line data={chartData2} options={{ responsive: true }} />
          )}{" "}
        </div>
        <div
          className={`p-6 rounded-xl shadow ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">
            Répartition des types de documents
          </h3>
          {!chartData ? (
            // Skeleton Loader
            <div className="animate-pulse flex flex-col items-center space-y-4">
              <div className="rounded-full bg-gray-200 h-40 w-40" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ) : (
            // Pie Chart
            <Pie data={chartData} options={{ responsive: true }} />
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
