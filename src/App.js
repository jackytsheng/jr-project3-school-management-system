import React from 'react';
import styles from './App.module.scss';
import Nav from './components/Nav';
import Main from "./components/Main";
import * as ContentArray from "./RenderContentConfig/ContentConfig";

//Dashboard content ID 0,
//role: student 
//目前是以一个render content ID 来实现

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "admin",
      current: "Dashboard",
      history: [
        {
          headingID: 1,
          title: "Dashboard",
          content: ContentArray.DashboardContent[0],
        },
      ],
    };
   
    this.handleClickNav = this.handleClickNav.bind(this);
    this.handleClickHeader = this.handleClickHeader.bind(this);
    this.handleAddHeader = this.handleAddHeader.bind(this); 
  }

  handleClickHeader(event,headingID) {
    event.preventDefault();
    const history = this.state.history;
    this.setState(
      { history: history.slice(0,headingID)}
    );
  }
  handleAddHeader(event, obj) {
    event.preventDefault();
    let history = this.state.history;
    let id = history.length + 1;
    let newHistory = [...history,{
      headingID: id,
      ...obj
    }];
    console.log(newHistory);
    this.setState(
      { history: newHistory}
      );
  }
  handleClickNav(e, HeaderTitle, id, currentNavItem) {
    let contentArray;
    // mapping for content to be display
    switch (currentNavItem) {
      case "Dashboard" :
        contentArray = ContentArray.DashboardContent[0];
        break;
      case "Assignment":
        contentArray = ContentArray.AssignmentsContent[id];
        break;
      case "Enrollment":
        contentArray = ContentArray.EnrollmentsContent[id];
        break;
      case "UserInfo":
        contentArray = ContentArray.UserInfoContent[id];
        break;
      case "Help":
        contentArray = ContentArray.HelpContent[id];
        break;
      case "Setting":
        contentArray = ContentArray.ConfigurationContent[id];
        break;
      default:
        contentArray = ContentArray.NoContent[0];
    }
    this.setState({
      current: currentNavItem,
    },() => {this.handleAddHeader(e, {
               title: HeaderTitle,
               content: contentArray,
             });});
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.nav}>
          <Nav role={this.state.role} onClick={this.handleClickNav} />
        </div>
        <div className={styles.main}>
          <Main
            history = {this.state.history}
            title={this.state.title}
            role={this.state.role}
            current={this.state.current}
            handleClickHeader={this.handleClickHeader}
            handleAddHeader={this.handleAddHeader}
          />
        </div>
      </div>
    );
  }
}

export default App;
