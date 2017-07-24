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
            return <LoadingGif />
        }

        //Input field warnings
        const inputWarning = (field) => {
            if(users.userInfo[field] && users.userInfo[field].length > 0) return true;
            return false;
        }

        const warningByField = (field, amt) => {
            if(users.userInfo[field] === null) return null;
            if(users.userInfo[field].length >= amt) return <strong className={ `${css(styles.green)} padding5` }>Looks good</strong>;
            if(users.userInfo[field] !== null && users.userInfo[field].length < amt) return <strong className={ `${css(styles.red)} padding5` }>Must be longer than {amt} character(s)</strong>;
        }

        //Email validator
        const validateEmail = (email) => {
            var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            //.test() searches for specified regexp ... returns boolean
            return re.test(email)
        };

        //Password match warning
        const passwordWarning = () => {
            if(users.userInfo.reEnter_password.match && users.userInfo.reEnter_password.password && users.userInfo.reEnter_password.password.length > 0) return true;
            return false;
        }

        return (
            <div className="flex colWrap aCenter jCenter" style={{minHeight: '100vh', width: '45%'}}>
                <div className="fullWidthHeight padding25 margin25TB boxShadow">
                    <form id="authorization" method="post" onSubmit={this.handleFormSubmit.bind(this)}>

                        {/*ERROR? MESSAGE DISPLAYED HERE FROM SERVER*/}
                        <label className={css(styles.red)}>{users.error && users.error.response && users.error.response.status === 401 ? users.error.response.data : null}</label>
                        <large>Registration</large>
                        {/*First Name*/}
                        <div className="flex colWrap aStart jCenter padding15">
                            <label htmlFor="first_name" >First Name</label>
                            <input
                                onChange={ (input) => {addFirstName(input.target.value)}}
                                type="first_name"
                                placeholder="Please enter your first name"
                            />
                            <small className="padding5 margin5TB">
                                {warningByField('first_name', 1)}
                            </small>
                        </div>
                        <hr/>
                        {/*Last Name*/}
                        <div className="flex colWrap aStart jCenter padding15">
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                onChange={ (input) => {addLastName(input.target.value)}}
                                type="last_name"
                                placeholder="Please enter your last name"
                            />
                            <small className="padding5 margin5TB">
                                {warningByField('last_name', 1)}
                            </small>
                        </div>
                        <hr/>
                        {/*Email*/}
                        <div className="flex colWrap aStart jCenter padding15">
                            <label htmlFor="email">Email Address</label>
                            <input
                                onChange={ (input) => {addEmail(input.target.value)}}
                                type="email"
                                placeholder="Enter email"
                            />
                            <small className="padding5 margin5TB">
                                {validateEmail(users.userInfo.email) ? <strong className={`${css(styles.green)} padding5`}>Looks good</strong> : <strong className={`${css(styles.red)} padding5`}>Please enter a valid email</strong>}
                            </small>
                        </div>
                        <hr/>
                        {/*Username*/}
                        <div className="flex colWrap aStart jCenter padding15">
                            <label htmlFor="username">Username</label>
                            <input
                                onChange={ (input) => {addUsername(input.target.value)}}
                                type="username"
                                placeholder="Username"
                            />
                            <small className="padding5 margin5TB">
                                {warningByField('username', 1)}
                            </small>
                        </div>
                        <hr/>
                        {/*Password*/}
                        <div className="flex colWrap aStart jCenter padding15">
                            <label htmlFor="password">Password</label>
                            <input
                                onChange={ (input) => {addPassword(input.target.value)}}
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <hr/>
                        {/*Re-Enter Password*/}
                        <div className="flex colWrap aStart jCenter padding15">
                            <label htmlFor="reenter_password">Re - Enter Password</label>
                            <input
                                onChange={ (input) => {addReEnterPassword(input.target.value)}}
                                type="password"
                                placeholder="Re-Enter Password"
                            />
                            <small className="padding5 margin5TB">
                                {passwordWarning() ? null : <strong className={`${css(styles.red)} padding5`}>Passwords do not match</strong>}
                            </small>
                        </div>
                        <hr/>

                        <div className="flex colWrap aCenter jCenter padding15">
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
        display: 'inline-block'
    },
    red: {
        backgroundColor: 'rgba(200,10,0,0.5)',
        display: 'inline-block'
    }
})
export default connect(mapStateToProps, mapActionCreatorsToProps)(Register)
