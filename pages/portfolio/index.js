import React, { Fragment, useMemo, useState } from 'react';
import Project from '../../api/project';
import Services from '../../api/service';
import Link from "next/link";
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/footer/Footer';
import CtaSection from '../../components/CtaSection/CtaSection';
import Image from 'next/image';

// Short labels for the service line filters. The full service titles stay on
// the service pages; these keep the filter row readable.
const SERVICE_SHORT_LABELS = {
    'ict-solutions-systems-and-hardware': 'ICT & Hardware',
    'integrated-security-solutions': 'Security',
    'enterprise-applications': 'Enterprise Apps',
    'custom-software-and-integration': 'Custom Software',
    'telecommunication-solutions': 'Telecom',
    'power-and-renewable-energy': 'Power & Energy',
    'smart-facilities-and-automation': 'Smart Facilities',
    'iot-solutions-and-remote-monitoring': 'IoT'
};

const PortfolioPage = (props) => {

    const [activeFilter, setActiveFilter] = useState('all');

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    }

    // Filters follow the service catalogue so a new service line shows up here
    // without touching this page.
    const serviceFilters = useMemo(
        () => Services
            .filter(service => service.showOnServicePage)
            .map(service => ({
                id: service.slug,
                title: service.title,
                label: SERVICE_SHORT_LABELS[service.slug] || service.title
            })),
        []
    );

    const countFor = (filterId) => (filterId === 'all'
        ? Project.length
        : Project.filter(project => project.category === filterId).length);

    const filteredProjects = activeFilter === 'all'
        ? Project
        : Project.filter(project => project.category === activeFilter);

    const ongoingProjects = filteredProjects.filter(project => project.status === 'ongoing');
    const completedProjects = filteredProjects.filter(project => project.status === 'completed');

    // Clients behind the projects in view, de-duplicated by name.
    const visibleClients = useMemo(() => {
        const seen = new Set();
        return filteredProjects
            .filter(project => {
                if (seen.has(project.client)) return false;
                seen.add(project.client);
                return true;
            })
            .map(project => ({ name: project.client, logo: project.clientLogo }));
    }, [filteredProjects]);

    const renderProjectGrid = (projects) => (
        <div className="filter_elements_wrapper row row-cols-1 row-cols-lg-2 g-4">
            {projects.map((project, prj) => (
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
                            <ul className="portfolio_meta unordered_list">
                                <li className={project.status === 'ongoing' ? 'is_ongoing' : 'is_completed'}>
                                    <i className={project.status === 'ongoing' ? 'fa-solid fa-circle-notch' : 'fa-solid fa-circle-check'}></i>
                                    {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                                </li>
                                <li><i className="fa-solid fa-location-dot"></i> {project.Country}</li>
                                <li><i className="fa-solid fa-calendar"></i> {project.Year}</li>
                                <li><i className="fa-solid fa-industry"></i> {project.Industry}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <Fragment>
            <Header />
            <main className="page_content about-page">
                <PageTitle pageTitle={'Our Portfolio'} pagesub={'Real projects, real clients'} pageTop={'Our'} />
                <section className="portfolio_section section_space bg-light">
                    <div className="container">
                        <div className="filter_elements_nav portfolio_filters">
                            <ul className="unordered_list justify-content-center">
                                <li className={activeFilter === 'all' ? 'active' : ''}>
                                    <button type="button" aria-pressed={activeFilter === 'all'} onClick={() => handleFilterClick('all')}>
                                        See All <span className="filter_count">({countFor('all')})</span>
                                    </button>
                                </li>
                                {serviceFilters.map(service => (
                                    <li
                                        key={service.id}
                                        className={activeFilter === service.id ? 'active' : ''}
                                    >
                                        <button type="button" aria-pressed={activeFilter === service.id} onClick={() => handleFilterClick(service.id)}>
                                            {service.label} <span className="filter_count">({countFor(service.id)})</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {ongoingProjects.length > 0 && (
                            <div id="ongoing" className="portfolio_status_group">
                                <div className="heading_block text-center mb-4">
                                    <div
                                        className="heading_focus_text has_underline d-inline-flex"
                                        style={{ backgroundImage: `url(${'/images/shapes/shape_title_under_line.svg'})` }}
                                    >
                                        Ongoing projects
                                    </div>
                                    <p className="heading_description mb-0">
                                        Implementations currently running with our clients.
                                    </p>
                                </div>
                                {renderProjectGrid(ongoingProjects)}
                            </div>
                        )}

                        {completedProjects.length > 0 && (
                            <div id="completed" className="portfolio_status_group">
                                <div className="heading_block text-center mb-4">
                                    <div
                                        className="heading_focus_text has_underline d-inline-flex"
                                        style={{ backgroundImage: `url(${'/images/shapes/shape_title_under_line.svg'})` }}
                                    >
                                        Completed projects
                                    </div>
                                    <p className="heading_description mb-0">
                                        Delivered engagements and the results they produced.
                                    </p>
                                </div>
                                {renderProjectGrid(completedProjects)}
                            </div>
                        )}

                        {filteredProjects.length === 0 && (
                            <p className="text-center mt-4 mb-0">No projects in this service line yet.</p>
                        )}

                        <div className="portfolio_related mt-5">
                            <div className="heading_block text-center">
                                <div
                                    className="heading_focus_text has_underline d-inline-flex"
                                    style={{ backgroundImage: `url(${'/images/shapes/shape_title_under_line.svg'})` }}
                                >
                                    Clients on these engagements
                                </div>
                                <p className="heading_description mb-0">
                                    Every project above is delivered with our clients and supported by our technology partner network.
                                </p>
                            </div>
                            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3 mt-2 align-items-stretch">
                                {visibleClients.map(client => (
                                    <div className="col" key={client.name}>
                                        <div className="client_logo_tile d-flex align-items-center justify-content-center rounded-3 bg-white border shadow-sm px-3 py-2 h-100" title={client.name} style={{aspectRatio:'16/9'}}>
                                            <Image src={client.logo} alt={`${client.name} logo`} width={140} height={50} style={{ objectFit: 'contain', maxWidth: (client.name === 'KEMRI' || client.name === 'Kenya Medical Research Institute') ? '70%' : '85%', height: 'auto' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="btns_group text-center mt-4">
                                <Link onClick={ClickHandler} className="btn btn-outline-light" href="/clients">
                                    <span className="btn_label" data-text="All Clients">All Clients</span>
                                    <span className="btn_icon">
                                        <i className="fa-solid fa-arrow-up-right"></i>
                                    </span>
                                </Link>
                                <Link onClick={ClickHandler} className="btn btn-outline-light" href="/partners">
                                    <span className="btn_label" data-text="Our Partners">Our Partners</span>
                                    <span className="btn_icon">
                                        <i className="fa-solid fa-arrow-up-right"></i>
                                    </span>
                                </Link>
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

export default PortfolioPage;
