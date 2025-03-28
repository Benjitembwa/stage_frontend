import { useState, useMemo } from "react";
import {
  FiUser,
  FiUserCheck,
  FiUserX,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiDownload,
} from "react-icons/fi";

const UsersTab = ({
  darkMode,
  users,
  setUsers,
  facultyFilter,
  setFacultyFilter,
  promotionFilter,
  setPromotionFilter,
  statusFilter,
  setStatusFilter,
}) => {
  const [userFilter, setUserFilter] = useState("all");
  const [userSort, setUserSort] = useState("name-asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filtre les utilisateurs en fonction des sélections
  const filteredUsers = useMemo(() => {
    let result = [...users];

    // Filtre par rôle
    if (userFilter !== "all") {
      result = result.filter((user) => user.role === userFilter);
    }

    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          (user.matricule && user.matricule.toLowerCase().includes(query))
      );
    }

    // Filtre supplémentaire pour les étudiants
    if (userFilter === "student") {
      if (facultyFilter) {
        result = result.filter((user) => user.faculty === facultyFilter);
      }
      if (promotionFilter) {
        result = result.filter((user) => user.promotion === promotionFilter);
      }
    }

    // Filtre par statut
    if (statusFilter !== "all") {
      const isActive = statusFilter === "active";
      result = result.filter((user) => user.active === isActive);
    }

    // Trie les résultats
    switch (userSort) {
      case "name-asc":
        return result.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return result.sort((a, b) => b.name.localeCompare(a.name));
      case "date-asc":
        return result.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "date-desc":
        return result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "role":
        return result.sort((a, b) => a.role.localeCompare(b.role));
      default:
        return result;
    }
  }, [
    users,
    userFilter,
    searchQuery,
    userSort,
    facultyFilter,
    promotionFilter,
    statusFilter,
  ]);

  // Pagination des résultats
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  // Bascule le statut actif/inactif
  const handleToggleUserStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, active: !user.active } : user
      )
    );
  };

  return (
    <div
      className={`p-6 rounded-xl shadow ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h3 className="text-2xl font-semibold">Gestion des utilisateurs</h3>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div
            className={`relative flex-1 ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            } rounded-lg`}
          >
            <FiSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Rechercher utilisateur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              } focus:outline-none rounded-lg`}
            />
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center whitespace-nowrap">
            <FiUser className="mr-2" />
            Ajouter un utilisateur
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
          <label className="block text-sm font-medium mb-1">Rôle</label>
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className={`w-full p-2 rounded border ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            }`}
          >
            <option value="all">Tous les rôles</option>
            <option value="admin">Administrateur</option>
            <option value="teacher">Enseignant</option>
            <option value="student">Étudiant</option>
          </select>
        </div>

        {userFilter === "student" && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Faculté</label>
              <select
                value={facultyFilter}
                onChange={(e) => setFacultyFilter(e.target.value)}
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
                <option value="Économie">Économie</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Promotion
              </label>
              <select
                value={promotionFilter}
                onChange={(e) => setPromotionFilter(e.target.value)}
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
          </>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Statut</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`w-full p-2 rounded border ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            }`}
          >
            <option value="all">Tous statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full">
          <thead>
            <tr
              className={`${
                darkMode ? "border-gray-700" : "border-gray-200"
              } border-b`}
            >
              <th className="text-left py-3 px-4">Nom</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Rôle</th>
              {userFilter === "student" && (
                <>
                  <th className="text-left py-3 px-4">Faculté</th>
                  <th className="text-left py-3 px-4">Promotion</th>
                </>
              )}
              <th className="text-left py-3 px-4">Date création</th>
              <th className="text-left py-3 px-4">Statut</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                className={`${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } border-b hover:${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${
                        user.role === "admin"
                          ? "bg-purple-600"
                          : user.role === "teacher"
                          ? "bg-green-600"
                          : "bg-blue-600"
                      }`}
                    >
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.matricule || "N/A"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        : user.role === "teacher"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    }`}
                  >
                    {user.role === "admin"
                      ? "Administrateur"
                      : user.role === "teacher"
                      ? "Enseignant"
                      : "Étudiant"}
                  </span>
                </td>

                {userFilter === "student" && (
                  <>
                    <td className="py-3 px-4">
                      {user.faculty || "Non spécifié"}
                    </td>
                    <td className="py-3 px-4">
                      {user.promotion || "Non spécifié"}
                    </td>
                  </>
                )}

                <td className="py-3 px-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.active
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {user.active ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      className="p-2 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30"
                      title="Modifier"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleToggleUserStatus(user.id)}
                      className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        user.active
                          ? "text-yellow-600 hover:text-yellow-800 dark:hover:text-yellow-400"
                          : "text-green-600 hover:text-green-800 dark:hover:text-green-400"
                      }`}
                      title={user.active ? "Désactiver" : "Activer"}
                    >
                      {user.active ? <FiUserX /> : <FiUserCheck />}
                    </button>
                    <button
                      className="p-2 text-red-600 hover:text-red-800 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30"
                      title="Supprimer"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Affichage de {paginatedUsers.length} utilisateurs sur{" "}
          {filteredUsers.length}
        </p>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Précédent
          </button>
          {Array.from(
            { length: Math.ceil(filteredUsers.length / itemsPerPage) },
            (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : darkMode
                    ? "border border-gray-600"
                    : "border border-gray-300"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            )
          )}
          <button
            className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-50"
            disabled={
              currentPage === Math.ceil(filteredUsers.length / itemsPerPage)
            }
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTab;
