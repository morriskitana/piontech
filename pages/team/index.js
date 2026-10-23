import React, { Fragment } from 'react';
import Link from "next/link";
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';
import CtaSection from '../../components/CtaSection/CtaSection';
import tImg from 'public/images/team/team_cartoon_image.webp'
import Image from 'next/image';

// Individual team profiles are not published on the site for now, so this page
// positions the team by capability and routes visitors straight to a conversation.
const capabilities = [
    {
        title: 'ICT Solutions, Systems & Hardware',
        text: 'Structured cabling, data centre build-out, power and end-to-end ICT hardware delivery.'
    },
    {
        title: 'Integrated Security Solutions',
        text: 'Access control, video surveillance, command-and-control monitoring and safety systems.'
    },
    {
        title: 'Enterprise Applications',
        text: 'Fleet, visitor and workforce applications that turn manual processes into measurable operations.'
    },
    {
        title: 'Custom Software & Integration',
        text: 'Bespoke platforms, APIs and system integrations engineered around how your organisation actually works.'
    },
    {
        title: 'Telecommunication Solutions',
        text: 'Fibre, backhaul, mast and network infrastructure built for resilient, high-availability sites.'
    },
    {
        title: 'Power, Smart Facilities & IoT',
        text: 'Hybrid solar, building management and connected sensing for efficient, measurable sites.'
    }
];

const TeamPage = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }
    return (
        <Fragment>
            <Header />
            <main className="page_content about-page">
                <PageTitle pageTitle={'Work With Us'} pagesub={'PionTech'} pageTop={'About'} />
                <section className="about_section section_space bg-light">
                    <div className="container">
                        <div className="row align-items-center justify-content-lg-between">
                            <div className="col-lg-6 order-lg-last">
                                <div className="team_cartoon_image">
                                    <Image src={tImg} alt="PionTech engineers collaborating on a project" />
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="about_content">
                                    <div className="heading_block">
                                        <div className="heading_focus_text">
                                            Capability,
                                            <span className="badge bg-secondary text-white">not headcount 🙂</span>
                                        </div>
                                        <h2 className="heading_text">
                                            The Right Specialists For Every Workstream
                                        </h2>
                                        <p className="heading_description mb-0">
                                            We are not publishing individual profiles at the moment. What matters more is
                                            what we can deliver for you: certified engineers, technicians and consultants
                                            working as one team across infrastructure, security, software, power and
                                            connected systems.
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
                <section className="section_space">
                    <div className="container">
                        <div className="heading_block text-center mb-5">
                            <h2 className="heading_text">Where Our Teams Work</h2>
                            <p className="heading_description">
                                Every engagement is staffed by specialists drawn from these six service lines.
                            </p>
                        </div>
                        <div className="row">
                            {capabilities.map((item, index) => (
                                <div className="col-lg-6" key={index}>
                                    <div className="about_content h-100">
                                        <h3 className="heading_text mb-2">{item.title}</h3>
                                        <p className="mb-0">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <CtaSection />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default TeamPage;
