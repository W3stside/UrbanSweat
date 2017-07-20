//React imports
import React from 'react'
//COMPONENTS
import UIUnmounter from '../Containers/UIUnmounter'
import HamburgerMenu from '../HamburgerMenu'

const Profile = () => (
    <div className="flex colWrap aCenter jCenter fullWidthHeight">
        <UIUnmounter>
            <HamburgerMenu />
        </UIUnmounter>
        <div className="flex colWrap aCenter jCenter">
            <large>Profile Page</large>
        </div>
    </div>
)

export default Profile;
