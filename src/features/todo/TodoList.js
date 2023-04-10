import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import {Button, Dialog, Portal, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
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
import {launchCamera} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import {
  UPLOAD_DOC,
  UPLOAD_DOC_BUTTON,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_BUTTON,
} from '../../AccessibilityConstants';

function TodoList({navigation}) {
  const {todos, isLoading, updateSucess, deleteSuccess} = useSelector(
    state => state.todos,
  );
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

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

  const handleDeleteDialog = id => {
    setDeleteDialog(true);
    setDeleteId(id);
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
      setDeleteId(null);
    }
  }, [deleteSuccess]);

  // To call delete api
  const onDelete = () => {
    dispatch(deleteTodo({deleteId}));
    hideDialog();
  };

  // Hide delete delete dialog
  const hideDialog = () => {
    setDeleteDialog(false);
  };

  const handleImagePicker = () => {
    launchCamera(
      {
        maxHeight: 200,
        maxWidth: 200,
      },
      value => {
        if (value?.assets) {
          RNFS.readFile(value?.assets[0]?.uri, 'base64').then(result => {
            const data = {
              Data: result,
              file_name: value.assets[0]?.fileName,
              file_url: value.assets[0]?.uri,
            };

            setUploadedImage(data);
          });
        }
      },
    );
  };

  const handleDocumentPicker = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        allowMultiSelection: false,
      });

      console.log(response.name);
      setUploadedFile(response.name);
    } catch (e) {
      console.log('error');
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size={56} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Button
          accessible={true}
          accessibilityLabel={UPLOAD_IMAGE_BUTTON}
          testID={UPLOAD_IMAGE_BUTTON}
          onPress={handleImagePicker}>
          Upload Image
        </Button>
      </View>

      {uploadedImage && (
        <View>
          <Text
            accessible={true}
            accessibilityLabel={UPLOAD_IMAGE}
            testID={UPLOAD_IMAGE}>
            {' '}
            image uploaded {uploadedImage?.file_name}
          </Text>
        </View>
      )}
      <View>
        <Button
          accessible={true}
          accessibilityLabel={UPLOAD_DOC_BUTTON}
          testID={UPLOAD_DOC_BUTTON}
          onPress={handleDocumentPicker}>
          Upload Document
        </Button>
      </View>
      {uploadedFile && (
        <View>
          <Text
            accessible={true}
            accessibilityLabel={UPLOAD_DOC}
            testID={UPLOAD_DOC}>
            {' '}
            File uploaded {uploadedFile}
          </Text>
        </View>
      )}

      <InputContainer />
      <View style={styles.itemContainer}>
        {todos.length > 0 ? (
          <FlatList
            data={todos}
            renderItem={({item}) => (
              <Item
                item={item}
                handleUpdateDialog={() => handleShowUpdateDialog(item)}
                handleDelete={() => handleDeleteDialog(item.id)}
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
            <Button onPress={() => onDelete()}>Yes</Button>
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
    marginTop: '5%',
  },
  itemContainer: {
    marginTop: 16,
    height: '60%',
  },
});

export default TodoList;
