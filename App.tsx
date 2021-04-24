import React, { useEffect } from "react";
import AppLoading from "expo-app-loading";
import * as Notifications from "expo-notifications";
import Routes from "./src/routes";
import {
	useFonts,
	Jost_400Regular,
	Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import { PlantProps } from "./src/libs/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
	const [fontsLoaded] = useFonts({
		Jost_400Regular,
		Jost_600SemiBold,
	});

	useEffect(() => {

		//Notifications.cancelAllScheduledNotificationsAsync();
		//AsyncStorage.clear();
		//Notificação Android
		/* Notifications.setNotificationHandler({
			handleNotification: async () => ({
			  shouldShowAlert: true,
			  shouldPlaySound: false,
			  shouldSetBadge: false,
			}),
		}); */
		
		async function testes(){
			const nt = await Notifications.getAllScheduledNotificationsAsync();
			console.log(nt);
		}
		testes();
		const subscription = Notifications.addNotificationReceivedListener(
			async notification => {
				const data = notification.request.content.data.plant as PlantProps;
				console.log(data);
			});
		return () => subscription.remove();

	}, []);

	if (!fontsLoaded) return <AppLoading />;
		return <Routes />;
}
