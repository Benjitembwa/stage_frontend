import React from "react";
import { FiDownload } from "react-icons/fi";
import LetterStageTemplate from "./LetterStageTemplate";
import { pdf } from "@react-pdf/renderer";

const LetterStagePreview = ({ documentData, onClose, darkMode }) => {
  const handleDownload = async () => {
    const pdfBlob = await pdf(
      <LetterStageTemplate documentData={documentData} />
    ).toBlob();
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Lettre_Stage_${documentData.proprietaire?.nom || ""}_${
      documentData.codeUnique || ""
    }.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`p-6 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h3 className="text-xl font-bold mb-4">
        Lettre de Stage - {documentData.codeUnique}
      </h3>

      <div
        className={`border ${
          darkMode ? "border-gray-600" : "border-gray-300"
        } p-4 mb-4`}
      >
        <div className="text-center mb-4">
          <p className="font-bold">UNIVERSITE DE KINSHASA</p>
          <p>Kinshasa, le {new Date().toLocaleDateString("fr-FR")}</p>
        </div>

        <div className="mb-4">
          <p className="font-bold">FACULTE DES SCIENCES ET TECHNOLOGIES</p>
          <p>
            Mention{" "}
            {documentData.proprietaire?.mention?.nom ||
              "Mathématiques, Statistique et Informatique"}
          </p>
          <p>denariement.mathinfo@unikin.ac.cd</p>
          <p>+243823689003</p>
          <p>Le Chef de la Mention</p>
        </div>

        <div className="text-right mb-6">
          <p>N/Réf. : {documentData.codeUnique || "MMSI/CM/MMR/ /1/3/2025"}</p>
        </div>

        <div className="mb-4">
          <p className="font-bold">
            Objet : {documentData.objet || "Recommandation pour le Stage"}
          </p>
        </div>

        <div className="mb-4">
          <p>
            A{" "}
            {documentData.destinataire ||
              "Monsieur le Directeur des Ressources Humaines d'Equity BCDC"}
          </p>
          <p>A KINSHASA/GOMBE.</p>
        </div>

        <div className="mb-6">
          <p>Monsieur le Directeur,</p>
          <p className="my-4">
            L'honneur m'échoit de venir par la présente auprès de votre
            responsabilité, vous recommander étudiant(e){" "}
            {documentData.proprietaire?.prenom || "Prénom"}{" "}
            {documentData.proprietaire?.nom || "Nom"}, en{" "}
            {documentData.proprietaire?.niveau || "troisième"} Licence{" "}
            {documentData.proprietaire?.mention?.nom || "Informatique"} à la
            Faculté des Sciences et Technologies de l'Université de Kinshasa,
            qui dans le cadre de sa formation, désire effectuer le Stage au sein
            de vos installations.
          </p>
          <p>
            En vous remerciant anticipativement de l'attention que vous
            accorderez à ma requête, je vous prie de croire, Monsieur le
            Directeur, à l'expression de mes sentiments les meilleurs.
          </p>
        </div>

        <div className="text-right mt-8">
          <p>LE CHEF DE LA MENTION</p>
          <p className="font-bold">
            {documentData.signataire || "MABELA MAKENGO Rostin"}
          </p>
          <p>Professeur Ordinaire</p>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={handleDownload}
          className={`${
            darkMode
              ? "bg-green-700 hover:bg-green-600"
              : "bg-green-600 hover:bg-green-700"
          } text-white py-2 px-4 rounded flex items-center gap-2`}
        >
          <FiDownload />
          <span>Télécharger en PDF</span>
        </button>
        <button
          onClick={onClose}
          className={`${
            darkMode
              ? "bg-gray-600 hover:bg-gray-500"
              : "bg-gray-500 hover:bg-gray-600"
          } text-white py-2 px-4 rounded`}
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default LetterStagePreview;
