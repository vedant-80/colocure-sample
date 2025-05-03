import React, { useState } from "react";
import { Text, View, Image, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";

const Index = () => {
  
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const validateName = (input: string) => {
    const regex = /^([A-Z]|[a-z])+ ([A-Z]|[a-z])+$/;
    setName(input);

    if (input.length == 0){
      setError("* Please enter name");
    } else if (!regex.test(input)){
      setError("* Please enter a first and last name");
    } else{
      setError("");
      router.push({pathname: "/email", params: {name}});
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{top: 100}}>
        <Image
          source={require("/home/vdnt/sample/assets/images/ColoCureFinalLogo.png")}  
          style={styles.image}
        />
        <Text style={styles.outerText}>Colo
          <Text style={styles.innerText}>Cure</Text>
        </Text>
        <Text style={{textAlign: 'center', marginTop: 70}}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="ex. John Doe"
          placeholderTextColor={'#828282'}
          value={name}
          onChangeText={setName}
          returnKeyType="done"
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => validateName(name)}
        >
          <Ionicons name="arrow-forward" size={24} color={'white'}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    position: "relative",
    width: 123,
    height: 123,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  outerText:{
    color:'#053E6F',
    fontFamily: "Pacifico_400Regular",
    fontSize: 32,
    alignSelf: 'center'
  },
  innerText:{
    color:'#25C2E0'
  },
  input: {
    height: 40,
    width: 300,
    borderWidth: 1,
    marginTop: 24,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    color: 'black',
    paddingLeft: 12
  },
  button: {
    height: 40,
    width:40,
    backgroundColor: '#053E6F',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'flex-end',
    marginTop:12
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 14,
  },

});

export default Index;