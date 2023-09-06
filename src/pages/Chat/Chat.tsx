import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  TouchableOpacity,
  ActionSheetIOS,
} from 'react-native';

import {StyleSheet} from 'react-native';
import {_retrieveData} from '../../utilities/functions';
import {getChatMessages, sendMessage} from '../../utilities/api';
import {ChatMessage} from '../../utilities/types';
import {ScrollView} from 'react-native-gesture-handler';

export const styles = StyleSheet.create({
  chatscreen: {
    backgroundColor: '#151515',
    flex: 1,
    padding: 10,
    position: 'relative',
  },
  chatheading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  chattopContainer: {
    backgroundColor: '#151515',
    height: 70,
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  chatheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatlistContainer: {
    paddingHorizontal: 10,
  },
  chatemptyContainer: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatemptyText: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingBottom: 30,
  },
  messagingscreen: {
    flex: 1,
    backgroundColor: '#151515',
  },
  messaginginputContainer: {
    width: '100%',
    // minHeight: 100,
    // backgroundColor: 'red',
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  messaginginput: {
    borderWidth: 1,
    padding: 10,
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
    color: '#696969',
    borderColor: '#242424',
  },
  messagingbuttonContainer: {
    width: '15%',
    fontSize: 14,
    backgroundColor: '#5200FF',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mmessageWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  mmessage: {
    maxWidth: '50%',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 2,
    backgroundColor: '#242424',
  },
  mvatar: {
    marginRight: 5,
  },
  cchat: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: 'red',
    height: 80,
    marginBottom: 10,
  },
  cavatar: {
    marginRight: 15,
  },
  cusername: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  cmessage: {
    fontSize: 14,
    opacity: 0.7,
  },
  crightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  ctime: {
    opacity: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: '#151515',
  },
  messageText: {
    color: 'white',
  },
});

function MessageComponent({item, user}: any) {
  const status = item.user !== user;

  const handleLongPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Copy', 'Forward', 'Bookmark', 'Close'],
        title: 'Hey',
        message: 'What do you want to do now?',
      },
      buttonIndexThatSelected => {},
    );
  };

  return (
    <TouchableOpacity onLongPress={handleLongPress}>
      <View>
        <View
          style={
            status
              ? styles.mmessageWrapper
              : [styles.mmessageWrapper, {alignItems: 'flex-end'}]
          }>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={
                status
                  ? styles.mmessage
                  : [styles.mmessage, {backgroundColor: '#5200FF'}]
              }>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

interface ChatProps {
  route: any;
  navigation: any;
}

const Chat: React.FC<ChatProps> = ({route}) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');
  const scrollViewRef = useRef();

  const {id} = route.params;

  const loadData = async () => {
    const newUser = await _retrieveData();

    setUser(newUser?.name);
  };

  useEffect(() => {
    loadData();

    getChatMessages(id)
      .then(({data}) => {
        setChatMessages(
          data?.map(item => {
            return {...item, user: item?.sender, time: item?.created_at};
          }),
        );
      })
      .catch(err => {
        console.log(err.response);
      });
  }, [id]);

  const handleNewMessage = async () => {
    const sender = user;

    setMessage('');

    sendMessage({chatId: id, data: {chat_id: id, sender, text: message}})
      .then(({data}) => {
        const newMessage = data?.data?.message;

        setChatMessages([
          ...chatMessages,
          {
            ...newMessage,
            user: newMessage?.sender,
            time: newMessage?.created_at,
          },
        ]);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <View style={styles.messagingscreen}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: false})
        }
        style={[
          styles.messagingscreen,
          {paddingVertical: 15, paddingHorizontal: 10},
        ]}>
        {chatMessages.map(item => {
          return <MessageComponent item={item} user={user} />;
        })}
      </ScrollView>

      <View style={styles.messaginginputContainer}>
        <TextInput
          style={styles.messaginginput}
          value={message}
          onChangeText={value => setMessage(value)}
        />
        <Pressable
          style={styles.messagingbuttonContainer}
          onPress={handleNewMessage}>
          <View>
            <Text style={{color: '#f2f0f1', fontSize: 14}}>SEND</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Chat;
