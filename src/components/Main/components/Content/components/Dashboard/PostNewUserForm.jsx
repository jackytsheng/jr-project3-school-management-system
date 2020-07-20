import React from "react";
import Loader from "../../../../../Loader";
import FullWidthLayout from "../../../../../Layout/FullWidthLayout";
import styles from "./PostForm.module.scss";
import postUser from "../../../../../../apis/postUser";
import LoaderContainer from "../../../../../Layout/LoaderContainer";
import {
  FormLayout,
  FormTitle,
  FormItem,
  HorizontalRow,
  Button,
  DummyButtonBlock,
  SmallText,
} from "../../../../../Layout/FormLayout/FormLayout";

class PostNewUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postSuccessful: false,
      loading: false,
      errorMessage: "",
      notNullableError: "",
      role: " ",
      email: "",
      firstName: "",
      lastName: "",
    };
  }

  handleEmailChange() {
    this.setState({ errorMessage: "" });
  }

  handleFirstNameChange() {
    this.setState({ errorMessage: "" });
  }

  handleLastNameChange() {
    this.setState({ errorMessage: "" });
  }

  validateEmail() {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const char = this.state.email;
    console.log(char);
    if (!regex.test(char)) {
      this.setState({ errorMessage: `not a valid email.` });
      return false;
    } else {
      return true;
    }
  }

  validateName(name) {
    const regex = /[A-Za-z]/;
    const char = name;
    console.log(char);
    if (!regex.test(char)) {
      this.setState({ errorMessage: `not a valid Name` });
      return false;
    } else {
      return true;
    }
  }

  checkNull() {
    const {
      postSuccessful,
      loading,
      errorMessage,
      notNullableError,
      ...checkProps
    } = this.state;
    console.log(checkProps);
    for (let prop in checkProps) {
      if (!checkProps[prop].trim()) {
        this.setState({ notNullableError: "Not empty input is allowed." });
      }
    }
  }
  handleValueChange(name) {
    return (event) => {
      const { value } = event.target;
      this.setState(
        {
          [name]: value,
          notNullableError: "",
        },
        this.checkNull
      );
    };
  }

  async postUserInfo() {
    const {
      loading,
      postSuccessful,
      errorMessage,
      notNullableError,
      role,
      ...postBody
    } = this.state;
    console.log(role,postBody);
    this.setState({
      loading: true,
    });
    await postUser(role,postBody)
      .then(() => {
        this.setState(
          {
            loading: false,
            postSuccessful: true,
          },
          () => setTimeout(() => this.setState({ postSuccessful: false }), 2000)
        );
      })
      .catch(console.log);
  }

  onSubmit() {
    console.log(
      this.validateEmail() &&
        this.validateName(this.state.firstName) &&
        this.validateName(this.state.lastName)
    );
    if (
      (this.validateEmail() &&
        this.validateName(this.state.firstName) &&
        this.validateName(this.state.lastName)) === false
    ) {
    } else {
      this.postUserInfo();
    }
  }

  render() {
    return (
      <FullWidthLayout>
        <FormLayout
          className={this.state.postSuccessful ? "successful" : null}
          onSubmit={(e) => {
            e.preventDefault();
            this.onSubmit();
          }}
        >
          <FormTitle>Add New User</FormTitle>
          {this.state.loading ? (
            <LoaderContainer background>
              <Loader />
            </LoaderContainer>
          ) : null}

          <FormItem>
            <label htmlFor="Role">Role: </label>
            <select
              className={styles.role}
              onChange={(event) => {
                this.handleValueChange("role")(event);
              }}
            >
              <option value="select">select</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </FormItem>
          <HorizontalRow>
            <FormItem>
              <label htmlFor="email">Email: </label>
              <input
                id="email"
                type="text"
                placeholder="Please enter the email"
                maxLength={30}
                required
                onChange={(event) => {
                  this.handleValueChange("email")(event);
                  this.handleEmailChange();
                }}
              />
            </FormItem>
            <FormItem>
              <label
                htmlFor="FirstName"
                className={!this.state.errorMessage ? null : styles.error}
              >
                First Name:{" "}
              </label>
              <input
                id="FirstName"
                type="text"
                placeholder="Please enter the FirstName"
                maxLength={30}
                required
                onChange={(event) => {
                  this.handleValueChange("firstName")(event);
                  this.handleFirstNameChange();
                }}
              />
            </FormItem>
            <FormItem>
              <label htmlFor="LastName">Last Name: </label>
              <input
                id="LastName"
                placeholder="Please enter the LastName"
                maxLength={30}
                required
                onChange={(event) => {
                  this.handleValueChange("lastName")(event);
                  this.handleLastNameChange();
                }}
              />
            </FormItem>
          </HorizontalRow>
          {!this.state.errorMessage && !this.state.notNullableError ? (
            <Button type="submit">Add New User</Button>
          ) : (
            <DummyButtonBlock>Unable to Click</DummyButtonBlock>
          )}
          {this.state.postSuccessful ? (
            <SmallText>Successful.</SmallText>
          ) : null}
          {this.state.errorMessage || this.state.notNullableError ? (
            <SmallText className={"error"}>
              {this.state.errorMessage + " " + this.state.notNullableError}
            </SmallText>
          ) : null}
        </FormLayout>
      </FullWidthLayout>
    );
  }
}

export default PostNewUserForm;
