import React, { useRef, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions,
    ScrollView,
    NativeScrollEvent,
    NativeSyntheticEvent
} from "react-native";
import { styles } from "./style";
import colors from "../../configs/colors";
import Initial1 from "./initial1";
import Initial2 from "./initial2";
import Initial3 from "./initial3";
const { width } = Dimensions.get("window");


export default function InitialPrimary({ navigation }: any) {

    const scrollRef = useRef<ScrollView>(null);

    const [currentPage, setCurrentPage] = useState(0)

    const pages = [<Initial1 />, <Initial2 />, <Initial3 />]

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        // função chamada quando o usuário arrasta o dedo na tela (scroll)
        const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        
        // calcula em qual pagina o usuário está com base na posição horizontal
        setCurrentPage(pageIndex);
        // atualiza a página atual (usado para mostrar bolinhas e travar o botão "avançar")
    };
    const scrollNextHandler = () => {

        if (currentPage < pages.length - 1 && scrollRef.current) {

            scrollRef.current.scrollTo({ x: width * (currentPage + 1), animated: true });
        }
        else {
            navigation.navigate("Fscreen")
        }
    }
    const scrollBackHandler = () => {

        if (currentPage > 0 && scrollRef.current) {

            scrollRef.current.scrollTo({ x: width * (currentPage - 1), animated: true });
        }
    }

    return (
        <SafeAreaView style={styles.background}>


            <ScrollView style={{ width, height: "100%", backgroundColor: "#f7ff" }}

                ref={scrollRef}                
                horizontal                    
                pagingEnabled
                scrollEnabled={true}
                onScroll={handleScroll}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={24} 
            >
                {pages.map((page, index) => (
                    <View key={index} style={[styles.background, { width }]}>
                        {page}
                    </View>

                ))}
            </ScrollView>



            {/*--------------------------------------- footer------------------------------- */}


            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: 150 }}>
                {/*  */}



                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                    <TouchableOpacity

                        disabled={currentPage == 0 ? true : false}
                        style={[styles.avanceButton, { opacity: currentPage === 0 ? 0.0 : 1 }]}
                        onPress={() => scrollBackHandler()}

                    >

                        <AntDesign name="arrowleft" size={24} color="white" />

                    </TouchableOpacity>
                </View>

                {/*  */}


                <View style={styles.pointContainer}>
                    {[0, 1, 2].map((i) => (
                        <View
                            key={i}
                            style={i == currentPage ? styles.pointCurrent : styles.point}
                        />
                    ))}
                </View>


                {/*  */}
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity style={styles.avanceButton} onPress={() => scrollNextHandler()}>
                        <AntDesign name="arrowright" size={24} color="white" />
                    </TouchableOpacity>
                </View>


            </View>
        </SafeAreaView>
    )


}