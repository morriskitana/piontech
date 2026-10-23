import React, { Fragment } from 'react';
import Header from '../../components/header/Header';
import Link from "next/link";
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';
import CtaSection from '../../components/CtaSection/CtaSection';

// Individual team profiles are not published at the moment. The route is kept so any
// existing link still resolves to a useful page instead of a 404.
const TeamSinglePage = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <Fragment>
            <Header />
            <main className="page_content about-page">
                <PageTitle pageTitle={'Team Profile'} pagesub={'PionTech'} pageTop={'About'} />
                <section className="section_space bg-light">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="about_content text-center">
                                    <div className="heading_block">
                                        <h2 className="heading_text">Profile Not Published</h2>
                                        <p className="heading_description">
                                            We are not publishing individual team profiles at the moment. Talk to us
                                            directly and we will pair you with the specialist that matches your
                                            project — across ICT infrastructure, integrated security, enterprise
                                            applications, custom software, telecoms, power and IoT.
                                        </p>
                                    </div>
                                    <Link onClick={ClickHandler} href={'/contact'} className="btn">
                                        <span className="btn_label" data-text="Talk to an Expert">Talk to an Expert</span>
                                        <span className="btn_icon">
                                            <i className="fa-solid fa-arrow-up-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <CtaSection />
            </main>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default TeamSinglePage;
