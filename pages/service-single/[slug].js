import React, { Fragment, useMemo, useState } from 'react';
import Services from '../../api/service'
import { useRouter } from 'next/router'
import ModalVideo from 'react-modal-video'
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';
import CtaSection from '../../components/CtaSection/CtaSection';
import ProcessTechnology from '../../components/software-company-components/ProcessTechnology/ProcessTechnology';
import srImg from 'public/images/services/service_details_image_1.webp'
import srImg2 from 'public/images/services/service_details_image_2.webp'
import srImg3 from 'public/images/services/service_details_image_3.webp'
import srImg4 from 'public/images/services/service_details_image_4.webp'
import icon from 'public/images/icons/icon_check_3.svg'
import Image from 'next/image';


const ServiceSinglePage = () => {

    const router = useRouter()

    const ServiceDetails = useMemo(
        () => Services.find(item => item.slug === router.query.slug),
        [router.query.slug]
    );

    const serviceDetailsContent = ServiceDetails?.details || {};
    const serviceFeatures = ServiceDetails?.features || [];
    const overviewParagraphs = serviceDetailsContent.overview || [];
    const serviceCapabilities = serviceDetailsContent.services || [];
    const serviceOutcomes = serviceDetailsContent.outcomes || [];
    const partnerGroups = serviceDetailsContent.partners || [];

    const outcomeMidPoint = Math.ceil(serviceOutcomes.length / 2);
    const outcomeColumns = [
        serviceOutcomes.slice(0, outcomeMidPoint),
        serviceOutcomes.slice(outcomeMidPoint),
    ];

    const [isOpen, setOpen] = useState(false)

    if (!ServiceDetails) {
        return null;
    }

    const videoId = serviceDetailsContent.videoId;

    return (
        <Fragment>
            <Header />
            <main className="page_content service-single-page">
                <PageTitle pageTitle={ServiceDetails.title} pagesub={'Service Detail'} pageTop={'Solutions'} />
                <section className="service_details_section section_space bg-light">
                    <div className="container">
                        <div className="details_item_image position-relative">
                            <Image src={srImg} alt="Service Details" />
                            {videoId && (
                                <button className="video_btn ripple_effect" onClick={() => setOpen(true)}>
                                    <span className="btn_icon">
                                        <i className="fa-solid fa-play"></i>
                                    </span>
                                </button>
                            )}
                        </div>
                        <h2 className="details_item_title">{ServiceDetails.title}</h2>
                        {serviceDetailsContent.intro && (
                            <p>{serviceDetailsContent.intro}</p>
                        )}
                        {overviewParagraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                        {serviceCapabilities.length > 0 && (
                            <>
                                <h3 className="details_item_info_title">What We Deliver</h3>
                                <div className="row mb-4">
                                    <div className="col-lg-12">
                                        <ul className="icon_list unordered_list_block">
                                            {serviceCapabilities.map((capability, index) => (
                                                <li key={index}>
                                                    <span className="icon_list_icon">
                                                        <Image src={icon} alt="Check SVG Icon" />
                                                    </span>
                                                    <span className="icon_list_text">
                                                        {capability}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )}
                        {serviceFeatures.length > 0 && (
                            <>
                                <h3 className="details_item_info_title">Key Focus Areas</h3>
                                <div className="row mb-4">
                                    <div className="col-lg-12">
                                        <ul className="icon_list unordered_list_block">
                                            {serviceFeatures.map((feature, index) => (
                                                <li key={index}>
                                                    <span className="icon_list_icon">
                                                        <Image src={icon} alt="Check SVG Icon" />
                                                    </span>
                                                    <span className="icon_list_text">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )}
                        <ProcessTechnology />
                        {serviceOutcomes.length > 0 && (
                            <>
                                <h3 className="details_item_info_title">Service Outcomes</h3>
                                <div className="row mb-4">
                                    {outcomeColumns.map((column, columnIndex) => (
                                        <div className="col-lg-6" key={columnIndex}>
                                            <ul className="icon_list unordered_list_block">
                                                {column.map((outcome, outcomeIndex) => (
                                                    <li key={outcomeIndex}>
                                                        <span className="icon_list_icon">
                                                            <Image src={icon} alt="Check SVG Icon" />
                                                        </span>
                                                        <span className="icon_list_text">
                                                            {outcome}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        {partnerGroups.length > 0 && (
                            <>
                                <h3 className="details_item_info_title">Our Partners</h3>
                                <div className="row gy-4">
                                    {partnerGroups.map((group, groupIndex) => (
                                        <div className="col-lg-4 col-md-6" key={groupIndex}>
                                            <div className="service_partner_group">
                                                {group.title && (
                                                    <h4 className="service_partner_title">{group.title}</h4>
                                                )}
                                                <ul className="service_partner_logos">
                                                    {(group.logos || []).map((logo, logoIndex) => (
                                                        <li key={logoIndex}>
                                                            <div className="service_partner_logo_wrap">
                                                                <Image src={logo.src} alt={logo.alt} width={120} height={60} />
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="details_item_image m-0">
                                    <Image src={srImg2} alt="Service Details" />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="details_item_image m-0">
                                    <Image src={srImg3} alt="Service Details" />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="details_item_image m-0">
                                    <Image src={srImg4} alt="Service Details" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <CtaSection />
            <Footer />
            <Scrollbar />
            {videoId && (
                <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={videoId} onClose={() => setOpen(false)} />
            )}
        </Fragment>
    )
};
export default ServiceSinglePage;
