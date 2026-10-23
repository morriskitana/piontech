import React from 'react';
import Link from 'next/link'
import Project from '../../../api/project'
import { findPartnerLogo, partnerMonogram } from '../../PartnerSection/partnerLogos'
import about1 from 'public/images/about/about_image_6.webp'
import aIcon1 from 'public/images/avatar/avatar_1.webp'
import aIcon2 from 'public/images/avatar/avatar_2.webp'
import aIcon3 from 'public/images/avatar/avatar_3.webp'
import aIcon4 from 'public/images/icons/icon_global.svg'
import aIcon5 from 'public/images/shapes/shape_line.webp'
import shape1 from 'public/images/shapes/shape_space_2.svg'
import Image from 'next/image';


const About = (props) => {

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  }

  // Figures come from the portfolio catalogue, so the home page always agrees
  // with what is published on /portfolio.
  const clientCount = new Set(Project.map(project => project.client)).size;
  const deliveredCount = Project.filter(project => project.status === 'completed').length;
  const serviceLineCount = new Set(Project.map(project => project.category)).size;

  return (
    <section className="about_and_case_section section_space section_decoration bg-dark" style={{ backgroundImage: `url(${'/images/backgrounds/bg_image_2.webp'})` }}>
      <div className="container">
        <div className="row align-items-center justify-content-lg-between">
          <div className="col-lg-7 order-lg-last">
            <div className="about_image_2">
              <div className="image_wrap">
                <Image src={about1} alt="Piontech - About" />
              </div>
              <div className="about_funfact_info" style={{ backgroundImage: `url(${'/images/shapes/shape_bg_1.webp'})` }}>
                <div className="customer_count">
                  <ul className="unordered_list">
                    <li>
                      <Image src={aIcon1} alt="Customer Avatar" />
                    </li>
                    <li>
                      <Image src={aIcon2} alt="Customer Avatar" />
                    </li>
                    <li>
                      <Image src={aIcon3} alt="Customer Avatar" />
                    </li>
                    <li>
                      <span>{clientCount}+</span>
                    </li>
                  </ul>
                  <p className="mb-0">
                    Client Organisations
                  </p>
                </div>
                <div className="about_funfact_counter">
                <div className="funfact_item">
                  <div className="counter_value">
                    <span className="odometer" data-count={deliveredCount}>0</span>
                  </div>
                  <h3 className="funfact_title mb-0">Projects Delivered</h3>
                </div>
                <div className="funfact_item">
                  <div className="counter_value">
                    <span className="odometer" data-count={serviceLineCount}>0</span>
                  </div>
                  <h3 className="funfact_title mb-0">Service Lines</h3>
                </div>
                </div>
                <Link onClick={ClickHandler} className="btn btn-primary" href="/about">
                  <span className="btn_label" data-text="Learn More">Learn More</span>
                  <span className="btn_icon">
                    <i className="fa-solid fa-arrow-up-right"></i>
                  </span>
                </Link>
                <div className="icon_globe">
                  <Image src={aIcon4} alt="Icon Globe" />
                </div>
              </div>
              <div className="space_line">
                <Image src={aIcon5} alt="Shape Line" />
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="about_content">
                <div className="heading_block mb-0 text-white">
                <div className="heading_focus_text has_underline d-inline-flex" style={{ backgroundImage: `url(${'/images/shapes/shape_title_under_line.svg'})` }}>
                  About Us
                </div>
                <h2 className="heading_text">
                   PionTech Systems <mark>Who We Are</mark>
                </h2>
                <p className="heading_description mb-0">
                   PionTech Systems Limited is a Nairobi-based ICT solutions provider and systems integrator that blends consultancy, engineering and support to solve mission-critical challenges. Vision: Optimizing your operations through bespoke ICT solutions. Mission: To leverage digital technology and sector best practices to architect and execute solutions that enhance customer operations and optimize performance.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-170">
          <div className="heading_block text-center text-white">
            <div className="heading_focus_text has_underline d-inline-flex" style={{ backgroundImage: `url(${'/images/shapes/shape_title_under_line.svg'})` }}>
              Case Studies
            </div>
            <h2 className="heading_text mb-0">
              Our latest <mark>Case</mark> Studies
            </h2>
          </div>

          <div className="case_studies_wrapper">
            {Project.slice(6, 9).map((project, prj) => (
              <div className="case_study_block" key={prj}>
                <div className="case_study_image">
                  <Image src={project.pImg} alt="Piontech - Cases" />
                </div>
                <div className="case_study_content">
                  <ul className="category_list unordered_list text-uppercase">
                    <li>
                      <Link onClick={ClickHandler} href={'/service-single/[slug]'} as={`/service-single/${project.serviceSlug}`}>
                        {project.service}
                      </Link>
                    </li>
                  </ul>
                  <h3 className="case_title">
                    <Link onClick={ClickHandler} href={'/portfolio_details/[slug]'} as={`/portfolio_details/${project.slug}`}>{project.title}</Link>
                  </h3>
                  <p>
                    {project.summary}
                  </p>
                  <ul className="icon_list unordered_list">
                    <li>
                      <span className="icon_list_text">
                        <strong className="text-dark">Client:</strong> {project.client}
                      </span>
                    </li>
                    <li>
                      <span className="icon_list_text">
                        <strong className="text-dark">Industry:</strong> {project.Industry}
                      </span>
                    </li>
                    <li>
                      <span className="icon_list_text">
                        <strong className="text-dark">Country:</strong> {project.Country}
                      </span>
                    </li>
                  </ul>
                  <ul className="case_technologies unordered_list" data-text="Core Technologies:">
                    {project.partners.slice(0, 2).map(partner => {
                      const logo = findPartnerLogo(partner);
                      return (
                        <li key={partner}>
                          {logo ? (
                            <Image src={logo.src} alt={partner} width={120} height={40} style={{ objectFit: 'contain' }} />
                          ) : (
                            <span className="partner_logo_placeholder" aria-hidden="true">{partnerMonogram(partner)}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  <Link onClick={ClickHandler} href={'/portfolio_details/[slug]'} as={`/portfolio_details/${project.slug}`} className="btn btn-primary">
                    <span className="btn_label" data-text="Read Case">Read Case</span>
                    <span className="btn_icon">
                      <i className="fa-solid fa-arrow-up-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="btns_group pb-0">
            <Link onClick={ClickHandler} href="/portfolio" className="btn btn-primary">
              <span className="btn_label" data-text="View More Cases Study">View More Cases Study</span>
              <span className="btn_icon">
                <i className="fa-solid fa-arrow-up-right"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="decoration_item shape_image_1">
        <Image src={shape1} alt="Piontech Shape" />
      </div>
    </section>
  )
}

export default About;
