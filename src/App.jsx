import React from 'react'
import { useState } from 'react'
import './App.css'
import Table from 'react-bootstrap/Table';
import { DataGrid } from '@mui/x-data-grid';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, NavItem } from 'react-bootstrap';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import bits from './assets/University_Logo_AllCampuses.png'
import hero from './assets/ai_image.png'
import MultiSelect from 'react-bootstrap-multiselect';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import dist from "./assets/csvjson.json"
import distperf from './assets/csvjson (2).json'
import Papa from 'papaparse';
import Spinner from './spinner';
import PerfGraph from './assets/Pred-Graph.jpg'
import PerfTable from './assets/Pred-Table.jpg'
import cornData from './assets/cornData (2).json'
import cornDataPred from './assets/csvjson (5).json'
import cornPred from './assets/Corn-Pred.jpg'
import TagLine from './assets/InnovateAchieveLead.jpg'






function App() {
  const crops = ['Wheat']
  
 
  const [distName, setdistName] = React.useState([]);
  const [cropName, setcropName] = React.useState();
  const [data, setData] = useState("");
  const [data1, setData1] = useState([
  ]);
  const [data2, setData2] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, seterror] = useState(null)
  const [perf,setperf]=useState(false);
  const [yeild,setyeild]=useState(false);
  const [comp,setcomp]=useState("");
  const [adv,setadv]=useState(false);
  const [cornData1, setcornData1] = useState([]);
 
  const handleChange = (event,key) => {
    const itemKey = key.key.slice(2); //Removes the .$ from the key.
    console.log(typeof(itemKey))

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
  

  const call = async()=>{
    setIsLoading(true)
    await axios.post("https://coeai4agri.bits-pilani.ac.in/cyp_satran/",params, {headers: {
      'content-type': 'application/json',
   },
})
  .then(function (response) {
    console.log(response.data);
    console.log(Papa.parse(response.data));
    Papa.parse(response.data, {
      complete: (result) => {
          setData1(result.data);
          setIsLoading(false);
          seterror(null)
      },
      header: true,
  });
  })
  .catch(function (error) {
    setIsLoading(false);
    console.log(error.message);
    seterror(error.message)
  });
  
    }
    const call2 =()=>{
      const corn = cornDataPred.filter((cornDataPred)=>{for (let index = 0; index < data2.length; index++){
        if(data2[index]==cornDataPred.Dist_ID){
          return cornDataPred;
        }
        
      }})
      console.log(corn)
      setData1(corn);
    }
    const columns = [
      { field: 'DistrictName', headerName: 'District',flex:1 },
      { field: 'Actual', headerName: 'Actual' ,flex:1},
      { field: 'Predicted', headerName: 'Predicted', flex:1 },]

    
      const columns2 = [
        { field: 'District', headerName: 'District',flex:1 },
        { field: 'Actual(bu/ac)', headerName: 'Actual' ,flex:1},
        { field: 'Predicted', headerName: 'Predicted', flex:1 },]
  
      function generateRandom() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
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
      <img src={hero} className='hero-img' alt="" />
      <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}}>

      <h2 style={{marginTop:20}}>Crop Yield Prediction By Foundation Model </h2>
      <Button style={{height:'2.3rem', width:'5rem'}} href='https://www.bits-pilani.ac.in/pilani/aicoe2024'>Back</Button>
      </div>
      </div>
      <div className='dropdown-container'>
      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel>Crop Name</InputLabel>
        <Select
          value={cropName??""}
          onChange={(event)=>{handleChange2(event)
            setData(event.target.value)
            setData2([]);
          }}
          input={<OutlinedInput label="Crop Name" />}
          defaultValue={""}

          
          
        >
          <MenuItem value="Wheat"
          >Wheat</MenuItem>
          <MenuItem value="Corn">Corn</MenuItem>
          <MenuItem disabled value="Rice">Rice</MenuItem>
          <MenuItem disabled value="Soya">Soya</MenuItem>
        </Select>
      </FormControl>
      
      
      {data==="Wheat"?<>
        <div className='wheat-data' style={{display:'flex', marginTop:'2rem', justifyContent:'space-evenly', alignItems:'center', width:'70vw'}}>
        <div className='metadata' style={{textAlign:'left'}}>
    <h1>Metadata</h1>
    <Table className='table' striped bordered hover>
      <thead>
       
      </thead>
      <tbody>
        <tr><td>Satellite Used: </td><td>Landsat-8 </td></tr>
        <tr><td>Data Modality: </td><td>Image time series</td></tr>
        <tr><td>Model: </td><td>SaTran(Foundation Model)</td></tr>
        <tr><td>Training data: </td><td>2014-2019</td></tr>
        <tr><td>Prediction for :</td><td>2020 </td></tr>
        <tr><td>No. of districts: </td><td>356 </td></tr>
        <tr><td>Unit:  </td><td>Bu/ac </td></tr>
        <tr><td>RMSE (best case) : </td><td>4.850</td></tr>
        <tr><td>RMSE (Average±Stddev) : </td><td>5.189 ± 1.66</td></tr>
        <tr><td>MAE (best case): </td><td>3.381</td></tr>
        <tr><td>MAE (Average±Stddev) : </td><td>3.922 ± 1.41</td></tr>

        </tbody></Table>
    </div>

    <iframe className='Map' title="Wheat Producing Districts" aria-label="Map" id="datawrapper-chart-yFKAB" src="https://datawrapper.dwcdn.net/yFKAB/1/"></iframe>
    {!function(){window.addEventListener("message",(function(a){if(void 0!==a.data["datawrapper-height"]){var e=document.querySelectorAll("iframe");for(var t in a.data["datawrapper-height"])for(var r=0;r<e.length;r++)if(e[r].contentWindow===a.source){var i=a.data["datawrapper-height"][t]+"px";e[r].style.height=i}}}))}()}
    </div>
    </>
    :<></>}
    
    
    {data==="Corn"?<>
      <div className='wheat-data' style={{display:'flex', marginTop:'2rem', justifyContent:'space-evenly', alignItems:'center', width:'70vw'}}>
        <div className='metadata' style={{textAlign:'left'}}>
    <h1>Metadata</h1>
    <Table className='table' striped bordered hover>
      <thead>
       
      </thead>
      <tbody>
        <tr><td>Satellite Used: </td><td>Landsat-8 </td></tr>
        <tr><td>Data Modality: </td><td>Histogram</td></tr>
        <tr><td>Model: </td><td>CropYieldNet</td></tr>
        <tr><td>Training data: </td><td>2014-2019</td></tr>
        <tr><td>Prediction for :</td><td>2020 </td></tr>
        <tr><td>No. of districts: </td><td>450 </td></tr>
        <tr><td>Unit:  </td><td>Bu/ac </td></tr>
        <tr><td>RMSE (best case) : </td><td>14.578</td></tr>
        <tr><td>RMSE (Average±Stddev) : </td><td>15.875 ± 1.65</td></tr>
        <tr><td>MAE (best case): </td><td>8.554</td></tr>
        <tr><td>MAE (Average±Stddev) : </td><td>9.79 ± 0.93</td></tr>

        </tbody></Table>
    </div>

    <iframe className='Map' title="Corn Producing Districts" aria-label="Map" id="datawrapper-chart-0qze0" src="https://datawrapper.dwcdn.net/0qze0/1/" scrolling="no" frameborder="0"></iframe><script type="text/javascript">{!function(){window.addEventListener("message",(function(a){if(void 0!==a.data["datawrapper-height"]){var e=document.querySelectorAll("iframe");for(var t in a.data["datawrapper-height"])for(var r=0;r<e.length;r++)if(e[r].contentWindow===a.source){var i=a.data["datawrapper-height"][t]+"px";e[r].style.height=i}}}))}()}
</script>
    </div>
    </>
    :<></>}



    
   
    {data==="Rice"?<>
      <iframe title="Rice Producing Districts" aria-label="Map" id="datawrapper-chart-TumWF" src="https://datawrapper.dwcdn.net/TumWF/1/"  style={{"width": 500, "min-width": 100," height":800}}></iframe><script type="text/javascript">{!function(){"use strict";window.addEventListener("message",(function(a){if(void 0!==a.data["datawrapper-height"]){var e=document.querySelectorAll("iframe");for(var t in a.data["datawrapper-height"])for(var r=0;r<e.length;r++)if(e[r].contentWindow===a.source){var i=a.data["datawrapper-height"][t]+"px";e[r].style.height=i}}}))}()}
      </script>
    </>
    :<></>}

      
  
      {data==="Wheat"?<><div className='dropdown-2'>
    <FormControl sx={{ m: 1, width: 400 }}>
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
            PaperProps: { sx: { maxHeight: 200 } },
          }}
        > {}
          {dist.map((dist) => (
            <MenuItem key={dist.DistrictID} value={dist.DistrictID}>
              <Checkbox checked={distName.indexOf(dist.DistrictID) > -1} />
              <ListItemText primary={dist.DistrictName} />
            </MenuItem>
          ))}
        </Select>
        
      </FormControl>
      <Button className='search' onClick={call}> Predict Yield</Button>
      <Button className='search' onClick={()=>{if(perf){setperf(false)} else{setperf(true)} }}> Model Performance</Button>
      </div></>:data==="Corn"?<><div className='dropdown-2'>
    <FormControl sx={{ m: 1, width: 400 }}>
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
            PaperProps: { sx: { maxHeight: 200 } },
          }}
        > {cornData.map((cornData) => (
          <MenuItem key={cornData.Dist_ID} value={cornData.Dist_ID}>
            <Checkbox checked={distName.indexOf(cornData.Dist_ID) > -1} />
            <ListItemText primary={cornData.District_Name} />
          </MenuItem>
        ))}
          
        </Select>
        
      </FormControl>
      <Button className='search' onClick={()=>{call2();setIsLoading(false);seterror(null)}}> Predict Yield</Button>
      </div>
      <Button className='search' onClick={()=>{if(perf){setperf(false)} else{setperf(true)} }}> Model Performance</Button>
      </>
      :<></>}
      
    
    </div>
    


          <div className="sec-2">
          {!isLoading ?
      error===null?
    //   <Table className='table' striped bordered hover>
    //   <thead>
    //     <tr>
    //       <th>District ID</th>
    //       <th>District Name</th>
    //       <th>Actual</th>
    //       <th>Predicted</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {data1.map((data1)=>{return(<><tr><td>{data1.DistrictID}</td><td>{data1.DistrictName}</td><td>{data1.Actual}</td><td>{data1.Predicted}</td></tr></>);})}
    //   </tbody>
    // </Table>
   <>{data==="Corn"?<><DataGrid className='table1' disableColumnMenu disableColumnSorting disableColumnResize columns={columns2} rows={data1} getRowId={(row)=>generateRandom()} ></DataGrid></>:<></>}
    {data==="Wheat"?<><DataGrid className='table1' disableColumnMenu disableColumnSorting disableColumnResize columns={columns} rows={data1} getRowId={(row)=>generateRandom()} ></DataGrid></>:<></>}</>
      :
       <h1 style={{color:'red'}}> {error} </h1>
   :
   <span> <Spinner/> </span>}
   
    
    
    </div>
    <div className="sec-3">
    {data==="Wheat" ? perf ?<><h1> Model Performance</h1>
    <div className='Model-perf'  style={
      {display:'flex', justifyContent:'center', alignItems:'center', width:'100vw', marginTop:20}
    }> <img src={PerfTable} alt="" style={{width:'50vw'}} />
    <img src={PerfGraph} alt="" style={{width:'50vw'}} /> </div></>:<></>:<></>}

    {data==="Corn" ? perf ?<><h1> Model Performance</h1>
    <div className='Model-perf'  style={
      {display:'flex', justifyContent:'center', alignItems:'center', width:'100vw', marginTop:20}
    }> <img src={cornPred} alt="" style={{width:'50vw'}} />
     </div></>:<></>:<></>}


    </div>
    <Button className='search' onClick={()=>{setyeild(true)}}> Click here to Get Avg Yield For Last 3 years</Button>
    
    {yeild?<><h5>Note: Click each Table row in the below Table to get Advisory</h5><Table className='table' striped bordered hover>
      <thead>
        <tr>
          <th>District Name</th>
          <th>Avg Yeild for Last 3 Years</th>
        </tr>
      </thead>
      <tbody>
        {data==="Wheat"?<>{distperf.map((distperf)=>{ for (let index = 0; index < data2.length; index++) {
          if(data2[index]==distperf.dist_id){
            return(<>
            <tr onClick={()=>{setadv(true);data1.map((data1)=>{
              if(data1.DistrictID==data2[index]){
               if(data1.Predicted>distperf.YieldBuAc){
                 setcomp("high") 
              }
              else{
                setcomp("low")
              }}
            })
            
            }}><td>{distperf.dist}</td><td>{distperf.YieldBuAc}</td></tr>
            </>);
          }
          
          
        } 
      }
        )}</>:data==="Corn"?<>{cornData.map((cornData)=>{ for (let index = 0; index < data2.length; index++) {
          if(data2[index]==cornData.Dist_ID){
            return(<>
            <tr onClick={()=>{setadv(true);data1.map((data1)=>{
              if(data1.Dist_ID==data2[index]){
               if(data1.Predicted>cornData.Average_yield){
                 setcomp("high") 
              }
              else{
                setcomp("low")
              }}
            })}}><td>{cornData.District_Name}</td><td>{cornData.Average_yield}</td></tr>
            </>);
          }
          
          
        } 
      }
        )}</>:<></>}
        
      </tbody>
    </Table></>:<></>}
    {adv?<>{comp==="high"?<div className='middle' style={{padding:10, fontSize:20, textAlign:'left'
    }}><h1>ADVISORY</h1><h3>Higher Yield prediction</h3>
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
</div></div>:<></>}</>:<></> }
  
{adv?<>{comp==="low"?<div className='middle' style={{padding:10, fontSize:20, textAlign:'left'
    }}><h1>ADVISORY</h1><h3>Lower Yield Prediction</h3>
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
</div></div>:<></>}</>:<></> }
    <div className='footer'>
      <img src={TagLine} className='footer-img' ></img>
      <div className='ftext' >
        An Institution Deemed to be University estd. vide Sec.3 of the UGC Act,1956 under notification # F.12-23/63.U-2 of Jun 18,1964<br/>
        <p>Privacy Policy | Terms and Conditions</p>
        <p>© 2024 BITS Pilani | Contact us : webmaster@pilani.bits-pilani.ac.in</p>
      </div>
    </div>
    </>
  )
}

export default App
