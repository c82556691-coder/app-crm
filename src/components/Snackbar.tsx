import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export default function Snackbar({ message, duration = 3000, onHide }: { message: string | null; duration?: number; onHide?: () => void }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (!message) return;
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 200, useNativeDriver: true })
    ]).start();

    const t = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 20, duration: 200, useNativeDriver: true })
      ]).start(() => onHide && onHide());
    }, duration);

    return () => clearTimeout(t);
  }, [message]);

  if (!message) return null;

  return (
    <Animated.View style={[styles.wrap, { opacity, transform: [{ translateY }]}]} pointerEvents="box-none">
      <TouchableOpacity activeOpacity={0.9} onPress={() => onHide && onHide()} style={styles.container}>
        <Text style={styles.text}>{message}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  container: {
    backgroundColor: '#323232',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    maxWidth: width - 48
  },
  text: { color: 'white' }
});
