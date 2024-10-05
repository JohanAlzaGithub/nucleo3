import React, { useEffect, useState } from 'react'
import { Alert, Button, TextInput, View } from 'react-native'
import { styles } from '../theme/Styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getDatabase, ref, remove, update } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import app from '../components/Firebase'


export const DetailScreen = () => {

    //hooks navegacion 
    const route = useRoute()

    //@ts-ignore
    const { product } = route.params

    //hook suenavigtion

    const navigation = useNavigation()

    //cambair estado

    const [formEdit, setFormEdit] = useState({
        id: '',
        code: '',
        nameVJ: '',
        price: 0,
        stock: 0,
        descripcion: ''

    })

    useEffect(() => {

        setFormEdit(product)
    }, [])

    //funcion actulziar formulario

    const handleValue = (key: string, value: string) => {
        setFormEdit({ ...formEdit, [key]: value })
    }

    //funcuio9n elimianr
    const delteVJ = async () => {
        const auth=getAuth(app)
        const db = getDatabase()
        const dbRef = ref(db, 'VJ/' + auth.currentUser?.uid+'/'+formEdit.id)
        try {
            await remove(dbRef)
            Alert.alert("Exito", "Se Elimino el Video Juego ", [{ text: 'Ok', onPress: () => navigation.goBack() }])
        } catch (e) {
            console.log(e)
            Alert.alert("Error", "No se Elimino")
        }

    }


    //actulziar drta
    const updateVJ = async () => {
        const auth=getAuth(app)
        const db = getDatabase()
        const dbRef = ref(db, 'VJ/'+auth.currentUser?.uid+'/'+formEdit.id)
        try {
            await update(dbRef, {
                code: formEdit.code,
                nameVJ: formEdit.nameVJ,
                price: formEdit.price,
                stock: formEdit.stock,
                descripcion: formEdit.descripcion
            })
            Alert.alert("Exito", "Se Actualizo el Video Juego ", [{ text: 'Ok', onPress: () => navigation.goBack() }])



        } catch (e) {
            Alert.alert("Error", "No se Actualizado")

        }



    }



    return (
        <View style={styles.centrado}>
            <TextInput
                style={styles.inputs}
                placeholder='Código'
                value={formEdit.code}
                onChangeText={(value) => handleValue('code', value)}

            />
            <TextInput
                style={styles.inputs}
                placeholder='Nombre'
                value={formEdit.nameVJ}
                onChangeText={(value) => handleValue('nameVJ', value)}

            />
            <TextInput
                style={styles.inputs}
                placeholder='Precio'
                keyboardType='numeric'
                value={formEdit.price.toString()}
                onChangeText={(value) => handleValue('price', value)}
            />
            <TextInput
                style={styles.inputs}
                placeholder='Stock'
                keyboardType='numeric'
                value={formEdit.stock.toString()}
                onChangeText={(value) => handleValue('stock', value)}

            />

            <TextInput
                placeholder='Descripción'
                style={styles.inputs}
                numberOfLines={3}
                multiline
                value={formEdit.descripcion}
            />

            <View style={styles.botones}>
                <Button title='Actualizar' color='#27ae60' onPress={updateVJ} />
                <Button title='Eliminar' color='#e74c3c' onPress={delteVJ}/>
            </View>


        </View>
    )
}
