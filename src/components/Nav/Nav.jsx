import React from "react";
import NavHeader from "./components/NavHeader";
import NavSidebar from "./components/NavSideBar";
import styles from "./Nav.module.scss";
import {connect} from "react-redux";
import NavAvatar from './components/NavAvatar';
import getUserInfo from "../../apis/getUserInfo";
import AddUserInfo from '../../store/campus/actions/AddUserInfo';
import capitalise from '../../utils/Algorithm/capitalise';
const Loading = () => (
  <div className={styles.loading}>
    <div>Loading...</div>
  </div>
);
class UserName extends React.Component{
  constructor(props){
    super(props);
    this.state={
      loading:true,
      name:null,
    }
  }
  async getUserName(){
    const {name} = await getUserInfo(this.props.userRole, this.props.userID);
    
    this.setState(
      {
        loading: false,
        name: name,
      },
      () => this.props.addNameToRedux(name)
    );
  }
  componentDidMount(){
    this.getUserName();
  }
  render(){ 
    return (
      <div className={styles.nameWrapper}>
        {this.state.loading ? (
          <Loading />
        ) : (
          <div className={styles.name}>
            {this.state.name
              ? this.state.name
              : capitalise(this.props.userRole)}
          </div>
        )}
      </div>
    );
  }
}


const NavFooter = ({ userRole }) => (
  <h3> {capitalise(userRole) + " Version"}</h3>
);

const Nav = ({ userRole, userID, addName, noAvatar }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <NavHeader />
      </div>
      {noAvatar ? null: <NavAvatar userRole={userRole} userID={userID} />}
      <UserName userRole={userRole} userID={userID} addNameToRedux={addName} />
      <div className={styles.sideBar}>
        <NavSidebar />
      </div>
      <div className={styles.footer}>
        <NavFooter userRole={userRole} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userRole: state.Authentication.role.toLowerCase(),
  userID: state.Authentication.uuid,
});

const mapDispatchToProps = (dispatch) => ({
  addName: (name) => dispatch(AddUserInfo(name))
})


const NavContainer = connect(mapStateToProps, mapDispatchToProps)(Nav);
export default NavContainer;
