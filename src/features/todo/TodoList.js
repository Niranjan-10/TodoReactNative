import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTodos} from './TodoSlice';
import Item from '../../components/Item';
import InputContainer from '../../components/InputContainer';

function TodoList({navigation}) {
  const {todos, isLoading} = useSelector(state => state.todos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <View style={styles.container}>
      <InputContainer />
      <View style={styles.itemContainer}>
        {todos.length > 0 ? (
          <FlatList
            data={todos}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={item => item.id}
          />
        ) : (
          <View>
            <Text>Your todo list is empty. Please add some todos.</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 14,
    marginTop: '20%',
  },
  itemContainer: {
    marginTop: 16,
    height: '60%',
  },
});

export default TodoList;
