import React, { useState } from "react";
import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { styles } from "./style";
import colors from "../../configs/colors";
import Initial1 from "./initial1";
import Initial2 from "./initial2";
export default function InitialPrimary({ navigation }: any) {

const [advance, setAdvance] = useState();

    return (
        <SafeAreaView style={styles.background}>
        <Initial1/>
{/* footer------------------------------- */}
            <View style={{ flex: 2, flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                {/*  */}



                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity style={styles.avanceButton} onPress={() => navigation.navigate("Initial2")}>
                        <Text style={{
                            color: colors.textSecondary,
                            textAlign: "center",
                            fontWeight: "bold",


                        }}>O</Text>
                    </TouchableOpacity>
                </View>

                {/*  */}


                <View style={styles.pointContainer}>
                    <View style={styles.point1} />
                    <View style={styles.point} />
                    <View style={styles.point} />
                </View>


                {/*  */}
                <View style={{ flex: 1,  justifyContent: "center", alignItems: "center"}}>
                    <TouchableOpacity style={styles.avanceButton} onPress={() => navigation.navigate("Login")}>
                        <Text style={{
                            color: colors.textSecondary,
                            textAlign: "center",
                            fontWeight: "bold",

                        }}>O</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </SafeAreaView>
    )


}