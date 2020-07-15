import React from "react";
import RenderLink from "../RenderLink";
import getSubjectList from "./../../../../../../../../apis/getSubjectList";
import styles from "./Course.module.scss";
import LoaderContainer from "../../../../../../../Layout/LoaderContainer";
import Loader from "../../../../../../../Loader";



class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectList: null,
      loading: true,
    };
  }

  async getSubjectList() {
    //TODO:: 这种保护很有必要
    const resp = await getSubjectList();
    const { subjectList } =  resp ? resp : [];
    this.setState({ subjectList: subjectList, loading: false });
  }

  componentDidMount() {

    this.getSubjectList();
  }
  componentDidCatch(e){
    console.log(e);
  }
  render() {
    return (
      <div className={styles.wrapper}>
        {this.state.loading ? (
          <LoaderContainer>
            <Loader color={"white"} />
          </LoaderContainer>
        ) : (
          <RenderLink
            RenderArray={this.state.subjectList}
            toPageID={"SubjectCourse"}
          />
        )}
      </div>
    );
  }
}

export default Course;
