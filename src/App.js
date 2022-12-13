import JsEncrypt from 'jsencrypt';
import raw from '../src/hybrid-public.pem';
import publickey from './thirdpartypublic'
import data, { request } from './data';
import { useEffect,useState } from 'react';

const styles = {

  button_style:{
  width:250,
  height:50,
  backgroundColor:"#DC4441",
  color:'white',
  alignContent:'center',
  justifyContent:'center',
  marginLeft:100  
  },
  copy_button_style:{
    width:250,
    height:50,
    backgroundColor:"skyblue",
    color:'white',
    alignContent:'center',
    justifyContent:'center',
    marginLeft:100 ,
    marginTop:30 
    }
}
function App() {
  const [token,setToken] = useState("");
  const [param,setParams] = useState([]);

  var pubKey;
  function encryptMsg() {

    const value = request.fm_production
    const textEncrypt = JSON.stringify(value);
    setParams(textEncrypt);
    var encrypt = new JsEncrypt();
    encrypt.setPublicKey(pubKey);

    const token = encrypt.encrypt(textEncrypt);
    console.log( token);
    setToken(token);

  }

  useEffect(() => {

    fetch(publickey)
      .then(r => r.text())
      .then(content => {
        pubKey = content;
      });

  })

  return (
    <div className="App" style={{padding:'25px',margin:'auto',width:'50%',display:'flex', flexDirection:'column' ,justifyContent:'center',alignContent:'center'}}>
      <p style={{paddingLeft:40}}> Generated Token </p>
      <textarea type="text" value={token} style={{width:"500px",height:'300px',margin:30}} />
      <button onClick={encryptMsg} style={styles.button_style}>Generate ThridParty Token </button>
      <button onClick={() => {
         if(!token){
          return;
         }
        navigator.clipboard.writeText(token); alert("copied to clipboard")}}
              style={styles.copy_button_style}>Copy Token </button>
    </div>
  )
}

export default App;
