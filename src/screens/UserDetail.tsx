// src/screens/UserDetail.tsx
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import MapView, {Marker} from 'react-native-maps';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'UserDetail'>;

const UserDetail = ({route}: Props) => {
  const [user, setUser] = useState<any>(null);
  const {userId} = route.params;

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user:', error));
  }, [userId]);

  if (!user) {
    return <Text>Loading...</Text>;
  }

  const {name, email, phone, address} = user;
  const {lat, lng} = address.geo;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text>Email: {email}</Text>
      <Text>Phone: {phone}</Text>
      <Text>Address: {`${address.street}, ${address.city}`}</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        <Marker
          coordinate={{
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
          }}
          title={name}
          description={address.street}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  map: {
    flex: 1,
    marginTop: 20,
  },
});

export default UserDetail;
