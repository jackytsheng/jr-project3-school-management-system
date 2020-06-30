import React from 'react';
import styles from './Button.module.scss';
import Popup from './../Popup';


//TODO: 这个肯定要 重构的，PopUp 也要解耦,应该是属于popup 的功能不应该写进来。
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seen: false,
    };
    this.togglePop = this.togglePop.bind(this);
  }
  togglePop() {
    this.setState({
      seen: !this.state.seen,
    });
  }

  buttonType(type) {
    switch (type) {
      case "UPLOAD":
        return styles.uploadBtn;
      case "CONFIRM":
        return styles.confirmBtn;
      case "DELETE":
        return styles.deleteBtn;
      case "UPDATE":
        return styles.updateBtn;
      case "CREATE":
        return styles.createBtn;
      default:
        return null;
    }
  }
  renderButton(type) {
    switch (type) {
      case "DELETE":
        return (
          <React.Fragment>
            <button
              className={`${styles.btn} + ${this.buttonType("DELETE")}`}
              onClick={this.togglePop}
            >
              Delete
            </button>
            {this.state.seen ? (
              <Popup type={"DELETE"} toggle={this.togglePop} />
            ) : null}
          </React.Fragment>
        );
      case "UPDATE":
        return (
          <React.Fragment>
            <button
              className={`${styles.btn} + ${this.buttonType("UPDATE")}`}
              onClick={this.togglePop}
            >
              Update
            </button>
            {this.state.seen ? (
              <Popup type={"UPDATE"} toggle={this.togglePop} />
            ) : null}
          </React.Fragment>
        );
      case "CREATE":
        return (
          <React.Fragment>
            <button
              className={`${styles.btn} + ${this.buttonType("CREATE")}`}
              onClick={this.togglePop}
            >
              Create
            </button>
            {this.state.seen ? (
              <Popup type={"CREATE"} toggle={this.togglePop} />
            ) : null}
          </React.Fragment>
        );
      case "UPLOAD":
        return (
          <div className={styles.uploadContainer}>
            {/* hide this input  */}
            <input
              id="UPLOAD"
              className={styles.uploadInput}
              type="file"
              onChange={this.props.onChange}
            />
            <label htmlFor="UPLOAD" className={styles.uploadLabel}>
              <div className={`${styles.btn} + ${this.buttonType("UPLOAD")}`}>
                {this.props.loaded ? this.props.fileName : "Upload"}
              </div>
            </label>
            {this.props.loaded &&
            !this.props.wrongType &&
            !this.props.overSize &&
            !this.props.success ? (
              <button
                className={`${styles.btn} + ${this.buttonType("CONFIRM")}`}
                onClick={(e) => this.props.handleConfirm(e)}
              >
                Confirm
              </button>
            ) : null}
            <div className={styles.floatWarning}>
              {this.props.wrongType ? (
                <div className={styles.warningText}>
                  X Only support .pdf format. Please uploaded again.
                </div>
              ) : null}
              {this.props.overSize ? (
                <div className={styles.warningText}>
                  X Only support file size less than 25 MB. Please uploaded
                  again.
                </div>
              ) : null}
              {this.props.success? (
                    <div
                      className={styles.successText}
                    >
                      Upload Successfully.
                    </div>
                  )
                : null}
            </div>
          </div>
        );
      default:
        return null;
    }
  }
  render() {
    return (
      <div className={styles.wrapper}>{this.renderButton(this.props.type)}</div>
    );
  }
}

export default Button;