
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/core';
import { 
    SafeAreaView, 
    StyleSheet, 
    View, 
    Text
} from 'react-native';
import {Button} from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';



export function Confirmation(){

    const navigation = useNavigation();
    function handleMoveOn(){
        navigation.navigate("PlantSelect");
    }

    return(
        <SafeAreaView style={style.container}>
            <View style={style.content}>
               
                <Text style={style.emoji}>
                    😍
                </Text>
                <Text style={style.title}>
                    Prontinho
                </Text>
                <Text style={style.subtitle}>
                   Agora vamos começar a cuidar das suas
                   plantinhas com muito cuidado.
                </Text>
                
                <View style={style.footer}>
                    <Button title="Começar" onPress={handleMoveOn}/>
                </View>
                
            </View>
          
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-around',

    },
    title:{
        fontSize:22,
        lineHeight:38,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop:15

    },
    subtitle:{
        fontFamily:fonts.text,
        textAlign: 'center',
        fontSize:17,
        paddingVertical:10,
        color:colors.heading
    },
    content:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        padding:30

    },
    emoji:{
        fontSize:78
    },
    footer:{
        width:'100%',
        paddingHorizontal:50,
        marginTop:20
    },
    
});