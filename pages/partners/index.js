import React, { Fragment } from 'react';
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Image from 'next/image';

import { findPartnerLogo, partnerMonogram } from '../../components/PartnerSection/partnerLogos';

const partnerCategories = [
    {
        title: 'ICT Solutions, Systems & Hardware',
        partners: [
            'QNAP',
            'Hewlett Packard Enterprise',
            'ARISTA',
            'BROADCOM',
            'Allied Telesis',
            'Extreme Networks',
            'H3C',
            'RingCentral',
            'HUAWEI',
            'iFLYTEK',
            'iOCO',
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
            'Synology',
            'EisenVault',
            'Elefine Tech',
            'Unilumin',
            'xFusion',
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
            'AJAX Systems',
            'ADAPTIVE RECOGNITION',
            'Honeywell',
            'IRONYUN',
            'IDENTIGATE',
            'AXIS',
            'Dahua TECHNOLOGY',
            'SAFR from realnetworks',
            'SafeAgle',
            'Cryotos',
            'LogSign',
            'WiseStamp',
            'Dedrone',
            'Drone Detection System',
            'Veze Auto Door',
            'herta',
            'EVTRACK',
            'SHOGHI',
            'Picus Security',
            'QBurst',
            'leidos',
            'ASCENDENT',
            'DaoSafe',
            'Barracuda',
            'SonicWall',
            'WatchGuard',
            'Tanium',
            'ForeScout',
            'Vectra AI',
            'Segura',
            'Aratek',
            'Tigerwong',
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
            'ShareDocs',
            'DIGITAL REALTY',
            'CORESITE',
            'KIOUDIP',
            'HoduSoft',
            'Trackplan',
            'Mindfire Solutions',
            'Wii Parking',
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
            'Last Line Solutions',
            'Norden Communication',
            'Binalyze',
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
            'BlueIOT',
            'Tsingoal',
            'Mesh++',
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
                                {category.partners.map((partner) => {
                                    const logo = findPartnerLogo(partner);
                                    const tileClassName = [
                                        'partner_logo_image',
                                        logo?.invert ? 'is-inverted' : '',
                                        logo?.icon ? 'is-icon' : ''
                                    ]
                                        .filter(Boolean)
                                        .join(' ');

                                    return (
                                        <div className="col-xl-3 col-lg-4 col-md-6" key={`${category.title}-${partner}`}>
                                            <div className="card h-100 border-0 shadow-sm">
                                                <div className="card-body d-flex flex-column align-items-center text-center">
                                                    <div className="mb-3 partner_logo_tile d-inline-flex align-items-center justify-content-center rounded-3 bg-white border shadow-sm px-3 py-2">
                                                        <div className={tileClassName}>
                                                            {logo ? (
                                                                <Image
                                                                    src={logo.src}
                                                                    alt={`${partner} logo`}
                                                                    fill
                                                                    sizes="156px"
                                                                    style={{ objectFit: 'contain' }}
                                                                />
                                                            ) : (
                                                                <span className="partner_logo_placeholder" aria-hidden="true">
                                                                    {partnerMonogram(partner)}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <h4 className="h6 mb-2">{partner}</h4>
                                                    <div className="small text-muted">
                                                        {category.title}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
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
