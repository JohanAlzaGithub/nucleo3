import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { styles } from '../theme/Styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import app from '../components/Firebase'

//Interface USER

interface userAuth {
  name: string

}

export const HomeScreen = () => {

  //formulario

  const [userAuth, setUserAuth] = useState<userAuth>({
    name: ''
  })

  //hooks useefect
  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuth({ name: user.displayName ?? 'No Hay Nombre Pa' })
      }


    })

  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name='user-circle'
          size={65}
          color='#74bd69'
          style={styles.userIcon}
        />
        <View>
          <Text style={{marginBottom:5, fontSize:25, fontWeight:'bold' }}>Hola tú de nuevo por aqui!!</Text>
          <Text style={{fontSize:15}}>{userAuth.name}</Text>

        </View>
      </View>
    </View>
  )
}

