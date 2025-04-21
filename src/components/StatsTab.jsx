import { useEffect, useState, useRef } from "react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { FiDownload } from "react-icons/fi";
import * as domtoimage from "dom-to-image-more";
import jsPDF from "jspdf";
import {
  fetchAdvancedStats,
  fetchDocumentsByMentionAndType,
} from "../api/apiService";

const StatsTab = ({ darkMode }) => {
  const [stats, setStats] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const exportRef = useRef();

  useEffect(() => {
    const getStats = async () => {
      try {
        const stats = await fetchDocumentsByMentionAndType();
        setData(stats);
        console.log(stats);
      } catch (error) {
        console.error("Erreur lors du chargement des stats", error);
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAdvancedStats();
        setStats(data);
      } catch (error) {
        console.error("Erreur de stats avancées:", error);
      }
    };
    getData();
  }, []);

  const exportToPDF = async () => {
    try {
      const element = exportRef.current;
      const date = new Date().toLocaleDateString();
      const fileName = `Rapport_Statistiques_${date}.pdf`;

      // Options pour dom-to-image-more
      const options = {
        quality: 1,
        bgcolor: darkMode ? "#1f2937" : "#ffffff", // Couleur de fond selon le mode
        style: {
          opacity: 1,
          transform: "scale(1.0)",
        },
      };

      // Générer l'image à partir du DOM
      const dataUrl = await domtoimage.toPng(element, options);

      // Créer le PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
      });

      // Ajouter le titre
      pdf.setFontSize(20);
      pdf.text("Statistiques des documents académiques", 105, 15, {
        align: "center",
      });
      pdf.setFontSize(12);
      pdf.text(`Généré le ${date}`, 105, 22, { align: "center" });

      // Ajouter l'image au PDF
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(
        dataUrl,
        "PNG",
        10,
        30,
        pdfWidth,
        pdfHeight,
        undefined,
        "FAST"
      );

      // Sauvegarder le PDF
      pdf.save(fileName);
    } catch (error) {
      console.error("Erreur lors de l'exportation en PDF:", error);
    }
  };

  if (!stats || loading) {
    return <div className="h-200"></div>;
  }

  const documentsByTypeData = {
    labels: stats.documentsByType.map((d) => d._id),
    datasets: [
      {
        data: stats.documentsByType.map((d) => d.count),
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

  const documentsByMentionData = {
    labels: stats.documentsByMention.map((d) => d._id),
    datasets: [
      {
        label: "Documents",
        data: stats.documentsByMention.map((d) => d.count),
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
        data: [
          stats.statusDistribution.Approuvées,
          stats.statusDistribution.Rejetées,
          stats.statusDistribution.EnAttente,
        ],
        backgroundColor: ["#10b981", "#ef4444", "#f59e0b"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="space-y-6" ref={exportRef}>
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
            <button
              onClick={exportToPDF}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center gap-2"
            >
              <FiDownload />
              <span>Exporter le rapport</span>
            </button>
          </div>
        </div>

        {/* Graphiques principaux */}

        {/* Statistiques détaillées */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className={`p-4 rounded-lg border ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium">Répartition par mention</h4>
            </div>
            <div className="h-80">
              <Bar
                data={documentsByMentionData}
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
                  <th className="text-left py-3 px-4">Mention</th>
                  <th className="text-left py-3 px-4">Relevés</th>
                  <th className="text-left py-3 px-4">Attestations</th>
                  <th className="text-left py-3 px-4">Lettres de stage</th>
                  <th className="text-left py-3 px-4">Ordres de mission</th>
                  <th className="text-left py-3 px-4">Total</th>
                  <th className="text-left py-3 px-4">% du total</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => {
                  const releves = row["releveDeNotes"] || 0;
                  const attestations = row["releveDeNotes"] || 0;
                  const lettres = row["lettreDeStage"] || 0;
                  const ordres = row["ordreDeMission"] || 0;

                  const total = releves + attestations + lettres + ordres;
                  const percent = ((total / 1254) * 100).toFixed(1); // remplace 1254 par une variable si nécessaire

                  return (
                    <tr
                      key={i}
                      className={`${
                        darkMode ? "border-gray-700" : "border-gray-200"
                      } border-b`}
                    >
                      <td className="py-3 px-4">{row.mention}</td>
                      <td className="py-3 px-4">{releves}</td>
                      <td className="py-3 px-4">{attestations}</td>
                      <td className="py-3 px-4">{lettres}</td>
                      <td className="py-3 px-4">{ordres}</td>
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
