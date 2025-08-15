import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import ScheduleHeader from './header';
export default function Agenda(){
    return(
        <View style={{flex: 1}}>
         <ScheduleHeader/>
            <Text>Agenda</Text>
        </View>
    )
}