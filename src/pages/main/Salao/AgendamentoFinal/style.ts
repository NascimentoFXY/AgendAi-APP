import { StyleSheet } from "react-native";
import colors, { font } from "../../../../configs/theme";
export const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        flex: 1
    },
    container2:{
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    TabBarButton: {
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 210
    },
    TabBarButton2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    Tab: {
        position: "absolute",
        width: "100%",
        padding: 30,
        backgroundColor: colors.background,
        height: 120,
        bottom: 0,
        borderTopColor: "#a5a5a555",
        borderTopWidth: 1
    },
    Tab2: {
        position: "absolute",
        width: "100%",
        padding: 30,
        height: 150,
        bottom: 0,
    },
    TopCurve: {
        position: "absolute",
        top: -50,
        width: "150%",
        height: 150,
        backgroundColor: "#D97171",
        borderBottomLeftRadius: "100%",
        borderBottomRightRadius: "100%",
    },
    contentContainer:{
        flex: 1,
        maxWidth: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    content:{
        
        padding: 20,
        margin: 20,
        borderWidth: 0.9,
        borderRadius: 20,
        borderColor: "#0000000f",
      
        gap: 20,
        backgroundColor: colors.background,
        justifyContent: 'space-around',
        boxShadow: "#0000",
        elevation: 2,
    },
    label:{
        fontSize: 16,
        fontFamily:font.poppins.semibold,
        textAlignVertical: "center",
        color: "#a0a0a0",
        width: "50%"
    },
    label2:{
        fontSize: 16,
        fontFamily:font.poppins.semibold,
        textAlignVertical: "center",
        width: "50%",
        justifyContent:"flex-end",
        textAlign: "right"
        
    },
    labelContainer:{
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    title:{
        fontSize: 26,
        fontWeight: "bold"
    },
    conclusionIconContainer:{
        width: 150,
        height: 150,
        backgroundColor: colors.primary,
        borderRadius: 150,
        justifyContent: "center",
        alignItems: "center"
    },
    cupomBtn:{
        backgroundColor: colors.primary,
        padding: 5,
        borderRadius: 5,
    },
    cupomBtnText:{
        color:colors.white
    }
})