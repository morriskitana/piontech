import React from 'react'
import ContactForm from '../ContactFrom/ContactForm'
import shape1 from 'public/images/shapes/shape_line_5.svg'
import shape2 from 'public/images/shapes/shape_line_6.svg'
import shape3 from 'public/images/shapes/shape_space_5.svg'
import Image from 'next/image'


const ContactSection = (props) => {
    return (
        <section className="contact_section pb-80 bg-light section_decoration">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="contact_method_box">
                            <div className="heading_block">
                                <div className="heading_focus_text has_underline d-inline-flex mb-3" style={{ backgroundImage: `url(${'/images/shapes/shape_title_under_line.svg'})` }}>
                                    Ready to Engage
                                </div>
                                <h2 className="heading_text mb-0">
                                    Let's Start Your Project
                                </h2>
                                <p className="heading_description mb-0">Share your objectives with our specialists and we will co-create a roadmap that fits your operations.</p>
                            </div>
                            <ul className="contact_method_list unordered_list_block">
                                <li>
                                    <a href="https://maps.google.com/?q=A11%20Geokars%20Apartments%2C%20Getathuru%20Rd%2C%20Kitisuru%2C%20Nairobi" target="_blank" rel="noreferrer">
                                        <span className="icon">
                                            <i className="fa-solid fa-location-dot"></i>
                                        </span>
                                        <span className="text">
                                            <span className="label d-block text-muted">Physical Address</span>
                                            A11, Geokars Apartments, Getathuru Rd, Kitisuru, Nairobi.
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:+254723029744">
                                        <span className="icon">
                                            <i className="fa-solid fa-phone-volume"></i>
                                        </span>
                                        <span className="text">
                                            <span className="label d-block text-muted">Telephone</span>
                                            +254 723 029 744 / +254 724 101 814
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:info@piontechsystems.com">
                                        <span className="icon">
                                            <i className="fa-solid fa-envelope"></i>
                                        </span>
                                        <span className="text">
                                            <span className="label d-block text-muted">Email</span>
                                            info@piontechsystems.com
                                        </span>
                                    </a>
                                </li>
                            </ul>
                            <ul className="support_step unordered_list_block">
                                <li>
                                    <span className="serial_number">01</span>
                                    <span className="text">Schedule a consult or site survey</span>
                                </li>
                                <li>
                                    <span className="serial_number">02</span>
                                    <span className="text">Co-develop requirements & solution scope</span>
                                </li>
                                <li>
                                    <span className="serial_number">03</span>
                                    <span className="text">Receive a tailored proposal & roadmap</span>
                                </li>
                                <li>
                                    <span className="serial_number">04</span>
                                    <span className="text">Kick-off delivery & ongoing support</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="instant_contact_form">
                            <div className="small_title">
                                <i className="fa-solid fa-envelope-open-text"></i>
                                Let's Connect!
                            </div>
                            <h3 className="form_title">
                                Send us a message, and we'll promptly discuss your project with you.
                            </h3>
                            <ContactForm />
                        </div>
                    </div>
                </div>
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
        </section>
    )
}

export default ContactSection;
