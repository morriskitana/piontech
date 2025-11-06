import sImg1 from 'public/images/services/service_image_1.webp'
import sImg2 from 'public/images/services/service_image_2.webp'
import sImg3 from 'public/images/services/service_image_3.webp'
import sImg4 from 'public/images/services/service_image_4.webp'
import sImg5 from 'public/images/services/service_image_5.webp'

import iconNetwork from 'public/images/icons/icon_code.svg'
import iconSecurity from 'public/images/icons/icon_programming_tree.svg'
import iconApps from 'public/images/icons/icon_monitor_2.svg'
import iconPower from 'public/images/icons/icon_bug.svg'
import iconSmart from 'public/images/icons/icon_analisis_2.svg'
import iconIoT from 'public/images/icons/icon_process.svg'

const basePartnerGroups = [
    {
        title: 'Networking & Hardware Partners',
        logos: [
            { src: '/images/clients/client_logo_1.webp', alt: 'Hewlett Packard Enterprise' },
            { src: '/images/clients/client_logo_2.webp', alt: 'Cisco' },
            { src: '/images/clients/client_logo_3.webp', alt: 'Huawei' },
            { src: '/images/clients/client_logo_4.webp', alt: 'Aruba' },
            { src: '/images/clients/client_logo_5.webp', alt: 'TP-Link' }
        ]
    },
    {
        title: 'Distribution & Specialist Partners',
        logos: [
            { src: '/images/clients/client_logo_9.webp', alt: 'Panasonic' },
            { src: '/images/clients/client_logo_10.webp', alt: 'Syscom Distributions' }
        ]
    }
];

const clonePartnerGroups = () => basePartnerGroups.map(group => ({
    ...group,
    logos: group.logos.map(logo => ({ ...logo }))
}));

