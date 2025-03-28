import { useState, useEffect } from "react";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, role });
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center transition-opacity duration-1000 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-full max-w-5xl mx-4 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 flex-col justify-center p-12 relative">
            <div className="text-white space-y-6 relative z-10">
              <h1 className="text-4xl font-bold font-poppins">
                Bienvenue sur notre Plateforme
              </h1>
              <p className="text-indigo-100 text-lg">
                Gérez vos documents académiques en toute simplicité et sécurité
              </p>
            </div>
            <div className="absolute inset-0 opacity-10 pattern-dots pattern-indigo-500 pattern-size-4"></div>
          </div>

          <div className="w-full lg:w-1/2 p-8 sm:p-12">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-800 font-poppins">
                {isLogin ? "Connexion à votre compte" : "Création de compte"}
              </h2>
              <p className="mt-2 text-gray-500">
                {isLogin
                  ? "Entrez vos identifiants pour accéder à votre espace"
                  : "Remplissez le formulaire pour créer votre compte"}
              </p>
            </div>

            <div className="flex justify-center gap-4 p-1 bg-gray-100 rounded-lg w-fit mx-auto mt-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-6 py-2 rounded-md transition-all ${
                  isLogin
                    ? "bg-white shadow-md text-indigo-600 font-medium"
                    : "text-gray-600"
                }`}
              >
                Connexion
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`px-6 py-2 rounded-md transition-all ${
                  !isLogin
                    ? "bg-white shadow-md text-indigo-600 font-medium"
                    : "text-gray-600"
                }`}
              >
                Inscription
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-5">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700"
                >
                  <option value="student">Étudiant</option>
                  <option value="teacher">Enseignant</option>
                  <option value="administrator">Administrateur</option>
                </select>

                {!isLogin && (
                  <div className="relative">
                    <FiUser className="absolute top-3.5 left-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Nom complet"
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                <div className="relative">
                  <FiMail className="absolute top-3.5 left-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Adresse email"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="relative">
                  <FiLock className="absolute top-3.5 left-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Mot de passe"
                    required
                    className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-3.5 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>

                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 flex-1 rounded-full ${
                            i < passwordStrength
                              ? "bg-indigo-500"
                              : "bg-gray-200"
                          }`}
                        ></div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      Solidité du mot de passe:{" "}
                      {["Faible", "Moyen", "Bon", "Fort"][
                        passwordStrength - 1
                      ] || "Très faible"}
                    </p>
                  </div>
                )}
              </div>

              {isLogin && (
                <div className="flex items-center justify-end">
                  <a
                    href="#"
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 shadow-md"
              >
                {isLogin ? "Se connecter" : "Créer un compte"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-500">
                {isLogin ? "Pas encore de compte ? " : "Déjà un compte ? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  {isLogin ? "S'inscrire" : "Se connecter"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
