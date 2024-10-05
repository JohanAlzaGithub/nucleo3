import React, { useEffect, useState } from 'react';
import { Text, View, Modal, TextInput, Alert, Button, FlatList } from 'react-native';
import { styles } from '../../theme/Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getAuth, updateProfile } from 'firebase/auth';
import app from '../../components/Firebase';
import firebase from '@firebase/auth';
import { ProductCardComponent } from './components/ProductCardComponent';
import { NewProduct } from './components/NewProduct';

// Interface USER
interface FormUser {
  name: string;
}

//interfce videojuego
interface VideoJuego {
  id: string
  code: string
  nameVJ: string
  descripcion: string
  price: number
  stock: number
}

export const HomeScreen = () => {
  // Formulario
  const [formUser, setFormUser] = useState<FormUser>({
    name: ''
  });

  //capturr informacion

  const [userData, setUserData] = useState<firebase.User | null>(null)

  //hook lsita productos 

  const [products, setProducts] = useState<VideoJuego[]>([
    {
      id: '1',
      code: 'abbb',
      nameVJ: 'Juego1',
      price: 25,
      stock: 10,
      descripcion: 'Juego Bueno'
    },
    {
      id: '1',
      code: 'abbb',
      nameVJ: 'Juego1',
      price: 25,
      stock: 10,
      descripcion: 'Juego Bueno'
    }

  ])


  // Modal profuile
  const [showModalProfile, setShowModalProfile] = useState(false);

  //Modal ñadire producto

  const [showModalProduct, setShowModalProduct]=useState(false);

  //atulizr informacion

  const handleUpdateUser = async () => {
    try {
      await updateProfile(userData!,
        { displayName: formUser.name }
      )

      Alert.alert("Exito", "Nombre Actualizado")
    } catch (e) {

      Alert.alert("Error", "Nombre No Actualizado")

    }
    setShowModalProfile(false)
  }

  // Hooks useEffect
  useEffect(() => {
    const auth = getAuth(app)
    setUserData(auth.currentUser)
    setFormUser({ name: auth.currentUser?.displayName ?? '' })

  }, []);

  //funcion actulizar el estdo del formulrio

  const handleValue = (key: string, value: string) => {
    setFormUser({ ...formUser, [key]: value })
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <FontAwesome
            name='user-circle'
            size={50}
            color='#74bd69'
            style={styles.userIcon}
          />
          <View>
            <Text style={{ marginBottom: 5, fontSize: 15, fontWeight: 'bold' }}>
              Hola tú de nuevo por aqui!!
            </Text>
            <Text style={{ fontSize: 10 }}>{userData?.displayName}</Text>
          </View>

          <View>
            <AntDesign
              name='edit'
              size={30}
              color='#45b39d'
              onPress={() => setShowModalProfile(true)}
              style={styles.editIcon}
            />
          </View>
        </View>


        <View>
          <FlatList
            data={products}
            renderItem={({ item }) => <ProductCardComponent />}
            keyExtractor={item => item.id}
          />

        </View>
      </View>

      <Modal
        animationType='fade'
        transparent={true}
        visible={showModalProfile}
        onRequestClose={() => setShowModalProfile(false)}
      >
        <View style={styles.modal}>
          <Text style={styles.text}>Perfil</Text>
          <TextInput
            placeholder='Nombre'
            style={styles.inputs}
            value={formUser.name}
            onChangeText={(value) => handleValue('name', value)}
          />
          <TextInput
            placeholder='Correo'
            style={styles.inputs}
            value={userData?.email!}
            editable={false}
          />
          <Button title='Actualizar' onPress={handleUpdateUser} />
        </View>
      </Modal>

      <View style={styles.iconPlus}>
        <AntDesign
          name='pluscircle'
          size={35}
          color='#a569bd'
          onPress={()=>setShowModalProduct(true)}          
        />
      </View>
      <NewProduct ShowModalProduct={showModalProduct} setShowModalProfile={setShowModalProduct}/>
    </>
  );
};
