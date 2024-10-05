import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { styles } from '../theme/Styles';
import { CommonActions, useNavigation } from '@react-navigation/native';


//interface

interface FRegistro {
  correo: string
  contrasena: string
}



export const RegistroScreen = () => {

   //navegacion

  const navigation = useNavigation();

  //hooks
  const [formRegistro, setformRegistro] = useState<FRegistro>({
    correo: "",
    contrasena: ""
  })

  //contraseña visible

  const [showPassword,setShowPassword] = useState(false)

  //acutlizar

  const handleValue = (key: string, value: string) => {
    setformRegistro({ ...formRegistro, [key]: value })
  }

  //registrase

  const Registrarse = () => {
    if (!formRegistro.correo || !formRegistro.contrasena) {
        Alert.alert('Error', 'Llene todos los campos');
        return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, formRegistro.correo, formRegistro.contrasena)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Éxito', 'Usuario Registrado', [{text:"OK", onPress:()=> navigation.dispatch(CommonActions.navigate({name:'Login'}))}]);
      
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Error', 'Error al Registrar Usuario');
      });

  }

  return (
    <View style={styles.centrado}>
      <Text style={styles.text}>Registro</Text>
      <TextInput 
        style={styles.inputs}
        placeholder='Correo'   
        onChangeText={(value) => handleValue('correo', value)} 
        keyboardType='email-address'
      />
    <View style={styles.contrasena}>
      <TextInput
        style={[styles.inputs, {flex:1}]} 
        placeholder='Contraseña' 
        secureTextEntry={!showPassword} 
        onChangeText={(value) => handleValue('contrasena', value)} 
        />
      <TouchableOpacity>
      <Icon
      name={showPassword?'eye-off': 'eye'}
      size={24}
      color='gray'
      style={styles.eyeIcon}   
      />
      </TouchableOpacity>

      </View>
      <Button title='Registrarse' onPress={Registrarse}/>

      <Text style={styles.textNormal}>
        ¿Ya tienes cuenta? {''}
        <Text onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Login'}))} style={styles.textRedirect}>
          Iniciar Sesión 
        </Text>
      </Text>
    </View>
  )
}
