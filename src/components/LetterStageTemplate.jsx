import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Enregistrer une police si nécessaire (optionnel)
Font.register({
  family: "Times-Roman",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/timesnewroman/v15/TimesNewRomanPSMT.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/timesnewroman/v15/TimesNewRomanPS-BoldMT.ttf",
      fontWeight: "bold",
    },
  ],
});

// Styles pour le PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Times-Roman",
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  university: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  faculty: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  mention: {
    fontSize: 11,
    marginBottom: 5,
  },
  contact: {
    fontSize: 10,
    marginBottom: 20,
  },
  ref: {
    fontSize: 10,
    textAlign: "right",
    marginBottom: 30,
  },
  objet: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 20,
  },
  destinataire: {
    fontSize: 12,
    marginBottom: 20,
  },
  corps: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "justify",
  },
  signature: {
    marginTop: 50,
    textAlign: "right",
    fontSize: 12,
  },
  signataire: {
    fontWeight: "bold",
    marginTop: 5,
  },
});

const LetterStageTemplate = ({ documentData }) => {
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.university}>UNIVERSITE DE KINSHASA</Text>
          <Text>Kinshasa, le {currentDate}</Text>
        </View>

        <View style={styles.faculty}>
          <Text>FACULTE DES SCIENCES ET TECHNOLOGIES</Text>
          <Text style={styles.mention}>
            Mention{" "}
            {documentData.proprietaire?.mention?.nom ||
              "Mathématiques, Statistique et Informatique"}
          </Text>
          <Text style={styles.contact}>denariement.mathinfo@unikin.ac.cd</Text>
          <Text style={styles.contact}>+243823689003</Text>
          <Text>Le Chef de la Mention</Text>
        </View>

        <View style={styles.ref}>
          <Text>
            N/Réf. : {documentData.codeUnique || "MMSI/CM/MMR/ /1/3/2025"}
          </Text>
        </View>

        <View style={styles.objet}>
          <Text>
            Objet : {documentData.objet || "Recommandation pour le Stage"}
          </Text>
        </View>

        <View style={styles.destinataire}>
          <Text>
            A{" "}
            {documentData.destinataire ||
              "Monsieur le Directeur des Ressources Humaines d'Equity BCDC"}
          </Text>
        </View>

        <View style={styles.corps}>
          <Text>
            Monsieur le Directeur,
            {"\n\n"}
            L'honneur m'échoit de venir par la présente auprès de votre
            responsabilité, vous recommander étudiant(e){" "}
            {documentData.proprietaire?.prenom} {documentData.proprietaire?.nom}
            , en {documentData.proprietaire?.mention?.nom} à la Faculté des
            Sciences et Technologies de l'Université de Kinshasa, qui dans le
            cadre de sa formation, désire effectuer le Stage au sein de vos
            installations.
            {"\n\n"}
            En vous remerciant anticipativement de l'attention que vous
            accorderez à ma requête, je vous prie de croire, Monsieur le
            Directeur, à l'expression de mes sentiments les meilleurs.
          </Text>
        </View>

        <View style={styles.signature}>
          <Text>LE CHEF DE LA MENTION</Text>
        </View>
      </Page>
    </Document>
  );
};

export default LetterStageTemplate;
