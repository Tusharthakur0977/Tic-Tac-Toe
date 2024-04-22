import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';

function App(): React.JSX.Element {
  const [iscross, setiscross] = useState<boolean>(false);
  const [gamewinner, setgamewinner] = useState<string>('');
  const [gamestate, setgamestate] = useState(new Array(9).fill('empty', 0, 9));
  const reloadgame = () => {
    setiscross(false);
    setgamewinner('');
    setgamestate(new Array(9).fill('empty', 0, 9));
  };
  const checkiswinner = () => {
    if (
      gamestate[0] === gamestate[1] &&
      gamestate[0] === gamestate[2] &&
      gamestate[0] !== 'empty'
    ) {
      setgamewinner(`${gamestate[0]} won the game! 🥳`);
    } else if (
      gamestate[3] !== 'empty' &&
      gamestate[3] === gamestate[4] &&
      gamestate[4] === gamestate[5]
    ) {
      setgamewinner(`${gamestate[3]} won the game! 🥳`);
    } else if (
      gamestate[6] !== 'empty' &&
      gamestate[6] === gamestate[7] &&
      gamestate[7] === gamestate[8]
    ) {
      setgamewinner(`${gamestate[6]} won the game! 🥳`);
    } else if (
      gamestate[0] !== 'empty' &&
      gamestate[0] === gamestate[3] &&
      gamestate[3] === gamestate[6]
    ) {
      setgamewinner(`${gamestate[0]} won the game! 🥳`);
    } else if (
      gamestate[1] !== 'empty' &&
      gamestate[1] === gamestate[4] &&
      gamestate[4] === gamestate[7]
    ) {
      setgamewinner(`${gamestate[1]} won the game! 🥳`);
    } else if (
      gamestate[2] !== 'empty' &&
      gamestate[2] === gamestate[5] &&
      gamestate[5] === gamestate[8]
    ) {
      setgamewinner(`${gamestate[2]} won the game! 🥳`);
    } else if (
      gamestate[0] !== 'empty' &&
      gamestate[0] === gamestate[4] &&
      gamestate[4] === gamestate[8]
    ) {
      setgamewinner(`${gamestate[0]} won the game! 🥳`);
    } else if (
      gamestate[2] !== 'empty' &&
      gamestate[2] === gamestate[4] &&
      gamestate[4] === gamestate[6]
    ) {
      setgamewinner(`${gamestate[2]} won the game! 🥳`);
    } else if (!gamestate.includes('empty', 0)) {
      setgamewinner('Draw game... ⌛️');
    }
  };

  const onChangeItem = (itemNumber: number) => {
    if (gamewinner) {
      return Snackbar.show({
        text: gamewinner,
        backgroundColor: '#000000',
        textColor: '#ffffff',
      });
    }
    if (gamestate[itemNumber] === 'empty') {
      gamestate[itemNumber] = iscross ? 'cross' : 'circle';
      setiscross(!iscross);
    } else {
      return Snackbar.show({
        text: 'position is filled',
        backgroundColor: 'red',
        textColor: '#FFF',
      });
    }
    checkiswinner();
  };
  return (
    <ScrollView style={styles.ui}>
      <View style={styles.title}>
        <Text style={styles.head}>TicTacToe Game</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <StatusBar />

        {gamewinner ? (
          <View style={[styles.playerInfo, styles.winnerInfo]}>
            <Text style={styles.winnerTxt}>{gamewinner}</Text>
          </View>
        ) : (
          <View
            style={[
              styles.playerInfo,
              iscross ? styles.playerX : styles.playerO,
            ]}>
            <Text style={styles.gameTurnTxt}>
              Player {iscross ? 'X' : 'O'} 's Turn
            </Text>
          </View>
        )}
        {/* Game Grid */}
        <FlatList
          numColumns={3}
          data={gamestate}
          style={styles.grid}
          renderItem={({item, index}) => (
            <Pressable
              key={index}
              style={styles.card}
              onPress={() => onChangeItem(index)}>
              <Icons name={item} />
            </Pressable>
          )}
        />
        <Pressable style={styles.gameBtn} onPress={reloadgame}>
          <Text style={styles.gameBtnText}>
            {gamewinner ? 'Start New Game' : 'Reload The Game'}
          </Text>
        </Pressable>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
  },
  head: {
    fontSize: 34,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'serif',
    textDecorationLine: 'underline',
  },
  ui: {
    backgroundColor: '#1287A5',
  },
  container: {
    flex: 1,
    marginTop: 30,
  },
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default App;