const Services = [
    {
        Id: '1',
        sImg: sImg1,
        title: 'ICT Solutions, Systems & Hardware',
        slug: 'ict-solutions-systems-and-hardware',
        col: 'col-lg-4 col-md-6',
        tags: ['Network Design', 'Lifecycle Support'],
        summary: 'Design, deploy and maintain customer-specific ICT infrastructure that keeps your organisation connected, secure and ready to scale.',
        features: [
            'Network solutions & structured cabling',
            'Video conferencing ecosystems',
            'Unified communications & VoIP',
            'Support & managed services'
        ],
        details: {
            intro: 'PionTech Systems Ltd. provides ICT solutions tailored to customer-specific requirements across diverse industries. Our portfolio covers the full technology stack - from robust connectivity and collaboration platforms to the hardware, software and support services organisations rely on every day.',
            overview: [
                'We work consultatively to analyse existing environments and design practical ICT roadmaps aligned to budget, compliance and performance targets.',
                'Delivery spans product sourcing, configuration, integration and lifecycle support so that infrastructure stays resilient and future-ready.'
            ],
            services: [
                'Network solutions & structured cabling',
                'Network & switching equipment, wireless access points, servers',
                'Video conferencing solutions (hardware, software & integrated)',
                'ICT equipment & infrastructure rollouts',
                'PTP, PTMP & broadband solutions',
                'Industrial connectivity',
                'Unified communications, VoIP, physical & virtual PABX solutions',
                'Software & cloud platforms',
                'Support & managed services'
            ],
            outcomes: [
                'End-to-end ICT stack tailored to organisational goals',
                'Modern, secure connectivity that scales with demand',
                'Continuous improvement through responsive support and lifecycle care',
                'Enhanced productivity via integrated collaboration platforms',
                'Greater resilience across distributed teams and facilities',
                'Clear upgrade paths backed by trusted global partners'
            ],
            partners: [
                ...clonePartnerGroups(),
                {
                    title: 'Software & Communication Partners',
                    logos: [
                        { src: '/images/clients/client_logo_6.webp', alt: 'RingCentral' },
                        { src: '/images/clients/client_logo_7.webp', alt: 'Freshdesk' },
                        { src: '/images/clients/client_logo_8.webp', alt: 'Asterisk' }
                    ]
                }
            ]
        },
        showOnServicePage: true,
        showOnHome: true
    },
    {
        Id: '2',
        sImg: sImg2,
        title: 'Integrated Security Solutions',
        slug: 'integrated-security-solutions',
        col: 'col-lg-4 col-md-6',
        tags: ['Premise Security', 'Safety & Compliance'],
        summary: 'Protect assets, people and high-security locations with integrated visitor management, AI-enabled surveillance, biometric access and perimeter systems.',
        features: [
            'Visitor & appointment management platforms',
            'AI-driven IP CCTV & analytics',
            'Biometric access, time & attendance solutions',
            'Perimeter protection & gate automation'
        ],
        details: {
            intro: 'We design and deploy modern security ecosystems that converge physical and digital safeguards. PionTech Systems integrates best-of-breed hardware, software and third-party systems into unified command platforms with real-time situational awareness.',
            overview: [
                'Our process begins with on-site assessments to understand threat landscapes, compliance obligations and operational workflows. We then engineer layered security that may include visitor management suites, LPR, AI analytics, biometrics, intrusion detection and perimeter hardening.',
                'During implementation we manage civil, electrical and networking works alongside installation, configuration, testing and training. Ongoing support, upgrades and warranty management keep your estate secure and responsive to emerging risks.'
            ],
            services: [
                'Visitor management, ID validation and host approval workflows',
                'AI-enabled IP CCTV, analytics, facial recognition and LPR',
                'Biometric access control, time & attendance and smart locks',
                'Perimeter security including power fencing, barriers and bollards'
            ],
            outcomes: [
                'Unified visibility across multiple facilities and entry points',
                'Automated compliance with access, safety and audit policies',
                'Faster incident response through analytics and alerts',
                'Enhanced visitor and staff experience with efficient access',
                'Robust protection for critical assets, infrastructure and people',
                'Future-ready security architecture that scales with operations'
            ],
            partners: clonePartnerGroups()
        },
        showOnServicePage: true,
        showOnHome: true
    },
    {
        Id: '3',
        sImg: sImg3,
        title: 'Enterprise Applications',
        slug: 'enterprise-applications',
        col: 'col-lg-4 col-md-6',
        tags: ['Process Automation', 'Operations Visibility'],
        summary: 'Accelerate service delivery with enterprise platforms for fleet management, staff transport, omnichannel contact centres and facility operations.',
        features: [
            'Fleet & asset tracking and monitoring',
            'Staff transport request & approval systems',
            'Omnichannel contact centre platforms',
            'Facility & identity management applications'
        ],
        details: {
            intro: 'PionTech Systems implements enterprise-grade applications that streamline day-to-day operations, enhance visibility and deliver better experiences for customers, staff and stakeholders.',
            overview: [
                'We partner with clients to document current processes, pain-points and KPIs before recommending or tailoring platforms that align with sector best practice. Our portfolio spans fleet tracking, staff transport, service desks, omnichannel contact centres, facility management and identity and access management.',
                'Depending on requirements we configure off-the-shelf solutions or collaborate with technology partners to localise and integrate their products. Adoption support, UATs, training and SLA-backed support ensure lasting value.'
            ],
            services: [
                'Fleet, asset and logistics tracking with live dashboards',
                'Staff transport planning, booking and approval workflows',
                'Call centre and omnichannel customer engagement suites',
                'Facility & identity management portals for assets and personnel'
            ],
            outcomes: [
                'Real-time visibility into mission-critical operations',
                'Standardised workflows that reduce manual effort',
                'Improved service levels across customer and employee touchpoints',
                'Data-driven decision making with actionable analytics',
                'Rapid scalability to new teams, regions or product lines',
                'Closer alignment between technology, people and processes'
            ],
            partners: clonePartnerGroups()
        },
        showOnServicePage: true,
        showOnHome: true
    },
    {
        Id: '4',
        sImg: sImg4,
        title: 'Custom Software & Integration',
        slug: 'custom-software-and-integration',
        col: 'col-lg-4 col-md-6',
        tags: ['Bespoke Builds', 'System Integration'],
        summary: 'Co-create bespoke software through discovery, design, development, testing and deployment delivered by in-house specialists and trusted partners.',
        features: [
            'Requirements discovery & scope definition',
            'Solution architecture & UX/UI design',
            'Agile development, testing & certification',
            'Deployment, training & long-term support'
        ],
        details: {
            intro: 'Where off-the-shelf products fall short, PionTech Systems collaborates with clients to build tailored software solutions. We blend deep technical knowledge, rigorous governance and sector expertise to deliver platforms that map to unique workflows.',
            overview: [
                'We begin with research, benchmarking and requirements documentation before translating findings into solution concepts, architectures and user experiences. Development is handled by our in-house engineers or accredited partners under our oversight.',
                'Quality assurance, security assessments, user acceptance testing and certification precede deployment. We remain engaged with documentation, knowledge transfer, updates and support throughout the solution lifecycle.'
            ],
            services: [
                'Business analysis, requirements engineering and solution design',
                'Full-stack development for web, mobile and cloud-native systems',
                'Integration with legacy platforms, third-party APIs and hardware',
                'Managed DevOps, release management and continuous improvement'
            ],
            outcomes: [
                'Software that precisely addresses niche operational challenges',
                'Reduced technical debt through modern architectures',
                'Faster time-to-value via agile delivery and iterative releases',
                'Robust security and compliance baked into every build',
                'Empowered users through tailored training and documentation',
                'Long-term partnership for enhancements and innovation'
            ],
            partners: clonePartnerGroups()
        },
        showOnServicePage: true,
        showOnHome: true
    },
    {
        Id: '5',
        sImg: sImg5,
        title: 'Telecommunication Solutions',
        slug: 'telecommunication-solutions',
        col: 'col-lg-4 col-md-6',
        tags: ['Broadcast & Spectrum', 'Network Availability'],
        summary: 'Engineer telecommunication infrastructure spanning broadcast monitoring, spectrum oversight, network planning and data centre preparedness.',
        features: [
            'Broadcast monitoring & regulator compliance',
            'Spectrum surveillance & radio planning',
            'Data centre power & facility readiness',
            'Air traffic & drone management solutions'
        ],
        details: {
            intro: 'PionTech delivers communication solutions that keep information flowing across broadcast, public safety, aviation and enterprise environments. We integrate monitoring, analytics and infrastructure to guarantee reliable, compliant connectivity.',
            overview: [
                'Our solutions portfolio includes broadcast data logging and analytics, spectrum monitoring, network planning, data centre power systems and unified traffic management for airspace and drone operations. Each engagement is informed by regulatory frameworks and mission-critical SLAs.',
                'We coordinate delivery across technology partners, ensuring seamless integration, configuration, testing and commissioning. Clients benefit from training, documentation and specialised support tailored to telecom-grade environments.'
            ],
            services: [
                'Broadcast compliance, data logging and analytics platforms',
                'Spectrum monitoring, radio network planning and optimisation',
                'Data centre power, cooling and monitoring infrastructure',
                'Air traffic management, drone detection and counter-drone systems'
            ],
            outcomes: [
                'Regulatory compliance with accurate, auditable data',
                'Greater network availability and quality of service',
                'Optimised utilisation of spectrum and communication assets',
                'Safer skies through integrated air traffic and drone oversight',
                'Scalable infrastructure prepared for future expansion',
                'Expert support for mission-critical telecom operations'
            ],
            partners: clonePartnerGroups()
        },
        showOnServicePage: true,
        showOnHome: true
    },
    {
        Id: '6',
        sImg: iconPower,
        title: 'Power & Renewable Energy Solutions',
        slug: 'power-and-renewable-energy',
        col: 'col-lg-4 col-md-6',
        tags: ['Critical Power', 'Sustainable Energy'],
        summary: 'Deliver solar, hybrid and backup power systems that keep critical facilities running while improving energy efficiency and sustainability.',
        features: [
            'Solar PV with storage for homes & industry',
            'UPS systems & critical power backup',
            'High mast & street lighting solutions',
            'Electrical testing & monitoring services'
        ],
        details: {
            intro: 'Power reliability is essential for safety, productivity and customer service. PionTech Systems designs and implements renewable and backup power solutions that match operational loads and resilience targets.',
            overview: [
                'We supply complete solar solutions including panels, inverters, batteries, mounting and monitoring. For mission-critical environments we deploy UPS systems, high mast lighting, solar street lighting, electrical testing equipment and monitoring platforms.',
                'Implementation covers site audits, system design, sourcing, installation, commissioning and training. We also provide warranty management, preventative maintenance and performance optimisation to protect investments.'
            ],
            services: [
                'Solar PV systems with hybrid storage for residential and industrial sites',
                'UPS and power conditioning for data centres and sensitive equipment',
                'High mast, street and area lighting for rail, ports and public spaces',
                'Electrical testing, monitoring and diagnostics for transmission assets'
            ],
            outcomes: [
                'Reduced downtime through dependable backup power',
                'Lower energy costs and carbon footprint',
                'Improved safety and visibility across outdoor facilities',
                'Actionable insights via continuous power system monitoring',
                'Rapid return on investment through tailored energy strategies',
                'Confidence that warranties and upgrades are professionally managed'
            ],
            partners: clonePartnerGroups()
        },
        showOnServicePage: true,
        showOnHome: true
    },
    {
        Id: '7',
        sImg: iconSmart,
        title: 'Smart Facilities & Building Automation',
        slug: 'smart-facilities-and-automation',
        col: 'col-lg-4 col-md-6',
        tags: ['Comfort & Safety', 'Automation'],
        summary: 'Transform buildings into responsive environments with sensors, automation and remote management that enhance comfort, safety and efficiency.',
        features: [
            'Smart intrusion, fire & leak detection',
            'Environmental monitoring & automation',
            'Smart switches, blinds & lighting',
            'Mobile & web facility management apps'
        ],
        details: {
            intro: 'Our smart facility solutions blend detection, automation and cloud control to protect occupants, streamline management and enrich everyday experiences.',
            overview: [
                'We implement turnkey systems comprising sensors, controllers, networking and cloud applications. Solutions cover intrusion and fire detection, leakage monitoring, environmental control, smart switching, surveillance and mobile apps for monitoring and response.',
                'Clients receive tailored configurations, user training and proactive support to keep facilities safe, comfortable and efficient.'
            ],
            services: [
                'Integrated intrusion, fire, leak and environmental detection',
                'Smart switching, lighting, blinds and energy management',
                'Remote video surveillance, panic buttons and RFID wristbands',
                'Cloud dashboards and mobile apps for facility administrators'
            ],
            outcomes: [
                'Early detection of risks with automated mitigation',
                'Reduced operational overhead through remote management',
                'Enhanced comfort and wellbeing for occupants',
                'Insightful analytics on facility performance and usage',
                'Scalable platform adaptable to diverse property types',
                'Peace of mind via 24/7 monitoring and alerts'
            ],
            partners: clonePartnerGroups()
        },
        showOnServicePage: true,
        showOnHome: false
    },
    {
        Id: '8',
        sImg: iconIoT,
        title: 'IoT Solutions & Remote Monitoring',
        slug: 'iot-solutions-and-remote-monitoring',
        col: 'col-lg-4 col-md-6',
        tags: ['Data-Driven Insights', 'Automation'],
        summary: 'Design bespoke IoT ecosystems that capture field data, trigger automation and feed cloud analytics across agriculture, industry and smart cities.',
        features: [
            'Sensor-based monitoring & telemetry',
            'Automated actuator control & alerts',
            'Cloud dashboards & analytics',
            'Multi-sector solution templates'
        ],
        details: {
            intro: 'PionTech Systems connects physical assets to digital intelligence through customised IoT deployments. We integrate sensors, gateways, connectivity and cloud services to reveal actionable data.',
            overview: [
                'Our team handles end-to-end delivery: requirements analysis, device selection, installation, integration, cloud provisioning and analytics visualisation. Solutions address smart agriculture, buildings, cities, cold chain, industrial monitoring and remote asset management.',
                'Lifecycle services cover platform administration, firmware updates, security hardening and integration with enterprise systems.'
            ],
            services: [
                'Environmental, asset and process monitoring sensors',
                'IoT gateways, connectivity management and edge processing',
                'Automation of actuators, alerts and remote commands',
                'Cloud migration, dashboards and data analytics'
            ],
            outcomes: [
                'Near real-time visibility into remote operations',
                'Faster response through automated rules and alerts',
                'Optimised resource utilisation and predictive maintenance',
                'New service models enabled by data insights',
                'Secure, scalable architecture aligned with business goals',
                'Reduced manual inspections and operational costs'
            ],
            partners: clonePartnerGroups()
        },
        showOnServicePage: true,
        showOnHome: false
    },

];

export default Services;





