// DocumentPDF.jsx
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "14%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  tableCol: {
    width: "14%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  headerText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  bodyText: {
    fontSize: 8,
  },
});

const DocumentPDF = ({ documents }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Liste des documents</Text>

      <View style={styles.table}>
        {/* En-têtes du tableau */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.headerText}>Code</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.headerText}>Destinataire</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.headerText}>Propriétaire</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.headerText}>Objet</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.headerText}>Type</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.headerText}>Mention</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.headerText}>Date</Text>
          </View>
        </View>

        {/* Lignes de données */}
        {documents.map((doc, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.bodyText}>{doc.codeUnique || "-"}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.bodyText}>{doc.destinataire || "-"}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.bodyText}>
                {doc.proprietaire?.prenom || ""} {doc.proprietaire?.nom || ""}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.bodyText}>{doc.objet || "-"}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.bodyText}>
                {doc.typeDocument?.nom || "-"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.bodyText}>
                {doc.proprietaire?.mention?.nom || "-"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.bodyText}>
                {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default DocumentPDF;
