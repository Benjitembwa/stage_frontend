import { FiCheck, FiX } from "react-icons/fi";

const RequestsTab = ({ darkMode, documentRequests, handleRequestAction }) => {
  return (
    <div
      className={`p-6 rounded-xl shadow ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h3 className="text-lg font-semibold mb-4">Demandes en attente</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr
              className={`${
                darkMode ? "border-gray-700" : "border-gray-200"
              } border-b`}
            >
              <th className="text-left py-3 px-4">Étudiant</th>
              <th className="text-left py-3 px-4">Type de document</th>
              <th className="text-left py-3 px-4">Date de demande</th>
              <th className="text-left py-3 px-4">Statut</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documentRequests
              .filter((r) => r.status === "pending")
              .map((request) => (
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
                    <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs">
                      En attente
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleRequestAction(request.id, "approved")
                        }
                        className="flex items-center px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded hover:bg-green-200 dark:hover:bg-green-800"
                      >
                        <FiCheck className="mr-1" /> Approuver
                      </button>
                      <button
                        onClick={() =>
                          handleRequestAction(request.id, "rejected")
                        }
                        className="flex items-center px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800"
                      >
                        <FiX className="mr-1" /> Rejeter
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestsTab;
