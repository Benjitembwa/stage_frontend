import { useState, useEffect } from "react";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  getAllMentions,
  getAllPromotions,
  loginEtudiant,
  loginPersonnel,
  registerEtudiant,
  registerPersonnel,
} from "../api/apiService";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("Etudiant");
  const [promotions, setPromotions] = useState([]);
  const [mentions, setMentions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    postNom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    promotion: "",
    mention: "",
    fonction: "",
  });

  const [mounted, setMounted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setMounted(true);
    // Réinitialiser le formulaire quand le rôle change
    setFormData({
      nom: "",
      postNom: "",
      prenom: "",
      email: "",
      motDePasse: "",
      promotion: "",
      mention: "",
      fonction: "",
    });
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        let response;

        if (role === "Etudiant") {
          response = await loginEtudiant({
            email: formData.email,
            motDePasse: formData.motDePasse,
          });
        } else if (role === "Personnel") {
          response = await loginPersonnel({
            email: formData.email,
            motDePasse: formData.motDePasse,
          });
        }
        console.log(response);

        // ✅ Sauvegarder les infos dans localStorage
        localStorage.setItem(
          "utilisateur",
          JSON.stringify(response.utilisateur)
        );

        // ✅ Redirection
        navigate("/demande");
      } catch (error) {
        console.error("Erreur de connexion :", error.message);
        alert(error.message || "Échec de la connexion.");
      }
    } else {
      // Inscription comme avant
      const dataToSend =
        role === "Etudiant"
          ? {
              nom: formData.nom,
              postNom: formData.postNom,
              prenom: formData.prenom,
              email: formData.email,
              motDePasse: formData.motDePasse,
              mention: formData.mention,
              promotion: formData.promotion,
              role: "Etudiant",
            }
          : {
              nom: formData.nom,
              postNom: formData.postNom,
              prenom: formData.prenom,
              email: formData.email,
              motDePasse: formData.motDePasse,
              mention: formData.mention,
              role: "Personnel",
            };

      try {
        let data;
        if (role === "Etudiant") {
          data = await registerEtudiant(dataToSend);
          alert(data.message || "Inscription étudiante réussie");
        } else {
          data = await registerPersonnel(dataToSend);
          alert(data.message || "Inscription du personnel réussie");
        }
      } catch (error) {
        console.error("Erreur d’inscription :", error.message);
        alert(error.message || "Erreur lors de l'inscription.");
      }
    }
  };

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
                  <option value="Etudiant">Étudiant</option>
                  <option value="Personnel">Personnel</option>
                  {isLogin && (
                    <option value="administrator">Administrateur</option>
                  )}
                </select>

                {!isLogin && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative">
                        <FiUser className="absolute top-3.5 left-4 text-gray-400" />
                        <input
                          type="text"
                          name="nom"
                          placeholder="Nom"
                          required
                          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          value={formData.nom}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="relative">
                        <FiUser className="absolute top-3.5 left-4 text-gray-400" />
                        <input
                          type="text"
                          name="postNom"
                          placeholder="Postnom"
                          required
                          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          value={formData.postNom}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="relative">
                        <FiUser className="absolute top-3.5 left-4 text-gray-400" />
                        <input
                          type="text"
                          name="prenom"
                          placeholder="Prénom"
                          required
                          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          value={formData.prenom}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

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
                        name="motDePasse"
                        placeholder="Mot de passe"
                        required
                        className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        value={formData.motDePasse}
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

                    {role === "Etudiant" ? (
                      <>
                        <div className="relative">
                          <select
                            name="mention"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700"
                            value={formData.mention}
                            onChange={handleInputChange}
                          >
                            <option value="">Sélectionnez une mention</option>
                            {mentions.map((mention) => (
                              <option key={mention._id} value={mention._id}>
                                {mention.nom}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="relative">
                          <select
                            name="promotion"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700"
                            value={formData.promotion}
                            onChange={handleInputChange}
                          >
                            <option value="">Sélectionnez une promotion</option>
                            {promotions.map((promo) => (
                              <option key={promo._id} value={promo._id}>
                                {promo.nom}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    ) : (
                      <div className="relative">
                        <select
                          name="mention"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700"
                          value={formData.mention}
                          onChange={handleInputChange}
                        >
                          <option value="">Sélectionnez une mention</option>
                          {mentions.map((mention) => (
                            <option key={mention._id} value={mention._id}>
                              {mention.nom}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </>
                )}

                {isLogin && (
                  <>
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
                        name="motDePasse"
                        placeholder="Mot de passe"
                        required
                        className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        value={formData.motDePasse}
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
                  </>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 shadow-md"
              >
                {isLogin ? "Se connecter" : "Créer un compte"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
