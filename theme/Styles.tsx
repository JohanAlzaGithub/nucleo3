import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 75,
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    inputs: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,

    },
    contrasena: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eyeIcon: {
        marginLeft: 10,
    },
    textNormal: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 15,
        color: 'black'
    },
    textRedirect: {
        color: '#00B0F6',
    },
    header: {
        flexDirection: 'row',
        alignContent: 'center'
    },
    userIcon: {
        marginRight: 10
    },
    editIcon: {
        marginTop: 10,
        marginLeft: 80
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 125,
        borderRadius: 15,
        padding: 50,

    },
    lista: {
        flexDirection: 'row',
        padding:10,
        alignItems:'center',
        gap:25,
        
    },
    iconInfo:{
        marginLeft:225
    },
    iconPlus:{
        alignItems:'center',
        marginBottom:25
    },
    inputsNumeric:{
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        width:'45%'

    },
    inputsViewNumeric:{
        flexDirection:'row',
        gap:25
    },
    modalNew:{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#fff',
            marginHorizontal: 20,
            marginVertical: 75,
            borderRadius: 15,
            padding: 50,
     
    },
    textNombre: {
        color: '#a04000',
    },

})