import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  HightLightOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function Player(props) {
  //Função de retroceder musica.
  const handleBack = async () => {
    //Apertei no botão voltar, iremos pegar o audioIndex e decrementar -1.
    //Mas como não pode haver numeração negativa na aplicação, faremos uma condição lógica abaixo.
    let newIndex = props.audioIndex - 1;

    //Se o novo indice for menor que zero
    if (newIndex < 0) {
      //Então esse indice vai receber a musica menos 1, independente do numero de musica dentro do app 'length'
      newIndex = props.musicas.length - 1;
    }

    //setamos o audio no indice newIndex
    props.setarAudioIndex(newIndex);

    //declaramos o arquivo atual da musica no indice newIndex....
    let curFile = props.musicas[newIndex].file;
    //Atualizar Interface do APP no novo indice, apos clicarmos no botão retroceder musica
    let newMusic = props.musicas.filter((val, k) => {
      if (newIndex == k) {
        props.musicas[k].playing = true;
        curFile = props.musicas[k].file;
      } else {
        props.musicas[k].playing = false;
      }
      return props.musicas[k];
    });

    //Carregar o novo audio apos clicar o botao retroceder.

    if (props.audio != null) {
      props.audio.unloadAsync();
    }
    let curAudio = new Audio.Sound();

    try {
      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();
    } catch (error) {}
    props.setarAudio(curAudio);
    props.setarMusica(newMusic);
    props.setarPlaying(true);
  };

  //Função de avançar musica
  const handleNext = async () => {
    let newIndex = props.audioIndex + 1;

    if (newIndex >= props.musicas.length) {
      newIndex = 0;
    }
    props.setarAudioIndex(newIndex);

    let curFile = props.musicas[newIndex].file;
    //Atualizar Interface do APP
    let newMusic = props.musicas.filter((val, k) => {
      if (newIndex == k) {
        props.musicas[k].playing = true;
        curFile = props.musicas[k].file;
      } else {
        props.musicas[k].playing = false;
      }
      return props.musicas[k];
    });

    if (props.audio != null) {
      props.audio.unloadAsync();
    }
    let curAudio = new Audio.Sound();

    try {
      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();
    } catch (error) {}
    props.setarAudio(curAudio);
    props.setarMusica(newMusic);
    props.setarPlaying(true);
  };

  const handlePlay = async () => {
    //Vamos conseguir ver qual a musica atual que está tocando
    let curFile = props.musicas[props.audioIndex].file;
    //Filtrando musicas e passando o valor k como parametro para identificar cada musica
    let newMusic = props.musicas.filter((val, k) => {
      //Se a identidade da musica for igual ao valor da que eu quero...
      if (props.audioIndex == k) {
        //Musica sera identificada e o playing será selecionado
        props.musicas[k].playing = true;

        //Com o curFile conseguimos colocar a musica selecionada pra tocar, o que foi declarada inicialmente como null.
        //Agora esta como verdadeira.
        curFile = props.musicas[k].file;
      } else {
        //Caso não seja, a musica que eu quero, sera resetado o playing.
        props.musicas[k].playing = false;
      }
      return props.musicas[k];
    });

    //Quando estamos reproduzindo o av no expo, pode dar errado, pra isso precisamos pegar esse erro.
    //Experimente
    try {
      //Se o audio for diferente de nulo, é pq algo ja começou a tocar algo
      if (props.audio != null) {
        //O setPlaying será true para começar de fato a tocar o audio
        props.setarPlaying(true);

        //O setMusica com o vetor newMusic como parametro
        props.setarMusica(newMusic);

        //Espere o audio iniciar com o playAsyng
        await props.audio.playAsync();
      } else {
        //Caso seja a primeira vez que o audio esteja sendo carregado, então faremos reproduzir o primeiro som...

        //Definimos o nome da variavel para chamar a função de audio...
        let curAudio = new Audio.Sound();

        //Experimente esperar por....
        try {
          //Espere para carregar assincronicamente o arquivo de audio atual no indice do vetor arquivo atual.
          await curAudio.loadAsync(curFile);
          //Espere o audio atual carregar de forma assincrona para dar play
          await curAudio.playAsync();
        } catch (error) {}

        //Então , setamos o audio no indice audio atual
        props.setarAudio(curAudio);
        //Setamos também a musica no indice do vetor newMusic
        props.setarMusica(newMusic);
        //Setamos também o playing como verdadeiro para tocar a musica.
        props.setarPlaying(true);
      }
    } catch (error) {}
  };


  //FUNÇÃO DE PAUSAR MUSICA
  const handlePause = async () => {
    //Se meu props.audio for diferente de nulo, quer dizer que algo ja foi carregado, logo...
    if (props.audio != null) {
      //Chamamos o pauseAsync para pausar a musica que está sendo tocada
      props.audio.pauseAsync();
    }
    //Precisamos setar o playing para false, assim não irá comecar nenhuma musica sozinha em cima de outra.
    props.setarPlaying(false);
  };

  return (
    <View style={styles.player}>
      <TouchableOpacity
        onPress={() => handleBack()}
        style={{ marginRight: 20, marginLeft: 20 }}
      >
        <AntDesign name="banckward" size={35} color="white" />
      </TouchableOpacity>
      {!props.playing ? (
        <TouchableOpacity
          onPress={() => handlePlay()}
          style={{ marginRight: 10, marginLeft: 10 }}
        >
          <AntDesign name="playcircleo" size={70} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => handlePause()}
          style={{ marginRight: 10, marginLeft: 10 }}
        >
          <AntDesign name="pausecircleo" size={70} color="white" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => handleNext()}
        style={{ marginRight: 20, marginLeft: 20 }}
      >
        <AntDesign name="forward" size={35} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  player: {
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 999,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
