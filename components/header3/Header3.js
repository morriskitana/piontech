import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import logo from 'public/images/site_logo/site_logo_3.svg'
import MobileMenu from '../MobileMenu/MobileMenu'
import Image from 'next/image';
import { aboutMenuItems, servicesMenuItems, projectMenuItems } from '../navigation/menuConfig';

const Header3 = (props) => {

    const [mobailActive, setMobailState] = useState(false);

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const [isSticky, setSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (

        <header className="site_header site_header_3">
            <div className="header_top text-center">
                <div className="container">
                    <p className="m-0">Subscribe to our newsletter and stay updated with the latest technology solutions. <Link onClick={ClickHandler} href="/service"><u>Learn more</u> <i className="fa-solid fa-angle-right"></i></Link></p>
                </div>
            </div>
            <div className={`header_bottom stricky  ${isSticky ? 'stricked-menu stricky-fixed' : ''}`}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-3 col-lg-2 col-5">
                            <div className="site_logo">
                                <Link onClick={ClickHandler} className="site_link" href="/">
                                    <Image src={logo} alt="PionTech Systems logo" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-7 col-2">
                            <nav className="main_menu navbar navbar-expand-lg">
                                <div className="main_menu_inner collapse navbar-collapse justify-content-lg-center" id="main_menu_dropdown">
                                    <ul className="main_menu_list unordered_list justify-content-center">
                                        <li>
                                            <Link onClick={ClickHandler} className="nav-link" href="/">
                                                Home
                                            </Link>
                                        </li>
                                                                                <li className="dropdown">
                                            <Link onClick={ClickHandler} className="nav-link" href="/about" id="about_submenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                About Us
                                            </Link>
                                            <div className="dropdown-menu mega_menu_wrapper" aria-labelledby="about_submenu">
                                                <div className="container">
                                                    <div className="row">
                                                        {aboutMenuItems.map((item) => (
                                                            <div className={item.colClass} key={item.title}>
                                                                <Link onClick={ClickHandler} className="iconbox_block_2" href={item.href}>
                                                                    <span className="icon_title_wrap">
                                                                        <small className="iconbox_icon">
                                                                            <Image src={item.icon} alt={`${item.title} Icon`} />
                                                                        </small>
                                                                        <small className="iconbox_title">{item.title}</small>
                                                                    </span>
                                                                    <span className="description mb-0">
                                                                        {item.description}
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                                                                <li className="dropdown">
                                            <Link onClick={ClickHandler} className="nav-link" href="/service" id="services_submenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Product & Services
                                            </Link>
                                            <div className="dropdown-menu mega_menu_wrapper" aria-labelledby="services_submenu">
                                                <div className="container">
                                                    <div className="row">
                                                        {servicesMenuItems.map((item) => (
                                                            <div className={item.colClass} key={item.title}>
                                                                <Link onClick={ClickHandler} className="iconbox_block_2" href={item.href}>
                                                                    <span className="icon_title_wrap">
                                                                        <small className="iconbox_icon">
                                                                            <Image src={item.icon} alt={`${item.title} Icon`} />
                                                                        </small>
                                                                        <small className="iconbox_title">{item.title}</small>
                                                                    </span>
                                                                    <span className="description mb-0">
                                                                        {item.description}
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                                                                <li className="dropdown">
                                            <Link onClick={ClickHandler} className="nav-link" href="/portfolio" id="projects_submenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Projects
                                            </Link>
                                            <div className="dropdown-menu mega_menu_wrapper" aria-labelledby="projects_submenu">
                                                <div className="container">
                                                    <div className="row">
                                                        {projectMenuItems.map((item) => (
                                                            <div className={item.colClass} key={item.title}>
                                                                <Link onClick={ClickHandler} className="iconbox_block_2" href={item.href}>
                                                                    <span className="icon_title_wrap">
                                                                        <small className="iconbox_icon">
                                                                            <Image src={item.icon} alt={`${item.title} Icon`} />
                                                                        </small>
                                                                        <small className="iconbox_title">{item.title}</small>
                                                                    </span>
                                                                    <span className="description mb-0">
                                                                        {item.description}
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <Link onClick={ClickHandler} className="nav-link" href="/contact">
                                                Contact
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-5">
                            <ul className="header_btns_group unordered_list justify-content-end">
                                <li>
                                    <button className="mobile_menu_btn" onClick={() => setMobailState(!mobailActive)} type="button" data-bs-toggle="collapse" data-bs-target="#main_menu_dropdown" aria-expanded="false" aria-label="Toggle navigation">
                                        <i className="far fa-bars"></i>
                                    </button>
                                </li>
                                <li>
                                    <Link onClick={ClickHandler} className="btn btn-light" href="/contact">
                                        <span className="btn_label" data-text="Get Started">Get Started</span>
                                        <span className="btn_icon">
                                            <i className="fa-solid fa-arrow-up-right"></i>
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mobail-wrap">
                    <div className={`mobail-menu ${mobailActive ? "active" : ""}`}>
                        <div className="xb-header-menu-scroll">
                            <div className="xb-menu-close xb-hide-xl xb-close" onClick={() => setMobailState(!mobailActive)}></div>
                            <nav className="xb-header-nav">
                                <MobileMenu />
                            </nav>
                        </div>
                    </div>
                    <div className="xb-header-menu-backdrop" onClick={() => setMobailState(false)}></div>
                </div>
            </div>
        </header>

    )
}

export default Header3;