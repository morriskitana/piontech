import React, { Fragment, useState } from 'react';
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';
import aImg from 'public/images/about/about_image_3.webp'
import aImg2 from 'public/images/about/about_image_4.webp'
import ModalVideo from 'react-modal-video'
import PolicySection from './Policy';
import WhyUs from './WhyUs';
import FeaturesSection from '../../components/FeaturesSection/FeaturesSection';
import TeamSection from '../../components/TeamSection/TeamSection';
import CtaSection from '../../components/CtaSection/CtaSection';
import Image from 'next/image';


const AboutUsPage = (props) => {

    const [isOpen, setOpen] = useState(false)
    return (
        <Fragment>
            <Header />
            <main className="page_content about-page">
                <PageTitle pageTitle={'About Us'} pagesub={'Company Overview'} pageTop={'About'}/>
                <section className="intro_about_section section_space bg-light">
                    <div className="intro_about_content">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="image_wrap">
                                        <Image src={aImg} alt="Piontech - About " />
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="image_wrap position-relative">
                                        <Image src={aImg2} alt="Piontech - About" />
                                        <button className="video_btn ripple_effect" onClick={() => setOpen(true)}>
                                            <span className="btn_icon">
                                                <i className="fa-solid fa-play"></i>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="heading_block mb-0">
                            <div className="row justify-content-lg-between">
                                <div className="col-lg-4">
                                    <div className="heading_focus_text">
                                        About
                                        <span className="badge bg-secondary text-white">PionTech Systems</span>
                                    </div>
                                    <h2 className="heading_text mb-0">
                                        ICT Solutions Partner for Operations-Critical Environments
                                    </h2>
                                </div>
                                <div className="col-lg-6">
                                        <p className="heading_description mb-3">
                                        PionTech Systems Limited is a versatile ICT solutions provider and systems integrator headquartered in Nairobi, Kenya. Founded and incorporated in 2021, we blend consultative discovery with deep engineering expertise to modernise infrastructure, enhance security and automate operations for organisations across the region.
                                    </p>
                                    <p className="heading_description mb-4">
                                        We walk with our clients end-to-end—from onsite assessments and pain-point definition to solution architecture, deployment, training and lifecycle support—grounding every engagement in sector best practices and strategic OEM partnerships.
                                    </p>
                                    <ul className="unordered_list">
                                        <li>Turnkey delivery across ICT infrastructure, integrated security, enterprise applications, telecoms, power and IoT.</li>
                                        <li>Certified specialists who coordinate civil, electrical, networking and software workstreams seamlessly.</li>
                                        <li>Rigorous testing, commissioning and post-implementation support that safeguard performance.</li>
                                        <li>Flexible commercial models that scale with mission-critical operations and growth targets.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <PolicySection />
                <FeaturesSection />
                <TeamSection />
                <WhyUs />
                <CtaSection />
            </main>
            <Footer />
            <Scrollbar />
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="7e90gBu4pas" onClose={() => setOpen(false)} />
        </Fragment>
    )
};
export default AboutUsPage;






