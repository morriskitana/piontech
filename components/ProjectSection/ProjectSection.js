import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import Project from '../../api/project';

const ProjectSection = () => {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) {
        return null;
    }

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    };

    const displayedProjects = Project && Project.length > 0 ? Project.slice(0, 5) : [];

    return (
        <section className="portfolio_section xb-hidden section_space pb-0">
            <div className="container">
                <div className="heading_block">
                    <div className="row align-items-end">
                        <div className="col-lg-7">
                            <div className="heading_focus_text">
                                <span className="badge bg-secondary text-white">Delivered</span>
                                Success With Real Client Outcomes
                            </div>
                            <h2 className="heading_text">
                                Recent Project Highlights
                            </h2>
                            <p className="heading_description mb-0">
                                A selection of recent engagements across our service lines, delivered with clients in banking, insurance, healthcare, agriculture, sports and property development.
                            </p>
                        </div>
                        <div className="col-lg-5 d-none d-lg-flex justify-content-end">
                            <Link onClick={ClickHandler} href="/portfolio" className="btn btn-primary">
                                <span className="btn_label" data-text="All Works">All Works</span>
                                <span className="btn_icon">
                                    <i className="fa-solid fa-arrow-up-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="portfolio_carousel">
                <Swiper
                    modules={[Pagination, A11y]}
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={30}
                    allowTouchMove={true}
                    centeredSlides={true}
                    pagination={{ clickable: true }}
                    speed={400}
                    parallax={true}
                    breakpoints={{
                        1025: {
                            slidesPerView: 2,
                        },
                    }}
                >
                    {displayedProjects.map((project) => (
                        <SwiperSlide key={project.Id}>
                            <div className="portfolio_block">
                                <div className="portfolio_image">
                                    <Link onClick={ClickHandler} className="portfolio_image_wrap bg-light" href={'/portfolio_details/[slug]'} as={`/portfolio_details/${project.slug}`}>
                                        <Image src={project.pImg} alt={project.title} fill 
                                            style={{ objectFit: 'cover' }} 
                                        />
                                    </Link>
                                </div>
                                <div className="portfolio_content">
                                    <h3 className="portfolio_title">
                                        <Link onClick={ClickHandler} href={'/portfolio_details/[slug]'} as={`/portfolio_details/${project.slug}`}>
                                            {project.title}
                                        </Link>
                                    </h3>
                                    <ul className="category_list unordered_list">
                                        <li>
                                            <Link onClick={ClickHandler} href={'/service-single/[slug]'} as={`/service-single/${project.serviceSlug}`}>
                                                {project.service}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link onClick={ClickHandler} href={'/portfolio_details/[slug]'} as={`/portfolio_details/${project.slug}`}>
                                                {project.client}
                                            </Link>
                                        </li>
                                    </ul>
                                    <ul className="portfolio_meta unordered_list">
                                        <li className={project.status === 'ongoing' ? 'is_ongoing' : 'is_completed'}>
                                            <i className={project.status === 'ongoing' ? 'fa-solid fa-circle-notch' : 'fa-solid fa-circle-check'}></i>
                                            {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                                        </li>
                                        <li><i className="fa-solid fa-calendar"></i> {project.Year}</li>
                                    </ul>
                                    <Link onClick={ClickHandler} className="btn btn-outline-light" href={'/portfolio_details/[slug]'} as={`/portfolio_details/${project.slug}`}>
                                        <span className="btn_label" data-text="Explore">Explore</span>
                                        <span className="btn_icon">
                                            <i className="fa-solid fa-arrow-up-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="container text-center d-block d-lg-none">
                <div className="btns_group pb-0">
                    <Link onClick={ClickHandler} className="btn btn-primary" href="/portfolio">
                        <span className="btn_label" data-text="All Works">All Works</span>
                        <span className="btn_icon">
                            <i className="fa-solid fa-arrow-up-right"></i>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default ProjectSection;
