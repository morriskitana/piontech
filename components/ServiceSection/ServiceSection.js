import React from 'react';
import Services from '../../api/service'
import Link from 'next/link'
import Image from 'next/image';

const ServiceSection = (props) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

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

                <div className="service_cards_grid">
                    {Services.filter(service => service.details).map((service, srv) => {
                        const featureList = (service.features || []).slice(0, 4);

                        return (
                            <div className="service_card" key={srv}>
                                <div className="service_card_icon">
                                    <Image src={service.sImg} alt={service.title} />
                                </div>
                                <div className="service_card_header">
                                    <h3 className="service_card_title">
                                        <Link onClick={ClickHandler} href={'/service-single/[slug]'} as={`/service-single/${service.slug}`}>
                                            {service.title}
                                        </Link>
                                    </h3>
                                    {service.summary && (
                                        <p className="service_card_summary">
                                            {service.summary}
                                        </p>
                                    )}
                                </div>
                                {featureList.length > 0 && (
                                    <ul className="service_card_features">
                                        {featureList.map((feature, featureIndex) => (
                                            <li key={featureIndex}>
                                                <span className="dot"></span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <div className="service_card_cta">
                                    <Link onClick={ClickHandler} href={'/service-single/[slug]'} as={`/service-single/${service.slug}`} className="service_card_link">
                                        Explore Service <i className="fa-regular fa-arrow-up-right"></i>
                                    </Link>
                                </div>
                            </div>
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
