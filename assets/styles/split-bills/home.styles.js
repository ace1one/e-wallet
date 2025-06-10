import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 0,
    backgroundColor: '#3C2F2F',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius:20,
    height:220
  },

  tabContainer:{
    padding:20,
    marginTop:50
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 0,
    paddingVertical: 12,
  },

  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerLogo: {
    width: 75,
    height: 75,
    tintColor: '#F5F5F5',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: '#F5F5F5',
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  groupAddButton: {
    backgroundColor: '#8B593E',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  groupAddButtonText: {
    fontWeight:"600",
    fontSize:16,
    color: '#F5F5F5',
    marginLeft:10
  },
  billBalanceCard: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  usernameText: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 20,
  },

  balanceCardContainer:{
    flexDirection:"row",
    justifyContent: "space-between",
  },
  balanceOwedContainer:{
    flexDirection: "row",
    alignItems: "center",
    gap:5
  },
  balanceOwed:{
    

  },

  balanceStatLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  balanceStatAmount: {
    fontSize: 18,
    fontWeight: "600",
  },

  statDivider: {
    borderRightWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: 10,
    // height: '70%',
  },

  groupListContainer:{
    //  flex: 1,
     borderColor:COLORS.neutralGray,
     borderWidth:1,
     padding:10,
     marginVertical:10,
     borderRadius:8,
     flexDirection:'row'
  },
  groupListItem: {
      // flex: 1,
     flexDirection: "row",
    // padding: 15,
      alignItems: "center",
      justifyContent:'space-around'
    // flex: 1,
    // padding: 20,
    // borderWidth:1,
    // borderColor:'gray'

  },

  groupIconContainer:{
    width: 55,
    height: 55,
    borderRadius: 30, // makes it a circle
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, // spacing between icon and text
  },
  groupIcon:{
    color: COLORS.white
  },
  groupTitle:{
    fontSize:20,
    fontWeight:'700',
    color: COLORS.textLight
  },
  groupLastTransaction:{
    // flexDirection:'row',
    // flex:1,
    color:COLORS.subtitle,
    flexShrink:1,
    flexWrap: 'wrap'
  },
  transactionContainer:{
    flex:1,
    flexShrink:1
  }
});
