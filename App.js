import { useState, useEffect } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { Box, Heading, NativeBaseProvider, Center, Image } from 'native-base'
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker'

export default function App() {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [response, setResponse] = useState({});
  const [stars, setStars] = useState(false);

  const handleChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate)
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  const showDatePicker = () => {
    showMode('date');
  }
  const getImage = async () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    let starryUrl = `https://api.nasa.gov/planetary/apod?api_key=d1IjMaxS0nc3bDZjuaP8ava66lSE0dnV5qAjrRco&date=${year}-${month}-${day}`
    let response = await axios.get(starryUrl);
    console.log(response.data);
    setResponse(response.data);
    setStars(true)
  }

  useEffect(() => {
    getImage()
  }, [date])

  return (
    <NativeBaseProvider>
      <Box>
        <SafeAreaView>
          <Center>
            <Heading>Celestial Inspiration</Heading>
            <Button onPress={showDatePicker} title='Pick A Date!' />
            {show && (
              <DateTimePicker
                value={date}
                mode={mode}
                onChange={handleChange}
              />
            )}
            {stars ?
              <Image source={{ uri: response.url }} alt={response.title} size='xl' /> : null
            }
          </Center>
        </SafeAreaView>
      </Box >
    </NativeBaseProvider>
  );
}

