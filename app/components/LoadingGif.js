import React from 'react';

const LoadingGif = () => (
    <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'white'}}>
        <div className="flex rowWrap aCenter jCenter fullWidthHeight">
            <h1 className="italic textShadow font100" style={{fontSize: '2.8vw'}}>LOADING . . .</h1>
            <img src={require("../assets/loading.gif")} style={{maxHeight: '80%'}}/>
        </div>
    </div>
);

export default LoadingGif;
