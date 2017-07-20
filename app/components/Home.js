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

    var bgImgStyle = {minWidth: '100%', height: 'auto', position: 'absolute', bottom: 0};
    var bgPic = require("../img/grey-berlin-arch.jpg");
    var logo = require("../img/logo2.png");

    const dynamicHomeLinks =
        //Check state if user logged in? If so then do not render login and join links
        users.loggedIn
        ? (<div className="flex xsP6 smP4 aCenter jCenter">
                <Links name="ENTER" url="/FindYourSpot" className="italic font400 fontP200 padding10"/>
                <Links name="ABOUT" url="/About" className="italic font400 fontP200 padding10"/>
                <Links name="CONTACT" url="/Contact" className="italic font400 fontP200 padding10"/>
            </div>)
        : ( <div className="flex xsP6 smP4 aCenter jCenter">
                <Links name="JOIN" url="/registration" className="italic font400 fontP200 padding10"/>
                <Links name="LOGIN" url="/login" className="italic font400 fontP200 padding10"/>
                <Links name="ABOUT" url="/about" className="italic font400 fontP200 padding10"/>
                <Links name="CONTACT" url="/contact" className="italic font400 fontP200 padding10"/>
            </div> );

    return (
        <div style={{width: '100%'}}>
            <BackgroundPic styleBG={bgImgStyle} image={bgPic} />
            <div className="container-fluid">
                <div className="flex rowWrap textCenter">
                    <div className="flex xsP6 smP4 aCenter jCenter">
                        <Logo logo={logo}/>
                    </div>
                    {dynamicHomeLinks}
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
