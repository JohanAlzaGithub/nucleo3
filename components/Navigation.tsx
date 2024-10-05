import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen } from '../screens/LoginScreen';
import { RegistroScreen } from '../screens/RegistroScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';

const Stack = createStackNavigator();

export const Navigation = () => {
  return (
   
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name="Login" component={LoginScreen}  options={{ title: 'Login', headerLeft:()=>null }} />
                <Stack.Screen name="Registro" component={RegistroScreen} options={{title:'Registro', headerLeft:()=>null }}/>
                <Stack.Screen name="Home" component={HomeScreen} options={{title:'Home', headerLeft:()=>null }}/> 
                <Stack.Screen name="Detail" component={DetailScreen} options={{headerShown:false}}/>              
            </Stack.Navigator>
        </NavigationContainer>
    
  )
}
