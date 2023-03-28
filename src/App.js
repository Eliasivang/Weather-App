import { Container, Typography, Box, TextField, Button } from '@mui/material'
import { useState } from 'react';
import axios from 'axios';
import './App.css'
import Loader from './Loader';


function App() {
  
  const [input,setInput] = useState('');
  const [loading, setLoading] = useState(false);
 const [error,setError] = useState({
    error: false,
    message: "",
 });
 const [weather,setWeather] = useState({
        city: "",
        country: "",
        temp: "",
        icon: "",
        conditionText: "",
 })
 
    const handleSubmit = async (e)=>{
      e.preventDefault();
      setError(false)
      try {
        if(!input.trim()) throw {message: "Complete the city"}
        setLoading(true)
        const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${input}&aqi=no`;
        const response =  await axios.get(url)
        setTimeout(() => {
          setLoading(false)
          setWeather({
            country:response.data.location.country.split(" ").slice(0,2).join(" ") ,
            city: response.data.location.name,
            temp:response.data.current.temp_c,
            icon:response.data.current.condition.icon,
            conditionText: response.data.current.condition.text,
          })
        }, 2000);
        
      } catch (error) {
        setError({
          error:true,
          message: error.message
        })
        console.log(error)
      } 
    }
  
  
 
  return (
    <div className="App">
      <Container
      maxWidth = "sm" sx ={{bgcolor: "#EAEAEA", py:2 , my: 2, borderRadius: 4 , boxShadow : 6  }} >
          <Typography
          variant='h1'
          component="h1"
          fontSize={65}
          fontWeight= {300}
          fontFamily = {'Comfortaa'}
          align='center'
          gutterBottom>
          Weather App
          </Typography>
          <Box
          sx={{display: "grid" , gap: 2 }}
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
          >
          <TextField id='city' label='City' variant='outlined' onChange = {(e)=> setInput(e.target.value)} value = {input} helperText = {error.message} error= {error.error}/>
            
          <Button type= "submit" variant="contained">search
          </Button>
          
          </Box>
          {loading ? <Loader/> : weather.city &&
          <Box sx= {{ my: 3 }}>
            <Typography textAlign="center" variant='h3' >{weather.city}, {weather.country}</Typography>
            <Box sx={{display: 'flex', justifyContent: "center"
            }}>
              <Box
                component={"img"}
                src={weather.icon} 
                alt="icon"/>
            </Box>   
            <Typography fontWeight={600}   textAlign="center" variant='h3' >{weather.temp}°C      opoadpa</Typography>
            <Typography textAlign="center" variant='h3' >{weather.conditionText}</Typography>
          </Box>
          }
          
      </Container>
    </div>
  )
}

export default App
