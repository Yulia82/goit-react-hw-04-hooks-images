// import { Component } from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ImageGallery from "../ImageGallery";
import styles from "./ImageGalleryView.module.css";
import LoadMoreBtn from "../Button";
import Loadmore from "../Loader";
import ImagesApi from "../utils/getImages-api";
import { scroll } from "../utils/scroll";

const galleryImages = new ImagesApi();

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

function ImageGalleryView({ controlModal, nameImage }) {
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const activeImage = (src, alt) => {
    controlModal(src, alt);
  };

  useEffect(() => {
    if (nameImage === "") {
      return;
    }

    setStatus(Status.PENDING);

    galleryImages.query = nameImage;
    galleryImages.resetPage();

    galleryImages
      .getImage()
      .then(({ hits }) => {
        // console.log('images', hits);
        setImages(hits);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [nameImage]);

  const loadMore = () => {
    galleryImages.incrementPage();

    galleryImages
      .getImage()
      .then(({ hits }) => {
        setImages(prevState => [...prevState, ...hits]);
        setStatus(Status.RESOLVED);
        // console.log('images', hits);
        // this.setState(prevState => ({
        //   images: [...prevState.images, ...hits],
        //   status: Status.RESOLVED,
        // }));
        scroll();
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  };

  if (status === "idle") {
    return <p className={styles.Text}>Введите название картинки/фото</p>;
  }

  if (status === "pending") {
    return <Loadmore />;
  }

  if (status === "rejected") {
    return <p>{error.message}</p>;
  }

  if (status === "resolved") {
    if (images.length < galleryImages.imagesPerPage) {
      return <ImageGallery images={images} />;
    } else {
      return (
        <>
          <ImageGallery images={images} activeImage={activeImage} />
          <LoadMoreBtn onLoadMore={loadMore} />
        </>
      );
    }
  }
}

// class ImageGalleryView extends Component {
//   state = {
//     images: null,
//     error: null,
//     status: Status.IDLE,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.nameImage !== this.props.nameImage) {
//       this.setState({ status: Status.PENDING });

//       galleryImages.query = this.props.nameImage;
//       galleryImages.resetPage();

//       galleryImages
//         .getImage()
//         .then(({ hits }) => {
//           // console.log('images', hits);
//           this.setState({ images: hits, status: Status.RESOLVED });
//         })
//         .catch(error => this.setState({ error, status: Status.REJECTED }));
//     }
//   }

//   loadMore = () => {
//     galleryImages.incrementPage();

//     galleryImages
//       .getImage()
//       .then(({ hits }) => {
//         // console.log('images', hits);
//         this.setState(prevState => ({
//           images: [...prevState.images, ...hits],
//           status: Status.RESOLVED,
//         }));
//         scroll();
//       })
//       .catch(error => this.setState({ error, status: Status.REJECTED }));
//   };

//   activeImage = (src, alt) => {
//     this.props.controlModal(src, alt);
//   };

//   render() {
//     const { images, error, status } = this.state;

//     if (status === "idle") {
//       return <p className={styles.Text}>Введите название картинки/фото</p>;
//     }

//     if (status === "pending") {
//       return <Loadmore />;
//     }

//     if (status === "rejected") {
//       return <p>{error.message}</p>;
//     }

//     if (status === "resolved") {
//       if (images.length < galleryImages.imagesPerPage) {
//         return <ImageGallery images={images} />;
//       } else {
//         return (
//           <>
//             <ImageGallery images={images} activeImage={this.activeImage} />
//             <LoadMoreBtn onLoadMore={this.loadMore} />
//           </>
//         );
//       }
//     }
//   }
// }

ImageGalleryView.propTypes = {
  nameImage: PropTypes.string.isRequired,
  controlModal: PropTypes.func.isRequired,
};

export default ImageGalleryView;
