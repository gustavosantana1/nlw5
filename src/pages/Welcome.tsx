import React from "react";
import {
    Text, 
    View,
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    SafeAreaView,
    Dimensions
} from 'react-native';
import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';
import fonts from '../styles/fonts';

export function Welcome (){

    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('UserIdentification');
    }
    return(
        <SafeAreaView style={style.container}>
            <View style={style.wrapper}>
                <Text style={style.title}>
                    Gerencie {'\n'} 
                    suas plantas de {'\n'}
                    forma fácil
                </Text>
            
                    <Image 
                        source={wateringImg} style={style.image} 
                        resizeMode='contain'
                    />
                
                <Text style={style.subtitle}>
                    Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar sempre que precisar
                </Text>
                <TouchableOpacity 
                    style={style.button} 
                    activeOpacity={0.7} 
                    onPress={handleStart}>
                    
                    <Feather name="chevron-right" style={style.buttonIcon}/>
                
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper:{
        flex: 1,
        alignItems:'center',
        justifyContent:'space-around',
        paddingHorizontal:20
    },
    title:{
        fontSize: 28,
        fontWeight:'bold',
        textAlign: 'center',
        color:colors.heading,
        marginTop:38,
        fontFamily: fonts.heading,
        lineHeight:34

    },
    subtitle:{
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal:20,
        color:colors.heading,
        fontFamily: fonts.text,
    },
    button:{
        backgroundColor: colors.green,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:16,
        marginBottom:10, 
        height:56,
        width:56
    },
    buttonIcon:{
        color:colors.white,
        fontSize:32
    },
    image:{
        
        height:Dimensions.get('window').width*0.7
    },
    
})