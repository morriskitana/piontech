import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-modal-video/scss/modal-video.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/animate.css'
import '../styles/fontawesome.css';
import '../styles/themify-icons.css';
import '../styles/animate.css';
import '../styles/sass/style.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Piontech - IT Solutions & Business Next Js Template</title>
      </Head>
      <Component {...pageProps} />
    </div>

  )
}

export default MyApp
