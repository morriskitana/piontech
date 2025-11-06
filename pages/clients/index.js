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
    }
];

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
                                            <div className="d-inline-flex align-items-center justify-content-center rounded-4 bg-white px-4 py-3 shadow-sm">
                                                <Image src={client.logo} alt={`${client.name} logo`} width={140} height={60} />
                                            </div>
                                        </div>
                                        <h3 className="h5 text-center">{client.name}</h3>
                                        <p className="text-muted text-center small mb-4">{client.sector}</p>
                                        <div className="small flex-grow-1">
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="text-muted">Since</span>
                                                <span className="fw-semibold">{client.since}</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="text-muted">Years partnership</span>
                                                <span className="fw-semibold">{client.yearsPartnership}</span>
                                            </div>
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
