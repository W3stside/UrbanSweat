import React from 'react';

const LoadingGif = () => (
    <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'white'}}>
        <div className="flex aCenter jCenter fullWidthHeight">
            <img src={require("../assets/loading.gif")} style={{maxHeight: '100%'}}/>
        </div>
    </div>
);

export default LoadingGif;
