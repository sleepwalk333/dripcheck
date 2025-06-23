// app/(tabs)/chat.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [userMessage, ...prev]);
    setInput('');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer DEIN_API_KEY`, // <== hier deinen OpenAI API Key einfügen
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: input }],
      }),
    });

    const data = await response.json();
    const botText = data.choices?.[0]?.message?.content || 'Fehler';

    const botMessage: Message = {
      id: Date.now().toString() + '-bot',
      text: botText,
      sender: 'bot',
    };

    setMessages((prev) => [botMessage, ...prev]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        inverted
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sender === 'user' ? styles.user : styles.bot,
            ]}
          >
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Schreib was..."
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Text style={{ color: 'white' }}>Senden</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  message: {
    marginVertical: 4,
    padding: 10,
    borderRadius: 8,
    maxWidth: '80%',
  },
  user: {
    backgroundColor: '#4b4b4b',
    alignSelf: 'flex-end',
  },
  bot: {
    backgroundColor: '#2a2a2a',
    alignSelf: 'flex-start',
  },
  text: { color: 'white' },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#1a1a1a',
  },
  input: {
    flex: 1,
    backgroundColor: '#333',
    color: 'white',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  sendBtn: {
    backgroundColor: '#555',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: 'center',
  },
});
