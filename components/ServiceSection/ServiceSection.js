import React from 'react';
import Services from '../../api/service'
import ServiceImages from '../../api/serviceImages'
import Link from 'next/link'
import Image from 'next/image';

const ServiceSection = (props) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const services = Services.filter(service => service.details);

    return (
        <section className="service_section section_space xb-hidden pb-0">
            <div className="container">
                <div className="heading_block text-center">
                    <div className="heading_focus_text">
                        Our
                        <span className="badge bg-secondary text-white">Specialize</span>
                    </div>
                    <h2 className="heading_text mb-0">
                        Featured Services
                    </h2>
                </div>

                <div className="service_portfolio_grid">
                    {services.map((service, srv) => {
                        const featureList = (service.features || []).slice(0, 4);
                        const images = ServiceImages[service.slug];
                        const cardImage = images ? images.hero : service.sImg;
                        const href = '/service-single/[slug]';
                        const as = `/service-single/${service.slug}`;

                        return (
                            <article className="service_portfolio_card" key={srv}>
                                <Link onClick={ClickHandler} className="service_portfolio_image" href={href} as={as}>
                                    <Image src={cardImage} alt={service.title} />
                                    <span className="service_portfolio_emoji" aria-hidden="true">
                                        {service.emoji}
                                    </span>
                                </Link>

                                <div className="service_portfolio_content">
                                    <h3 className="service_portfolio_title">
                                        <Link onClick={ClickHandler} href={href} as={as}>
                                            {service.title}
                                        </Link>
                                    </h3>

                                    {service.summary && (
                                        <p className="service_portfolio_summary">
                                            {service.summary}
                                        </p>
                                    )}

                                    {featureList.length > 0 && (
                                        <ul className="service_portfolio_features">
                                            {featureList.map((feature, featureIndex) => (
                                                <li key={featureIndex}>
                                                    <i className="fa-solid fa-check"></i>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    <Link onClick={ClickHandler} href={href} as={as} className="service_portfolio_link">
                                        Explore Service
                                        <i className="fa-regular fa-arrow-up-right"></i>
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="btns_group pb-0">
                    <Link onClick={ClickHandler} className="btn btn-outline-light" href="/service">
                        <span className="btn_label" data-text="More Services">More Services</span>
                        <span className="btn_icon">
                            <i className="fa-solid fa-arrow-up-right"></i>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default ServiceSection;
