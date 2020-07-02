import React from "react";
import styles from "./RenderLink.module.scss";
import { connect } from "react-redux";
import ClickLink from './../../../../../../../../store/campus/actions/ClickLink';

//TODO: 还需要解耦
const RenderLink = ({ RenderArray, onClick, CurrentNavItem }) =>
  RenderArray.map((obj) => (
    <div
      onClick={(event) => onClick(event, obj.name, obj.id, CurrentNavItem)}
      className={styles.links}
      key={"id" + Math.random()}
    >
      {obj.name}
    </div>
  ));

  const mapDispatchToProps = (dispatch) => ({
    onClick: (event, headingTitle, id, CurrentNavItem) => {
      dispatch(ClickLink(event, headingTitle, id, CurrentNavItem));
    },
  });

const RenderLinkContainer = connect(null, mapDispatchToProps)(RenderLink);

export default RenderLinkContainer;