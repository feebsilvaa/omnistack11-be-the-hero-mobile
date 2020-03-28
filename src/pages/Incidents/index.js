import React from 'react';
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {

  const navigation = useNavigation();

  const navigateToDetail = () => {
    navigation.navigate('Detail');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>0 casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem Vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e seja um Herói!</Text>

      <FlatList
        style={styles.incidentList}
        data={[1, 2, 3, 4, 5]}
        keyExtractor={incident => String(incident)}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View style={styles.incident}>
          <Text style={styles.incidentProperty}>ONG:</Text>
          <Text style={styles.incidentValue}>Laborum nulla sit et esse amet commodo id excepteur.</Text>

          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>Est do pariatur laboris irure consectetur excepteur quis. Cillum exercitation Lorem adipisicing deserunt cillum mollit non officia ex consectetur veniam in in nostrud. Ad non eu excepteur ullamco velit culpa voluptate adipisicing minim dolore magna. Sunt irure nostrud minim aliquip occaecat tempor consectetur. Minim duis id fugiat reprehenderit sint aute irure cillum do occaecat. Lorem ex culpa amet officia cupidatat reprehenderit incididunt elit consectetur mollit veniam irure. Consectetur consectetur ut aute sint sunt sint esse eu adipisicing pariatur.</Text>
          
          <Text style={styles.incidentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}>R$ 120,00</Text>

          <TouchableOpacity 
            style={styles.detailsButton}
            onPress={navigateToDetail}>
            <Text style={styles.detailsButtonText}> Ver mais detalhes</Text>
            <Feather name="arrow-right" size={16} color="#e02041"></Feather>
          </TouchableOpacity>
        </View>
        )}
      />
    </View>
  );
}