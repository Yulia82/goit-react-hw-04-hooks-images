import styles from "./Modal.module.css";
// import { Component } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

function Modal({ onClose, src, alt }) {
  const handleKeyDown = evt => {
    if (evt.code === "Escape") {
      onClose();
      window.removeEventListener("keydown", handleKeyDown);
    }
  };

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
      window.removeEventListener("keydown", handleKeyDown);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
  });

  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot,
  );
}

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener("keydown", this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handleKeyDown);
//   }

//   handleKeyDown = evt => {
//     if (evt.code === "Escape") {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = evt => {
//     if (evt.currentTarget === evt.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={styles.Overlay} onClick={this.handleBackdropClick}>
//         <div className={styles.Modal}>
//           <img src={this.props.src} alt={this.props.alt} />
//         </div>
//       </div>,
//       modalRoot,
//     );
//   }
// }

export default Modal;
