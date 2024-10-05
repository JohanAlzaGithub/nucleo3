import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { styles } from '../theme/Styles';
import { CommonActions, useNavigation } from '@react-navigation/native';
import app from '../components/Firebase';

//interface
interface FLogin {
    correo: string;
    contrasena: string;
}

export const LoginScreen = () => {
    //hooks
    const [formLogin, setformLogin] = useState<FLogin>({
        correo: '',
        contrasena: '',
    });

    //navegacion
    const navigation = useNavigation();

    //visible contraseña

    const [showPassword, setShowPassword] = useState(false)

    // Actualizar valores
    const handleValue = (key: string, value: string) => {
        setformLogin({ ...formLogin, [key]: value });
    };

    // Login
    const Login = () => {
        if (!formLogin.correo || !formLogin.contrasena) {
            Alert.alert('Error', 'Llene todos los campos');
            return;
        }

        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, formLogin.correo, formLogin.contrasena)
            .then((userCredential) => {
                const user = userCredential.user;
                Alert.alert('Éxito', 'Usuario Logeado', [{text:'OK', onPress:()=> navigation.dispatch(CommonActions.navigate({name:'Home'}))}]);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert('Error', 'Verifique sus Credenciales');
            });
    };

    return (
        <View style={styles.centrado}>
            <Text style={styles.text}>Login</Text>
            <TextInput
                style={styles.inputs}
                placeholder='Correo'
                onChangeText={(value) => handleValue('correo', value)}
                keyboardType='email-address'
            />
            <View style={styles.contrasena}>
                <TextInput
                    style={[styles.inputs, { flex: 1 }]} 
                    placeholder='Contraseña'
                    secureTextEntry={!showPassword}
                    onChangeText={(value) => handleValue('contrasena', value)}

                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                        name={showPassword ? 'eye-off' : 'eye'} 
                        size={24}
                        color='gray'
                        style={styles.eyeIcon}
                    />
                </TouchableOpacity>
            </View>
            <Button title='Iniciar Sesión' onPress={Login}/>

            <Text style={styles.textNormal}>
            ¿No tienes cuenta? {''}
            <Text onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Registro'}))} style={styles.textRedirect}>
            Registrarse
            </Text> 
            </Text>
        </View>
    );
};



