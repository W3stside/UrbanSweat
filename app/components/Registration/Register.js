import React, {Component} from 'react'

// === REDUX
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/userActions'

// === Aphrodite
import {css, StyleSheet} from 'aphrodite'

// === ROUTER
import { browserHistory } from 'react-router';

class Register extends Component {

    handleFormSubmit (e) {
        const {first_name, last_name, email, username, password, reEnter_password} = this.props.users.userInfo;
        e.preventDefault();

        if (!first_name || !last_name || !email || !username || !password || !reEnter_password) {
            window.alert("Please fill out all fields.");
            return;
        };

        //ACTION dispatch addUser action - info deleted after POST in action
        this.props.addUser({first_name, last_name, email, username, password});
    }

    render() {
        const {addFirstName, addLastName, addEmail, addUsername, addPassword, addReEnterPassword, users} = this.props;

        //Check if user is registered/logged in
        users.registered ? browserHistory.push('/') : null;

        //onSubmission, show this, else show form
        if (users.registering) {
          return (
            <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%'}}>
              <img src="../assets/loading.gif" style={{height: '100%', width: '100%'}}/>
            </div>
        )}

        //Input field warnings
        const inputWarning = (field) => {
            if(users.userInfo[field] && users.userInfo[field].length > 0) return true;
            return false;
        }

        //Password match warning
        const passwordWarning = () => {
            if(users.userInfo.reEnter_password.match && users.userInfo.reEnter_password.password && users.userInfo.reEnter_password.password.length > 0) return true;
            return false;
        }

        return (
            <div className="flex colWrap aCenter jCenter fullWindowWidthHeight">
                <div className="marginAuto padding25 boxShadow">
                    <form id="authorization" method="post" onSubmit={this.handleFormSubmit.bind(this)}>
                        {/*First Name*/}
                        <div className="flex colWrap aStart jCenter">
                            <label htmlFor="first_name" >First Name</label>
                            <input
                                onChange={ (input) => {addFirstName(input.target.value)}}
                                type="first_name"
                                placeholder="Please enter your first name"
                            />
                            <small className={css(inputWarning('first_name') ? styles.green : styles.red) + " padding5 margin5TB"}>
                                <strong>{inputWarning('first_name') ? "A-OK!" : "First name must be at least 1 letter"}</strong>
                            </small>
                        </div>
                        <hr/>
                        {/*Last Name*/}
                        <div className="flex colWrap aStart jCenter">
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                onChange={ (input) => {addLastName(input.target.value)}}
                                type="last_name"
                                placeholder="Please enter your last name"
                            />
                            <small className={css(inputWarning('last_name') ? styles.green : styles.red) + " padding5 margin5TB"}>
                                <strong>{inputWarning('last_name') ? "A-OK!" : "Last name must be at least 1 letter"}</strong>
                            </small>
                        </div>
                        <hr/>
                        {/*Email*/}
                        <div className="flex colWrap aStart jCenter">
                            <label htmlFor="email">Email Address</label>
                            <input
                                onChange={ (input) => {addEmail(input.target.value)}}
                                type="email"
                                placeholder="Enter email"
                            />
                        </div>
                        <hr/>
                        {/*Username*/}
                        <div className="flex colWrap aStart jCenter">
                            <label htmlFor="username">Username</label>
                            <input
                                onChange={ (input) => {addUsername(input.target.value)}}
                                type="username"
                                placeholder="Username"
                            />
                            <small className={css(inputWarning('username') ? styles.green : styles.red) + " padding5 margin5TB"}>
                                <strong>{inputWarning('username') ? "A-OK!" : "Username must be at least 1 character"}</strong>
                            </small>
                        </div>
                        <hr/>
                        {/*Password*/}
                        <div className="flex colWrap aStart jCenter">
                            <label htmlFor="password">Password</label>
                            <input
                                onChange={ (input) => {addPassword(input.target.value)}}
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <br/>
                        {/*Re-Enter Password*/}
                        <div className="flex colWrap aStart jCenter">
                            <label htmlFor="reenter_password">Re - Enter Password</label>
                            <input
                                onChange={ (input) => {addReEnterPassword(input.target.value)}}
                                type="password"
                                placeholder="Re-Enter Password"
                            />
                            <small className={css(passwordWarning() ? styles.green : styles.red) + " padding5 margin5TB"}>
                                <strong>{passwordWarning() ? "A-OK!" : "Passwords do not match!"}</strong>
                            </small>
                        </div>
                        <hr/>

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
export default connect(mapStateToProps, mapActionCreatorsToProps)(Register)
