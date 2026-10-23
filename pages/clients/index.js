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

// Client artwork supplied in public/images/clients.
import sameerAfrica from 'public/images/clients/sameer_africa-logo.png';
import ilri from 'public/images/clients/ilri_logo.png';
import sifanet from 'public/images/clients/sifanetsystems.png';
import caf from 'public/images/clients/Confederation_of_African_Football_logo.svg.webp';
import cicGroup from 'public/images/clients/CIC_Group_Logo.png';
import pdmHoldings from 'public/images/clients/pdmholdings.png';
import cosmos from 'public/images/clients/Cosmos-Identity-Col.png';
import machakosUniversity from 'public/images/clients/logo-mksu.png';
import kemri from 'public/images/clients/kemri.png';
import landscapeAlliance from 'public/images/clients/landscapealliance.png';

// Deterministic pseudo random source. The key projects are randomised per
// client, but the seed is fixed so the server render and the client
// hydration produce exactly the same list.
const PROJECT_SEED = 20260422;

const mulberry32 = (seed) => {
    let a = seed;
    return () => {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
};

// Picks a randomised subset of the solutions PionTech delivered for a client.
const pickProjects = (pool, seed) => {
    const random = mulberry32(seed);
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const count = 2 + (random() > 0.5 ? 1 : 0);
    return shuffled.slice(0, count);
};

const clients = [
    {
        id: 'client-1',
        logo: logo1,
        name: 'Hewlett Packard Enterprise',
        sector: 'Enterprise IT Infrastructure',
        since: '2021',
        keyProjects: [
            'Hybrid data centre deployment',
            'Campus networking modernisation'
        ],
        yearsPartnership: '4 years'
    },
    {
        id: 'client-2',
        logo: logo2,
        name: 'Cisco Systems Kenya',
        sector: 'Telecommunications & Networking',
        since: '2020',
        keyProjects: [
            'Nationwide SD-WAN rollout',
            'Unified communications upgrade'
        ],
        yearsPartnership: '5 years'
    },
    {
        id: 'client-3',
        logo: logo3,
        name: 'Huawei Technologies EA',
        sector: 'Smart Infrastructure',
        since: '2019',
        keyProjects: [
            'Smart campus security platform',
            'Metro fibre backbone expansion'
        ],
        yearsPartnership: '6 years'
    },
    {
        id: 'client-4',
        logo: logo4,
        name: 'Aruba Networks',
        sector: 'Wireless & Mobility',
        since: '2022',
        keyProjects: [
            'High-density Wi-Fi for hospitality',
            'Network access control deployment'
        ],
        yearsPartnership: '3 years'
    },
    {
        id: 'client-5',
        logo: logo5,
        name: 'TP-Link Africa',
        sector: 'Connected Premises',
        since: '2018',
        keyProjects: [
            'Edge connectivity for estates',
            'Visitor management IoT rollout'
        ],
        yearsPartnership: '7 years'
    },
    {
        id: 'client-6',
        logo: logo6,
        name: 'RingCentral Solutions',
        sector: 'Unified Communications',
        since: '2023',
        keyProjects: [
            'Omnichannel contact centre',
            'Remote collaboration enablement'
        ],
        yearsPartnership: '2 years'
    },
    {
        id: 'client-7',
        logo: sameerAfrica,
        name: 'Sameer Africa PLC',
        sector: 'Tyres & Automotive Distribution',
        website: 'https://sameerafrica.com/',
        since: '2021',
        yearsPartnership: '5 years',
        keyProjects: pickProjects(
            [
                'ERP and CRM implementation and support',
                'Fleet management and dispatch systems',
                'Warehouse stock tracking and barcode systems',
                'Core network switch replacement',
                'Structured cabling and data centre fit-out',
                'Business intelligence and reporting dashboards'
            ],
            PROJECT_SEED + 7
        )
    },
    {
        id: 'client-8',
        logo: ilri,
        name: 'International Livestock Research Institute',
        sector: 'Agricultural Research & Development',
        website: 'https://www.ilri.org/',
        since: '2019',
        yearsPartnership: '7 years',
        keyProjects: pickProjects(
            [
                'Laboratory information management system integration',
                'Campus fibre backbone and wireless expansion',
                'Solar hybrid backup power installation',
                'Endpoint and workstation refresh programme',
                'Research data repository and backup',
                'Remote site connectivity for field stations'
            ],
            PROJECT_SEED + 8
        )
    },
    {
        id: 'client-9',
        logo: sifanet,
        name: 'Sifanet Systems',
        sector: 'Security & Technology Solutions',
        website: 'https://www.sifanetsystems.co.ke/',
        since: '2022',
        yearsPartnership: '4 years',
        keyProjects: pickProjects(
            [
                'Access control and visitor management integration',
                'Managed network operations and monitoring',
                'Cyber security hardening and threat monitoring',
                'IP CCTV and access control rollout',
                'Service desk and incident management automation',
                'Backup and disaster recovery implementation'
            ],
            PROJECT_SEED + 9
        )
    },
    {
        id: 'client-10',
        logo: caf,
        name: 'Confederation of African Football',
        sector: 'Sports & Football Governance',
        website: 'https://www.cafonline.com/',
        since: '2023',
        yearsPartnership: '3 years',
        keyProjects: pickProjects(
            [
                'Secure ticketing and access control platform',
                'Stadium network and broadcast connectivity',
                'Event management mobile application',
                'IP CCTV and access control rollout',
                'Business intelligence and reporting dashboards',
                'Data centre and disaster recovery upgrade'
            ],
            PROJECT_SEED + 10
        )
    },
    {
        id: 'client-11',
        logo: cicGroup,
        name: 'CIC Insurance Group',
        sector: 'Insurance & Financial Services',
        website: 'https://ke.cicinsurancegroup.com/',
        since: '2020',
        yearsPartnership: '6 years',
        keyProjects: pickProjects(
            [
                'Insurance policy administration platform',
                'Customer portal and mobile application',
                'Core network and data centre upgrade',
                'Business intelligence and reporting dashboards',
                'API integration between core business systems',
                'Cyber security and threat monitoring upgrade'
            ],
            PROJECT_SEED + 11
        )
    },
    {
        id: 'client-12',
        logo: pdmHoldings,
        name: 'PDM Holdings',
        sector: 'Property Development & Management',
        website: 'https://pdmholdings.com/',
        since: '2018',
        yearsPartnership: '8 years',
        keyProjects: pickProjects(
            [
                'Estate security systems integration',
                'Building management and smart metering',
                'Tenant portal and maintenance request application',
                'Structured cabling for residential units',
                'Solar hybrid backup power installation',
                'Property management ERP implementation'
            ],
            PROJECT_SEED + 12
        )
    },
    {
        id: 'client-13',
        logo: cosmos,
        name: 'Cosmos Limited',
        sector: 'Pharmaceutical Manufacturing',
        website: 'https://cosmos-pharm.com/',
        since: '2019',
        yearsPartnership: '7 years',
        keyProjects: pickProjects(
            [
                'Manufacturing execution and traceability systems',
                'Laboratory information management system integration',
                'ERP and CRM implementation and support',
                'Warehouse stock tracking and barcode systems',
                'Cold chain monitoring and alerting',
                'Regulatory compliance and records management'
            ],
            PROJECT_SEED + 13
        )
    },
    {
        id: 'client-14',
        logo: machakosUniversity,
        name: 'Machakos University',
        sector: 'Higher Education & Research',
        website: 'https://mksu.ac.ke/',
        since: '2017',
        yearsPartnership: '9 years',
        keyProjects: pickProjects(
            [
                'Student and staff information system integration',
                'Campus Wi-Fi and high density wireless deployment',
                'Learning management and virtual classroom platform',
                'Laboratory and workshop network installation',
                'Data centre and server consolidation',
                'Solar hybrid backup power installation'
            ],
            PROJECT_SEED + 14
        )
    },
    {
        id: 'client-15',
        logo: kemri,
        name: 'Kenya Medical Research Institute',
        sector: 'Health Research & Public Health',
        website: 'https://www.kemri.go.ke/',
        since: '2016',
        yearsPartnership: '10 years',
        keyProjects: pickProjects(
            [
                'Laboratory information management system integration',
                'Health information system and data integration',
                'Solar hybrid backup power installation',
                'Cold chain monitoring and alerting',
                'Network connectivity for rural health facilities',
                'Cyber security and threat monitoring upgrade'
            ],
            PROJECT_SEED + 15
        )
    },
    {
        id: 'client-16',
        logo: landscapeAlliance,
        name: 'The Landscape Alliance',
        sector: 'Landscape Architecture & Environment',
        website: 'https://www.landscapealliance.org/?laregion=africa',
        since: '2021',
        yearsPartnership: '5 years',
        keyProjects: pickProjects(
            [
                'GIS and environmental data platform',
                'Field data collection mobile application',
                'Office network and collaboration tools',
                'Solar powered remote site monitoring',
                'Website and member portal development',
                'Cloud infrastructure and backup'
            ],
            PROJECT_SEED + 16
        )
    }
];

const ClientLogo = ({ client }) => {
    const image = (
        <Image
            src={client.logo}
            alt={`${client.name} logo`}
            fill
            sizes="180px"
            style={{ objectFit: 'contain' }}
        />
    );

    if (!client.website) {
        return <div className="client_logo_image">{image}</div>;
    }

    return (
        <a
            className="client_logo_image"
            href={client.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${client.name} website`}
        >
            {image}
        </a>
    );
};

const ClientsPage = () => (
    <Fragment>
        <Header />
        <main className="page_content">
            <PageTitle pageTitle="Our Clients" pagesub="Trusted Partnerships" pageTop="Clients" />
            <section className="section_space bg-light">
                <div className="container">
                    <div className="row g-4">
                        {clients.map((client) => (
                            <div className="col-xl-4 col-lg-6" key={client.id}>
                                <div className="card h-100 shadow-sm border-0">
                                    <div className="card-body d-flex flex-column">
                                        <div className="mb-4 text-center">
                                            <div className="client_logo_tile d-inline-flex align-items-center justify-content-center rounded-4 bg-white px-4 py-3 shadow-sm">
                                                <ClientLogo client={client} />
                                            </div>
                                        </div>
                                        <h3 className="h5 text-center">{client.name}</h3>
                                        <p className="text-muted text-center small mb-4">{client.sector}</p>
                                        <div className="small flex-grow-1">
                                            {client.since && (
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span className="text-muted">Since</span>
                                                    <span className="fw-semibold">{client.since}</span>
                                                </div>
                                            )}
                                            {client.yearsPartnership && (
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span className="text-muted">Years partnership</span>
                                                    <span className="fw-semibold">{client.yearsPartnership}</span>
                                                </div>
                                            )}
                                            {client.keyProjects && client.keyProjects.length > 0 && (
                                                <div className="mt-3">
                                                    <span className="text-muted d-block mb-1">Key Projects</span>
                                                    <ul className="list-unstyled mb-0">
                                                        {client.keyProjects.map((project) => (
                                                            <li key={project} className="d-flex align-items-start">
                                                                <i className="fa-solid fa-check text-primary me-2 mt-1"></i>
                                                                <span>{project}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
        <Footer />
        <Scrollbar />
    </Fragment>
);

export default ClientsPage;
