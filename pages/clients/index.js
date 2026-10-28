import React, { Fragment } from 'react';
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Image from 'next/image';

import winasSacco from 'public/images/clients/client_logo_1.webp';
import ilri from 'public/images/clients/ilri_logo.png';
import icraf from 'public/images/clients/client_logo_2.webp';
import kemri from 'public/images/clients/kemri.png';
import machakosUniversity from 'public/images/clients/logo-mksu.png';
import cosmos from 'public/images/clients/Cosmos-Identity-Col.png';
import unityHomes from 'public/images/clients/client_logo_3.webp';
import pdmHoldings from 'public/images/clients/pdmholdings.png';
import cicGroup from 'public/images/clients/CIC_Group_Logo.png';
import caf from 'public/images/clients/Confederation_of_African_Football_logo.svg.webp';
import dowChemicals from 'public/images/clients/client_logo_4.webp';
import ketraco from 'public/images/clients/client_logo_5.webp';
import resolutionInsurance from 'public/images/clients/client_logo_6.webp';
import sifanet from 'public/images/clients/sifanetsystems.png';

const clients = [
    {
        id: 'winas-sacco',
        logo: winasSacco,
        name: 'Winas Sacco Limited',
        sector: 'Banking & Finance',
        keyProjects: [
            'Installation, configuration, maintenance and quarterly servicing of security systems across 15+ branches in 5+ counties.',
            'Enterprise surveillance with local and central remote archiving.',
            'Biometric access control, electric fence and alarm systems.',
            'LAN and structured cabling systems.'
        ]
    },
    {
        id: 'ilri',
        logo: ilri,
        name: 'ILRI',
        sector: 'Global NGO',
        keyProjects: [
            'Biometric gate automation for pedestrian and vehicle entry/exit lanes.',
            'Security surveillance and internal biometric access control systems.',
            'Custom workflow integrations with the client’s Active Directory.',
            'Visitor management and biometric time-and-attendance workflow integration.'
        ]
    },
    {
        id: 'icraf',
        logo: icraf,
        name: 'ICRAF',
        sector: 'Global NGO',
        keyProjects: [
            'Pedestrian and vehicle gate automation using turnstiles, automatic traffic barriers and safety sensors/detectors.',
            'Automatic number plate recognition (ANPR) and logging systems.',
            'Biometric access control terminals.',
            'Integrations with visitor and appointment management, time-and-attendance, HR and Active Directory systems, including custom workflows.'
        ]
    },
    {
        id: 'kemri',
        logo: kemri,
        name: 'KEMRI',
        sector: 'Government',
        keyProjects: [
            'Design, installation, maintenance, support and servicing of automated gate systems.',
            'Automatic traffic boom barriers, hydraulic bollards and green/red LED traffic lights.',
            'Facial-recognition access-control reader terminals and pedestrian full-height turnstiles.',
            '33-zone walk-through metal detectors and induction loop detectors.',
            'Branded RFID access cards for staff.'
        ]
    },
    {
        id: 'machakos-university',
        logo: machakosUniversity,
        name: 'Machakos University',
        sector: 'Public Institution',
        keyProjects: [
            'Automated student, staff and visitor entry/exit systems at the main pedestrian and vehicle gates, including security screening.',
            'Automatic barrier gates, full-height bi-directional pedestrian turnstiles and traffic lights.',
            'Vehicle safety detectors, walk-through metal detectors and X-ray baggage scanners.',
            'Software setup and integration with the university ERP for entry/exit rules, workflows and reporting.'
        ]
    },
    {
        id: 'cosmos',
        logo: cosmos,
        name: 'Cosmos',
        sector: 'Pharmaceuticals',
        keyProjects: [
            'Facial-recognition time-and-attendance (clock-in) system setup.'
        ]
    },
    {
        id: 'unity-homes',
        logo: unityHomes,
        name: 'Unity Homes',
        sector: 'Real Estate',
        keyProjects: [
            'Delivery, installation and setup of facial-recognition access for tenants’ gym and swimming pool facilities.',
            'Door automation for the gym and swimming pool facilities.'
        ]
    },
    {
        id: 'pdm-holdings',
        logo: pdmHoldings,
        name: 'PDM Holdings',
        sector: 'Real Estate & Property',
        keyProjects: [
            'Additional RFID-based pedestrian entry systems at DTB Centre, Kampala, Uganda.',
            'Software setup and hardware-level integration with existing turnstiles.',
            'RFID card branding, issuance and enrollment for tenant-organization staff.'
        ]
    },
    {
        id: 'cic',
        logo: cicGroup,
        name: 'CIC',
        sector: 'Private Corporate',
        keyProjects: [
            'Repairs, maintenance and servicing of automatic traffic barrier systems serving staff and visitor parking at CIC’s Upper Hill offices.'
        ]
    },
    {
        id: 'dow-chemicals',
        logo: dowChemicals,
        name: 'Dow Chemicals',
        sector: 'Pharmaceuticals',
        keyProjects: [
            'Design, installation and maintenance of biometric-enabled security entry/exit systems at the Riverside Drive offices in Nairobi, Kenya.'
        ]
    },
    {
        id: 'caf',
        logo: caf,
        name: 'Confédération Africaine de Football (CAF)',
        sector: 'Global Private Organization',
        keyProjects: [
            'High-level scoping and design of stadium ICT connectivity requirements.',
            'Wired and wireless networks, network security and application-control gateways.',
            'Stadium switching and routing, including interfacing with primary and redundant ISPs for fibre connectivity.'
        ]
    },
    {
        id: 'ketraco',
        logo: ketraco,
        name: 'KETRACO',
        sector: 'Government',
        keyProjects: [
            'Data-centre audits, reporting and redesign covering power backup, voltage regulation, UPS systems and HVAC cooling at the main Tier III data centre.'
        ]
    },
    {
        id: 'sifanet',
        logo: sifanet,
        name: 'Sifanet Systems Limited',
        sector: 'Private Corporate',
        keyProjects: [
            'Supply, delivery, installation, configuration and servicing of high-performance on-premise xFusion servers.',
            'High-performance CPU-based and GPU AI-computing/HPC servers.'
        ]
    },
    {
        id: 'resolution-insurance',
        logo: resolutionInsurance,
        name: 'Resolution Insurance',
        sector: 'Private Corporate',
        keyProjects: [
            'Installation, configuration and setup of fingerprint-recognition security and entry systems at the main offices on Waiyaki Way, Nairobi, Kenya.'
        ]
    }
];

const ClientLogo = ({ client }) => (
    <div className="client_logo_image">
        <Image
            src={client.logo}
            alt={`${client.name} logo`}
            fill
            sizes="180px"
            style={{ objectFit: 'contain' }}
        />
    </div>
);

const ClientsPage = () => (
    <Fragment>
        <Header />
        <main className="page_content">
            <PageTitle pageTitle="Our Clients" pagesub="Selected Project Experience" pageTop="Clients" />
            <section className="section_space bg-light">
                <div className="container">
                    <div className="heading_block mb-4">
                        <p className="heading_description mb-0">
                            Selected projects delivered across security systems, access automation, ICT infrastructure and data-centre resilience.
                        </p>
                    </div>
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
                                        <div className="small flex-grow-1 mt-3">
                                            <span className="text-muted d-block mb-1">Key Projects</span>
                                            <ul className="list-unstyled mb-0">
                                                {client.keyProjects.map((project) => (
                                                    <li key={project} className="d-flex align-items-start mb-2">
                                                        <i className="fa-solid fa-check text-primary me-2 mt-1" aria-hidden="true"></i>
                                                        <span>{project}</span>
                                                    </li>
                                                ))}
                                            </ul>
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
