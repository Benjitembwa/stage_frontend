import { useState } from "react";
import {
  FiHome,
  FiFile,
  FiClock,
  FiArchive,
  FiPieChart,
  FiUser,
  FiUsers,
} from "react-icons/fi";
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
  BarElement,
} from "chart.js";

// Enregistrement des composants ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

import Sidebar from "../components/Sidebar";
import DashboardTab from "../components/DashboardTab";
import DocumentsTab from "../components/DocumentsTab";
import RequestsTab from "../components/RequestsTab";
import ArchivesTab from "../components/ArchivesTab";
import StatsTab from "../components/StatsTab";
import UsersTab from "../components/UsersTab";

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [documentRequests, setDocumentRequests] = useState([
    {
      id: 1,
      student: "Jean Dupont",
      type: "Relevé de notes",
      date: "2023-05-15",
      status: "pending",
    },
    {
      id: 2,
      student: "Marie Martin",
      type: "Attestation de scolarité",
      date: "2023-05-14",
      status: "pending",
    },
    {
      id: 3,
      student: "Pierre Lambert",
      type: "Diplôme",
      date: "2023-05-13",
      status: "approved",
    },
  ]);
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: "Relevé semestre 1",
      type: "Relevé",
      recipient: "Jean Dupont",
      date: "2023-05-10",
    },
    {
      id: 2,
      title: "Attestation de scolarité",
      type: "Attestation",
      recipient: "Marie Martin",
      date: "2023-05-09",
    },
    {
      id: 3,
      title: "Diplôme Licence",
      type: "Diplôme",
      recipient: "Pierre Lambert",
      date: "2023-05-08",
    },
  ]);

  const handleRequestAction = (id, action) => {
    setDocumentRequests((requests) =>
      requests.map((request) =>
        request.id === id ? { ...request, status: action } : request
      )
    );
  };

  const navItems = [
    { icon: <FiHome />, label: "Tableau de bord", id: "dashboard" },
    { icon: <FiFile />, label: "Gestion documents", id: "documents" },
    { icon: <FiClock />, label: "Demandes en attente", id: "requests" },
    { icon: <FiArchive />, label: "Archives", id: "archives" },
    { icon: <FiPieChart />, label: "Statistiques", id: "stats" },
    {
      icon: <FiUsers />,
      label: "Gestion des utilisateurs",
      id: "users",
    },
  ];

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Admin Principal",
      email: "admin@univ.edu",
      role: "admin",
      matricule: "ADM001",
      createdAt: "2023-01-15",
      active: true,
    },
    {
      id: 2,
      name: "Prof. Dupont",
      email: "p.dupont@univ.edu",
      role: "teacher",
      matricule: "ENS202",
      createdAt: "2023-02-20",
      active: true,
    },
    {
      id: 3,
      name: "Étudiant Martin",
      email: "e.martin@univ.edu",
      role: "student",
      matricule: "ETU17543",
      createdAt: "2023-03-10",
      active: true,
    },
    // ... autres utilisateurs initiaux
  ]);

  const [facultyFilter, setFacultyFilter] = useState("");
  const [promotionFilter, setPromotionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Sidebar */}

      <Sidebar
        navItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-sm p-4 flex items-center flex-row-reverse justify-between`}
        >
          <div className="flex  items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <FiUser />
              </div>
              {sidebarOpen && <span>Admin</span>}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === "dashboard" && (
            <DashboardTab
              darkMode={darkMode}
              documentRequests={documentRequests}
            />
          )}

          {activeTab === "documents" && (
            <DocumentsTab
              darkMode={darkMode}
              documents={documents}
              setDocuments={setDocuments}
            />
          )}

          {activeTab === "requests" && (
            <RequestsTab
              darkMode={darkMode}
              documentRequests={documentRequests}
              handleRequestAction={handleRequestAction}
            />
          )}

          {activeTab === "archives" && <ArchivesTab darkMode={darkMode} />}

          {activeTab === "stats" && <StatsTab darkMode={darkMode} />}

          {activeTab === "users" && (
            <UsersTab
              darkMode={darkMode}
              users={users}
              setUsers={setUsers}
              facultyFilter={facultyFilter}
              setFacultyFilter={setFacultyFilter}
              promotionFilter={promotionFilter}
              setPromotionFilter={setPromotionFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
