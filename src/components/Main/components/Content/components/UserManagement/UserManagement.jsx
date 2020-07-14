import React from "react";
import getUserQuery from "./../../../../../../apis/getUserQuery";
import Button from "../../../../../Button";
import SearchBar from "./SearchUser";
import styles from "./UserManagement.module.scss";
import RenderContentLink from "./../RenderContentLink";
import NoContent from "../NoContent/NoContent";
import FullWidthLayout from "../../../../../Layout/FullWidthLayout";
import { connect } from "react-redux";
import {
  IndexItem,
  HeaderRow,
  TableLayout,
  TableItem,
} from "../../../../../Layout/TableLayout/TableLayout";

class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      role: "student",
      nameList: [],
      errors: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async getUserName(role) {
    const validStudentIdRegex = RegExp(/^(s[0-9]*)$/);
    const validStudentNameRegex = RegExp(/^([a-zA-Z]*)$/);
    const validTeacherIdRegex = RegExp(/^(t[0-9]*)$/);
    const validTeacherNameRegex = RegExp(/^([a-zA-Z]*)$/);
    switch (role) {
      case "student":
        if (validStudentIdRegex.test(this.state.search) === true) {
          const nameList = await getUserQuery("studentId", this.state.search);
          console.log(nameList);
          this.setState({
            nameList: nameList,
          });
        } else if (validStudentNameRegex.test(this.state.search) === true) {
          const nameList = await getUserQuery("studentName", this.state.search);
          console.log(nameList);
          this.setState({
            nameList: nameList,
          });
        } else {
          this.setState({
            errors: "Please check the StudentID!",
          });
        }
        break;
      case "teacher":
        if (validTeacherIdRegex.test(this.state.search) === true) {
          const nameList = await getUserQuery("teacherId", this.state.search);
          console.log(nameList);
          this.setState({
            nameList: nameList,
          });
        } else if (validTeacherNameRegex.test(this.state.search) === true) {
          const nameList = await getUserQuery("teacherName", this.state.search);
          console.log(nameList);
          this.setState({
            nameList: nameList,
          });
        } else {
          this.setState({
            errors: "Please check the TeacherID!",
          });
        }
        break;
      default:
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    if (this.state.search === "") {
      this.setState({
        errors: "Please Input Something!",
      });
    } else if (this.state.errors === "") {
      await (console.log(this.state.role), this.getUserName(this.state.role));
    } else if (this.state.role !== this.props.role) {
      this.setState({ errors: "" });
      await (console.log(this.state.role),
      this.getUserName(this.state.role));
    }
  }

  handleRoleTemp = (role) => {
    this.setState({
      role: role,
    });
    console.log(this.state.role);
  };

  handleSearchTemp = (search) => {
    let errors = this.state.errors;
    const validInputRegex = RegExp(/^[a-zA-Z0-9]+$/);
    errors = validInputRegex.test(search) ? "" : "Invalid Input!";
    this.setState({
      errors: errors,
      search: search,
    });
    console.log(this.state.search, this.state.errors);
  };

  renderUserList() {
    let array = this.state.nameList;
    console.log(array);
    return array.map((obj, index) => {
      let { uuid, name } = obj;
      let RenderObj = {
        index: index,
        uuid,
        name: name,
      };
      return (
        <RenderContentLink
          key={"UserManagement" + Math.random()}
          RenderObj={RenderObj}
          toPageID={"UserInfo"}
        />
      );
    });
  }

  renderContent() {
    if (this.state.nameList.length < 1) {
      return <NoContent text={"There is no such user!"} />;
    } else {
      return (
        <TableLayout>
          <HeaderRow>
            <IndexItem>No:</IndexItem>
            <TableItem>Name:</TableItem>
            <TableItem>Campus ID:</TableItem>
          </HeaderRow>
          {this.renderUserList()}
        </TableLayout>
      );
    }
  }

  render() {
    return (
      <FullWidthLayout>
        <div className={styles.header}>
          <SearchBar
            search={this.state.search}
            onSearchChange={this.handleSearchTemp}
            role={this.state.role}
            onRoleChange={this.handleRoleTemp}
            onClick={this.onSubmit}
            errors={this.state.errors}
          />
          <div className={styles.createBtn}>
            <Button type={"CREATE"} />
          </div>
        </div>
        <div className={styles.wrapper}>{this.renderContent()}</div>
      </FullWidthLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.headerHistory.content.id,
  header: state.headerHistory.title,
});
const UserManagementContainer = connect(mapStateToProps)(UserManagement);
export default UserManagementContainer;
