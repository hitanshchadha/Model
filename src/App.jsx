import React from 'react'
import { useState } from 'react'
import './App.css'
import Table from 'react-bootstrap/Table';

import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import bits from './assets/University_Logo_AllCampuses.png'
import hero from './assets/Project OverviewOne-Pager Professional Docs Banner in Black White Sleek Monochrome Style.png'
import MultiSelect from 'react-bootstrap-multiselect';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import dist from "./assets/csvjson.json"
import Papa from 'papaparse';



function App() {
  const crops = ['Wheat','Rice','Soya']
  
 
  const [distName, setdistName] = React.useState([]);
  const [cropName, setcropName] = React.useState();
  const [data, setData] = useState("");
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState();

  const handleChange = (event,key) => {
    const itemKey = key.key.slice(2); //Removes the .$ from the key.
    console.log(itemKey)
    const {
      target: { value},
    } = event;
    setData2(value);
    setdistName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
 

  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setcropName(
      typeof value === 'string' ? value.split(',') : value,
    );
   
    
  };
  
  const params={
    "numbers": data2,
  }
  

  const call = ()=>{
    var hi="numbers"
    axios.post("https://cors-anywhere.herokuapp.com/http://coeai4agri.bits-pilani.ac.in/cyp_satran/",params, {headers: {
      'content-type': 'application/json',
   },
})
  .then(function (response) {
    console.log(response.data);
    console.log(Papa.parse(response.data));
    Papa.parse(response.data, {
      complete: (result) => {
          setData1(result.data);
      },
      header: true,
  });
  })
  .catch(function (error) {
    console.log(error);
  });
    }
    
  return (
    <>
    
    <Navbar  className='navbar' data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home"><img src={bits} alt="" height={80} /></Navbar.Brand>
          <Nav className="me-auto">
          </Nav>
        </Container>
      </Navbar>

    <div className="middle">
      <img src={hero} className='hero-img' height={300} alt="" />
      <h1 style={{marginTop:20}}>Make AI in India and Make AI work for India</h1>
      </div>
      <div className='dropdown-container'>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>Crop Name</InputLabel>
        <Select
          value={cropName??""}
          onChange={(event)=>{handleChange2(event)
            setData(event.target.value)
          }}
          input={<OutlinedInput label="Crop Name" />}
          defaultValue={""}

          
          
        >
          
          {crops.map((crops) => (
            
            <MenuItem value={crops} >
              {crops}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      
  

    <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">District</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={distName}
          onChange={handleChange}
          input={<OutlinedInput label="District Name" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={{
            MenuListProps: {
              sx: {
                "li.MuiButtonBase-root": {
                  display: "flex",
                  flexDirection: "row",
                },
              },
            },
          }}
        >
          {dist.map((dist) => (
            <MenuItem key={dist.DistrictID} value={dist.DistrictID}>
              <Checkbox checked={distName.indexOf(dist.DistrictID) > -1} />
              <ListItemText primary={dist.DistrictName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>


    <Button className='search' onClick={call}> Search</Button>
    </div>
    


          <div className="sec-2">
    <Table className='table' striped bordered hover>
      <thead>
        <tr>
          <th>District ID</th>
          <th>District Name</th>
          <th>Actual</th>
          <th>Predicted</th>
        </tr>
      </thead>
      <tbody>
        {data1.map((data1)=>{return(<><tr><td>{data1.DistrictID}</td><td>{data1.DistrictName}</td><td>{data1.Actual}</td><td>{data1.Predicted}</td></tr></>);})}
      </tbody>
    </Table>
    {data==="Wheat"?<>
    <iframe title="Wheat Producing Districts" aria-label="Map" id="datawrapper-chart-yFKAB" src="https://datawrapper.dwcdn.net/yFKAB/1/" scrolling="no" frameborder="0" style={{"width": 500, "min-width": 100  ,"height":800}}></iframe>
    {!function(){window.addEventListener("message",(function(a){if(void 0!==a.data["datawrapper-height"]){var e=document.querySelectorAll("iframe");for(var t in a.data["datawrapper-height"])for(var r=0;r<e.length;r++)if(e[r].contentWindow===a.source){var i=a.data["datawrapper-height"][t]+"px";e[r].style.height=i}}}))}()}
    </>
    :<></>}
    {data==="Rice"?<>
      <iframe title="Rice Producing Districts" aria-label="Map" id="datawrapper-chart-TumWF" src="https://datawrapper.dwcdn.net/TumWF/1/" scrolling="no" frameborder="0" style={{"width": 500, "min-width": 100," height":800}}></iframe><script type="text/javascript">{!function(){"use strict";window.addEventListener("message",(function(a){if(void 0!==a.data["datawrapper-height"]){var e=document.querySelectorAll("iframe");for(var t in a.data["datawrapper-height"])for(var r=0;r<e.length;r++)if(e[r].contentWindow===a.source){var i=a.data["datawrapper-height"][t]+"px";e[r].style.height=i}}}))}()}
      </script>
    </>
    :<></>}
    </div>
    <h1>ADVISORY</h1>
    <div className='middle' style={{padding:10, fontSize:20, textAlign:'left'
    }}>
    <h3>Higher Yield prediction</h3>
<b>Expected Conditions:</b> <br /> Our model indicates a higher-than-average yield for your crops this
season. This could be due to favorable weather conditions, improved farming practices, or
better seed quality. <br />
<b style={{textAlign:'left'}}>Advisory:</b><br />
<div style={{marginLeft: 50, marginRight: 50}}>
● Plan for Storage: With higher yields, it's essential to plan for adequate storage to
prevent post-harvest losses. Ensure your storage facilities are clean, dry, and pest-free. <br />
● Market Strategy: Consider the possibility of price fluctuations due to increased supply. <br />
● Value Addition: Explore opportunities for value addition, such as processing or
packaging, to increase your returns from the higher yield. <br />
</div>
<h3>Lower Yield Prediction</h3>
<b>Expected Conditions:</b> <br /> Our model has predicted a lower-than-average yield this season,
possibly due to adverse weather conditions, pest infestations, or other factors. <br />
<b style={{textAlign:'left'}}>Advisory:</b><br />
<div style={{marginLeft: 50, marginRight: 50}}>
● Cost Management: Review and manage your input costs carefully. Prioritize essential
expenditures and avoid unnecessary costs. <br />
● Crop Insurance: Ensure your crops are insured against potential risks. If you haven't
already, consider enrolling in the government's crop insurance schemes to protect your
investment. <br />
● Efficient Use of Resources: Focus on optimizing the use of water, fertilizers, and
pesticides to reduce waste and improve efficiency.
</div>
    </div>
    </>
  )
}

export default App
