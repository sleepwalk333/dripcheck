import React, { useState, useRef } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Constants from 'expo-constants';

const OPENAI_API_KEY = Constants.expoConfig?.extra?.OPENAI_API_KEY;

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hey, was kann ich für dich tun?' }
  ]);
  const [input, setInput] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content:
                'Du bist ein hilfreicher Mode-Experte. Deine Aufgabe ist es, dem Nutzer dabei zu helfen, Kleidungsstücke und Marken zu finden, die zu seinem persönlichen Stil passen. \
Du stellst gezielte Rückfragen, um seinen Geschmack besser zu verstehen. \
Du bist spezialisiert auf aktuelle und vergangene Modetrends, Marken und Designer. \
Wenn der Nutzer über andere Themen wie Technik, Fahrräder oder Sport redet, leite ihn freundlich zurück zu Mode-Themen. \
Du bist sein digitaler Stylist und Einkaufsberater.',
            },
            { role: 'user', content: userMessage.text },
          ],
        }),
      });

      const data = await res.json();
      const botReply = data.choices?.[0]?.message?.content;

      if (botReply) {
        setMessages(prev => [...prev, { from: 'bot', text: botReply }]);
      }
    } catch (err) {
      console.error('AI Error:', err);
    }

    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <View style={styles.container}>
        <ScrollView ref={scrollViewRef} style={styles.chat}>
          {messages.map((msg, index) => (
            <View key={index} style={[styles.bubble, msg.from === 'user' ? styles.user : styles.bot]}>
              <Text style={styles.text}>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Schreib was..."
            placeholderTextColor="#888"
            style={styles.input}
          />
          <Pressable onPress={sendMessage} style={styles.button}>
            <Text style={styles.buttonText}>Senden</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  chat: { padding: 10 },
  bubble: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#888',
  },
  bot: {
    alignSelf: 'flex-start',
    backgroundColor: '#333',
  },
  text: { color: 'white' },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#000',
    borderTopWidth: 0,
  },
  input: {
    flex: 1,
    color: 'white',
    backgroundColor: '#111',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 42,
  },
  button: {
    backgroundColor: '#333', // <- Neue Farbe wie Bot-Bubble
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
    height: 42,
  },
  buttonText: { color: 'white', fontWeight: '600' },
});
