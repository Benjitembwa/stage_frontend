import { useState, useMemo, useEffect } from "react";
import {
  FiUser,
  FiUserCheck,
  FiUserX,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiDownload,
} from "react-icons/fi";
import {
  getAllMentions,
  getAllPromotions,
  getTousUtilisateurs,
} from "../api/apiService";

const UsersTab = ({
  darkMode,
  facultyFilter,
  setFacultyFilter,
  promotionFilter,
  setPromotionFilter,
  statusFilter,
}) => {
  const [userFilter, setUserFilter] = useState("all");
  const [userSort, setUserSort] = useState("name-asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [promotions, setPromotions] = useState([]);
  const [mentions, setMentions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  // Filtre les utilisateurs en fonction des sélections
  const filteredUsers = useMemo(() => {
    let result = [...allUsers];

    // Filtre par rôle
    if (userFilter === "Admin") {
      result = result.filter((user) => user.role === "Admin");
    } else if (userFilter === "Etudiant" || userFilter === "Personnel") {
      result = result.filter((user) => user.type === userFilter);
    }

    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((user) => {
        const fullName =
          (user.prenom ? user.prenom + " " : "") +
          (user.postNom ? user.postNom + " " : "") +
          (user.nom || "");

        return (
          fullName.toLowerCase().includes(query) ||
          (user.email && user.email.toLowerCase().includes(query))
        );
      });
    }

    // Filtre supplémentaire pour les étudiants
    if (userFilter === "Etudiant") {
      if (facultyFilter) {
        result = result.filter((user) => user.mention?._id === facultyFilter);
      }

      if (promotionFilter) {
        result = result.filter(
          (user) => user.promotion?._id === promotionFilter
        );
      }
    }

    // Trie les résultats
    const getFullName = (user) =>
      `${user.prenom || ""} ${user.postNom || ""} ${user.nom || ""}`.trim();

    switch (userSort) {
      case "name-asc":
        return result.sort((a, b) =>
          getFullName(a).localeCompare(getFullName(b))
        );
      case "name-desc":
        return result.sort((a, b) =>
          getFullName(b).localeCompare(getFullName(a))
        );
      case "date-asc":
        return result.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "date-desc":
        return result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "role":
        return result.sort((a, b) =>
          (a.role || "").localeCompare(b.role || "")
        );
      default:
        return result;
    }
  }, [
    allUsers,
    userFilter,
    searchQuery,
    userSort,
    facultyFilter,
    promotionFilter,
  ]);

  // Pagination des résultats
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  useEffect(() => {
    const fetchPromotionsAndMentions = async () => {
      try {
        const data1 = await getAllPromotions();
        setPromotions(data1);
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
    const fetchUtilisateurs = async () => {
      try {
        const data = await getTousUtilisateurs();
        setAllUsers(data);
        setLoading(false);

        console.log(data);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs");
        setLoading(false);
      }
    };

    fetchUtilisateurs();
  }, []);

  // Trouver le nom de la mention/promotion à partir de l'ID
  const getMentionName = (id) => {
    const mention = mentions.find((m) => m._id === id);
    return mention ? mention.nom : "Non spécifié";
  };

  const getPromotionName = (id) => {
    const promo = promotions.find((p) => p._id === id);
    return promo ? promo.nom : "Non spécifié";
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
        </div>
      </div>

      {/* Filtres avancés */}
      <div
        className={`p-4 rounded-lg mb-6 ${
          darkMode ? "bg-gray-700" : "bg-gray-50"
        } grid grid-cols-1 md:grid-cols-4 gap-4`}
      >
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className={`w-full p-2 rounded border ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            }`}
          >
            <option value="all">Tous les types</option>
            <option value="Admin">Administrateur</option>
            <option value="Personnel">Personnel</option>
            <option value="Etudiant">Étudiant</option>
          </select>
        </div>

        {userFilter === "Etudiant" && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Mention</label>
              <select
                value={facultyFilter}
                onChange={(e) => setFacultyFilter(e.target.value)}
                className={`w-full p-2 rounded border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
              >
                <option value="">Toutes mentions</option>
                {mentions.map((mention) => (
                  <option key={mention._id} value={mention._id}>
                    {mention.nom}
                  </option>
                ))}
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
                {promotions.map((promo) => (
                  <option key={promo._id} value={promo._id}>
                    {promo.nom}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
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
              <th className="text-left py-3 px-4">Nom complet</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Rôle</th>
              <th className="text-left py-3 px-4">Type</th>
              {userFilter === "Etudiant" && (
                <>
                  <th className="text-left py-3 px-4">Mention</th>
                  <th className="text-left py-3 px-4">Promotion</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user._id}
                className={`${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } border-b hover:${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${
                        user.role === "Admin"
                          ? "bg-purple-600"
                          : user.type === "Personnel"
                          ? "bg-green-600"
                          : "bg-blue-600"
                      }`}
                    >
                      {user.nom.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">
                        {[user.prenom, user.nom].filter(Boolean).join(" ")}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.role === "Admin"
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        : user.type === "Personnel"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4">{user.type}</td>

                {userFilter === "Etudiant" && (
                  <>
                    <td className="py-3 px-4">
                      {getMentionName(user.mention?._id)}
                    </td>
                    <td className="py-3 px-4">
                      {getPromotionName(user.promotion?._id)}
                    </td>
                  </>
                )}
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
