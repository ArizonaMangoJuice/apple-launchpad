import React from 'react';
import App from '../App';
import data from '../../mockData/data';
import './LaunchPad.css';

const LaunchPad = () => {

    const apps = data.map((data) => (<App key={data.name} name={data.name} icon={data.icon}/>))

    console.log(apps, 'this is the apps');
    return (
        <div className='launch-pad'>
        {apps}
        </div>
    )
};

export default LaunchPad;