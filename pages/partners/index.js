import React, { Fragment } from 'react';
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Image from 'next/image';

import logo1 from 'public/images/clients/client_logo_1.webp';
import logo2 from 'public/images/clients/client_logo_2.webp';
import logo3 from 'public/images/clients/client_logo_3.webp';
import logo4 from 'public/images/clients/client_logo_4.webp';
import logo5 from 'public/images/clients/client_logo_5.webp';
import logo6 from 'public/images/clients/client_logo_6.webp';
import logo7 from 'public/images/clients/client_logo_7.webp';
import logo8 from 'public/images/clients/client_logo_8.webp';
import logo9 from 'public/images/clients/client_logo_9.webp';
import logo10 from 'public/images/clients/client_logo_10.webp';

const partnerCategories = [
    {
        title: 'ICT Solutions, Systems & Hardware',
        partners: [
            'QNAP',
            'Hewlett Packard Enterprise',
            'ARISTA',
            'BROADCOM',
            'RingCentral',
            'HUAWEI',
            'SIEMON™',
            'GIGANET',
            'CISCO',
            'D-Link',
            'mimosa by Airspan',
            'UBIQUITI NETWORKS',
            'ZYXEL NETWORKS',
            'Juniper NETWORKS',
            'tp-link',
            'datto',
            'NETGEAR',
            'CERAGON',
            'aruba',
            'freshdesk',
            'Asterisk',
            'MultiS',
            'SYSCOM DISTRIBUTIONS LLC',
            'Panasonic',
            'sourcing-IT'
        ]
    },
    {
        title: 'Integrated Security Solutions',
        partners: [
            'ADAPTIVE RECOGNITION',
            'Honeywell',
            'IRONYUN',
            'IDENTIGATE',
            'AXIS',
            'Dahua TECHNOLOGY',
            'SAFR from realnetworks',
            'SafeAgle',
            'Dedrone',
            'herta',
            'EVTRACK',
            'SHOGHI',
            'leidos',
            'ASCENDENT',
            'DaoSafe',
            'PatriotOne TECHNOLOGIES',
            'RAFAEL',
            'suprema BIOMETRICS & SECURITY',
            'WINTEGO',
            'viisights Intelligence by vision',
            'DEFENSEPLUS',
            'supersight',
            'HIKVISION',
            'Cortech Developments',
            'iOmniscient High IQ Surveillance',
            'FLIR',
            'ProxerSafe®',
            'ZKTECO',
            'MATRIX TELECOM | SECURITY'
        ]
    },
    {
        title: 'Enterprise Applications',
        partners: [
            'monday.com',
            'onelogin',
            'winlon by GURTAM',
            'DIGITAL REALTY',
            'CORESITE',
            'KIOUDIP',
            'HoduSoft',
            'Trackplan',
            'team By OFFICE',
            'TELTONIKA',
            '中国电信',
            'CHINA TELECOM',
            'CONNEX fm'
        ]
    },
    {
        title: 'Telecommunication Solutions',
        partners: [
            'ACTUS Monitor. Verify. Repurpose.',
            'Ostirlitz MEDIA SOFTWARE',
            'Ovaview MEDIA MONITORING & ANALYSIS',
            'XENTAURIX',
            'ATDI',
            'TCI',
            'ROHDE&SCHWARZ',
            'LS/telcom',
            'OCO',
            'inmarsat',
            'TEOCO',
            'ALTITUDE',
            'ANGEL',
            'Hytera',
            'EQUINIX'
        ]
    },
    {
        title: 'Power & Renewable Energy Solutions',
        partners: [
            'SUVPR',
            'MUST',
            'SMC',
            'GFUVE',
            'BENNING',
            'SOKOYO',
            'auroras',
            'PEARL ELECTRIC',
            'BYD',
            'Abacus',
            'bluesmart',
            'HengMing',
            'victron energy'
        ]
    },
    {
        title: 'Smart Facilities',
        partners: [
            'URSALINK',
            'my Devices',
            'Telit',
            'TELTONIKA',
            'Milesight',
            'LoRaWAN',
            'THE THINGS NETWORK'
        ]
    },
    {
        title: 'Other ICT Solutions we Offer',
        partners: [
            'AKCO',
            'logitech',
            'Microsoft',
            'Lenovo',
            'Google Workspace',
            'kaspersky',
            'Yeastar',
            'SONY',
            'poly',
            'A&T',
            'SAMSUNG',
            'LG',
            'Hisense'
        ]
    }
];

const logoLookup = [
    { keywords: ['CISCO'], logo: logo2 },
    { keywords: ['HUAWEI'], logo: logo3 },
    { keywords: ['TP-LINK', 'TP LINK'], logo: logo5 },
    { keywords: ['ARUBA'], logo: logo4 },
    { keywords: ['PANASONIC'], logo: logo8 },
    { keywords: ['NETGEAR'], logo: logo6 },
    { keywords: ['UBIQUITI'], logo: logo7 },
    { keywords: ['RINGCENTRAL'], logo: logo9 },
    { keywords: ['MICROSOFT'], logo: logo1 },
    { keywords: ['GOOGLE'], logo: logo10 },
    { keywords: ['LOGITECH'], logo: logo1 },
    { keywords: ['LENOVO'], logo: logo3 },
    { keywords: ['SONY'], logo: logo8 },
    { keywords: ['SAMSUNG'], logo: logo6 },
    { keywords: ['LG'], logo: logo4 },
    { keywords: ['HISENSE'], logo: logo5 }
];

const fallbackLogos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10];

const hashString = (value) =>
    value
        .split('')
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);

const findLogo = (partnerName) => {
    const upper = partnerName.toUpperCase();
    const match = logoLookup.find((entry) =>
        entry.keywords.some((keyword) => upper.includes(keyword))
    );
    if (match?.logo) {
        return match.logo;
    }
    const hash = hashString(upper);
    return fallbackLogos[hash % fallbackLogos.length];
};

const PartnersPage = () => (
    <Fragment>
        <Header />
        <main className="page_content">
            <PageTitle pageTitle="Our Partners" pagesub="Strategic Alliances" pageTop="Partners" />
            <section className="section_space bg-light">
                <div className="container">
                    {partnerCategories.map((category) => (
                        <div className="mb-5" key={category.title}>
                            <div className="heading_block mb-4 text-center">
                                <div
                                    className="heading_focus_text has_underline d-inline-flex"
                                    style={{ backgroundImage: `url(${'/images/shapes/shape_title_under_line.svg'})` }}
                                >
                                    {category.title}
                                </div>
                                <p className="text-muted mb-0">
                                    Cloud Services &amp; Enterprise Software Partnership: Cloud Solutions &amp; AI Platform Integration
                                </p>
                            </div>
                            <div className="row g-4">
                                {category.partners.map((partner) => (
                                    <div className="col-xl-3 col-lg-4 col-md-6" key={`${category.title}-${partner}`}>
                                        <div className="card h-100 border-0 shadow-sm">
                                            <div className="card-body d-flex flex-column align-items-center text-center">
                                                <div className="mb-3 partner_logo_image d-inline-flex align-items-center justify-content-center rounded-3 bg-white border shadow-sm px-4 py-3">
                                                    <Image
                                                        src={findLogo(partner)}
                                                        alt={`${partner} logo`}
                                                        width={140}
                                                        height={60}
                                                        className="img-fluid"
                                                    />
                                                </div>
                                                <h4 className="h6 mb-2">{partner}</h4>
                                                <div className="small text-muted">
                                                    {category.title}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
        <Footer />
        <Scrollbar />
    </Fragment>
);

export default PartnersPage;
