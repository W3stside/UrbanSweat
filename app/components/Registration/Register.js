import React, {Component} from 'react'

// === REDUX
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/userActions'

class Register extends Component {

    handleFormSubmit (e) {
        const {first_name, last_name, email, username, password} = this.props.users.userInfo;
        e.preventDefault();

        if (!first_name || !last_name || !email || !username || !password) {
            window.alert("Please fill out all fields.");
            return;
        };

        //dispatch addUser action - info deleted after POST in action
        this.props.addUser({first_name, last_name, email, username, password});
    }

    render() {
        const {addFirstName, addLastName, addEmail, addUsername, addPassword, users} = this.props;

        //onSubmission, show this, else show form
        if (users.registering) {
          return (
            <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%'}}>
              <img src="http://31.media.tumblr.com/0c855ac97b211311541a2fad6b3042be/tumblr_nfi14mS6qx1stn28do1_1280.gif" style={{height: '100%', width: '100%'}}/>
            </div>
        )}

        return (
            <div className="flex colWrap aCenter jCenter width75">
                <form method="post" onSubmit={this.handleFormSubmit.bind(this)}>
                    {/*First Name*/}
                    <div className="flex colWrap aStart jCenter">
                        <label htmlFor="first_name" >First Name</label>
                        <input
                            onChange={ (input) => {addFirstName(input.target.value)}}
                            type="first_name"
                            placeholder="Please enter your first name"
                        />
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
                    <hr/>

                    <div className="flex colWrap aCenter jCenter">
                        <input type="submit" value="Join us!"/>
                    </div>

                </form>
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

export default connect(mapStateToProps, mapActionCreatorsToProps)(Register)
