import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors.js";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
    color: COLORS.text,
  },
  backButton: {
    padding: 5,
  },
  card: {
    backgroundColor: COLORS.card,
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },  
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 4,
     marginTop: 10,
    backgroundColor: COLORS.white,
  },
  inputIcon: {
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  inputLabel: {
    // marginBottom: 6,
    color: COLORS.mediumGray,
    fontSize: 14,
    fontWeight: '500',
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical:10
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryButtonText: {
    color: COLORS.text,
    fontSize: 14,
    marginLeft: 6,
  },
  categoryButtonTextActive: {
    color: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    // marginTop: 20,
    marginBottom: 10,

  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
  },


  // dropdown
  dropDownContainer:{
    marginTop:5,
    marginBottom:18
  },
  dropdown: {
    height: 50,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical:10
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#888',
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
  selectedStyle: {
    borderRadius: 12,
    backgroundColor: '#f1f1f1',
    padding: 5,
    margin: 2,
  },

})