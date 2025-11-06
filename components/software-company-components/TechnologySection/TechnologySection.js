import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

import logo1 from 'public/images/clients/client_logo_1.webp';
import logo2 from 'public/images/clients/client_logo_2.webp';
import logo3 from 'public/images/clients/client_logo_3.webp';
import logo4 from 'public/images/clients/client_logo_4.webp';
import logo5 from 'public/images/clients/client_logo_5.webp';
import logo6 from 'public/images/clients/client_logo_6.webp';
import logo7 from 'public/images/clients/client_logo_7.webp';

const brandLogos = [
    { id: 'logo-1', image: logo1 },
    { id: 'logo-2', image: logo2 },
    { id: 'logo-3', image: logo3 },
    { id: 'logo-4', image: logo4 },
    { id: 'logo-5', image: logo5 },
    { id: 'logo-6', image: logo6 },
    { id: 'logo-7', image: logo7 },
    { id: 'logo-8', image: logo2 },
];

const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    arrows: false,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 5,
            },
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 4,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 2,
            },
        },
    ],
};

const TechnologySection = () => (
    <div className="section_space">
        <div className="heading_block text-center">
            <div
                className="heading_focus_text has_underline d-inline-flex"
                style={{ backgroundImage: `url(${'/images/shapes/shape_title_under_line.svg'})` }}
            >
                Brand We Work With
            </div>
            <h2 className="heading_text mb-0">
                Trusted <mark>Technology Partners</mark>
            </h2>
        </div>

        <div className="client_logo_carousel brand_logo_carousel">
            <Slider {...sliderSettings}>
                {brandLogos.map((brand) => (
                    <div className="client_logo_item" key={brand.id}>
                        <Image src={brand.image} alt="Partner logo" />
                    </div>
                ))}
            </Slider>
        </div>
    </div>
);

export default TechnologySection;
