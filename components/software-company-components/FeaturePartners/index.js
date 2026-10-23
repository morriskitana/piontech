import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { findPartnerLogo, partnerMonogram } from "../../PartnerSection/partnerLogos";

// Real partner names, exactly as published on /partners, so the artwork
// lookup resolves the same logos used on the partner wall.
const partners = [
    'HUAWEI',
    'Juniper NETWORKS',
    'Allied Telesis',
    'Extreme Networks',
    'H3C',
    'AJAX Systems',
    'SonicWall',
    'ZKTECO',
    'Synology'
]

var settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,

    responsive: [
        {
            breakpoint: 1025,
            settings: {
                slidesToShow: 7,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 450,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 350,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};



const FeaturePartners = (props) => {

    return (
        <div className="feature_partners_section">
            <div className="container position-relative">
                <div className="title_text text-white">
                    <Link href="/partners" className="text-white">Our Technology Partners</Link>
                </div>
                <div className="client_logo_carousel">
                    <Slider {...settings}>
                        {partners.map((partner) => {
                            const logo = findPartnerLogo(partner);
                            const tileClassName = [
                                'client_logo_item',
                                logo?.invert ? 'is-inverted' : '',
                                logo?.icon ? 'is-icon' : ''
                            ].filter(Boolean).join(' ');

                            return (
                                <div className={tileClassName} key={partner}>
                                    <Link href="/partners" aria-label={`${partner} — technology partners`}>
                                        {logo ? (
                                            <Image src={logo.src} alt={partner} style={{ objectFit: 'contain' }} />
                                        ) : (
                                            <span className="partner_logo_placeholder" aria-hidden="true">{partnerMonogram(partner)}</span>
                                        )}
                                    </Link>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default FeaturePartners;
