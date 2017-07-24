import React, {Component} from 'react'

// === REDUX
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/userActions'

// === Aphrodite
import {css, StyleSheet} from 'aphrodite'

// === ROUTER
import { browserHistory } from 'react-router';

// === COMPONENTS
import LoadingGif from '../LoadingGif';

class Login extends Component {

    handleFormSubmit (e) {
        const {username, password} = this.props.users.userInfo;
        e.preventDefault();

        //ACTION dispatch addUser action - info deleted after POST in action
        this.props.loginUser({username, password});
    }

    render() {
        const {addUsername, addPassword, users} = this.props;

        //Check if user is registered/logged in
        //users.loggedIn ? browserHistory.push('/') : null;

        //onSubmission, show this, else show form
        if (users.isLoggingIn) {
          return <LoadingGif />
        }

        //Input field warnings
        const inputWarning = (field) => {
            if(users.userInfo[field] && users.userInfo[field].length > 0 ) return true;

            return false;
        }

        //Password match warning
        const passwordWarning = () => {
            if(users.userInfo.reEnter_password.match && users.userInfo.reEnter_password.password && users.userInfo.reEnter_password.password.length > 0) return true;
            return false;
        }

        return (
            <div className="flex colWrap aCenter jCenter fullWindowWidthHeight">
                <div className="marginAuto padding25 boxShadow" style={{width: '65%'}}>
                    <form id="authorization" method="post" onSubmit={this.handleFormSubmit.bind(this)}>
                        {/*Username*/}
                        <div className="flex colWrap aStart jCenter padding15">
                            <label htmlFor="username"><large>Username</large></label>
                            <input
                                onChange={ (input) => {addUsername(input.target.value)}}
                                type="username"
                                placeholder="Username"
                                style={{height: 22, padding: 5}}
                            />
                            <small className="padding5 margin5TB">
                                <strong className={css(inputWarning('username') ? null : styles.red)}>{inputWarning('username') ? "" : "Username must be at least 1 character"}</strong>
                                <br/>
                                <strong className={css(styles.red)}>{users.alertMessage ? users.alertMessage : null}</strong>
                            </small>
                        </div>
                        <hr/>
                        {/*Password*/}
                        <div className="flex colWrap aStart jCenter padding15">
                            <label htmlFor="password"><large>Password</large></label>
                            <input
                                onChange={ (input) => {addPassword(input.target.value)}}
                                type="password"
                                placeholder="Password"
                                style={{height: 22, padding: 5}}
                            />
                        </div>

                        <div className="flex colWrap aCenter jCenter">
                            <input type="submit" value="Join us!"/>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        users: state.users
    };
}

// === Pass ACTION FNS from ACTION MODULE as PROPS
function mapActionCreatorsToProps (dispatch) {
  return bindActionCreators(userActions, dispatch);
}
const styles = StyleSheet.create({
    green: {
        backgroundColor: 'rgba(10,190,0,0.5)',
    },
    red: {
        backgroundColor: 'rgba(200,10,0,0.5)',
    }
})
export default connect(mapStateToProps, mapActionCreatorsToProps)(Login)
