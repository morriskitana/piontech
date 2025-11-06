import React from 'react'
import ContactForm from '../ContactFrom/ContactForm'
import icon1 from 'public/images/icons/icon_map_mark_2.svg'
import icon2 from 'public/images/icons/icon_calling_2.svg'
import icon3 from 'public/images/icons/icon_mail_3.svg'
import icon4 from 'public/images/icons/icon_calendar_2.svg'
import Image from 'next/image'


const ContactSection = (props) => {
    return (
        <section className="contact_section section_space bg-light">
            <div className="container">
                <div className="contact_info_box row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="iconbox_block text-center">
                            <div className="iconbox_icon">
                                <Image src={icon1} alt="Map Mark SVG Icon" />
                            </div>
                            <div className="iconbox_content">
                                <h3 className="iconbox_title">Location</h3>
                                <p className="mb-0">
                                    <a href="https://maps.google.com/?q=A11%20Geokars%20Apartments%2C%20Getathuru%20Rd%2C%20Kitisuru%2C%20Nairobi" target="_blank" rel="noreferrer">
                                        A11, Geokars Apartments, Getathuru Rd, Kitisuru, Nairobi.
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="iconbox_block text-center">
                            <div className="iconbox_icon">
                                <Image src={icon2} alt="Calling SVG Icon" />
                            </div>
                            <div className="iconbox_content">
                                <h3 className="iconbox_title">Contact</h3>
                                <p className="mb-0">
                                    <a href="tel:+254723029744">+254 723 029 744</a>
                                </p>
                                <p className="mb-0">
                                    <a href="tel:+254724101814">+254 724 101 814</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="iconbox_block text-center">
                            <div className="iconbox_icon">
                                <Image src={icon3} alt="User Check SVG Icon" />
                            </div>
                            <div className="iconbox_content">
                                <h3 className="iconbox_title">Email</h3>
                                <p className="mb-0"><a href="mailto:info@piontechsystems.com">info@piontechsystems.com</a></p>
                                <p className="mb-0"><a href="mailto:support@piontechsystems.com">support@piontechsystems.com</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="iconbox_block text-center">
                            <div className="iconbox_icon">
                                <Image src={icon4} alt="Calendar SVG Icon" />
                            </div>
                            <div className="iconbox_content">
                                <h3 className="iconbox_title">Visit Between</h3>
                                <p className="mb-0">Mon - Sat: 8.00-5.00</p>
                                <p className="mb-0">Sunday: Closed</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section_space pb-0">
                    <div className="row justify-content-lg-between">
                        <div className="col-lg-7">
                            <div className="contact_form mb-0">
                                <h3 className="details_item_info_title mb-1">Send Us A Message</h3>
                                <p className="mb-5">
                                    Give us chance to serve and bring magic to your brand.
                                </p>
                                <ContactForm />
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="gmap_canvas ps-lg-5">
                                <iframe title='map' src="https://maps.google.com/maps?q=A11%20Geokars%20Apartments%2C%20Getathuru%20Rd%2C%20Kitisuru%2C%20Nairobi&t=&z=15&ie=UTF8&iwloc=near&output=embed"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection;

