import React from 'react';
import styles from "./MarkingAssignment.module.scss";
import getAssignmentDetail from "../../../../../../apis/getAssignmentDetail";
import Loader from '../../../../../Loader';
import {connect} from 'react-redux';
import FullWidthLayout from '../../../../../Layout/FullWidthLayout'
import NoContent from '../NoContent/NoContent';
import ReactS3Download from '../../../../../../utils/AWS_S3/ReactS3Download';
import Button from "../../../../../Button";

class MarkingAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOption: "all",
      scoreChange: false,
      assignmentDetail: null,
      studentAssignmentList: [],
      renderArray: [],
      loading: true,
    };
    this.handleReview = this.handleReview.bind(this);
  }
  async getStudentAssignmentList() {
    const { id, courseID } = this.props;
    const { assignment, studentAssignmentList } = await getAssignmentDetail(
      id,
      courseID
    );
    this.setState({
      assignmentDetail: assignment,
      studentAssignmentList,
      renderArray: studentAssignmentList,
      loading: false,
    });
  }
  renderOption(option) {
    switch (option) {
      case "all":
        this.setState({
          renderArray: this.state.studentAssignmentList,
          displayOption: "all",
        });
        break;
      case "notMarked":
        this.setState({
          displayOption: "notMarked",
          renderArray: this.state.studentAssignmentList.filter(
            (obj) => obj.submitted && !obj.scored
          ),
        });
        break;
      default:
        this.setState({ renderArray: this.state.studentAssignmentList });
    }
  }
  downloadFileFromS3(key) {
    ReactS3Download(key);
  }
  componentDidUpdate() {
    if (this.state.scoreChange) {
      this.setState({ scoreChange: false }, () =>
        this.getStudentAssignmentList()
      );
    }
  }
  componentDidMount() {
    this.getStudentAssignmentList();
  }
  handleReview() {
    this.setState({ scoreChange: true });
  }
  renderArray(array) {
    let renderArray = [];
    array.forEach((obj, number) => {
      const { attachmentUrl, score, submitted, scored, id } = obj;
      renderArray.push(
        <div
          key={"MarkingAssignmentID" + Math.random()}
          className={styles.LinksContainer}
        >
          <div className={styles.LinksItem}>No. {number + 1}</div>
          {submitted ? (
            <div
              className={styles.LinksItem + " " + styles.Link}
              onClick={() => this.downloadFileFromS3(attachmentUrl)}
            >
              Download Response
            </div>
          ) : (
            <div className={styles.LinksItem}>Not Submitted yet</div>
          )}
          <div className={styles.LinksItem}>
            {scored ? score : "Not Marked yet"}
          </div>
          <div className={styles.LinksItem}>
            {submitted ? (
              <Button type="MARKING" id={id} handleReview={this.handleReview} />
            ) : null}
          </div>
        </div>
      );
    });
    return renderArray;
  }
  renderStudentAssignmentList() {
    const { renderArray } = this.state;
    if (renderArray.length === 0) {
      return (
        <div className={styles.LinksWrapper}>
          {" "}
          <NoContent text="No assignment to be marked." />{" "}
        </div>
      );
    } else {
      return (
        <div className={styles.LinksWrapper}>
          <div className={styles.headingContainer}>
            <div className={styles.LinksHeading}>No. </div>
            <div className={styles.LinksHeading}>Response status: </div>
            <div className={styles.LinksHeading}>Score:</div>
            <div className={styles.LinksHeading}></div>
          </div>
          {this.renderArray(this.state.renderArray)}
        </div>
      );
    }
  }
  renderAssignmentDetail() {
    const {
      title,
      courseName,
      dueDate,
      acceptanceCriteria,
      content,
    } = this.state.assignmentDetail;

    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          {courseName} - {title}
        </div>
        <div className={styles.container}>
          <div className={styles.dueDate}>Due: {dueDate} 11:59 pm </div>
          <div className={styles.subHeading}>Acceptance Criteria: </div>
          <p className={styles.paragraph}> {acceptanceCriteria} </p>
          <div className={styles.subHeading}>Content: </div>
          <p className={styles.paragraph}> {content} </p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <FullWidthLayout>
          {this.state.loading ? (
            <div className={styles.loadingContainer}>
              <Loader />
            </div>
          ) : (
            this.renderAssignmentDetail()
          )}
        </FullWidthLayout>
        <FullWidthLayout>
          <div className={styles.radioWrapper}>
            <div className={styles.RadioTitle}> Display Option: </div>
            <div className={styles.radio}>
              <input
                id="all"
                type="radio"
                name="display"
                checked={this.state.displayOption === "all" ? true : false}
                onChange={() => this.renderOption("all")}
              />
              <label className={styles.radioLabel} htmlFor="all">
                All
              </label>
            </div>
            <div className={styles.radio}>
              <input
                id="notMarked"
                type="radio"
                name="display"
                checked={
                  this.state.displayOption === "notMarked" ? true : false
                }
                onChange={() => this.renderOption("notMarked")}
              />
              <label htmlFor="notMarked" className={styles.radioLabel}>
                Only not marked
              </label>
            </div>
          </div>
          {this.renderStudentAssignmentList()}
        </FullWidthLayout>
      </React.Fragment>
    );
  }
};
const mapStateToProps = (state) => ({
  id: state.headerHistory.content.id,
  courseID: state.headerHistory.content.secondID,
});
const MarkingAssignmentContainer = connect(mapStateToProps)(MarkingAssignment);
export default MarkingAssignmentContainer;
