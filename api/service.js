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
import { makePartners } from './service-partners'

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
      'Network Solutions & Structured Cabling',
      'Video Conferencing Ecosystems',
      'Unified Communications & VoIP',
      'Support & Managed Services'
    ],
    details: {
      intro: 'PionTech Systems Ltd. provides ICT solutions tailored to customer-specific requirements across diverse industries. Our portfolio covers the full technology stack - from robust connectivity and collaboration platforms to the hardware, software and support services organisations rely on every day.',
      overview: [
        'We work consultatively to analyse existing environments and design practical ICT roadmaps aligned to budget, compliance and performance targets.',
        'Delivery spans product sourcing, configuration, integration and lifecycle support so that infrastructure stays resilient and future-ready.'
      ],
      services: [
        'Network Solutions & Structured Cabling',
        'Network & Switching Equipment, Wireless Access Points, Servers',
        'Video Conferencing Solutions (Hardware, Software & Integrated)',
        'ICT Equipment & Infrastructure Rollouts',
        'PTP, PTMP & Broadband Solutions',
        'Industrial Connectivity',
        'Unified Communications, VoIP, Physical & Virtual PABX Solutions',
        'Software & Cloud Platforms',
        'Support & Managed Services'
      ],
      outcomes: [
        'End-to-End ICT Stack Tailored to Organisational Goals',
        'Modern, Secure Connectivity That Scales With Demand',
        'Continuous Improvement Through Responsive Support And Lifecycle Care',
        'Enhanced Productivity Via Integrated Collaboration Platforms',
        'Greater Resilience Across Distributed Teams And Facilities',
        'Clear Upgrade Paths Backed By Trusted Global Partners'
      ],
      partners: makePartners('ict-solutions-systems-and-hardware', [
        { title: 'Software & Communication Partners', logos: [
          { src: '/images/partners/ict solutions/partner_logo_5.webp', alt: 'Partner 5' },
          { src: '/images/partners/ict solutions/partner_logo_7.webp', alt: 'Partner 7' },
          { src: '/images/partners/ict solutions/partner_logo_8.webp', alt: 'Partner 8' },
        ]}
      ])
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
      'Visitor & Appointment Management Platforms',
      'AI-Driven IP CCTV & Analytics',
      'Biometric Access, Time & Attendance Solutions',
      'Perimeter Protection & Gate Automation'
    ],
    details: {
      intro: 'We design and deploy modern security ecosystems that converge physical and digital safeguards. PionTech Systems integrates best-of-breed hardware, software and third-party systems into unified command platforms with real-time situational awareness.',
      overview: [
        'Our process begins with on-site assessments to understand threat landscapes, compliance obligations and operational workflows. We then engineer layered security that may include visitor management suites, LPR, AI analytics, biometrics, intrusion detection and perimeter hardening.',
        'During implementation we manage civil, electrical and networking works alongside installation, configuration, testing and training. Ongoing support, upgrades and warranty management keep your estate secure and responsive to emerging risks.'
      ],
      services: [
        'Visitor Management, ID Validation And Host Approval Workflows',
        'AI-Enabled IP CCTV, Analytics, Facial Recognition And LPR',
        'Biometric Access Control, Time & Attendance And Smart Locks',
        'Perimeter Security Including Power Fencing, Barriers And Bollards'
      ],
      outcomes: [
        'Unified Visibility Across Multiple Facilities And Entry Points',
        'Automated Compliance With Access, Safety And Audit Policies',
        'Faster Incident Response Through Analytics And Alerts',
        'Enhanced Visitor And Staff Experience With Efficient Access',
        'Robust Protection For Critical Assets, Infrastructure And People',
        'Future-Ready Security Architecture That Scales With Operations'
      ],
      partners: makePartners('integrated-security-solutions')
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
      'Fleet & Asset Tracking And Monitoring',
      'Staff Transport Request & Approval Systems',
      'Omnichannel Contact Centre Platforms',
      'Facility & Identity Management Applications'
    ],
    details: {
      intro: 'PionTech Systems implements enterprise-grade applications that streamline day-to-day operations, enhance visibility and deliver better experiences for customers, staff and stakeholders.',
      overview: [
        'We partner with clients to document current processes, pain-points and KPIs before recommending or tailoring platforms that align with sector best practice. Our portfolio spans fleet tracking, staff transport, service desks, omnichannel contact centres, facility management and identity and access management.',
        'Depending on requirements we configure off-the-shelf solutions or collaborate with technology partners to localise and integrate their products. Adoption support, UATs, training and SLA-backed support ensure lasting value.'
      ],
      services: [
        'Fleet, Asset And Logistics Tracking With Live Dashboards',
        'Staff Transport Planning, Booking And Approval Workflows',
        'Call Centre And Omnichannel Customer Engagement Suites',
        'Facility & Identity Management Portals For Assets And Personnel'
      ],
      outcomes: [
        'Real-Time Visibility Into Mission-Critical Operations',
        'Standardised Workflows That Reduce Manual Effort',
        'Improved Service Levels Across Customer And Employee Touchpoints',
        'Data-Driven Decision Making With Actionable Analytics',
        'Rapid Scalability To New Teams, Regions Or Product Lines',
        'Closer Alignment Between Technology, People And Processes'
      ],
      partners: makePartners('enterprise-applications')
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
      'Requirements Discovery & Scope Definition',
      'Solution Architecture & UX/UI Design',
      'Agile Development, Testing & Certification',
      'Deployment, Training & Long-Term Support'
    ],
    details: {
      intro: 'Where off-the-shelf products fall short, PionTech Systems collaborates with clients to build tailored software solutions. We blend deep technical knowledge, rigorous governance and sector expertise to deliver platforms that map to unique workflows.',
      overview: [
        'We begin with research, benchmarking and requirements documentation before translating findings into solution concepts, architectures and user experiences. Development is handled by our in-house engineers or accredited partners under our oversight.',
        'Quality assurance, security assessments, user acceptance testing and certification precede deployment. We remain engaged with documentation, knowledge transfer, updates and support throughout the solution lifecycle.'
      ],
      services: [
        'Business Analysis, Requirements Engineering And Solution Design',
        'Full-Stack Development For Web, Mobile And Cloud-Native Systems',
        'Integration With Legacy Platforms, Third-Party APIs And Hardware',
        'Managed DevOps, Release Management And Continuous Improvement'
      ],
      outcomes: [
        'Software That Precisely Addresses Niche Operational Challenges',
        'Reduced Technical Debt Through Modern Architectures',
        'Faster Time-To-Value Via Agile Delivery And Iterative Releases',
        'Robust Security And Compliance Baked Into Every Build',
        'Empowered Users Through Tailored Training And Documentation',
        'Long-Term Partnership For Enhancements And Innovation'
      ],
      partners: makePartners('custom-software-and-integration')
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
      'Broadcast Monitoring & Regulator Compliance',
      'Spectrum Surveillance & Radio Planning',
      'Data Centre Power & Facility Readiness',
      'Air Traffic & Drone Management Solutions'
    ],
    details: {
      intro: 'PionTech delivers communication solutions that keep information flowing across broadcast, public safety, aviation and enterprise environments. We integrate monitoring, analytics and infrastructure to guarantee reliable, compliant connectivity.',
      overview: [
        'Our solutions portfolio includes broadcast data logging and analytics, spectrum monitoring, network planning, data centre power systems and unified traffic management for airspace and drone operations. Each engagement is informed by regulatory frameworks and mission-critical SLAs.',
        'We coordinate delivery across technology partners, ensuring seamless integration, configuration, testing and commissioning. Clients benefit from training, documentation and specialised support tailored to telecom-grade environments.'
      ],
      services: [
        'Broadcast Compliance, Data Logging And Analytics Platforms',
        'Spectrum Monitoring, Radio Network Planning And Optimisation',
        'Data Centre Power, Cooling And Monitoring Infrastructure',
        'Air Traffic Management, Drone Detection And Counter-Drone Systems'
      ],
      outcomes: [
        'Regulatory Compliance With Accurate, Auditable Data',
        'Greater Network Availability And Quality Of Service',
        'Optimised Utilisation Of Spectrum And Communication Assets',
        'Safer Skies Through Integrated Air Traffic And Drone Oversight',
        'Scalable Infrastructure Prepared For Future Expansion',
        'Expert Support For Mission-Critical Telecom Operations'
      ],
      partners: makePartners('telecommunication-solutions')
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
      'Solar PV With Storage For Homes & Industry',
      'UPS Systems & Critical Power Backup',
      'High Mast & Street Lighting Solutions',
      'Electrical Testing & Monitoring Services'
    ],
    details: {
      intro: 'Power reliability is essential for safety, productivity and customer service. PionTech Systems designs and implements renewable and backup power solutions that match operational loads and resilience targets.',
      overview: [
        'We supply complete solar solutions including panels, inverters, batteries, mounting and monitoring. For mission-critical environments we deploy UPS systems, high mast lighting, solar street lighting, electrical testing equipment and monitoring platforms.',
        'Implementation covers site audits, system design, sourcing, installation, commissioning and training. We also provide warranty management, preventative maintenance and performance optimisation to protect investments.'
      ],
      services: [
        'Solar PV Systems With Hybrid Storage For Residential And Industrial Sites',
        'UPS And Power Conditioning For Data Centres And Sensitive Equipment',
        'High Mast, Street And Area Lighting For Rail, Ports And Public Spaces',
        'Electrical Testing, Monitoring And Diagnostics For Transmission Assets'
      ],
      outcomes: [
        'Reduced Downtime Through Dependable Backup Power',
        'Lower Energy Costs And Carbon Footprint',
        'Improved Safety And Visibility Across Outdoor Facilities',
        'Actionable Insights Via Continuous Power System Monitoring',
        'Rapid Return On Investment Through Tailored Energy Strategies',
        'Confidence That Warranties And Upgrades Are Professionally Managed'
      ],
      partners: makePartners('power-and-renewable-energy')
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
      'Smart Intrusion, Fire & Leak Detection',
      'Environmental Monitoring & Automation',
      'Smart Switches, Blinds & Lighting',
      'Mobile & Web Facility Management Apps'
    ],
    details: {
      intro: 'Our smart facility solutions blend detection, automation and cloud control to protect occupants, streamline management and enrich everyday experiences.',
      overview: [
        'We implement turnkey systems comprising sensors, controllers, networking and cloud applications. Solutions cover intrusion and fire detection, leakage monitoring, environmental control, smart switching, surveillance and mobile apps for monitoring and response.',
        'Clients receive tailored configurations, user training and proactive support to keep facilities safe, comfortable and efficient.'
      ],
      services: [
        'Integrated Intrusion, Fire, Leak And Environmental Detection',
        'Smart Switching, Lighting, Blinds And Energy Management',
        'Remote Video Surveillance, Panic Buttons And RFID Wristbands',
        'Cloud Dashboards And Mobile Apps For Facility Administrators'
      ],
      outcomes: [
        'Early Detection Of Risks With Automated Mitigation',
        'Reduced Operational Overhead Through Remote Management',
        'Enhanced Comfort And Wellbeing For Occupants',
        'Insightful Analytics On Facility Performance And Usage',
        'Scalable Platform Adaptable To Diverse Property Types',
        'Peace Of Mind Via 24/7 Monitoring And Alerts'
      ],
      partners: makePartners('smart-facilities-and-automation')
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
      'Sensor-Based Monitoring & Telemetry',
      'Automated Actuator Control & Alerts',
      'Cloud Dashboards & Analytics',
      'Multi-Sector Solution Templates'
    ],
    details: {
      intro: 'PionTech Systems connects physical assets to digital intelligence through customised IoT deployments. We integrate sensors, gateways, connectivity and cloud services to reveal actionable data.',
      overview: [
        'Our team handles end-to-end delivery: requirements analysis, device selection, installation, integration, cloud provisioning and analytics visualisation. Solutions address smart agriculture, buildings, cities, cold chain, industrial monitoring and remote asset management.',
        'Lifecycle services cover platform administration, firmware updates, security hardening and integration with enterprise systems.'
      ],
      services: [
        'Environmental, Asset And Process Monitoring Sensors',
        'IoT Gateways, Connectivity Management And Edge Processing',
        'Automation Of Actuators, Alerts And Remote Commands',
        'Cloud Migration, Dashboards And Data Analytics'
      ],
      outcomes: [
        'Near Real-Time Visibility Into Remote Operations',
        'Faster Response Through Automated Rules And Alerts',
        'Optimised Resource Utilisation And Predictive Maintenance',
        'New Service Models Enabled By Data Insights',
        'Secure, Scalable Architecture Aligned With Business Goals',
        'Reduced Manual Inspections And Operational Costs'
      ],
      partners: makePartners('iot-solutions-and-remote-monitoring')
    },
    showOnServicePage: true,
    showOnHome: false
  },
];

export default Services;
