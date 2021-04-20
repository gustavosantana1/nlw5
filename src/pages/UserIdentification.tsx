
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/core';
import { 
    SafeAreaView, 
    StyleSheet, 
    View, 
    Text, 
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import {Button} from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';



export function UserIdentification(){

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    const navigation = useNavigation();

    function handlerInputBlur(){
        setIsFocused(false);
        setIsFilled(!!name);
    }
    function handlerInputFocus(){
        setIsFocused(true);
    }
    function handlerInputChange(value: string){
        setIsFilled(!!value);
        setName(value);
    }

    function handleSubmit(){
        navigation.navigate('Confirmation');
    }

    return(
        <SafeAreaView style={style.container}>
            <KeyboardAvoidingView 
                style={style.container}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={style.content}>
                        <View style={style.form}>
                            <View style={style.header}>
                                <Text style={style.emoji}>
                                    {isFilled ? '😍' : '😀'}
                                </Text>
                                <Text style={style.title}>
                                    Como podemos {'\n'} chamar você ?
                                </Text>
                            </View>
                        
                            <TextInput
                                style={[
                                    style.input,
                                    (isFocused || isFilled) && {borderColor: colors.green}
                                ]}
                                placeholder="Digite seu nome"
                                onBlur={handlerInputBlur}
                                onFocus={handlerInputFocus}
                                onChangeText={handlerInputChange}
                            />
                            <View style={style.footer}>
                                <Button title="Confirmar" onPress={handleSubmit} />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        width: '100%',
        alignItems:'center',
        justifyContent:'space-around',

    },
    content:{
        flex:1,
        width:'100%'
    },
    form:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:54,
        alignItems:'center',    
    },
    header:{
        alignItems:'center',   
    },
    emoji:{
        fontSize:44
    },
    input:{
        borderBottomWidth:1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize:18,
        marginTop:50,
        padding:10,
        textAlign:'center'
    },
    title:{
        fontSize:24,
        lineHeight:32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop:20

    },
    footer:{
        marginTop: 40,
        width:'100%',
        paddingHorizontal:20
    },
    
});