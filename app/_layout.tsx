import { Stack } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native';
import { useFonts } from '@expo-google-fonts/pacifico/useFonts';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico/400Regular';
import * as SQLite from 'expo-sqlite';

export default function Layout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Fake loading time
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 4500); // 8 seconds splash

    return () => clearTimeout(timer);
  }, []);

  const rect1 = useRef(new Animated.Value(0.5)).current;
  const rect2 = useRef(new Animated.Value(0.5)).current;
  const rect3 = useRef(new Animated.Value(0.5)).current;
  const rect4 = useRef(new Animated.Value(1)).current;
  const rect4Down = useRef(new Animated.Value(1)).current;
  const rect5 = useRef(new Animated.Value(120)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(1000),
      Animated.timing(rect1, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
        easing: Easing.bezier(0.42, 0, 1, 1)
      }), 
      Animated.timing(rect2, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.linear
      }),
      Animated.timing(rect3, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.linear
      }),
      Animated.timing(rect4, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
        easing: Easing.bezier(0, 0, 0.58, 1)
      }),
      Animated.timing(rect5, {
        toValue: 280,
        duration: 500,
        useNativeDriver: false,
        easing: Easing.cubic
      }),
    ]).start();
  }, []);

  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!isReady || !fontsLoaded) { 
    return (
      <View style={styles.splash}>
        <Image
          style={styles.image}
          source={require("/home/vdnt/sample/assets/images/ColoCureFinalLogo.png")}  
        />
        <Text style={styles.outerText}>Colo
          <Text style={styles.innerText}>Cure</Text>
        </Text>
        <Animated.View
          style={[styles.rect, styles.rect1, {transform: [{scaleY: rect1}]}]}
        />
        <Animated.View
          style={[styles.rect, styles.rect2, {transform: [{scaleX: rect2}]}]}
        />
        <Animated.View
          style={[styles.rect, styles.rect3, {transform: [{scaleY: rect3}]}]}
        />
        <Animated.View
          style={[styles.rect, styles.rect4, {transform: [{scaleX: rect4}, {scaleY: rect4}]}]}
        />
        <Animated.View
          style={[styles.rect, styles.rect5, {left: rect5}]}
        />
      </View>
    );
  }

  // Normal app navigation
  return <Stack screenOptions={{headerShown: false}}/>;
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  outerText:{
    color:'#053E6F',
    fontFamily: "Pacifico_400Regular",
    fontSize: 32
  },
  innerText:{
    color:'#25C2E0'
  },
  rect:{
    backgroundColor: '#F5F5F5',
    position: 'absolute',
  },
  rect1:{
    height: 315,
    width: 55,
    left: 100,
    top: 300,
    transformOrigin: 'top'
  },
  rect2: {
    height: 55,
    width: 250,
    left: 30,
    top: 300,
    transformOrigin: 'right'
  },
  rect3:{
    height: 200,
    width: 60,
    left: 220,
    top: 255,
    transformOrigin: 'bottom'
  },
  rect4: {
    //backgroundColor: 'black',
    height: 90,
    width: 75,
    left: 155,
    top: 405,
    borderRadius: 40,
    transformOrigin: 'bottom'
  },
  rect5: {
    height: 40,
    width: 150,
    left: 120,
    top: 500,
    transformOrigin: 'bottom'
  },
});