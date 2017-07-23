import React from 'react'
//COMPONENTS
import BackgroundPic from './BackgroundPic'
import Links from './Links'
import Logo from './Logo'

//TESTING
import RouteTransition from './Containers/RouteTransition'
import Profile from './Profile/Profile'

// === REDUX
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const Home = ({users}) => {

    var bgImgStyle = {minWidth: '100%', minHeight: '100%', position: 'absolute', bottom: 0};
    var bgPic = require("../assets/grey-berlin-arch.jpg");
    var logo = require("../assets/logo2.png");

    const dynamicHomeLinks =
        //Check state if user logged in? If so then do not render login and join links
        users.loggedIn
        ? (<div className="flex xsP6 smP4 aCenter jCenter">
                <Links name="ENTER" url="/FindYourSpot" className="italic font400 fontP200 padding10"/>
                <Links name="ABOUT" url="/About" className="italic font400 fontP200 padding10"/>
                <Links name="CONTACT" url="/Contact" className="italic font400 fontP200 padding10"/>
            </div>)
        : ( <div className="flex xsP6 smP4 aCenter jCenter">
                <Links name="JOIN" url="/register" className="italic font400 fontP200 padding10"/>
                <Links name="LOGIN" url="/login" className="italic font400 fontP200 padding10"/>
                <Links name="ABOUT" url="/about" className="italic font400 fontP200 padding10"/>
                <Links name="CONTACT" url="/contact" className="italic font400 fontP200 padding10"/>
            </div> );

    return (
        <div className="flex aCenter jCenter fullWidthHeight" style={{minHeight: '100vh'}}>
            <BackgroundPic styleBG={bgImgStyle} image={bgPic} />
            <div className="container-fluid width100">
                <div className="flex rowWrap aCenter jCenter textCenter">
                    <div className="flex xsP12 smP6 aCenter jCenter" style={{height: 500, width: 500}}>
                        <Logo logo={logo}/>
                    </div>
                    <div id="homeLinks" className="flex rowWrap aCenter jCenter xsP12 smP6">
                        {dynamicHomeLinks}
                    </div>
                </div>
                <div className="row text-center">

                </div>
            </div>
        </div>
    );
};

function mapStateToProps (state) {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(Home);
