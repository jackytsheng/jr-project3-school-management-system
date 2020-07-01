import React from "react";
import styles from "./HalfWidthLayout.module.scss";
import Button from "../Button";
import StudentAssignment from './../StudentAssignment';


const Detail = ({ title, description }) => {
  return (
    <div className={styles.detailWrapper}>
      <h3>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

const HalfContext = (props) => {
  return (
    <div className={styles.wrapper}>
      <p>{props.context}</p>
    </div>
  );
};


const HalfWidthLayout = (props) => {
  const renderBlock = (blockName) => {
    switch (blockName) {
      // TODO: Depreciated usage
      // case "Lists":
      //   return <Lists {...props} />;
      case "Popup":
        //目前放着这，但以后可以单独拿出来用
        return (
          <React.Fragment>
            <Button type={"DELETE"} />
            <Button type={"UPDATE"} />
            <Button type={"CREATE"} />
          </React.Fragment>
        );
      case "Context":
        return <HalfContext {...props} />;
      case "StudentAssignment":
        return <StudentAssignment {...props} />;
      default:
        return null;
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <Detail {...props} />
      </div>
      <div className={styles.functionalComponent}>
        {renderBlock(props.type)}
      </div>
    </div>
  );
}

export default HalfWidthLayout;
