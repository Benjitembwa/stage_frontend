import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 30,
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textDecoration: "underline",
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  signature: {
    marginTop: 50,
    textAlign: "right",
  },
  signatureLine: {
    marginTop: 30,
    borderTop: "1px solid black",
    width: 200,
    marginLeft: "auto",
  },
});

const MissionOrderTemplate = ({ documentData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>ORDRE DE MISSION</Text>
          <Text>Université : Université de Kinshasa</Text>
          <Text>Faculté des Sciences</Text>
          <Text>Réf : {documentData.codeUnique || "ORD-20250420-001"}</Text>
          <Text>
            Date : {formatDate(documentData.createdAt) || "20 avril 2025"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>À :</Text>{" "}
            {documentData.proprietaire?.nom
              ? `Monsieur ${documentData.proprietaire.nom}`
              : "Monsieur Jean MUKENDI"}
          </Text>
          <Text>
            <Text style={styles.label}>Fonction :</Text>{" "}
            {documentData.proprietaire?.role || "Fonction non spécifiée"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Objet :</Text>
          <Text>
            {documentData.objet ||
              "Ordre de mission pour déplacement administratif"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            Par le présent document, le Département de{" "}
            {documentData.proprietaire?.mention.nom} mandate{" "}
            {documentData.proprietaire?.nom
              ? `Monsieur ${documentData.proprietaire.nom}`
              : ""}
            , en qualité de {"Membre du personnel "}, à effectuer une mission
            selon les modalités suivantes :
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Lieu de la mission :</Text>{" "}
            {documentData.lieuMission ||
              "Kinshasa – Ministère de l'Enseignement Supérieur"}
          </Text>
          <Text>
            <Text style={styles.label}>Date de début :</Text>{" "}
            {formatDate(documentData.dateDebut) || "21 avril 2025"}
          </Text>
          <Text>
            <Text style={styles.label}>Date de fin :</Text>{" "}
            {formatDate(documentData.dateFin) || "23 avril 2025"}
          </Text>
          <Text>
            <Text style={styles.label}>Motif de la mission :</Text>{" "}
            {documentData.motifMission ||
              "Participation à une réunion de coordination des projets numériques universitaires"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            Nous vous prions de bien vouloir accorder toute l'assistance
            nécessaire à l'accomplissement de cette mission.
          </Text>
        </View>

        <View style={styles.signature}>
          <Text>Fait à Kinshasa, le {formatDate(documentData.createdAt)}</Text>
          <View style={styles.signatureLine} />
          <Text>Signature de l'Autorité</Text>
          <Text>Chef de Département d'Informatique</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MissionOrderTemplate;
