import { View, Text, Button, Image, StyleSheet, TextInput, StatusBar,TouchableOpacity,RefreshControl } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import {  useEffect, useState } from 'react';
import LocalStorage from '../../localStorage';
import styles from '../../styles/styles';
import FlashMessage from "react-native-flash-message";

function LoginScreen({navigation}) {

    const [name, onChangeText] = useState("muh.nurali43@gmail.com");
    const [password, onChangePass] = useState("12345678");
    const [error1, onChangeError1] = useState(false);
    


    //verificar si ya esta logeado
    const verificaToken = async()=>{
      console.log('verificando token')
      
      let token = await LocalStorage.getItem('token')
      
      console.log('verificando token =',token)
      
      if (token != null){
        navigation.navigate('ListaTarea')
      }
    }
    
    let focusListener = null;
    
    focusListener = navigation.addListener('focus', () => {
    
      verificaToken()
    
    });

    useEffect(() => {
      verificaToken()
    
    }, [])

  //Falta la validacion
    const peticion =()=>{
    
        let url = 'https://todolist-node-production.up.railway.app/user/login';
        let data = {
          email: name,
          password: password
        };
  
        fetch(url, {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          
          let token = 'Bearer '+response.token
          if(response.token){
            LocalStorage.setItem('token',token)
            console.log('token =', token)
            console.log('inicio bien la sesion')
            navigation.navigate('ListaTarea')
          }else{
            console.log('No inicio la sesion')

          }
          
        });
         
        
    }
  
   return (
    <SafeAreaView style={styles.conteiner}>
  
    <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
    <View >
    <Image
              source={require('../../assets/elipse.png')}
              style={styles.circleImage}
          />
          <FlashMessage position="top" /> {/* <--- here as the last component */}
          <Text style={styles.textoWO2 }>Welcome Back!</Text>
  
     <View >
          <Image
            source={require('../../assets/login.png')}
            style={styles.image}
          />
          
          <TextInput
              placeholder="             Enter your e-mail"
              placeholderTextColor={'#585858'}
              style={{margin:10, width:350, height: 50, backgroundColor:'white', borderRadius:30, alignSelf: 'center',}}
              
              onChangeText={onChangeText}
              value={name}
              
              />
              {
                (error1) ? <Text style={{color:'red', alignSelf:'center'}}>error</Text> : null
              }
              
          
  
          <TextInput
              placeholder="              Confirm password"
              // value='12345678'
              placeholderTextColor={'#585858'}
              style={{margin:10, width:350, height: 50, backgroundColor:'white', borderRadius:30, alignSelf: 'center',}}
              
              onChangeText={onChangePass}
              value={password} 
              />
      </View>
      <Text style={styles.textoWOblu } >Forget Password</Text>
      
  
     <TouchableOpacity style={styles.buton}>
                  <Text 
                  style={{textAlign:'center', margin:15, color:'white', fontSize:20}} 
                  // onPress={() => navigation.navigate('Login')}
                  onPress={() => peticion()}
                    >Login
                  </Text>
      </TouchableOpacity>
     <Text style={{alignSelf:'center',margin:10}}>Don't have an account? <Text onPress={() => navigation.navigate('Register')} style={{color:'#5dc1b9'}}>Sign Up</Text></Text>
   </View>
   </SafeAreaView>
  
   );
  }

  

  export default LoginScreen;