import React from "react";
import { FiDownload } from "react-icons/fi";
import MissionOrderTemplate from "./MissionOrderTemplate";
import { pdf } from "@react-pdf/renderer";

const MissionOrderPreview = ({ documentData, onClose, darkMode }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleDownload = async () => {
    const pdfBlob = await pdf(
      <MissionOrderTemplate documentData={documentData} />
    ).toBlob();
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Ordre_Mission_${documentData.proprietaire?.nom || ""}_${
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
        Ordre de Mission - {documentData.codeUnique}
      </h3>

      <div
        className={`border ${
          darkMode ? "border-gray-600" : "border-gray-300"
        } p-4 mb-4`}
      >
        <div className="text-center mb-6">
          <h4 className="text-lg font-bold underline mb-2">ORDRE DE MISSION</h4>
          <p>Université : Université de Kinshasa</p>
          <p>Département : Département d'Informatique</p>
          <p>Réf : {documentData.codeUnique || "ORD-20250420-001"}</p>
          <p>Date : {formatDate(documentData.createdAt) || "20 avril 2025"}</p>
        </div>

        <div className="mb-4">
          <p>
            <span className="font-bold">À :</span>{" "}
            {documentData.proprietaire?.nom
              ? `Monsieur ${documentData.proprietaire.nom}`
              : "Monsieur Jean MUKENDI"}
          </p>
          <p>
            <span className="font-bold">Fonction :</span>{" "}
            {documentData.proprietaire?.role === "Personnel"
              ? "Assistant en Informatique"
              : documentData.proprietaire?.role || "Fonction non spécifiée"}
          </p>
        </div>

        <div className="mb-4">
          <p className="font-bold">
            Objet :{" "}
            {documentData.objet ||
              "Ordre de mission pour déplacement administratif"}
          </p>
        </div>

        <div className="mb-4">
          <p>
            Par le présent document, le Département d'Informatique mandate{" "}
            {documentData.proprietaire?.nom
              ? `Monsieur ${documentData.proprietaire.nom}`
              : "Monsieur Jean MUKENDI"}
            , en qualité de{" "}
            {documentData.proprietaire?.role === "Personnel"
              ? "Assistant en Informatique"
              : documentData.proprietaire?.role || "Membre du personnel"}
            , à effectuer une mission selon les modalités suivantes :
          </p>
        </div>

        <div className="mb-4 space-y-2">
          <p>
            <span className="font-bold">Lieu de la mission :</span>{" "}
            {documentData.lieuMission ||
              "Kinshasa – Ministère de l'Enseignement Supérieur"}
          </p>
          <p>
            <span className="font-bold">Date de début :</span>{" "}
            {formatDate(documentData.dateDebut) || "21 avril 2025"}
          </p>
          <p>
            <span className="font-bold">Date de fin :</span>{" "}
            {formatDate(documentData.dateFin) || "23 avril 2025"}
          </p>
          <p>
            <span className="font-bold">Motif de la mission :</span>{" "}
            {documentData.motifMission ||
              "Participation à une réunion de coordination des projets numériques universitaires"}
          </p>
        </div>

        <div className="mb-6">
          <p>
            Nous vous prions de bien vouloir accorder toute l'assistance
            nécessaire à l'accomplissement de cette mission.
          </p>
        </div>

        <div className="text-right mt-8">
          <p>
            Fait à Kinshasa, le{" "}
            {formatDate(documentData.createdAt) || "20 avril 2025"}
          </p>
          <div
            className={`border-t ${
              darkMode ? "border-gray-400" : "border-gray-600"
            } w-48 ml-auto my-2`}
          ></div>
          <p>Nom et Signature de l'Autorité</p>
          <p className="font-bold">Pr. Paul KABAMBA</p>
          <p>Chef de Département d'Informatique</p>
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

export default MissionOrderPreview;
