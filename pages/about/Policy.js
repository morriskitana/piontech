import React from 'react';
import sIcon1 from 'public/images/icons/icon_clock.svg'
import sIcon2 from 'public/images/icons/icon_dart_board_2.svg'
import sIcon3 from 'public/images/icons/icon_target.svg'
import Image from 'next/image';

const Policy = [
    {
        title: 'Our History',
        subTitle: 'Founded and incorporated in 2021, PionTech Systems has evolved into a multi-sector ICT partner delivering complex projects across East and Central Africa.',
        icon: sIcon1,
    },
    {
        title: 'Our Mission',
        subTitle: 'To leverage digital technology and sector-specific best practices to architect and execute ICT solutions that enhance customer operations and optimise performance.',
        icon: sIcon2,
    },
    {
        title: 'Our Vision',
        subTitle: 'Optimising client operations through bespoke ICT solutions that are resilient, secure and future-ready.',
        icon: sIcon3,
    },


]


const PolicySection = (props) => {

    return (
        <section className="policy_section bg-light">
            <div className="container">
                <div className="row">
                    {Policy.map((policy, pitem) => (
                        <div className="col-lg-4" key={pitem}>
                            <div className="iconbox_block">
                                <div className="iconbox_icon">
                                    <Image src={policy.icon} alt="Dollar SVG Icon" />
                                </div>
                                <div className="iconbox_content">
                                    <h3 className="iconbox_title">{policy.title}</h3>
                                    <p className="mb-0">
                                        {policy.subTitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default PolicySection;
