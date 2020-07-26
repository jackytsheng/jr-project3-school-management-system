import React from "react";
import getUserQuery from "./../../../../../../apis/getUserQuery";
import SearchBar from "./SearchUser";
import RenderContentLink from "./../RenderContentLink";
import NoContent from "../NoContent";
import FullWidthLayout from "../../../../../Layout/FullWidthLayout";
import pagination from "../../../../../../utils/Algorithm/pagination";
import { connect } from "react-redux";
import {
  IndexItem,
  Page,
  HeaderRow,
  TableLayout,
  TableItem,
} from "../../../../../Layout/TableLayout/TableLayout";
const ITEM_PER_PAGE = 8;

class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      paginationArray: [],
      search: "",
      role: "student",
      nameList: [],
      errors: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(page) {
    this.setState({ page });
  }

  async getUserName(role) {
    const validStudentIdRegex = RegExp(/^(s[0-9]*)$/);
    const validStudentNameRegex = RegExp(/^([a-zA-Z]*)$/);
    const validTeacherIdRegex = RegExp(/^(t[0-9]*)$/);
    const validTeacherNameRegex = RegExp(/^([a-zA-Z]*)$/);
    this.setState({
      page: 1,
    });
    switch (role) {
      case "student":
        if (validStudentIdRegex.test(this.state.search) === true) {
          const nameList = await getUserQuery("studentId", this.state.search);
          this.setState({
            nameList: nameList,
            paginationArray: pagination(
              nameList.filter((name) => {
                return name.active === true;
              }),
              ITEM_PER_PAGE
            ),
          });
        } else if (validStudentNameRegex.test(this.state.search) === true) {
          const nameList = await getUserQuery("studentName", this.state.search);
          this.setState({
            nameList: nameList,
            paginationArray: pagination(
              nameList.filter((name) => {
                return name.active === true;
              }),
              ITEM_PER_PAGE
            ),
          });
          console.log(this.state.paginationArray);
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
            paginationArray: pagination(
              nameList.filter((name) => {
                return name.active === true;
              }),
              ITEM_PER_PAGE
            ),
          });
        } else if (validTeacherNameRegex.test(this.state.search) === true) {
          const nameList = await getUserQuery("teacherName", this.state.search);
          this.setState({
            nameList: nameList,
            paginationArray: pagination(
              nameList.filter((name) => {
                return name.active === true;
              }),
              ITEM_PER_PAGE
            ),
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
      await (console.log(this.state.role), this.getUserName(this.state.role));
    }
  }

  handleRoleTemp = (role) => {
    this.setState({
      role: role,
    });
  };

  handleSearchTemp = (search) => {
    let errors = this.state.errors;
    const validInputRegex = RegExp(/^[a-zA-Z0-9]+$/);
    errors = validInputRegex.test(search) ? "" : "Invalid Input!";
    this.setState({
      errors: errors,
      search: search,
    });
  };

  renderUserList() {
    const {page,paginationArray} = this.state;
    let array = paginationArray[page-1];
    const {role} = this.state;
    return array.map((obj, index) => {
      let { uuid, name, campusId } = obj;
      let RenderObj = {
        index: index,
        id: uuid,
        secondID: role,
        name: name,
        campusId,
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
    const { page, paginationArray } = this.state;
    if (paginationArray.length === 0) {
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
          <Page
            currentPage={page}
            handlePageChange={this.handlePageChange}
            totalPage={paginationArray.length}
          />
        </TableLayout>
      );
    }
  }

  render() {
    return (
      <FullWidthLayout>
        <SearchBar
          search={this.state.search}
          onSearchChange={this.handleSearchTemp}
          role={this.state.role}
          onRoleChange={this.handleRoleTemp}
          onClick={this.onSubmit}
          errors={this.state.errors}
        />
        {this.renderContent()}
      </FullWidthLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.headerHistory.content.id,
  secondID: state.headerHistory.content.secondID,
  header: state.headerHistory.title,
});
const UserManagementContainer = connect(mapStateToProps)(UserManagement);
export default UserManagementContainer;
