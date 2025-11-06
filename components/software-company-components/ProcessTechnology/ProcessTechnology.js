
import React, { useState } from 'react';
import shape1 from 'public/images/shapes/shape_line_2.svg'
import shape2 from 'public/images/shapes/shape_line_3.svg'
import shape3 from 'public/images/shapes/shape_line_4.svg'
import shape4 from 'public/images/shapes/shape_space_3.svg'

import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap';
import TechnologySection from '../TechnologySection/TechnologySection';
import Testimonial from '../Testimonial/Testimonial';
import Image from 'next/image';

const FaqSection = (props) => {

    const [open, setOpen] = useState('1');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    return (
        <section className="process_technology_review_section bg-light section_decoration">
            <div className="container">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-6">
                        <div className="heading_block">
                            <div className="heading_focus_text has_underline d-inline-flex" style={{ backgroundImage: `url(${'/images/shapes/shape_title_under_line.svg'})` }}>
                                Implementation Journey
                            </div>
                            <h2 className="heading_text mb-0">
                                Our <mark>Delivery Framework</mark>
                            </h2>
                        </div>
                        <Accordion open={open} toggle={toggle} className="accordion" id="service_process_faq">
                            <AccordionItem className="accordion-item">
                                <AccordionHeader targetId="1">
                                    01. Site & Process Review
                                </AccordionHeader>
                                <AccordionBody accordionId="1" className='acc_body'>
                                    <p className="m-0">
                                        Our specialists assess existing infrastructure, observe day-to-day operations, and document gaps to build a shared understanding of your environment.
                                    </p>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem className="accordion-item">
                                <AccordionHeader targetId="2">
                                    02. Pain-Point Definition
                                </AccordionHeader>
                                <AccordionBody accordionId="2" className='acc_body'>
                                    <p className="m-0">
                                        We facilitate stakeholder workshops to prioritise issues, capture critical requirements, and align on success criteria for every stakeholder group.
                                    </p>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem className="accordion-item">
                                <AccordionHeader targetId="3">
                                    03. Solution Design & Sourcing
                                </AccordionHeader>
                                <AccordionBody accordionId="3" className='acc_body'>
                                    <p className="m-0">
                                        The team architects a tailored solution, specifies hardware and software, engages partners, and prepares the commercial and project roadmap.
                                    </p>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem className="accordion-item">
                                <AccordionHeader targetId="4">
                                    04. Implementation Process
                                </AccordionHeader>
                                <AccordionBody accordionId="4" className='acc_body'>
                                    <p className="m-0">
                                        We deliver all works - civil, electrical, networking, installations, configurations, integrations, testing and go-live support - while keeping you informed.
                                    </p>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem className="accordion-item">
                                <AccordionHeader targetId="5">
                                    05. Training & Support
                                </AccordionHeader>
                                <AccordionBody accordionId="5" className='acc_body'>
                                    <p className="m-0">
                                        Post-commissioning, we train your team, manage warranties, plan upgrades, and provide ongoing support to keep systems performing.
                                    </p>
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className="col-lg-5">
                        <Accordion open={open} toggle={toggle} className="accordion" id="service_process_faq">
                            <ul className="content_layer_group unordered_list_block text-center">
                                <li><AccordionHeader targetId="1"><span>Site & Process Review</span></AccordionHeader></li>
                                <li><AccordionHeader targetId="2"><span>Pain-Point Definition</span></AccordionHeader></li>
                                <li><AccordionHeader targetId="3"><span>Solution Design & Sourcing</span></AccordionHeader></li>
                                <li><AccordionHeader targetId="4"><span>Implementation Process</span></AccordionHeader></li>
                                <li><AccordionHeader targetId="5"><span>Training & Support</span></AccordionHeader></li>
                            </ul>
                        </Accordion>
                    </div>
                </div>
                <TechnologySection/>
                <Testimonial/>
            </div>

            <div className="decoration_item shape_image_1">
                <Image src={shape1} alt="Piontech Shape" />
            </div>
            <div className="decoration_item shape_image_2">
                <Image src={shape2} alt="Piontech Shape" />
            </div>
            <div className="decoration_item shape_image_3">
                <Image src={shape3} alt="Piontech Shape" />
            </div>
            <div className="decoration_item shape_image_4">
                <Image src={shape4} alt="Piontech Shape" />
            </div>
        </section>
    )
};
export default FaqSection;




