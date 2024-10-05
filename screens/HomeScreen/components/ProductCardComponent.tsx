import React from 'react'
import { Text, View } from 'react-native'
import { styles } from '../../../theme/Styles'
import Foundation from 'react-native-vector-icons/Foundation'
import { VideoJuego } from '../HomeScreen'
import { CommonActions, useNavigation } from '@react-navigation/native'

//interface prospo
interface Props{
    product: VideoJuego
}


export const ProductCardComponent = ({product}: Props) => {

    //hooks

    const navigation=useNavigation()
    return (
        <View style={styles.lista}>
            <View>
                <Text style={styles.textNombre}>Nombre: {''} <Text style={styles.textNormal}> {product.nameVJ}</Text> </Text>
                <Text style={styles.textNombre}>Precio: {''} <Text style={styles.textNormal}> $ {product.price}</Text></Text>
                
            </View>

            <View style={styles.iconInfo}>
            <Foundation
                    name='info'
                    size={35}
                    color='#f5b041'
                    onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Detail', params:{product}}))}
                    
                />
                
            </View>
        </View>
    )
}
