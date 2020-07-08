import React from "react";
import styles from "./HalfWidthLayout.module.scss";

const Detail = ({ title, description }) => {
  return (
    <div className={styles.detailWrapper}>
      <h3>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};


// const HalfContext = (props) => {
//   return (
//     <div className={styles.wrapper}>
//       <p>{props.context}</p>
//     </div>
//   );
// };

//TODO: 这里以后需要refactor 一下的。
const HalfWidthLayout = ({ title, children, description, ...rest }) => (
  <div className={styles.wrapper}>
    <div className={styles.heading}>
      <Detail title={title} description={description} />
    </div>
    <div
      className={
        rest.hasOwnProperty("background")
          ? styles.functionalComponent
          : null
      }
    >
      {children}
    </div>
  </div>
);

export default HalfWidthLayout;
