import React from 'react'
import { Text, View } from 'react-native'
import { styles } from '../../../theme/Styles'
import Foundation from 'react-native-vector-icons/Foundation'

export const ProductCardComponent = () => {
    return (
        <View style={styles.lista}>
            <View>
                <Text style={styles.textNombre}>Nombre: {''} <Text style={styles.textNormal}> GTA V</Text> </Text>
                <Text style={styles.textNombre}>Precio: {''} <Text style={styles.textNormal}> $ 25</Text></Text>
            </View>

            <View style={styles.iconInfo}>
                <Foundation
                    name='info'
                    size={35}
                    color='#f5b041'
                    
                />
            </View>
        </View>
    )
}
