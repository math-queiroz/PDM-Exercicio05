import React, { useState } from 'react';
import { Button, Keyboard, StyleSheet, Text, TextInput, Image, FlatList, View } from 'react-native';
import { api_key } from './api_key.json'

import CartaoClima from './components/CartaoClima'

export default function App() {
  // Api
  const endpointCidade = 'https://api.openweathermap.org/data/2.5/forecast?lang=pt&units=metric&q='
  const endpointCoords = 'https://api.openweathermap.org/data/2.5/onecall?lang=pt&units=metric&lat='
  // Cidade
  const [cidade, setCidade] = useState('');
  const [cidadeAtual, setcidadeAtual] = useState('');
  const capturarCidade = (cidade) => {
    setCidade(cidade);
  }
  // Previsao (primeiro encontra as coordenadas e depois a previsao)
  const [previsoes, setPrevisoes] = useState([]);
  const targetCidade = `${endpointCidade}${cidade}&appid=${api_key}`;
  const obterPrevisao = () => {
    fetch(targetCidade).then(dados => dados.json()).then(dadosJson => {
      setPrevisoes([]);
      if (dadosJson.cod !== '200')
        return Promise.reject();
      const coords = dadosJson.city.coord;
      const targetCoords = `${endpointCoords}${coords.lat}&lon=${coords.lon}&appid=${api_key}`;
      fetch(targetCoords).then(dadosFinais => dadosFinais.json()).then((dadosFinaisJson) => {
        setcidadeAtual(cidade);
        setPrevisoes([dadosFinaisJson]);
        Keyboard.dismiss();
      })
    });
  }
  // Main
  return (
    <View style={styles.container}>
      <View style={styles.entrada}>
        <TextInput
          style={styles.entradaCidade}
          placeholder="Digite uma cidade aqui"
          value={cidade}
          onChangeText={capturarCidade}
        />
        <Button
          title="Buscar"
          onPress={obterPrevisao}
        />
      </View>
      <FlatList
        data={previsoes}
        renderItem={(previsao) => (
          <CartaoClima
            cidade={cidadeAtual}
            previsao={previsao}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
  },
  entradaCidade: {
    padding: 7,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    textAlign: 'center',
    marginBottom: 8
  },
  entrada: {
    marginBottom: 15
  }
})
