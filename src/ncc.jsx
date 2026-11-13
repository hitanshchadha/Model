import { BACK_URL, MAPS } from './config.js'
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
import rice_advisory_ncc from './assets/rice_advisory_ncc.json'
import wheat_advisory from './assets/wheat_advisory_ncc.json'
import rice_pred_ncc from './assets/rice_pred_ncc.json'
import wheat_pred_ncc from './assets/wheat_pred_ncc.json'
import cornPred from './assets/Corn-Pred.jpg'
import TagLine from './assets/InnovateAchieveLead.jpg'


function NextCropCycle() {
 
  const [distName, setdistName] = React.useState([]);
  const [cropName, setcropName] = React.useState();
  const [data, setData] = useState("");
  const [data1, setData1] = useState([
  ]);
  const [data2, setData2] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, seterror] = useState()
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
 
    const corn = wheat_pred_ncc.filter((wheat_pred_ncc)=>{for (let index = 0; index < data2.length; index++){
      if(data2[index]==wheat_pred_ncc.District_ID){
        return wheat_pred_ncc;
      }
      
    }})
    console.log(corn)
    setData1(corn);

  
    }
    const call2 =()=>{
      const corn = rice_pred_ncc.filter((rice_pred_ncc)=>{for (let index = 0; index < data2.length; index++){
        if(data2[index]==rice_pred_ncc.Dist_ID){
          return rice_pred_ncc;
        }
        
      }})
      console.log(corn)
      setData1(corn);
    }

    const columns = [
      { field: 'District_Name', headerName: 'District',flex:1 },
      { field: 'Actual', headerName: 'Actual' ,flex:1},
      { field: 'Predicted', headerName: 'Predicted', flex:1 },]

    
      const columns2 = [
        { field: 'Dist_Name', headerName: 'District',flex:1 },
        { field: 'Actual', headerName: 'Actual' ,flex:1},
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
      
      
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>

          <h2 style={{ marginTop: 20, width:'90vw', paddingLeft:'8vw' }}>Next Crop Cycle Prediction </h2>
          <Button style={{ height: '2.3rem', width: '5rem',  }} href={BACK_URL}>Back</Button>
        </div>
      <div className='dropdown-container'>
      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel>Crop Name</InputLabel>
        <Select
          value={cropName??""}
          onChange={(event)=>{handleChange2(event)
            setData1([]);
            setData2([]);
            seterror();
            setData2([]);
            setdistName([]);
            setperf(false);
            setyeild(false);
            setadv(false);
            setcomp("");
            setData(event.target.value)
          }}
          input={<OutlinedInput label="Crop Name" />}
          defaultValue={""}

          
          
        >
          <MenuItem value="Wheat"
          >Wheat</MenuItem>
          <MenuItem value="Corn">Rice</MenuItem>
        </Select>
      </FormControl>
      
      
      {data==="Wheat"?<>
        <div className='wheat-data' style={{display:'flex', marginTop:'2rem', justifyContent:'space-evenly', alignItems:'center', width:'70vw'}}>
        <div className='metadata' style={{textAlign:'left'}}>
    <h1>Data & Model</h1>
    <Table className='table' striped bordered hover>
      <thead>
       
      </thead>
      <tbody>
        <tr><td>Satellite Used: </td><td>Landsat-8 </td></tr>
        <tr><td>Data Modality: </td><td>Histogram</td></tr>
        <tr><td>Model: </td><td>CropYieldNet</td></tr>
        <tr><td>Training data: </td><td>2014-2019</td></tr>
        <tr><td>Prediction for :</td><td>2020 </td></tr>
        <tr><td>No. of districts: </td><td>356 </td></tr>
        <tr><td>Unit:  </td><td>Bu/ac </td></tr>
        <tr><td>RMSE (best case) : </td><td>12.758</td></tr>
        <tr><td>RMSE (Average±Stddev) : </td><td>13.941 ± 1.83</td></tr>
        <tr><td>MAE (best case): </td><td>10.053</td></tr>
        <tr><td>MAE (Average±Stddev) : </td><td>11.483 ± 0.77</td></tr>

        </tbody></Table>
    </div>

    <iframe className='Map' title="Wheat Producing Districts" aria-label="Map" id="datawrapper-chart-yFKAB" src={MAPS.wheat}></iframe>
    {!function(){window.addEventListener("message",(function(a){if(void 0!==a.data["datawrapper-height"]){var e=document.querySelectorAll("iframe");for(var t in a.data["datawrapper-height"])for(var r=0;r<e.length;r++)if(e[r].contentWindow===a.source){var i=a.data["datawrapper-height"][t]+"px";e[r].style.height=i}}}))}()}
    </div>
    </>
    :<></>}
    
    
    {data==="Corn"?<>
      <div className='wheat-data' style={{display:'flex', marginTop:'2rem', justifyContent:'space-evenly', alignItems:'center', width:'70vw'}}>
        <div className='metadata' style={{textAlign:'left'}}>
    <h1>Data & Model</h1>
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
        <tr><td>RMSE (best case) : </td><td>12.019</td></tr>
        <tr><td>RMSE (Average±Stddev) : </td><td>12.994 ± 1.24</td></tr>
        <tr><td>MAE (best case): </td><td>9.561</td></tr>
        <tr><td>MAE (Average±Stddev) : </td><td>10.276 ± 1.38</td></tr>

        </tbody></Table>
    </div>

    <iframe className='Map' title="Corn Producing Districts" aria-label="Map" id="datawrapper-chart-0qze0" src={MAPS.corn} scrolling="no" frameborder="0"></iframe><script type="text/javascript">{!function(){window.addEventListener("message",(function(a){if(void 0!==a.data["datawrapper-height"]){var e=document.querySelectorAll("iframe");for(var t in a.data["datawrapper-height"])for(var r=0;r<e.length;r++)if(e[r].contentWindow===a.source){var i=a.data["datawrapper-height"][t]+"px";e[r].style.height=i}}}))}()}
</script>
    </div>
    </>
    :<></>}



    
   
    {data==="Rice"?<>
      <iframe title="Rice Producing Districts" aria-label="Map" id="datawrapper-chart-TumWF" src={MAPS.variability}  style={{"width": 500, "min-width": 100," height":800}}></iframe><script type="text/javascript">{!function(){"use strict";window.addEventListener("message",(function(a){if(void 0!==a.data["datawrapper-height"]){var e=document.querySelectorAll("iframe");for(var t in a.data["datawrapper-height"])for(var r=0;r<e.length;r++)if(e[r].contentWindow===a.source){var i=a.data["datawrapper-height"][t]+"px";e[r].style.height=i}}}))}()}
      </script>
    </>
    :<></>}

      
  
      {data==="Wheat"?<><div className='dropdown-2'>
    <FormControl sx={{ m: 1, width: 350 }}>
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
          {wheat_pred_ncc.map((wheat_pred_ncc) => (
            <MenuItem key={wheat_pred_ncc.District_ID} value={wheat_pred_ncc.District_ID}>
              <Checkbox checked={distName.indexOf(wheat_pred_ncc.District_ID) > -1} />
              <ListItemText primary={wheat_pred_ncc.District_Name} />
            </MenuItem>
          ))}
        </Select>
        
      </FormControl>
      <Button className='search' onClick={()=>{call();seterror(null)}}> Predict Yield</Button>
      {/* <Button className='search' onClick={()=>{if(perf){setperf(false)} else{setperf(true)} }}> Model Performance</Button> */}
      </div></>:data==="Corn"?<><div className='dropdown-2'>
    <FormControl sx={{ m: 1, width: 350 }}>
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
        > {rice_pred_ncc.map((rice_pred_ncc) => (
          <MenuItem key={rice_pred_ncc.Dist_ID} value={rice_pred_ncc.Dist_ID}>
            <Checkbox checked={distName.indexOf(rice_pred_ncc.Dist_ID) > -1} />
            <ListItemText primary={rice_pred_ncc.Dist_Name} />
          </MenuItem>
        ))}
          
        </Select>
        
      </FormControl>
      <Button className='search' onClick={()=>{call2();setIsLoading(false);seterror(null)}}> Predict Yield</Button>
      </div>
      {/* <Button className='search' onClick={()=>{if(perf){setperf(false)} else{setperf(true)} }}> Model Performance</Button> */}
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
    {data=="Wheat" || data=="Corn"?<><Button className='search' onClick={()=>{setyeild(true)}}> Click here to Get Present Yield</Button></>:<></> }
    
    {yeild?<><h5>Note: Click each Table row in the below Table to get Advisory</h5><Table className='table3' style={{width:'70vw', marginLeft:'15vw'}} striped bordered hover>
      <thead>
        <tr>
          <th>District Name</th>
          <th>Present Yield</th>
        </tr>
      </thead>
      <tbody>
        {data==="Wheat"?<>{distperf.map((distperf)=>{ for (let index = 0; index < data2.length; index++) {
          if(data2[index]==distperf.dist_id){
            return(<>
            <tr onClick={()=>{setadv(true);data1.map((data1)=>{
              if(data1.District_ID==data2[index]){
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
        )}</>:data==="Corn"?<>{rice_advisory_ncc.map((rice_advisory_ncc)=>{ for (let index = 0; index < data2.length; index++) {
          if(data2[index]==rice_advisory_ncc.Dist_ID){
            return(<>
            <tr onClick={()=>{setadv(true);data1.map((data1)=>{
              if(data1.Dist_ID==data2[index]){
               if(data1.Predicted>rice_advisory_ncc.Present_Yield){
                 setcomp("high") 
              }
              else{
                setcomp("low")
              }}
            })}}><td>{rice_advisory_ncc.Dist_Name}</td><td>{rice_advisory_ncc.Present_Yield}</td></tr>
            </>);
          }
          
          
        } 
      }
        )}</>:<></>}
        
      </tbody>
    </Table></>:<></>}
    {adv?<>{comp==="high"?<div className='middle' style={{padding:10, fontSize:20, textAlign:'left'
    }}><h1>ADVISORY</h1>
<b>Exciting News: High Yield Predicted!</b> <br /> 
Our model is forecasting a bumper harvest this season! We recommend ramping up
preparations—ensure your fields are well-managed, optimize water and fertilizer use, and
think ahead about storage solutions and market strategies. This season could be one for the
record books, so gear up, stay informed, and make the most of this promising outlook! <br />
</div>:<></>}</>:<></> }
  
{adv?<>{comp==="low"?<div className='middle' style={{padding:10, fontSize:20, textAlign:'left'
    }}><h1>ADVISORY</h1>
<b>Urgent Advisory: Anticipated Low Yield This Season</b> <br />
Unfortunately, our model forecasts a lower-than-average yield for the upcoming season. To
prepare for this challenging period, we strongly advise farmers to consider diversifying crops,
carefully managing resources, and optimizing expenses. While this season may be difficult,
proactive planning and smart decisions can help mitigate the impact and ensure your farm&#39;s
resilience.<br />
</div>:<></>}</>:<></> }
<div className='footer'>
      <div className='ftext' >
        <p>© 2024 BITS Pilani</p>
      </div>
    </div>
    </>
  )
}

export default NextCropCycle