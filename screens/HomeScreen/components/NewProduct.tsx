import React, { useState } from 'react'
import { Modal, View, Button, Text, TextInput, Alert } from 'react-native'
import { styles } from '../../../theme/Styles'
import { getDatabase, push, ref, set } from "firebase/database";


//interfce

interface Props {
    ShowModalProduct: boolean
    setShowModalProfile: Function

}

interface FormProduct {
    code: string
    nameVJ: string
    price: number
    stock: number
    descripcion: string
}

export const NewProduct = ({ ShowModalProduct, setShowModalProfile }: Props) => {

    //hook estado formulrioi

    const [formProduct, setFormProduct] = useState<FormProduct>({
        code: '',
        nameVJ: '',
        price: 0,
        stock: 0,
        descripcion: ''
    },
)

    //actulizar estado del formularioi

    const handleValue = (key: string, value: string) => {
        setFormProduct({ ...formProduct, [key]: value })
    }

    //agregrproiducto

    const newVJ = async () => {

        if (!formProduct.code || !formProduct.nameVJ || !formProduct.price || !formProduct.stock || !formProduct.descripcion) {

            Alert.alert("Error", "Llene todos los campos")
            return;
        }
        //referencia
        const db = getDatabase();
        const dbRef = ref(db, 'VJ')
        //crer colecicion
        const saveVideoJuego = push(dbRef)
        //almacenar datos
        try {
            await set(saveVideoJuego, formProduct)
            Alert.alert("Exito","Video Juego Guardado")
            setShowModalProfile(false)
        } catch (e) {

            Alert.alert("Error","Error al guardar")
        }
    }


    return (

        <Modal
            animationType='fade'
            transparent={true}
            visible={ShowModalProduct}
            onRequestClose={() => setShowModalProfile(false)}
        >
            <View style={styles.modalNew}>
                <Text style={styles.text}>Nuevo Video Juego</Text>
                <TextInput
                    placeholder='Código'
                    style={styles.inputs}
                    onChangeText={(value) => handleValue('code', value)}
                />

                <TextInput
                    placeholder='Nombre'
                    style={styles.inputs}
                    onChangeText={(value) => handleValue('nameVJ', value)}
                />

                <View style={styles.inputsViewNumeric}>
                    <TextInput
                        placeholder='Precio'
                        style={styles.inputsNumeric}
                        keyboardType='numeric'
                        onChangeText={(value) => handleValue('price', value)}
                    />

                    <TextInput
                        placeholder='Stock'
                        style={styles.inputsNumeric}
                        keyboardType='numeric'
                        onChangeText={(value) => handleValue('stock', value)}
                    />
                </View>

                <TextInput
                    placeholder='Descripción'
                    style={styles.inputs}
                    keyboardType='numeric'
                    numberOfLines={3}
                    multiline
                    onChangeText={(value) => handleValue('descripcion', value)}
                />

                <Button title='Añadir' onPress={newVJ} />
            </View>
        </Modal>

    )
}
