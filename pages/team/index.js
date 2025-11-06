import React, { Fragment } from 'react';
import Link from "next/link";
import Teams from '../../api/team'
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';
import CtaSection from '../../components/CtaSection/CtaSection';
import tImg from 'public/images/team/team_cartoon_image.webp'
import sImg1 from 'public/images/icons/icon_facebook.svg'
import sImg2 from 'public/images/icons/icon_twitter_x.svg'
import sImg3 from 'public/images/icons/icon_linkedin.svg'
import sImg4 from 'public/images/icons/icon_instagram.svg'
import Image from 'next/image';

const TeamPage = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }
    return (
        <Fragment>
            <Header />
            <main className="page_content about-page">
                <PageTitle pageTitle={'Team Member'} pagesub={'Members 😍'} pageTop={'Team'} />
                <section className="about_section section_space bg-light">
                    <div className="container">
                        <div className="row align-items-center justify-content-lg-between">
                            <div className="col-lg-6 order-lg-last">
                                <div className="team_cartoon_image">
                                    <Image src={tImg} alt="Team Cartoon" />
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="about_content">
                                    <div className="heading_block">
                                        <div className="heading_focus_text">
                                            Our Dedicated
                                            <span className="badge bg-secondary text-white">Team 🙂</span>
                                        </div>
                                        <h2 className="heading_text">
                                            Get to Know Our Expert Piontech Team
                                        </h2>
                                        <p className="heading_description mb-0">
                                            Get acquainted with the powerhouse behind Piontech – our expert team of professionals dedicated to revolutionizing the IT landscape. Comprising.
                                        </p>
                                    </div>
                                    <Link onClick={ClickHandler} href={'/team'} className="btn">
                                        <span className="btn_label" data-text="Talk to an Expart">Talk to an Expart</span>
                                        <span className="btn_icon">
                                            <i className="fa-solid fa-arrow-up-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="team_section section_space">
                    <div className="container">
                        <div className="heading_block text-center">
                            <div className="heading_focus_text">
                                <span className="badge bg-secondary text-white">Our Expert</span>
                                Team Members 😍
                            </div>
                            <h2 className="heading_text mb-0">
                                Top Skilled Experts
                            </h2>
                        </div>

                        <div className="row">
                            {Teams.slice(0, 6).map((team, tm) => (
                                <div className="col-lg-4 col-md-6 col-sm-6" key={tm}>
                                    <div className="team_block">
                                        <div className="team_member_image">
                                            <Link onClick={ClickHandler} className="image_wrap" aria-label="Team Details Button" href={'/team-single/[slug]'} as={`/team-single/${team.slug}`}>
                                                <Image src={team.tImg} alt="" />
                                                <i className="fa-solid fa-arrow-up-right"></i>
                                            </Link>
                                        </div>
                                        <div className="team_member_info">
                                            <h3 className="team_member_name">
                                                <Link onClick={ClickHandler} href={'/team-single/[slug]'} as={`/team-single/${team.slug}`}>{team.name}</Link>
                                            </h3>
                                            <h4 className="team_member_designation">{team.title}</h4>
                                            <ul className="social_icons_block unordered_list justify-content-center">
                                                <li>
                                                    <Link onClick={ClickHandler} href={'/team-single/[slug]'} as={`/team-single/${team.slug}`}>
                                                        <Image src={sImg1} alt="Icon Facebook" />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link onClick={ClickHandler} href={'/team-single/[slug]'} as={`/team-single/${team.slug}`}>
                                                        <Image src={sImg2} alt="Icon Twitter X" />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link onClick={ClickHandler} href={'/team-single/[slug]'} as={`/team-single/${team.slug}`}>
                                                        <Image src={sImg3} alt="Icon Linkedin" />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link onClick={ClickHandler} href={'/team-single/[slug]'} as={`/team-single/${team.slug}`}>
                                                        <Image src={sImg4} alt="Icon Instagram" />
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
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
