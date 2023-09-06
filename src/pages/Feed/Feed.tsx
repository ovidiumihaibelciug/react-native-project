import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Conversation from '../../components/Conversation/Conversation';
import {getUserFeed} from '../../utilities/api';
import {_retrieveData} from '../../utilities/functions';
import {ConversationType} from '../../utilities/types';

interface HomeProps {
  navigation: any;
}

const Home: React.FC<HomeProps> = ({navigation}) => {
  const [items, setItems] = useState<ConversationType[]>([]);
  const globalStyle = {
    flex: 1,
    backgroundColor: '#151515',
    color: 'white',
  };

  useEffect(() => {
    const loadData = async () => {
      const user = await _retrieveData();

      getUserFeed(user?.id)
        .then(({data}) => {
          setItems(data);
        })
        .catch(err => {
          console.log(err.response);
        });
    };

    loadData();
  }, []);

  return (
    <SafeAreaView style={globalStyle}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={homeStyles.conversations}>
          {items.map(item => {
            return (
              <Conversation
                key={item?.id}
                sender={item.users.join(' & ')}
                subject={item?.subject}
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores totam explicabo nesciunt impedit vero. Veritatis!"
                date="12:49"
                onPress={() => {
                  navigation.navigate('Chat', {id: item?.id});
                }}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const homeStyles = StyleSheet.create({
  conversations: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default Home;
