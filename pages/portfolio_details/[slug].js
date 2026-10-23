import React, { Fragment } from 'react';
import Header from '../../components/header/Header';
import Project from '../../api/project';
import Link from "next/link";
import { useRouter } from 'next/router'
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';
import CtaSection from '../../components/CtaSection/CtaSection';
import icon from 'public/images/icons/icon_check_3.svg'
import Image from 'next/image';

import { findPartnerLogo, partnerMonogram } from '../../components/PartnerSection/partnerLogos';

export const getStaticPaths = async () => ({
    paths: Project.map(project => ({ params: { slug: project.slug } })),
    fallback: false
});

export const getStaticProps = async ({ params }) => ({
    props: { slug: params.slug }
});

const PortfolioSinglePage = (props) => {

    const router = useRouter()

    const slug = props?.slug || router.query?.slug;
    const PortfolioDetails = Project.find(item => item.slug === slug)

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    if (!PortfolioDetails) {
        return (
            <Fragment>
                <Header />
                <main className="page_content">
                    <PageTitle pageTitle={'Project not found'} pagesub={'Portfolio'} pageTop={'Portfolio'} />
                    <section className="section_space bg-light">
                        <div className="container text-center">
                            <p>We could not find that project.</p>
                            <Link onClick={ClickHandler} className="btn btn-primary" href="/portfolio">
                                <span className="btn_label" data-text="Back to Portfolio">Back to Portfolio</span>
                                <span className="btn_icon">
                                    <i className="fa-solid fa-arrow-up-right"></i>
                                </span>
                            </Link>
                        </div>
                    </section>
                </main>
                <Footer />
                <Scrollbar />
            </Fragment>
        )
    }

    // Other work in the same service line, so the detail page keeps the
    // portfolio connected to the service catalogue.
    const similarProjects = Project
        .filter(project => project.category === PortfolioDetails.category && project.slug !== PortfolioDetails.slug)
        .slice(0, 2);

    return (
        <Fragment>
            <Header />
            <main className="page_content about-page">
                <PageTitle pageTitle={PortfolioDetails.title} pagesub={PortfolioDetails.client} pageTop={'Portfolio'} />
                <section className="portfolio_details_section section_space bg-light">
                    <div className="container">
                        <div className="details_item_image">
                            <Image src={PortfolioDetails.pImg} alt={PortfolioDetails.title} width={1200} height={700} style={{ width: '100%', height: 'auto' }} />
                        </div>
                        <h2 className="details_item_title">{PortfolioDetails.title}</h2>
                        <p>{PortfolioDetails.summary}</p>
                        <p className="mb-0">{PortfolioDetails.description}</p>
                        <hr />
                        <ul className="portfolio_details_info_list icon_list unordered_list justify-content-lg-between mb-5">
                            <li>
                                <span className="icon_list_text">
                                    <strong className="text-dark text-uppercase">Service:</strong>
                                    <Link href={'/service-single/[slug]'} as={`/service-single/${PortfolioDetails.serviceSlug}`}>
                                        {PortfolioDetails.service}
                                    </Link>
                                </span>
                            </li>
                            <li>
                                <span className="icon_list_text">
                                    <strong className="text-dark text-uppercase">Client:</strong>
                                    {PortfolioDetails.client}
                                </span>
                            </li>
                            <li>
                                <span className="icon_list_text">
                                    <strong className="text-dark text-uppercase">Sector:</strong>
                                    {PortfolioDetails.Industry}
                                </span>
                            </li>
                            <li>
                                <span className="icon_list_text">
                                    <strong className="text-dark text-uppercase">Location:</strong>
                                    {PortfolioDetails.Country}
                                </span>
                            </li>
                            <li>
                                <span className="icon_list_text">
                                    <strong className="text-dark text-uppercase">Duration:</strong>
                                    {PortfolioDetails.Duration}
                                </span>
                            </li>
                            <li>
                                <span className="icon_list_text">
                                    <strong className="text-dark text-uppercase">Status:</strong>
                                    {PortfolioDetails.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                                </span>
                            </li>
                            <li>
                                <span className="icon_list_text">
                                    <strong className="text-dark text-uppercase">{PortfolioDetails.status === 'ongoing' ? 'Started' : 'Delivered'}:</strong>
                                    {PortfolioDetails.Year}
                                </span>
                            </li>
                        </ul>

                        <h3 className="details_item_info_title pt-4">Scope of Work</h3>
                        <p>
                            {PortfolioDetails.status === 'ongoing'
                                ? 'The work is running in phases, with each phase signed off before the next begins.'
                                : 'The engagement ran in phases, with each phase signed off before the next began.'}
                        </p>
                        <div className="row mb-4">
                            <div className="col-lg-6">
                                <ul className="icon_list unordered_list_block">
                                    {PortfolioDetails.scope.slice(0, Math.ceil(PortfolioDetails.scope.length / 2)).map(item => (
                                        <li key={item}>
                                            <span className="icon_list_icon">
                                                <Image src={icon} alt="Check SVG Icon" />
                                            </span>
                                            <span className="icon_list_text">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-lg-6">
                                <ul className="icon_list unordered_list_block">
                                    {PortfolioDetails.scope.slice(Math.ceil(PortfolioDetails.scope.length / 2)).map(item => (
                                        <li key={item}>
                                            <span className="icon_list_icon">
                                                <Image src={icon} alt="Check SVG Icon" />
                                            </span>
                                            <span className="icon_list_text">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <h3 className="details_item_info_title pt-4">{PortfolioDetails.status === 'ongoing' ? 'Solution & Progress' : 'Solution & Result'}</h3>
                        <ul className="icon_list unordered_list_block">
                            {PortfolioDetails.outcomes.map(item => (
                                <li key={item}>
                                    <span className="icon_list_icon">
                                        <Image src={icon} alt="Check SVG Icon" />
                                    </span>
                                    <span className="icon_list_text">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <h3 className="details_item_info_title pt-5 mb-4">Technology &amp; Partners</h3>
                        <p>
                            Delivered with {PortfolioDetails.service} technology and support from our certified partner network.
                        </p>
                        <div className="row g-3">
                            {PortfolioDetails.partners.map(partner => {
                                const logo = findPartnerLogo(partner);
                                return (
                                    <div className="col-xl-3 col-lg-4 col-md-6" key={partner}>
                                        <div className="card h-100 border-0 shadow-sm">
                                            <div className="card-body d-flex flex-column align-items-center text-center">
                                                <div className="partner_logo_tile d-inline-flex align-items-center justify-content-center rounded-3 bg-white border shadow-sm px-3 py-2 mb-3">
                                                    {logo ? (
                                                        <Image
                                                            src={logo.src}
                                                            alt={`${partner} logo`}
                                                            width={130}
                                                            height={44}
                                                            style={{ objectFit: 'contain' }}
                                                        />
                                                    ) : (
                                                        <span className="partner_logo_placeholder" aria-hidden="true">
                                                            {partnerMonogram(partner)}
                                                        </span>
                                                    )}
                                                </div>
                                                <h4 className="h6 mb-0">{partner}</h4>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="btns_group pt-5">
                            <Link onClick={ClickHandler} className="btn btn-primary" href={'/service-single/[slug]'} as={`/service-single/${PortfolioDetails.serviceSlug}`}>
                                <span className="btn_label" data-text={PortfolioDetails.service}>Explore this service</span>
                                <span className="btn_icon">
                                    <i className="fa-solid fa-arrow-up-right"></i>
                                </span>
                            </Link>
                            <Link onClick={ClickHandler} className="btn btn-outline-light" href="/clients">
                                <span className="btn_label" data-text="Our Clients">Our Clients</span>
                                <span className="btn_icon">
                                    <i className="fa-solid fa-arrow-up-right"></i>
                                </span>
                            </Link>
                        </div>

                        {similarProjects.length > 0 && (
                            <>
                                <h3 className="details_item_info_title pt-5 mb-4">Similar {PortfolioDetails.service} Projects</h3>
                                <div className="row row-cols-1 row-cols-lg-2 g-4">
                                    {similarProjects.map((project, prj) => (
                                        <div className="col" key={prj}>
                                            <div className="portfolio_block portfolio_layout_2">
                                                <div className="portfolio_image">
                                                    <Link onClick={ClickHandler} className="portfolio_image_wrap bg-light" href={'/portfolio_details/[slug]'} as={`/portfolio_details/${project.slug}`}>
                                                        <Image src={project.pImg} alt={project.title} />
                                                    </Link>
                                                </div>
                                                <div className="portfolio_content">
                                                    <h3 className="portfolio_title">
                                                        <Link onClick={ClickHandler} href={'/portfolio_details/[slug]'} as={`/portfolio_details/${project.slug}`}>
                                                            {project.title}
                                                        </Link>
                                                    </h3>
                                                    <p className="portfolio_summary">{project.summary}</p>
                                                    <ul className="category_list unordered_list">
                                                        <li>
                                                            <Link onClick={ClickHandler} href={'/service-single/[slug]'} as={`/service-single/${project.serviceSlug}`}>
                                                                <i className="fa-solid fa-layer-group"></i> {project.service}
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link onClick={ClickHandler} href={'/portfolio_details/[slug]'} as={`/portfolio_details/${project.slug}`}>
                                                                <i className="fa-solid fa-building"></i> {project.client}
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </section>
                <CtaSection />
            </main>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default PortfolioSinglePage;
