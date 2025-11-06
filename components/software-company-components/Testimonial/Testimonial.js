import { useRef, useEffect } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import icon1 from 'public/images/icons/icon_c.svg';
import icon2 from 'public/images/icons/icon_g2.svg';
import tImg1 from 'public/images/avatar/avatar_5.webp';
import tImg2 from 'public/images/avatar/avatar_6.webp';
import tImg3 from 'public/images/avatar/avatar_7.webp';

import clogo from 'public/images/clients/client_logo_8.webp';
import flag from 'public/images/flag/ukraine_flag.webp';
import Image from 'next/image';

const testimonials = [
    {
        id: '01',
        tImg: tImg1,
        title: 'Seamless multi-site rollout',
        description: 'PionTech engineered our surveillance, access control and network backbone across remote substations without disrupting operations. Their consultative approach and disciplined execution kept every milestone on schedule.',
        name: 'Grace Waweru',
        designation: 'Head of ICT, National Utility',
        country: 'Nairobi, Kenya',
    },
    {
        id: '02',
        tImg: tImg2,
        title: 'Reliable mission support',
        description: 'From requirements scoping to user acceptance testing, the team ensured our law enforcement command centre met stringent security standards and delivered actionable situational awareness.',
        name: 'Peter Mwangi',
        designation: 'Director, Security Agency',
        country: 'Mombasa, Kenya',
    },
    {
        id: '03',
        tImg: tImg3,
        title: 'Proactive lifecycle service',
        description: 'We valued the training, warranties and preventative maintenance bundled with our smart facility upgrade. PionTech continues to optimise our systems long after go-live.',
        name: 'Sarah Kamau',
        designation: 'Facilities Manager, Mixed-Use Development',
        country: 'Nakuru, Kenya',
    },
];

const Testimonial = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current && prevRef.current && nextRef.current) {
            swiperRef.current.params.navigation.prevEl = prevRef.current;
            swiperRef.current.params.navigation.nextEl = nextRef.current;
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, []);

    return (
        <div className="row">
            <div className="col-lg-4">
                <div className="deals_winner_customers">
                    <h3 className="title_text">
                        <mark>Mission-critical</mark> teams trust PionTech
                    </h3>
                    <div className="row">
                        <div className="col-6">
                            <div className="review_short_info">
                                <div className="icon">
                                    <Image src={icon1} alt="C SVG Icon" />
                                </div>
                                <ul className="rating_block unordered_list">
                                    <li><i className="fa-solid fa-star fa-fw"></i></li>
                                    <li><i className="fa-solid fa-star fa-fw"></i></li>
                                    <li><i className="fa-solid fa-star fa-fw"></i></li>
                                    <li><i className="fa-solid fa-star fa-fw"></i></li>
                                    <li><i className="fa-solid fa-star fa-fw"></i></li>
                                </ul>
                                <div className="review_counter">From <b>60+</b> reviews</div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="review_short_info">
                                <div className="icon">
                                    <Image src={icon2} alt="G2 SVG Icon" />
                                </div>
                                <ul className="rating_block unordered_list">
                                    <li><i className="fa-solid fa-star fa-fw"></i></li>
                                    <li><i className="fa-solid fa-star fa-fw"></i></li>
                                    <li><i className="fa-solid fa-star fa-fw"></i></li>
                                    <li><i className="fa-solid fa-star fa-fw"></i></li>
                                    <li><i className="fa-solid fa-star fa-fw"></i></li>
                                </ul>
                                <div className="review_counter">From <b>90+</b> reviews</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-8">
                <div className="review_onecol_wrapper">
                    <div className="review_onecol_carousel">
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={50}
                            slidesPerView={1}
                            loop={true}
                            speed={1800}
                            parallax={true}
                            ref={swiperRef}
                            onBeforeInit={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                        >
                            {testimonials.map((testimonialItem) => (
                                <SwiperSlide key={testimonialItem.id}>
                                    <div className="review_block_2">
                                        <h3 className="review_title">â€œ{testimonialItem.title}â€</h3>
                                        <p className="review_commtent">
                                            {testimonialItem.description}
                                        </p>
                                        <div className="d-md-flex justify-content-md-between">
                                            <div className="review_admin">
                                                <div className="review_admin_image">
                                                    <Image src={testimonialItem.tImg} alt={testimonialItem.name} />
                                                </div>
                                                <div className="review_admin_info">
                                                    <h4 className="review_admin_name">{testimonialItem.name}</h4>
                                                    <span className="review_admin_designation">{testimonialItem.designation}</span>
                                                    <div className="review_admin_country">
                                                        <span className="country_flag">
                                                            <Image src={flag} alt="Kenya Flag" />
                                                        </span>
                                                        <span className="country_text">{testimonialItem.country}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="review_admin_logo">
                                                <Image src={clogo} alt="Review Admin Logo" />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className="carousel_arrows_nav">
                            <button ref={prevRef} type="button" className="r1cc-swiper-button-prev">
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>
                            <button ref={nextRef} type="button" className="r1cc-swiper-button-next">
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
