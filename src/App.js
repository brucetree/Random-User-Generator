import React, {useEffect} from "react";
import {Fragment,useState} from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './App.css';
import Button from "./components/Button";


function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [link, setLink]=useState(0);
    const [gender,setGender]=useState('all');
    // console.log(gender);
    const icons =[
        'fas fa-user fa-2x',
        'fas fa-envelope fa-2x',
    ]
    async function myFetch(){
        let response= await fetch('https://randomuser.me/api/');
        return await response.json();
    }
    useEffect(()=>{
        myFetch().then((data) => {
            // console.log(data.results);
            setIsLoaded(true);
            setItems(data.results);
        })
            .catch(error => console.log('error is', error));
    },[])

    // const mapGender=items.map(item=>item.gender)[0];
    // console.log(mapGender);
    const fetchUserFunction=()=> {
        myFetch().then((data) => {
            const newGender =data.results.map(item=>item.gender)[0];
            // console.log('newgender',newGender)
            // console.log(data.results);
            if (gender!=='all' && newGender !==gender
            ){
                fetchUserFunction()
                // console.log(newGender);
            }
            else {setIsLoaded(true);
                setItems(data.results);}
            // sessionStorage.setItem('gender',mapGender);

        })
            .catch(error => console.log('error is', error));
    }

    const GetTitle=({info})=>{
        const title=[
            `my name is ${info.name.first} ${info.name.last}`,
            `my email is ${info.email}`,
        ]
        return (<>
            <h1 className='imgFont'>Hi,</h1>
            <h1 className='imgFont'>{title[link]}</h1>
            </>
        )
    }

    const setLinkFunction=(index)=>{
        setLink(index);
    }

    const style={
        color: '#27b069',
    }

    if(! isLoaded){
        return (
            <div className='Loading'>
            <div className="fa-3x">
                <i className="fa-solid fa-sync fa-spin"> </i>
            </div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return(
        <div className='App'>
        <div className='sideBar'>
            {items.map((item,index)=>{
                return (
                    <Fragment key={item.id.name+index}>
                        <img className="perosonalImg" src={item.picture.large} alt={'img broken'}/>
                        <h3>{item.name.first} {item.name.last}</h3>
                        {/*<div> This is my email:{item.email}</div>*/}
                        <div className='icons'>
                            {icons.map((icon,index)=>{
                                return(
                                    <i className={icon} key={index} onMouseEnter={()=>setLinkFunction(index)}
                                       style={link===index ? style :null}> </i>
                                )
                            })}
                        </div>
                    </Fragment>
                )
            })}
            <div className='lableGroup'>
                {/*<label  > <input type="radio" name='gender' value="male" onChange={ event => { setGender(event.target.value) } } />male</label><br/><br/>*/}
                {/*<label > <input type="radio" name='gender' value="female" onChange={ event => { setGender(event.target.value) } }/>female</label><br/><br/>*/}
                {/*<label > <input type="radio" name='gender' value="all" onChange={ event => { setGender(event.target.value) } }/>all</label>*/}
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="all"
                        name="radio-buttons-group" >

                        <FormControlLabel value="female" control={<Radio />} label="Female" onChange={ event => { setGender(event.target.value) } }  />
                        <FormControlLabel value="male" control={<Radio />} label="Male" onChange={ event => { setGender(event.target.value) } }/>
                        <FormControlLabel value="all" control={<Radio />} label="All" onChange={ event => { setGender(event.target.value) } }/>
                    </RadioGroup>
                </FormControl>
            </div>
            <Button click={fetchUserFunction}/>
        </div>
            <div className='mainBody'>
                {items.map((item,index)=>{
                    return (
                        <Fragment key={item.id.name+index}>
                            <img className="mainImg" src={item.picture.large} alt={'img broken'}/>
                            <div className='Background'> </div>
                            <GetTitle info={item}/>
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}

export default App;
