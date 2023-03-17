import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteInLocalTodo,
  deleteTodo,
  resetState,
  updateInLocalTodo,
  updateTodo
} from '../features/todo/TodoSlice';

function Item({item}) {
  const [showDeleteDialog, setDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  const dispatch = useDispatch();
  const {deleteSuccess, updateSucess} = useSelector(state => state.todos);

  const {control, handleSubmit} = useForm({
    defaultValues: {
      title: item.title,
      completed: item.completed,
      id: item.id,
      userId: item.userId,
    },
  });

  // Hide delete delete dialog
  const hideDialog = () => {
    setDeleteDialog(false);
  };

  const hideUpdateDialog = () => {
    setShowUpdateDialog(false);
  };

  // To call delete api
  const onDelete = id => {
    dispatch(deleteTodo({id}));
    hideDialog();
  };

  // To handle local changes after delete
  useEffect(() => {
    if (deleteSuccess) {
      dispatch(deleteInLocalTodo());
      dispatch(resetState());
    }
  }, [deleteSuccess]);

  // To handle local changes after update
  useEffect(() => {
    if (updateSucess) {
      setShowUpdateDialog(false);
      dispatch(updateInLocalTodo());
      dispatch(resetState());
    }
  }, [updateSucess]);


  // handle update todo (updating text and updating the completed or not)
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

  return (
    <View
      style={
        item.completed ? [styles.item, styles.completedItem] : styles.item
      }>
      <View>
        {item.completed ? (
          <Pressable
            onPress={() =>
              handleUpdate({
                ...item,
                completed: false,
              })
            }>
            <MaterialCommunityIcons
              style={styles.icon}
              name="checkbox-marked-outline"
              size={20}
            />
          </Pressable>
        ) : (
          <Pressable
            onPress={() =>
              handleUpdate({
                ...item,
                completed: true,
              })
            }>
            <MaterialCommunityIcons
              style={styles.icon}
              name="checkbox-blank-outline"
              size={20}
            />
          </Pressable>
        )}
      </View>
      <Pressable
        onPress={() => setShowUpdateDialog(true)}
        style={styles.itemText}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={{
            fontWeight: '600',
            color: '#ffffff',
          }}>
          {item.title}
        </Text>
      </Pressable>
      <View style={styles.iconContainer}>
        <Pressable onPress={() => setDeleteDialog(true)}>
          <MaterialIcons style={styles.icon} name="delete" size={20} />
        </Pressable>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#645CBB',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginVertical: 4,
    borderRadius: 8,
  },
  itemText: {
    flex: 2,
    marginHorizontal: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completedItem: {
    backgroundColor: '#A084DC',
    borderColor: '#645CBB',
    borderWidth: 2,
  },
  icon: {
    color: '#ffffff',
  },
});

export default Item;
