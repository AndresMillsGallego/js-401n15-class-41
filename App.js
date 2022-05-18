import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, NativeBaseProvider, Center, Image, Button, Stack, Text, ScrollView, Link, HStack, Divider, Spinner } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker'

export default function App() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [response, setResponse] = useState({});
  const [stars, setStars] = useState(false);

  const handleChange = (event, selectedDate) => {
    console.log(date)
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate)
    setTimeout(() => {
      setStars(true)
    }, 1500)
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  const showDatePicker = () => {
    showMode('date');
  }
  const getImage = async () => {
    console.log(date)
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    let starryUrl = `https://api.nasa.gov/planetary/apod?api_key=d1IjMaxS0nc3bDZjuaP8ava66lSE0dnV5qAjrRco&date=${year}-${month}-${day}`
    try {
      let response = await axios.get(starryUrl);
      console.log(response.data);
      setResponse(response.data);
    } catch (error) {
      console.log('Response: ', response, 'Error: ', error.message)
    }
  }
  
  // const handleReset = () => {
  //   setStars(false)
  //   showDatePicker()
  // }

  useEffect(() => {
    getImage()
  }, [date])

  const config = {
    dependencies: {
      "linear-gradient": LinearGradient
    }
  };

  return (

    <NativeBaseProvider config={config}>
      <Box
        bg={{
          linearGradient: {
            colors: ["lightBlue.300", "violet.800"],
            start: [0, 0],
            end: [1, 0]
          }
        }}
        safeAreaTop={20}
        pt='25'
        h='1000'
      >
        <Center>
          {!stars ?
            <Box mt='10'>
              <Heading color='amber.200' >Celestial Calendar</Heading>
              <Divider bgColor='danger.300' mb='5'/>
              <Button onPress={showDatePicker} title='Pick A Date!' size='lg' my='10'>Pick A Date!</Button>
              {show && (
                <DateTimePicker
                  value={date}
                  mode={mode}
                  onChange={handleChange}
                  minimumDate={new Date(1995, 5, 16)}
                  maximumDate={Date.now()}
                />
              )}
                <Link href='https://github.com/AndresMillsGallego' _text={{color: 'pink.200', margin: 'auto'}} >My GitHub</Link>
            
            </Box> : null
          }

          {stars ?
            <Box
              p='5'
            >
              <ScrollView>
                <Center>
                  <Heading size='lg' bold color='cyan.200' pb='5'>{response.title}</Heading>
                  <Divider bgColor='danger.300' mb='5'/>
                  {response.url ? 
                  <Image source={{ uri: response.url }} alt={response.title} size='500' rounded='lg' pb='5' />
                  : <Spinner size='sm'/>
                  }
                </Center>
                <Stack p='2' space={2}>
                  <Divider bgColor='danger.300' mt='5' m='auto'/>
                  <Text color='indigo.100' textAlign='center' fontSize='md'>{response.explanation}</Text>
                  <Divider bgColor='danger.300' w='125' m='auto'/>
                  {response.copyright?
                  <Text color='purple.300' textAlign='center'>©{response.copyright}</Text>
                  : null
                  }
                  <HStack justifyContent='center' space={4}>
                    <Text textAlign='center' color='indigo.100'>{response.date}</Text>
                    <Divider bgColor='danger.300' orientation='vertical' />
                    <Link href='https://www.nasa.gov/' _text={{color: 'cyan.200'}}>Visit NASA</Link>
                  </HStack>
                  <Button onPress={() => setStars(false)} mb='20'>Search The Skies......</Button>
                </Stack>
              </ScrollView>
            </Box>
            : null
          }
        </Center>
      </Box >
    </NativeBaseProvider>

  );
}

