import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import InputContainer from '../../components/InputContainer';
import Item from '../../components/Item';
import {
  deleteInLocalTodo,
  deleteTodo,
  fetchTodos,
  resetState,
  updateInLocalTodo,
  updateTodo,
} from './TodoSlice';

function TodoList({navigation}) {
  const {todos, isLoading, updateSucess, deleteSuccess} = useSelector(
    state => state.todos,
  );
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setDeleteDialog] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const hideUpdateDialog = () => {
    setShowUpdateDialog(false);
  };

  const {control, handleSubmit, setValue} = useForm({
    defaultValues: {
      title: null,
      completed: null,
      id: null,
      userId: null,
    },
  });

  const handleUpdate = data => {
    dispatch(
      updateTodo({
        ...data,
      }),
    );
  };

  // React hook form submit handle here
  const onSubmit = data => {
    handleUpdate(data);
  };

  const handleShowUpdateDialog = item => {
    setValue('title', item.title);
    setValue('completed', item.completed);
    setValue('id', item.id);
    setValue('userId', item.userId);
    setShowUpdateDialog(true);
  };

  // To handle local changes after update
  useEffect(() => {
    if (updateSucess) {
      setShowUpdateDialog(false);
      dispatch(updateInLocalTodo());
      dispatch(resetState());
    }
  }, [updateSucess]);

  // To handle local changes after delete
  useEffect(() => {
    if (deleteSuccess) {
      dispatch(deleteInLocalTodo());
      dispatch(resetState());
    }
  }, [deleteSuccess]);

  // To call delete api
  const onDelete = id => {
    dispatch(deleteTodo({id}));
    hideDialog();
  };

  // Hide delete delete dialog
  const hideDialog = () => {
    setDeleteDialog(false);
  };

  return (
    <View style={styles.container}>
      <InputContainer />
      <View style={styles.itemContainer}>
        {todos.length > 0 ? (
          <FlatList
            data={todos}
            renderItem={({item}) => (
              <Item
                item={item}
                handleUpdateDialog={() => handleShowUpdateDialog(item)}
                handleDelete={() => setDeleteDialog(true)}
                handleCompleted={() => handleUpdate({...item, completed: true})}
                handlePending={() => handleUpdate({...item, completed: false})}
              />
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <View>
            <Text>Your todo list is empty. Please add some todos.</Text>
          </View>
        )}
      </View>
      <Portal>
        <Dialog visible={showUpdateDialog} onDismiss={hideUpdateDialog}>
          <Dialog.Title>Update Todo</Dialog.Title>
          <Dialog.Content>
            <Controller
              name="title"
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  mode="outlined"
                  placeholder="Write your todo..."
                  value={value}
                  onChangeText={value => onChange(value)}
                  name="title"
                  style={styles.input}
                />
              )}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideUpdateDialog}>Cancel</Button>
            <Button onPress={handleSubmit(onSubmit)}>Update</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog visible={showDeleteDialog} onDismiss={hideDialog}>
          <Dialog.Title>Do you want to delete?</Dialog.Title>
          <Dialog.Content>
            <Text>By clicking on OK it will delete the todo.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={() => onDelete(item.id)}>Yes</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
