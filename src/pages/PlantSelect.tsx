import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native';
import colors from '../styles/colors';
import {Header} from '../components/Header';
import fonts from '../styles/fonts';
import { EnvironmentButton } from '../components/EnvironmentButton';
import api from '../services/api';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import {Load} from '../components/Load';

interface EnvironmentProps{
    key:string;
    title:string;
}

interface PlantsProps{
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat_every: string;
    }
}

export function PlantSelect(){

    const[environment, setEnvironments] = useState<EnvironmentProps[]>([]);
    const[plants, setPlants] = useState<PlantsProps[]>([]);
    const[filteredPlants, setfilteredPlants] = useState<PlantsProps[]>([]);
    const[environmentSelected, setEnvironmentSelected] = useState('all');

    const[loading, setLoading] = useState(true);

    const[page, setPage] = useState(1);
    const[loadingMore, setLoadingMore] = useState(false);
    const[loadedAll,setLoadedAll] = useState(false);

    function handleEnvironmentSeleted(environment: string){
        setEnvironmentSelected(environment);
        
        if(environment == 'all')
            return setfilteredPlants(plants);

        const filtered = plants.filter(plant=>
            plant.environments.includes(environment)    
        );

        setfilteredPlants(filtered);
    }

    async function fetchPlants() {
        const { data } = await api
        .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if(!data)
            return setLoading(true);
        if(page > 1){
            setPlants(oldValue=> [...oldValue, ...data]);
            setfilteredPlants(oldValue=>[...oldValue, ...data]);

        }else{
            setPlants(data);
            setfilteredPlants(data);
        }
        
        setLoading(false);
        setLoadingMore(false);
    }
    

    function handleFetchMore(distance: number){
        if(distance < 1)
            return;
        setLoadingMore(true);
        setPage(oldValue=> oldValue +1);
        fetchPlants();
    }
    
    useEffect(()=>{

        async function fetchEnvironment() {
            const { data } = await api
            .get('plants_environments?_sort=title&_order=asc');
            setEnvironments([{
                key: 'all',
                title:'Todos'
            }, 
                ...data
            ]);
        }
        
        fetchEnvironment();
       
    },[]);

    useEffect(()=>{

       
        fetchPlants();
       
    },[]);

    if(loading)
        return <Load/>

    return (
        <View style={style.container}>
           <View style={style.header}>
            <Header/>
            <Text style={style.title}>
                Em qual ambiente
            </Text>
            <Text style={style.subtitle}>
                você quer colocar sua planta?
            </Text>
           </View>

           <View>
               <FlatList
                data={environment}
                renderItem={({item})=>(
                    <EnvironmentButton 
                        title={item.title}
                        active={item.key == environmentSelected}
                        onPress={()=>handleEnvironmentSeleted(item.key)} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={style.environmentList}
               />
           </View>
           <View style={style.plants}>
                    <FlatList  
                    data={filteredPlants}
                    renderItem={({item})=>(
                        <PlantCardPrimary data={item}/>
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({distanceFromEnd})=>
                        handleFetchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadingMore
                        ?
                        <ActivityIndicator color={colors.green}/>
                        : <></>
                    }
                    />
           </View>
           
          
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
       /*  justifyContent: 'center',
        alignItems:'center',
        backgroundColor: colors.background */
    },
    header:{
        paddingHorizontal:30
    },
    title:{
        fontSize:17,
        color:colors.heading,
        fontFamily: fonts.heading,
        marginTop: 15
    },
    subtitle:{
        fontFamily: fonts.text,
        fontSize:17,
        lineHeight:20,
        color:colors.heading
    },
    environmentList:{
        height:40,
        justifyContent:'center',
        paddingBottom:5,
        marginLeft:32,
        marginVertical:32
    },
    plants:{
        flex:1,
        paddingHorizontal:32,
        justifyContent:'center'
    }
});