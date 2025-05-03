import React, { useEffect, useRef, useState } from "react";
import { Text, View, Image, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import * as SQLite from 'expo-sqlite';

const Email = () => {
  const { name } = useLocalSearchParams();
  const fullName = typeof name === "string" ? name.trim() : name?.join(" ").trim();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Use ref to store the database instance
  const dbRef = useRef<SQLite.SQLiteDatabase | null>(null);

  // Create the database
  useEffect(() => {
    const createTable = async () => {
      try {
        // Open the database and store it in the ref
        dbRef.current = await SQLite.openDatabaseAsync("users");
        
        await dbRef.current.execAsync(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT
          );
        `);
        console.log("✅ users table ensured");
      } catch (error) {
        console.error("❌ Error creating table:", error);
      }
    };

    createTable();
  }, []);

  const validateEmail = async (input: string) => {
    const regex = /^([A-Z]|[a-z])+@([A-Z]|[a-z])+\.([A-Z]|[a-z])+$/;
    setEmail(input);

    if (input.length == 0){
      setError("* Please enter email");
    } else if (!regex.test(input)){
      setError("* Please enter a valid email address");
    } else{
      setError("");
      if (dbRef.current) {
        await dbRef.current.runAsync(
          'INSERT INTO users (name, email) VALUES (?, ?)',
          [fullName, input]
        );

        console.log("✅ User inserted");
        router.push("/success")
      }
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
        <Text style={{textAlign: 'center', marginTop: 70}}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="ex. johndoe@gmail.com"
          placeholderTextColor={'#828282'}
          value={email}
          onChangeText={setEmail}
          returnKeyType="done"
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity
          style={styles.button}
          onPress={() => validateEmail(email)}
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
  }

});

export default Email;