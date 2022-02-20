import React, {useEffect} from "react";
import {Fragment, useState} from "react";
import './App.css';
import Button from "./components/Button";
import RadioButtonsGroup from "./components/RadioButton";


function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [link, setLink] = useState(0);
    const [gender, setGender] = useState('all');
    const [loadPic, setLoadPic]= useState(false);
    const icons = [
        'fas fa-user fa-2x',
        'fas fa-envelope fa-2x',
    ];

    const getGenderFunction = (val) => {
        setGender(val);
    };

    async function myFetch() {
        let response = await fetch('https://randomuser.me/api/');
        return await response.json();
    }

    useEffect(() => {
        myFetch().then((data) => {
            setIsLoaded(true);
            setItems(data.results);
        })
            .catch(error => console.log('error is', error));
    }, [])


    const fetchUserFunction = () => {
        myFetch().then((data) => {
            const newGender = data.results.map(item => item.gender)[0];
            if (gender !== 'all' && newGender !== gender
            ) {
                setLoadPic(true);
                fetchUserFunction();
            } else {
                setLoadPic(false);
                setIsLoaded(true);
                setItems(data.results);
            }

        })
            .catch(error => console.log('error is', error));
    };

    const GetTitle = ({info}) => {
        const title = [
            `my name is ${info.name.first} ${info.name.last}`,
            `my email is ${info.email}`,
        ]
        return (<><div className='titleGroup'>
                <h1 className='imgFont'>Hi,</h1>
                <h1 className='imgFont'>{title[link]}</h1>
            </div>
            </>
        )
    };

    const GetTitleSmall = ({info}) => {
        const title = [
            `my name is ${info.name.first} ${info.name.last}`,
            `my email is ${info.email}`,
        ]
        return (<>
                <div className='SmalltitleGroup'>
                    <h3 className='SmallimgFont'>Hi,</h3>
                    <h3 className='SmallimgFont'>{title[link]}</h3>
                    {loadPic ?
                        <div className='LoadingPic'>
                            <div className="fa-1x">
                                <i className="fa-solid fa-camera-rotate fa-flip"></i>
                            </div>
                        </div>
                        :<></>}
                </div>
            </>
        )
    };

    const setLinkFunction = (index) => {
        setLink(index);
    };

    const style = {
        color: '#27b069',
    };

    if (!isLoaded) {
        return (
            <div className='LoadingPage'>
            <div className='Loading'>
                <div className="fa-3x">
                    <i className="fa-solid fa-sync fa-spin"> </i>
                </div>
                <h1>Loading...</h1>
            </div>
            </div>
        )
    }

    return (
        <div className='App'>
            <div className='sideBar'>
                {items.map((item, index) => {
                    return (
                        <Fragment key={item.id.name + index}>
                            <img className="perosonalImg" src={item.picture.large} alt={'img broken'}/>
                            <h3>{item.name.first} {item.name.last}</h3>
                            <div className='icons'>
                                {icons.map((icon, index) => {
                                    return (
                                        <i className={icon} key={index} onMouseEnter={() => setLinkFunction(index)}
                                           style={link === index ? style : null}> </i>
                                    )
                                })}
                            </div>
                            <GetTitleSmall info={item}/>
                        </Fragment>
                    )
                })}
                <div className='lableGroup'>
                    <RadioButtonsGroup getGender={getGenderFunction}/>
                </div>
                <Button click={fetchUserFunction}/>
            </div>
            <div className='mainBody'>
                {items.map((item, index) => {
                    return (
                        <Fragment key={item.id.name + index}>
                            <img className="mainImg" src={item.picture.large} alt={'img broken'}/>
                            <div className='Background'></div>
                            <GetTitle info={item}/>
                            {loadPic ?
                                <div className='LoadingPic'>
                                <div className="fa-3x">
                                    <i className="fa-solid fa-camera-rotate fa-flip"></i>
                            </div>
                                </div>
                                :<></>}
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}

export default App;
