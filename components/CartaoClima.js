import React from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'

const CartaoClima = (props) => {
    return (
        <View style={styles.main}>
            {/* Cabecalho */}
            <Text style={styles.titulo}>{props.cidade}</Text>
            <Image style={styles.icone} source={{uri: 'https://openweathermap.org/img/wn/' + props.previsao.item.current.weather[0].icon + '.png'}}/>   
            {/* Temperatura */}
            <Text style={styles.section}>Sensação Térmica</Text>
            <Text style={styles.temp}>{props.previsao.item.current.feels_like + ' \u00B0C'}</Text>
            {/* Info */}
            <Text style={styles.section}>Informações</Text>
            <View style={styles.info_table}>
                <View style={styles.info_row}>
                    <Text style={styles.info_key}>↑ Nascer do Sol</Text>
                    <Text style={styles.info_value}>{new Date(props.previsao.item.current.sunrise * 1000).toLocaleTimeString()}</Text>
                </View>
                <View style={styles.info_row}>
                    <Text style={styles.info_key}>↓ Pôr do Sol</Text>
                    <Text style={styles.info_value}>{new Date(props.previsao.item.current.sunset * 1000).toLocaleTimeString()}</Text>
                </View>
            </View>
          </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#89CFF0',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: 275,
        paddingVertical: 15,
        borderRadius: 15,
        shadowColor: 'dodgerblue',
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.3
    },
    titulo: {
        backgroundColor: 'dodgerblue',
        width: '100%',
        padding: 5,
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    icone: {
        width: 40, 
        height: 40
    },
    section: {
        marginTop: 20, 
        color: 'white'
    },
    temp: {
        color: 'white',
        fontSize: 45,
        fontWeight: 'bold'
    },
    info_table: {
        width: '80%',
        marginVertical: 5,
        borderColor: 'white',
        borderTopWidth: 1,
        borderBottomWidth : 1
    },
    info_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    info_key: {
        textAlign: 'left',
        color: 'white'
    },
    info_value: {
        textAlign: 'right',
        color: 'white',
        fontWeight: 'bold'
    }
});

export default CartaoClima;