//React imports
import React from 'react'
// === REDUX
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/userActions'
//COMPONENTS
import HamburgerMenu from '../HamburgerMenu'
import LoadingGif from '../LoadingGif'
import UIUnmounter from '../Containers/UIUnmounter'


/**
propTypes = {
    handleSubmit: userAction - aSync
    profileImg: state.users.userInfo - String - comes from AWS S3
}
**/
const ProfileImg = ({userInfo: {profileImg}, handleSubmit}) => {
    console.log(profileImg)
    return (
        <div className="flex colNoWrap aCenter jCenter">
            <img src={profileImg} style={{width: 250}}/>
            <form method="POST" onSubmit={handleSubmit}>
                <input type="file" id="file-input"/>
            </form>
        </div>
    )
}

//Make Profile Smart and pass all state as props
const Profile = (props) => {
    return (
        //this now has state.users as PROPS
        <div className="flex colWrap aCenter jCenter fullWidthHeight">
            {/*Top Block: contains HBM, ProfileImg and UserInfoSection*/}
            <div className="flex colWrap aCenter jCenter">
                {/*HamburgerMenu*/}
                <UIUnmounter>
                    <HamburgerMenu />
                </UIUnmounter>
                {/*ProfilePic*/}
                <ProfileImg {...props}/>
            </div>
            {/*Block 2*/}

        </div>
    )
}

function mapStateToProps(state) {
    return {
        userInfo: state.users.userInfo
    }
}

function mapActionCreatorsToProps(dispatch) {
    return bindActionCreators(userActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(Profile);
