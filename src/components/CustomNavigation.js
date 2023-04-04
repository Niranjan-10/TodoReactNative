import { getHeaderTitle } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { LOGIN, TODO_LIST } from '../NavigationConstants';
import { Colors } from '../utils';

function CustomNavigation({navigation, route, options}) {
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header style={options.headerStyle}>
      <Appbar.Content
        color={Colors.white}
        title={title}
        titleStyle={[options.headerTitleStyle]}
      />
      {route?.name === TODO_LIST ? (
        <Appbar.Action
          icon="logout"
          color={Colors.white}
          style={styles.icon}
          onPress={() => {
            navigation.replace(LOGIN);
          }}
        />
      ) : (
        <></>
      )}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.secondary,
  },
  icon: {
    fontSize: 20,
  },
});
export default CustomNavigation;
