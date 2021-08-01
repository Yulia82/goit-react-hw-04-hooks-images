// import { Component } from "react";
import { useState } from "react";
// import { ToastContainer } from 'react-toastify';
import styles from "./App.module.css";
import Searchbar from "../Searchbar";
import ImageGalleryView from "../ImageGalleryView";
import Modal from "../Modal";

function App() {
  const [nameImg, setNameImg] = useState("");
  const [showModal, setShowModal] = useState(null);

  const onSubmit = query => {
    setNameImg(query);
  };

  const openModal = (src, alt) => {
    setShowModal({ src, alt });
  };

  const closeModal = () => {
    setShowModal(null);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={onSubmit} />
      <ImageGalleryView nameImage={nameImg} controlModal={openModal} />
      {showModal && (
        <Modal onClose={closeModal} src={showModal.src} alt={showModal.alt} />
      )}

      {/* <ToastContainer/> */}
    </div>
  );
}

// ------------------------------------
// class App extends Component {
//   state = {
//     nameImg: "",
//     showModal: null,
//   };

//   onSubmit = query => {
//     this.setState({ nameImg: query });
//   };

//   openModal = (src, alt) => {
//     this.setState({ showModal: { src, alt } });
//   };

//   closeModal = () => {
//     this.setState({ showModal: null });
//   };

//   render() {
//     const { nameImg, showModal } = this.state;

//     return (
//       <div className={styles.App}>
//         <Searchbar onSubmit={this.onSubmit} />
//         <ImageGalleryView nameImage={nameImg} controlModal={this.openModal} />
//         {this.state.showModal && (
//           <Modal
//             onClose={this.closeModal}
//             src={showModal.src}
//             alt={showModal.alt}
//           />
//         )}

//         {/* <ToastContainer/> */}
//       </div>
//     );
//   }
// }

export default App;
