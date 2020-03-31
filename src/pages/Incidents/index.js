import React, { useEffect, useState } from 'react';
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, FlatList, Image, Text, TouchableOpacity, ToastAndroid, Alert, ActivityIndicator } from 'react-native';

import logoImg from '../../assets/logo.png';

import styles from './styles';

import api from '../../services/api'

export default function Incidents() {

  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const createTwoButtonAlert = (title, message, onCancel, onAccept, cancelable) =>
    Alert.alert(
      title,
      message,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: cancelable }
    );

  const loadIncidents = () => {
    if(loading)
      return;
    if(total > 0 && incidents.length === total)
      return;
    setLoading(true);
    api.get('/incidents', {
      params: { page }
    }).then((res) => {
      setIncidents([...incidents, ...res.data.page.content ]);
      setTotal(res.data.page.info.total);
      setPage(page + 1);
      setLoading(false);
    }).catch((err) => {
      createTwoButtonAlert('Ops', "Erro de comunicação com o servidor. Recarregue a página para tentar novamente.", null, null, false);
      setLoading(false);
    });
  }

  const navigateToDetail = (incident) => {
    navigation.navigate('Detail', { incident });
  }

  useEffect(loadIncidents, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem Vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e seja um Herói!</Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.incident.id)}
        showsVerticalScrollIndicator={true}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item }) => (
          <View style={styles.incident}>
          <Text style={styles.incidentProperty}>ONG:</Text>
          <Text style={styles.incidentValue}>{item.incident.ong.name}</Text>

          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>{item.incident.title}</Text>
          
          <Text style={styles.incidentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}>
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
              .format(item.incident.value)}
          </Text>

          <TouchableOpacity 
            style={styles.detailsButton}
            onPress={() => navigateToDetail(item.incident)}>
            <Text style={styles.detailsButtonText}> Ver mais detalhes</Text>
            <Feather name="arrow-right" size={16} color="#e02041"></Feather>
          </TouchableOpacity>
        </View>
        )}
      />
    </View>
  );
}