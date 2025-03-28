// UserModal.jsx
import { FiX, FiSave, FiUser, FiMail, FiLock, FiKey } from "react-icons/fi";
import { useState } from "react";

const UserModal = ({ user, onClose, onSave, darkMode }) => {
  const [formData, setFormData] = useState(
    user || {
      name: "",
      email: "",
      role: "student",
      matricule: "",
      password: "",
      active: true,
    }
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`rounded-xl shadow-lg w-full max-w-md ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold">
            {user ? "Modifier utilisateur" : "Ajouter un utilisateur"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FiX />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nom complet
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                  required
                />
              </div>
            </div>

            {/* ... autres champs du formulaire ... */}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg border ${
              darkMode
                ? "border-gray-600 hover:bg-gray-700"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            Annuler
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center"
          >
            <FiSave className="mr-2" />
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
