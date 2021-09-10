import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  LogBox,
  TouchableOpacity,
  HightLightOpacity,
} from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import Player from './Player';

export default function App() {
  LogBox.ignoreAllLogs(true);
  //Definindo os estados de indice de audio..
  const [audioIndex, setarAudioIndex] = useState(0);

  //Definindo estado do playing e setar playing, para manipular as funções de play
  const [playing, setarPlaying] = useState(false);

  //Definindo os estados de audio e setar audio para manipular dentro do app.
  const [audio, setarAudio] = useState();

  //Definindo os estados de musicas, e o setar musicas do app
  const [musicas, setarMusica] = useState([
    {
      nome: 'Uma coisa',
      artista: 'Brunão Morada + Alessandro Vilas Boas',
      playing: false,
      file: require('./assets/music1.mp3'),
    },
    {
      nome: 'Em teus braços (Acústico)',
      artista: 'Mauro Henrique',
      playing: false,
      file: require('./assets/music2.mp3'),
    },
    {
      nome: 'Um com você',
      artista: 'Marlon dos Santos',
      playing: false,
      file: require('./assets/music3.mp3'),
    },
    {
      nome: 'Como uma canção',
      artista: 'Marlon dos Santos',
      playing: false,
      file: require('./assets/music4.mp3'),
    },
    {
      nome: 'How he loves us',
      artista: 'Jesus Culture',
      playing: false,
      file: require('./assets/music5.mp3'),
    },
    {
      nome: 'Tu és Santo',
      artista: 'Gilmar Brito',
      playing: false,
      file: require('./assets/music6.mp3'),
    },
    {
      nome: 'Isaias 9',
      artista: 'Rodolpho Abrantes',
      playing: false,
      file: require('./assets/music7.mp3'),
    },
    {
      nome: 'Só uma coisa me satisfaz',
      artista: 'Ministério Zoe',
      playing: false,
      file: require('./assets/music8.mp3'),
    },
    {
      nome: 'De volta a inocência',
      artista: 'Quatro por Um',
      playing: false,
      file: require('./assets/music9.mp3'),
    },
    {
      nome: 'Aos pés da Cruz',
      artista: 'Oficina G3',
      playing: false,
      file: require('./assets/music10.mp3'),
    },
  ]);

  //Função para mudar a musica de forma assincrona
  const changeMusic = async (id) => {
    //Qual musica vai começar a tocar após ser selecionada.
    let curFile = null;

    //Filtrando musicas e passando o valor k como parametro para identificar cada musica
    let newMusic = musicas.filter((val, k) => {
      //Se a identidade da musica for igual ao valor da que eu quero...
      if (id == k) {
        //Musica sera identificada e o playing será selecionado
        musicas[k].playing = true;

        //Com o curFile conseguimos colocar a musica selecionada pra tocar, o que foi declarada inicialmente como null.
        //Agora esta como verdadeira.
        curFile = musicas[k].file;

        //O estado de set do playing será verdadeiro, quando a musica começar a tocar.
        setarPlaying(true);
        setarAudioIndex(id);
      } else {
        //Caso não seja, a musica que eu quero, sera resetado o playing.
        musicas[k].playing = false;
      }
      return musicas[k];
    });

    //Para não começar a tocar uma música em cima da outra, apos selecionar a próxima.
    //Iremos limpar da memória o audio que estiver sendo executado,
    //apos alguma musica ser setada anteriormente.
    if (audio != null) {
      audio.unloadAsync();
    }

    //Vamos agora manipular a função de Audio instalada nas dependencias do expo
    let curAudio = new Audio.Sound();

    //Como iremos trabalhar de forma assincrona precisamos usar o try e o await.
    //Pois pode não começar de forma imediata, por isso usamos o try. 'experimente' await -> esperar por....

    //Experimente esperar pela função curAudio
    try {
      //Espere o audio carregar no parametro curFile onde esta ospedada o audio
      await curAudio.loadAsync(curFile);
      //Espere também o audio iniciar a tocar
      await curAudio.playAsync();
    } catch (error) {}

    //Iremos chamar nosso hook para setar o audio, assim continuamos rastrear esse estado.
    setarAudio(curAudio);

    //Chamando nosso hook para setar musica no indice newMusic, que é como nós definimos anteriormente
    setarMusica(newMusic);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <StatusBar hidden />
        <View style={styles.header}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 25,
              color: 'white',
            }}
          >
            App Music
          </Text>
        </View>
        <View style={styles.table}>
          <Text style={{ width: '50%', color: 'rgb(200,200,200)' }}>
            Musica
          </Text>
          <Text style={{ width: '50%', color: 'rgb(200,200,200)' }}>
            Artista
          </Text>
        </View>

        {
          //Iremos percorrer o array de musicas com a função map, e usar o k para identifica-las
          musicas.map((val, k) => {
            if (val.playing) {
              //Renderiza algo aqui
              return (
                <View style={styles.table}>
                  <TouchableOpacity
                    onPress={() => changeMusic(k)}
                    style={{ width: '100%', flexDirection: 'row' }}
                  >
                    <Text
                      style={{ width: '50%', color: '#1DB954', fontSize: 15 }}
                    >
                      <AntDesign name="play" size={15} color="white" />{' '}
                      {val.nome}
                    </Text>
                    <Text
                      style={{ width: '50%', color: '#1DB954', fontSize: 15 }}
                    >
                      {val.artista}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            } else {
              //Renderiza algo aqui
              return (
                <View style={styles.table}>
                  <TouchableOpacity
                    onPress={() => changeMusic(k)}
                    style={{ width: '100%', flexDirection: 'row' }}
                  >
                    <Text style={{ width: '50%', color: 'white' }}>
                      <AntDesign name="play" size={15} color="white" />{' '}
                      {val.nome}
                    </Text>
                    <Text style={{ width: '50%', color: 'white' }}>
                      {val.artista}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }
          })
        }
        <View style={{ paddingBottom: 200 }}></View>
      </ScrollView>
      <Player
        playing={playing}
        setarPlaying={setarPlaying}
        audioIndex={audioIndex}
        musicas={musicas}
        setarMusica={setarMusica}
        audio={audio}
        setarAudio={setarAudio}
        setarAudioIndex={setarAudioIndex}
      ></Player>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  header: {
    backgroundColor: '#1DB954',
    width: '100%',
    padding: 20,
  },
  table: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
});
