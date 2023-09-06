import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface ConversationProps {
  sender?: string;
  subject?: string;
  description?: string;
  date?: string;
  onPress: () => void;
}

const Conversation: React.FC<ConversationProps> = ({
  sender = '',
  subject = '',
  description = '',
  date,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.conversationContainer}>
        <View style={styles.conversationData}>
          <Text numberOfLines={1} style={[styles.text, styles.title]}>
            {sender}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            {subject}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            {description}
          </Text>
        </View>
        <View style={styles.conversationDate}>
          <Text style={styles.text}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  conversationContainer: {
    flexDirection: 'row',
    color: 'white',
    marginBottom: 15,
    alignItems: 'flex-end',
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontFamily: 'Open Sans',
    fontSize: 15,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
  },
  conversationData: {
    flex: 1,
  },
  conversationDate: {
    width: 80,
    alignItems: 'flex-end',
  },
});

export default Conversation;
