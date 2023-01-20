import React, { Component, Fragment } from 'react';
import { View, Image, StyleSheet, ScrollView, StatusBar, } from 'react-native';
import { Title, Appbar, TouchableRipple, Portal, Modal, IconButton, Text, Divider } from 'react-native-paper';
import { appDark, appLightGray, appOrange } from '../components/colors';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPoke: [],
      pokeData: [],
      modalVisible: false,
      countPoke: '',
    }
  }

  componentDidMount() {
    this.getData();
  }

  showDetails = () => this.setState({ modalVisible: true });
  hideDetails = () => this.setState({ modalVisible: false });

  getData = () => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(response => response.json())
      .then(response => {
        console.log('response: ', response);
        this.setState({
          listPoke: response.results,
          countPoke: response.results.length
        })

      })
      .catch(error => console.log('error: ', error))
  }

  getDetails = (url) => {
    this.showDetails();
    fetch(url)
      .then(response => response.json())
      .then(response => {
        console.log('response Details: ', response);
        this.setState({ pokeData: response })
      })
      .catch(error => console.log('error: ', error))
  }

  render() {
    console.log(this.state)
    const { listPoke, pokeData, countPoke, modalVisible } = this.state;

    return (
      <Fragment>
        <StatusBar backgroundColor={appDark} />

        <Appbar.Header style={styles.appBarCustom}>
          <Appbar.Content title="Lista de Pokemon" subtitle={'Mostrando ' + countPoke + ' elementos'} />
        </Appbar.Header>

        <ScrollView>
          {listPoke.map(item => (
            <TouchableRipple style={styles.box} key={item.name} onPress={() => this.getDetails(item.url)} rippleColor="red">
              <Title>{item.name}</Title>
            </TouchableRipple>
          ))}
        </ScrollView>

        {modalVisible ? (
          <Portal>
            <Modal visible={modalVisible} onDismiss={this.hideDetails} contentContainerStyle={styles.modal}>
              <IconButton style={styles.closeBtn} icon="close-circle" color={'red'} size={27} onPress={() => this.hideDetails()} />
              <IconButton style={styles.closeBtn} icon="close" color={'white'} size={27} onPress={() => this.hideDetails()} />
              <Text style={styles.txtHead}>{'ID: ' + pokeData.id + '     ' + pokeData.name}</Text>
              <Image style={styles.image} source={{ uri: pokeData.sprites?.['other']['official-artwork']['front_default'] }} />
              <View style={styles.boxDesc}>
                <Text style={styles.title}>Peso: </Text>
                <Text style={styles.txt}>{pokeData.weight}</Text>
              </View>
              <View style={styles.boxDesc}>
                <Text style={styles.title}>Altura: </Text>
                <Text style={styles.txt}>{pokeData.height}</Text>
              </View>
              <View>
                <Text style={styles.title}>Movimientos: </Text>
                {this.state.pokeData.moves?.slice(0, 5).map(item => <Text style={styles.txt}>{'🟠 ' + item.move.name}</Text>)}
              </View>
            </Modal>
          </Portal>
        ) : null}

      </Fragment>
    )
  }
}


const styles = StyleSheet.create({
  appBarCustom: {
    backgroundColor: appDark,
    height: 80,
  },
  boxDesc: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  txt: {
    fontSize: 20,
    alignSelf: 'center'
  },
  txtHead: {
    fontSize: 22,
    color: appOrange,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  box: {
    justifyContent: "center",
    alignItems: 'center',
    height: 65,
    backgroundColor: appOrange,
    marginVertical: 5,
    marginHorizontal: 5
  },
  modal: {
    backgroundColor: appLightGray,
    margin: 20,
    padding: 10
  },
  closeBtn: {
    position: 'absolute',
    right: -20,
    top: -20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
})