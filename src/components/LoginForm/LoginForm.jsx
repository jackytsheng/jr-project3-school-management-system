import React from "react";
import styles from "./LoginForm.module.scss";
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import ChangeRole from "../../store/authentication/actions/ChangeRole";
import SetLogin from "../../store/authentication/actions/SetLogin";
class LoginForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      role:""
    };
  }

  render(){
        return (
          <div>
            <div className={styles.modal}>
              <form className={styles.form} onSubmit={this.props.onSubmit}>
                <h3 className={styles.title}>login</h3>
                {/* <div className={styles.control}>
                  <label>UserID</label>
                  <input
                    type="text"
                    placeholder="Enter UserID"
                    maxLength={30}
                    required
                  />
                </div>
                <div className={styles.control}>
                  <label className={styles.label}>Password</label>
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="Enter Password"
                    maxLength={30}
                    required
                  />
                </div> */}
                <button
                  className={styles.button}
                  to="/"
                  onClick={() => this.props.onClick("student")}
                >
                  Log in as Student
                </button>
                <button
                  className={styles.button}
                  to="/"
                  onClick={() => this.props.onClick("teacher")}
                >
                  Log in as Teacher
                </button>
                <button
                  className={styles.button}
                  to="/"
                  onClick={() => this.props.onClick("admin")}
                >
                  Log in as Admin
                </button>
              </form>
            </div>
            <div className={styles.mask}></div>
          </div>
        );
      }
    }


const mapDispatchToProps = (dispatch) => ({
    onClick:(text) => {
    dispatch(SetLogin());
    dispatch(ChangeRole(text));

  } 
})

const LoginFormContainer = connect(null, mapDispatchToProps)(LoginForm);
export default withRouter(LoginFormContainer);