import React, { useState } from 'react';
import shape1 from 'public/images/shapes/shape_space_4.svg';
import shape2 from 'public/images/shapes/shape_angle_3.webp';

import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap';
import Image from 'next/image';

const FaqSection = () => {

    const [open, setOpen] = useState('1');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    return (
        <section className="faq_section section_decoration">
            <div className="container">
                <div className="heading_block text-center">
                    <div className="heading_focus_text has_underline d-inline-flex" style={{ backgroundImage: `url(${'/images/shapes/shape_title_under_line.svg'})` }}>
                        F.A.Q.
                    </div>
                    <h2 className="heading_text mb-0">
                        Need <mark>Support?</mark>
                    </h2>
                </div>

                <div className="faq_accordion accordion" id="faq_accordion">
                    <Accordion open={open} toggle={toggle} className="accordion" id="service_process_faq">
                        <AccordionItem className="accordion-item">
                            <AccordionHeader targetId="1">
                                Q. What ICT and security services does PionTech Systems deliver?
                            </AccordionHeader>
                            <AccordionBody accordionId="1" className='acc_body'>
                                <div className="text_a">A.</div>
                                <p>
                                    We provide end-to-end solutions that blend consulting, engineering, sourcing, installation and support across the full spectrum of ICT and safety requirements.
                                </p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <ul className="icon_list unordered_list_block">
                                            <li>
                                                <span className="icon_list_icon">
                                                    <i className="fa-solid fa-circle fa-fw"></i>
                                                </span>
                                                <span className="icon_list_text">
                                                    ICT infrastructure, networking & cabling
                                                </span>
                                            </li>
                                            <li>
                                                <span className="icon_list_icon">
                                                    <i className="fa-solid fa-circle fa-fw"></i>
                                                </span>
                                                <span className="icon_list_text">
                                                    Integrated security & surveillance systems
                                                </span>
                                            </li>
                                            <li>
                                                <span className="icon_list_icon">
                                                    <i className="fa-solid fa-circle fa-fw"></i>
                                                </span>
                                                <span className="icon_list_text">
                                                    Enterprise and mission-critical applications
                                                </span>
                                            </li>
                                            <li>
                                                <span className="icon_list_icon">
                                                    <i className="fa-solid fa-circle fa-fw"></i>
                                                </span>
                                                <span className="icon_list_text">
                                                    Custom software development & integration
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="icon_list unordered_list_block">
                                            <li>
                                                <span className="icon_list_icon">
                                                    <i className="fa-solid fa-circle fa-fw"></i>
                                                </span>
                                                <span className="icon_list_text">
                                                    Telecommunication & broadcast solutions
                                                </span>
                                            </li>
                                            <li>
                                                <span className="icon_list_icon">
                                                    <i className="fa-solid fa-circle fa-fw"></i>
                                                </span>
                                                <span className="icon_list_text">
                                                    Power, renewable energy & critical backup
                                                </span>
                                            </li>
                                            <li>
                                                <span className="icon_list_icon">
                                                    <i className="fa-solid fa-circle fa-fw"></i>
                                                </span>
                                                <span className="icon_list_text">
                                                    Smart facilities & IoT implementations
                                                </span>
                                            </li>
                                            <li>
                                                <span className="icon_list_icon">
                                                    <i className="fa-solid fa-circle fa-fw"></i>
                                                </span>
                                                <span className="icon_list_text">
                                                    ICT equipment supply, licensing & support
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem className="accordion-item">
                            <AccordionHeader targetId="2">
                                Q. Which industries rely on your team?
                            </AccordionHeader>
                            <AccordionBody accordionId="2" className='acc_body'>
                                <div className="text_a">A.</div>
                                <p>
                                    We support public and private sector organisations that need secure, resilient and efficient operations across Kenya and the wider region.
                                </p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <ul className="icon_list unordered_list_block">
                                            <li>
                                                <span className="icon_list_icon">
                                                    <i className="fa-solid fa-circle fa-fw"></i>
                                                </span>
                                                <span className="icon_list_text">
                                                    Government agencies & law enforcement
                                                </span>
                                            </li>
                                            <li>
                                                <span className="icon_list_icon">
                                                    <i className="fa-solid fa-circle fa-fw"></i>
                                                </span>
                                                <span className="icon_list_text">
                                                    Utilities, ports, border & transport hubs
                                                </span>
                                            </li>
                                            <li>
                                                <span className="icon_list_icon">
                                                    <i className="fa-solid fa-circle fa-fw"></i>
                                                </span>
                                                <span className="icon_list_text">
                                                    Banking, finance & corporate offices
                                                </span>
                                            </li>
                                            <li>
                                                <span className="icon_list_icon">
                                                    <i className="fa-solid fa-circle fa-fw"></i>
                                                </span>
                                                <span className="icon_list_text">
                                                    Manufacturing, industrial parks & logistics
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="icon_list unordered_list_block">
                                            <li>
                                                <span className="icon_list_icon">
                                                    <i className="fa-solid fa-circle fa-fw"></i>
                                                </span>
                                                <span className="icon_list_text">
                                                    Real estate, hospitality & mixed developments
                                                </span>
                                            </li>
                                            <li>
                                                <span className="icon_list_icon">
                                                    <i className="fa-solid fa-circle fa-fw"></i>
                                                </span>
                                                <span className="icon_list_text">
                                                    Education, health & non-profit institutions
                                                </span>
                                            </li>
                                            <li>
                                                <span className="icon_list_icon">
                                                    <i className="fa-solid fa-circle fa-fw"></i>
                                                </span>
                                                <span className="icon_list_text">
                                                    Residential estates & gated communities
                                                </span>
                                            </li>
                                            <li>
                                                <span className="icon_list_icon">
                                                    <i className="fa-solid fa-circle fa-fw"></i>
                                                </span>
                                                <span className="icon_list_text">
                                                    Call centres & customer experience teams
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem className="accordion-item">
                            <AccordionHeader targetId="3">
                                Q. How do you manage projects from discovery to go-live?
                            </AccordionHeader>
                            <AccordionBody accordionId="3" className='acc_body'>
                                <div className="text_a">A.</div>
                                <p>
                                    Every engagement follows a consultative methodology: site surveys, pain-point analysis, scoped designs, sourcing, installation, configuration, testing, go-live and trainingâ€”always anchored by clear communication and governance.
                                </p>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem className="accordion-item">
                            <AccordionHeader targetId="4">
                                Q. Do you provide post-commissioning support and warranties?
                            </AccordionHeader>
                            <AccordionBody accordionId="4" className='acc_body'>
                                <div className="text_a">A.</div>
                                <p>
                                    Yes. We stay engaged long after handover by honouring product warranties, delivering preventative maintenance, coordinating upgrades and offering responsive helpdesk support.
                                </p>
                                <ul className="icon_list unordered_list_block mt-3">
                                    <li>
                                        <span className="icon_list_icon">
                                            <i className="fa-solid fa-circle fa-fw"></i>
                                        </span>
                                        <span className="icon_list_text">
                                            Tailored SLAs for critical environments
                                        </span>
                                    </li>
                                    <li>
                                        <span className="icon_list_icon">
                                            <i className="fa-solid fa-circle fa-fw"></i>
                                        </span>
                                        <span className="icon_list_text">
                                            On-site and remote troubleshooting
                                        </span>
                                    </li>
                                    <li>
                                        <span className="icon_list_icon">
                                            <i className="fa-solid fa-circle fa-fw"></i>
                                        </span>
                                        <span className="icon_list_text">
                                            Firmware, software & license management
                                        </span>
                                    </li>
                                    <li>
                                        <span className="icon_list_icon">
                                            <i className="fa-solid fa-circle fa-fw"></i>
                                        </span>
                                        <span className="icon_list_text">
                                            Training refreshers for client teams
                                        </span>
                                    </li>
                                </ul>
                            </AccordionBody>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
            <div className="decoration_item shape_image_1">
                <Image src={shape1} alt="Piontech Shape" />
            </div>
            <div className="decoration_item shape_image_2">
                <Image src={shape2} alt="Piontech Shape Angle" />
            </div>
        </section>
    );
};

export default FaqSection;
