import React, { Fragment } from 'react';
import Link from 'next/link'
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';
import CtaSection from '../../components/CtaSection/CtaSection';
import srImg from 'public/images/services/service_image_8.webp' 
import ServiceSection from '../../components/ServiceSection/ServiceSection';
import WhyUs from '../about/WhyUs';
import Image from 'next/image';


const ServicePage = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }
    return (
        <Fragment>
            <Header />
            <main className="page_content about-page">
                <PageTitle pageTitle={'Solutions & Services'} pagesub={'Services'} pageTop={'Our Expertise'} />
                <section className="about_section section_space bg-light">
                    <div className="container">
                        <div className="row align-items-center justify-content-lg-between">
                            <div className="col-lg-5 order-lg-last">
                                <div className="team_cartoon_image">
                                    <Image src={srImg} alt="Service Cartoon"/>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="about_content">
                                    <div className="heading_block">
                                        <div className="heading_focus_text">
                                            What We Deliver
                                            <span className="badge bg-secondary text-white">Turnkey ICT</span>
                                        </div>
                                        <h2 className="heading_text">
                                            End-to-end ICT, Security & Power Experts
                                        </h2>
                                        <p className="heading_description mb-0">
                                            PionTech Systems partners with organisations to review processes, uncover pain-points, scope solutions and guide delivery from design to commissioning. Our multidisciplinary engineers deliver resilient ICT infrastructure, integrated security, enterprise applications, telecommunications, renewable energy and smart facility projects backed by training, warranties and lifecycle support.
                                        </p>
                                    </div>
                                    <Link onClick={ClickHandler} href={'/contact'} className="btn">
                                        <span className="btn_label" data-text="Talk to a Specialist">Talk to a Specialist</span>
                                        <span className="btn_icon">
                                            <i className="fa-solid fa-arrow-up-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <ServiceSection />
                <div className="pt-130"></div>
                <WhyUs />
            </main>
            <CtaSection />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default ServicePage;







