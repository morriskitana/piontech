/**
 * Portfolio catalogue.
 *
 * Every entry is a PionTech engagement. It is keyed to the rest of the site so
 * the portfolio, the service lines and the client and partner walls all tell
 * the same story:
 *
 *   category      service line slug from api/service.js (drives the filters)
 *   client        client name as published on /clients
 *   clientLogo    client artwork from public/images/clients
 *   partners      partner names exactly as published on /partners, so the
 *                 artwork lookup in components/PartnerSection/partnerLogos.js
 *                 resolves to the same logos
 *
 * `thumb1` / `thumb2` / `sub` / `Industry` / `Country` are kept because the
 * home page carousel and the software-company variant still read them.
 */

import pImg1 from 'public/images/portfolio/portfolio_item_image_1.webp'
import pImg2 from 'public/images/portfolio/portfolio_item_image_2.webp'
import pImg3 from 'public/images/portfolio/portfolio_item_image_3.webp'
import pImg4 from 'public/images/portfolio/portfolio_item_image_4.webp'
import pImg5 from 'public/images/portfolio/portfolio_item_image_5.webp'
import pImg6 from 'public/images/portfolio/portfolio_item_image_6.webp'
import pImg7 from 'public/images/portfolio/portfolio_item_image_7.webp'
import pImg8 from 'public/images/portfolio/portfolio_item_image_8.webp'
import pImg9 from 'public/images/portfolio/portfolio_item_image_9.webp'
import pImg10 from 'public/images/portfolio/portfolio_item_image_10.webp'
import pImg11 from 'public/images/portfolio/portfolio_item_image_11.webp'

import cImg1 from 'public/images/case/case_image_1.webp'
import cImg2 from 'public/images/case/case_image_2.webp'
import cImg3 from 'public/images/case/case_image_3.webp'
import cImg4 from 'public/images/case/case_image_4.webp'

import sameerAfrica from 'public/images/clients/sameer_africa-logo.png'
import ilri from 'public/images/clients/ilri_logo.png'
import sifanet from 'public/images/clients/sifanetsystems.png'
import caf from 'public/images/clients/Confederation_of_African_Football_logo.svg.webp'
import cicGroup from 'public/images/clients/CIC_Group_Logo.png'
import pdmHoldings from 'public/images/clients/pdmholdings.png'
import cosmos from 'public/images/clients/Cosmos-Identity-Col.png'
import machakosUniversity from 'public/images/clients/logo-mksu.png'
import kemri from 'public/images/clients/kemri.png'
import landscapeAlliance from 'public/images/clients/landscapealliance.png'
import ringcentral from 'public/images/clients/client_logo_6.webp'
import siteLogo from 'public/images/site_logo/site_logo.svg'

const Project = [
    {
        Id: '1',
        pImg: pImg1,
        title: 'Fleet Management & Dispatch Platform',
        slug: 'sameer-africa-fleet-management-platform',
        sub: 'Tyres & Automotive Distribution',
        thumb1: 'Enterprise Applications',
        thumb2: 'Sameer Africa PLC',
        category: 'enterprise-applications',
        client: 'Sameer Africa PLC',
        clientLogo: sameerAfrica,
        service: 'Enterprise Applications',
        serviceSlug: 'enterprise-applications',
        Industry: 'Tyres & Automotive Distribution',
        Country: 'Nairobi, Kenya',
        Year: '2024',
        Duration: 'Ongoing, phased rollout',
        summary: 'A fleet tracking and dispatch system that gives Sameer Africa live visibility of every vehicle, load and delivery across its distribution network.',
        description: 'Sameer Africa needed one operational view of a fleet spread across the country, replacing manual dispatch boards and radio check-ins. We configured a fleet platform with live vehicle tracking, driver and load assignment, and delivery proof captured from the field, integrated with the existing ERP so dispatch, stock and vehicle status move together.',
        scope: [
            'Current-state mapping of dispatch, routing and delivery workflows',
            'Live vehicle tracking with geofencing for depots and customer sites',
            'Driver and load assignment with proof-of-delivery capture',
            'Integration with the ERP for stock, order and transfer movements',
            'Dashboard for fleet utilisation, turnaround and downtime',
            'Training for dispatchers, supervisors and fleet managers'
        ],
        outcomes: [
            'One live operational view across the whole fleet',
            'Faster turnaround on customer deliveries',
            'Lower fuel and maintenance cost through utilisation reporting',
            'Dispatch records reconciled automatically against ERP movements'
        ],
        partners: ['Mindfire Solutions', 'Trackplan', 'TELTONIKA', 'ShareDocs']
    },
    {
        Id: '2',
        pImg: pImg2,
        title: 'ERP & CRM Rollout with Integrated Reporting',
        slug: 'sameer-africa-erp-crm-rollout',
        sub: 'Tyres & Automotive Distribution',
        thumb1: 'Custom Software & Integration',
        thumb2: 'Sameer Africa PLC',
        category: 'custom-software-and-integration',
        client: 'Sameer Africa PLC',
        clientLogo: sameerAfrica,
        service: 'Custom Software & Integration',
        serviceSlug: 'custom-software-and-integration',
        Industry: 'Tyres & Automotive Distribution',
        Country: 'Nairobi, Kenya',
        Year: '2023',
        Duration: '6 months',
        summary: 'Implementation and ongoing support of the ERP and CRM platforms that run Sameer Africa stock, sales and customer relationships.',
        description: 'We ran the ERP and CRM implementation for Sameer Africa and stayed on to support it: process documentation, configuration, migration of historic stock and customer data, integration between the two platforms, and the reporting layer management now relies on. The engagement combined off-the-shelf configuration with targeted customisations for the tyre and automotive distribution workflow.',
        scope: [
            'Business analysis and documented as-is processes',
            'ERP configuration for stock, sales, purchasing and distribution',
            'CRM rollout aligned to the customer and after-sales journey',
            'Data migration and reconciliation of historic records',
            'Integration between ERP, CRM and warehouse operations',
            'Business intelligence and reporting dashboards',
            'User acceptance testing, training and hypercare support'
        ],
        outcomes: [
            'Single source of truth for stock, sales and customer records',
            'Month-end reporting produced without manual consolidation',
            'Shorter order-to-cash cycle',
            'A support model with defined escalation and response times'
        ],
        partners: ['Mindfire Solutions', 'ShareDocs', 'oneLogin']
    },
    {
        Id: '3',
        pImg: pImg3,
        title: 'Core Network & Data Centre Fit-Out',
        slug: 'sameer-africa-core-network-data-centre-fit-out',
        sub: 'Tyres & Automotive Distribution',
        thumb1: 'ICT Solutions, Systems & Hardware',
        thumb2: 'Sameer Africa PLC',
        category: 'ict-solutions-systems-and-hardware',
        client: 'Sameer Africa PLC',
        clientLogo: sameerAfrica,
        service: 'ICT Solutions, Systems & Hardware',
        serviceSlug: 'ict-solutions-systems-and-hardware',
        Industry: 'Tyres & Automotive Distribution',
        Country: 'Nairobi, Kenya',
        Year: '2024',
        Duration: '10 weeks',
        summary: 'Replacement of ageing core switches and a full data centre fit-out covering structured cabling, racks, power and core switching.',
        description: 'The core network at Sameer Africa was running on end-of-life switching that no longer met availability targets. We designed and delivered the replacement: structured cabling and data centre fit-out, resilient core switching, backup power and a managed monitoring layer, all executed over a phased weekend cutover with no disruption to distribution operations.',
        scope: [
            'Site survey and structured cabling design for offices, warehouse and yard',
            'Core and distribution switch replacement with redundant uplinks',
            'Data centre fit-out including racks, patching and structured cabling',
            'UPS and power conditioning for racks and core equipment',
            'Managed network monitoring and alerting',
            'Phased cutover plan with rollback and post-change validation'
        ],
        outcomes: [
            'Higher availability across the core network',
            'Elimination of end-of-life equipment from the estate',
            'Predictable network performance for warehouse and yard operations',
            'Documented, monitored infrastructure the team can support'
        ],
        partners: ['Hewlett Packard Enterprise', 'Extreme Networks', 'Allied Telesis', 'Synology']
    },
    {
        Id: '4',
        pImg: pImg4,
        title: 'Campus Fibre Backbone & Wireless Expansion',
        slug: 'ilri-campus-fibre-backbone-wireless-expansion',
        sub: 'Agricultural Research & Development',
        thumb1: 'ICT Solutions, Systems & Hardware',
        thumb2: 'International Livestock Research Institute',
        category: 'ict-solutions-systems-and-hardware',
        client: 'International Livestock Research Institute',
        clientLogo: ilri,
        service: 'ICT Solutions, Systems & Hardware',
        serviceSlug: 'ict-solutions-systems-and-hardware',
        Industry: 'Agricultural Research & Development',
        Country: 'Nairobi, Kenya',
        Year: '2023',
        Duration: '5 months',
        summary: 'Campus fibre backbone and high-density wireless coverage so research teams can move from shared desktops to connected workstations and field devices.',
        description: 'ILRI needed dependable connectivity across laboratory, office and meeting spaces where shared desktops and wired points had become the constraint on research work. We built a campus fibre backbone, extended wireless coverage to the areas that were still dead zones, and standardised switching and access so new devices connect without a desk move.',
        scope: [
            'Structured cabling and fibre backbone between campus buildings',
            'High-density wireless survey, design and deployment',
            'Access switching, fibre distribution and power management',
            'Guest and staff network segmentation',
            'Endpoint and workstation refresh programme',
            'Documentation and as-built handover to the internal IT team'
        ],
        outcomes: [
            'Research staff working from connected devices rather than shared desktops',
            'Consistent coverage across laboratories, offices and meeting rooms',
            'Segmented networks for guest, staff and research workloads',
            'A backbone the institute can extend without re-cabling'
        ],
        partners: ['HUAWEI', 'H3C', 'Juniper NETWORKS', 'Extreme Networks', 'Hewlett Packard Enterprise']
    },
    {
        Id: '5',
        pImg: pImg5,
        title: 'Remote Site Connectivity for Field Stations',
        slug: 'ilri-remote-site-connectivity-field-stations',
        sub: 'Agricultural Research & Development',
        thumb1: 'Telecommunication Solutions',
        thumb2: 'International Livestock Research Institute',
        category: 'telecommunication-solutions',
        client: 'International Livestock Research Institute',
        clientLogo: ilri,
        service: 'Telecommunication Solutions',
        serviceSlug: 'telecommunication-solutions',
        Industry: 'Agricultural Research & Development',
        Country: 'Nairobi & field stations, Kenya',
        Year: '2024',
        Duration: '3 months',
        summary: 'Satellite and hybrid connectivity for field stations that had no reliable carrier coverage, keeping trial data flowing to the institute.',
        description: 'Several ILRI field stations operated on unstable or absent terrestrial links, which meant trial data was carried manually and could be days old. We engineered a hybrid solution combining satellite backhaul with local wireless distribution, then handed over monitoring and support with clear service levels.',
        scope: [
            'Coverage assessment and link budget for each station',
            'Satellite backhaul installation with managed failover',
            'Local wireless distribution for labs, offices and field equipment',
            'Network monitoring with site-level availability reporting',
            'Documentation, spares plan and support handover'
        ],
        outcomes: [
            'Trial data available the same day it is collected',
            'No manual data transfer from remote stations',
            'Predictable connectivity for staff and visiting researchers',
            'Usage and availability visibility across every site'
        ],
        partners: ['inmarsat', 'Norden Communication', 'Last Line Solutions', 'Binalyze']
    },
    {
        Id: '6',
        pImg: pImg6,
        title: 'Solar Hybrid Backup Power for Research Labs',
        slug: 'ilri-solar-hybrid-backup-power-research-labs',
        sub: 'Agricultural Research & Development',
        thumb1: 'Power & Renewable Energy Solutions',
        thumb2: 'International Livestock Research Institute',
        category: 'power-and-renewable-energy',
        client: 'International Livestock Research Institute',
        clientLogo: ilri,
        service: 'Power & Renewable Energy Solutions',
        serviceSlug: 'power-and-renewable-energy',
        Industry: 'Agricultural Research & Development',
        Country: 'Nairobi, Kenya',
        Year: '2024',
        Duration: '12 weeks',
        summary: 'Solar hybrid systems with battery storage and UPS backup protecting cold chain, laboratory instruments and critical network equipment.',
        description: 'Unplanned grid outages at the institute put sample integrity and instrumentation at risk. We designed and installed solar hybrid systems with battery storage for priority loads, backed by UPS for sensitive laboratory equipment, with monitoring that flags battery health and remaining autonomy before an outage becomes an incident.',
        scope: [
            'Load analysis for laboratories, cold chain and network equipment',
            'Solar PV array, inverters and battery storage supply',
            'UPS and power conditioning for sensitive equipment',
            'Remote monitoring of generation, storage and consumption',
            'Electrical testing and commissioning',
            'Preventative maintenance and warranty management'
        ],
        outcomes: [
            'Cold chain and instruments protected through grid outages',
            'Lower energy cost through self-generated supply',
            'Reduced carbon footprint at institute sites',
            'Advance warning of battery degradation before downtime'
        ],
        partners: ['victron energy', 'BYD', 'SUVPR', 'HengMing', 'MUST']
    },
    {
        Id: '7',
        pImg: cImg1,
        title: 'Integrated Security Platform for Enterprise Sites',
        slug: 'piontech-integrated-security-enterprise-sites',
        sub: 'Integrated Security Solutions',
        thumb1: 'Integrated Security Solutions',
        thumb2: 'PionTech',
        category: 'integrated-security-solutions',
        client: 'PionTech',
        clientLogo: siteLogo,
        service: 'Integrated Security Solutions',
        serviceSlug: 'integrated-security-solutions',
        Industry: 'Enterprise Security',
        Country: 'Kenya',
        Year: '2025',
        Duration: 'Ongoing',
        summary: 'Unified CCTV, access control, perimeter protection and command-and-control for multi-site enterprises.',
        description: 'PionTech designs and integrates layered security for enterprise sites: IP CCTV with analytics, biometric and card access control, powered perimeter, automated gates and barriers, all brought into a single command platform with audit-ready reporting.',
        scope: [
            'Site risk assessment and security design',
            'CCTV, analytics and video management',
            'Biometric and card access control',
            'Perimeter protection, gates and barriers',
            'Unified command platform and reporting',
            'Operator training and managed support'
        ],
        outcomes: [
            'One view of security across every site',
            'Every entry tied to a verified identity',
            'Faster incident response from a single command centre',
            'Audit-ready records for compliance'
        ],
        partners: ['AJAX Systems', 'ZKTECO', 'Dahua TECHNOLOGY']
    },
    {
        Id: '8',
        pImg: cImg2,
        title: 'Enterprise Applications & Fleet Operations Platform',
        slug: 'piontech-enterprise-applications-fleet-operations',
        sub: 'Enterprise Applications',
        thumb1: 'Enterprise Applications',
        thumb2: 'PionTech',
        category: 'enterprise-applications',
        client: 'PionTech',
        clientLogo: siteLogo,
        service: 'Enterprise Applications',
        serviceSlug: 'enterprise-applications',
        Industry: 'Enterprise IT',
        Country: 'Kenya',
        Year: '2025',
        Duration: 'Ongoing',
        summary: 'ERP, CRM, fleet management and dispatch platforms integrated into one operational system.',
        description: 'PionTech builds and integrates enterprise applications that run day-to-day operations: ERP and CRM, fleet tracking and dispatch, workflow automation and reporting, connected through APIs so stock, sales, vehicles and customers stay in sync.',
        scope: [
            'Process mapping and platform design',
            'ERP, CRM and fleet platform configuration',
            'API integration and data migration',
            'Dashboards and operational reporting',
            'Role-based access and audit trails',
            'Training, rollout and ongoing support'
        ],
        outcomes: [
            'One source of truth across business functions',
            'Faster order-to-cash and dispatch cycles',
            'Live visibility of fleet utilisation',
            'Reporting without manual consolidation'
        ],
        partners: ['Mindfire Solutions', 'ShareDocs']
    },
    {
        Id: '9',
        pImg: cImg3,
        title: 'Solar Hybrid Power & Smart Facilities Automation',
        slug: 'piontech-solar-hybrid-power-smart-facilities',
        sub: 'Power & Renewable Energy Solutions',
        thumb1: 'Power & Renewable Energy Solutions',
        thumb2: 'PionTech',
        category: 'power-and-renewable-energy',
        client: 'PionTech',
        clientLogo: siteLogo,
        service: 'Power & Renewable Energy Solutions',
        serviceSlug: 'power-and-renewable-energy',
        Industry: 'Energy & Facilities',
        Country: 'Kenya',
        Year: '2025',
        Duration: 'Ongoing',
        summary: 'Solar PV, battery storage, hybrid backup and building automation for reliable, efficient power.',
        description: 'PionTech delivers solar hybrid systems with battery storage, UPS and generator integration, paired with smart building automation, metering and monitoring to cut costs and keep critical loads running through outages.',
        scope: [
            'Load analysis and system design',
            'Solar PV, inverters, batteries and hybrid integration',
            'UPS, ATS and backup power',
            'Building automation, metering and monitoring',
            'Commissioning, testing and handover',
            'Preventative maintenance and remote monitoring'
        ],
        outcomes: [
            'Reliable power for critical loads',
            'Lower energy costs through self-generation',
            'Early fault detection and remote monitoring',
            'Reduced carbon footprint'
        ],
        partners: ['victron energy', 'BYD', 'BlueIOT']
    },
    {
        Id: '10',
        pImg: pImg10,
        title: 'Stadium Network & Broadcast Connectivity',
        slug: 'caf-stadium-network-broadcast-connectivity',
        sub: 'Sports & Football Governance',
        thumb1: 'Telecommunication Solutions',
        thumb2: 'Confederation of African Football',
        category: 'telecommunication-solutions',
        client: 'Confederation of African Football',
        clientLogo: caf,
        service: 'Telecommunication Solutions',
        serviceSlug: 'telecommunication-solutions',
        Industry: 'Sports & Football Governance',
        Country: 'Nairobi, Kenya',
        Year: '2023',
        Duration: '4 months',
        summary: 'Dedicated stadium networking and broadcast connectivity so match production, media and officials run on isolated, monitored infrastructure.',
        description: 'Broadcast and match production cannot share a congested guest network. We engineered dedicated stadium connectivity: isolated production and media networks, fibre uplinks for broadcasters, redundant paths for the command centre and resilient coverage for pitch-side and concourse operations, each monitored against availability targets.',
        scope: [
            'Stadium network design with isolated production and media segments',
            'Dedicated fibre uplinks and contribution connectivity for broadcasters',
            'Redundant paths and automatic failover for critical services',
            'Pitch-side and concourse wireless coverage',
            'Spectrum planning, monitoring and interference management',
            'Continuous monitoring with availability reporting'
        ],
        outcomes: [
            'Broadcast and production traffic isolated from public networks',
            'Redundant paths for every match-critical service',
            'Documented spectrum use with monitored compliance',
            'Connectivity that holds up under full-stadium load'
        ],
        partners: ['HUAWEI', 'H3C', 'Unilumin', 'Norden Communication', 'inmarsat']
    },
    {
        Id: '11',
        pImg: pImg11,
        title: 'Policy Administration Platform & Customer Portal',
        slug: 'cic-policy-administration-platform-customer-portal',
        sub: 'Insurance & Financial Services',
        thumb1: 'Custom Software & Integration',
        thumb2: 'CIC Insurance Group',
        category: 'custom-software-and-integration',
        client: 'CIC Insurance Group',
        clientLogo: cicGroup,
        service: 'Custom Software & Integration',
        serviceSlug: 'custom-software-and-integration',
        Industry: 'Insurance & Financial Services',
        Country: 'Nairobi, Kenya',
        Year: '2024',
        Duration: 'Ongoing, phased rollout',
        summary: 'A policy administration platform with a customer portal and mobile app, connected to the core systems through API integration.',
        description: 'CIC needed policy servicing to move out of spreadsheets and into a platform its teams and customers could both work from. We built the policy administration platform with a customer portal and mobile application, integrated it with the core business systems through APIs, and delivered the identity and access model that keeps personal and policy data scoped correctly.',
        scope: [
            'Requirements engineering with the underwriting and servicing teams',
            'Policy administration platform design and build',
            'Customer portal and mobile application',
            'API integration with core policy, billing and CRM systems',
            'Identity and access management with single sign-on',
            'Regulatory record retention and audit trails',
            'User acceptance testing, training and staged rollout'
        ],
        outcomes: [
            'Policy servicing handled in one system instead of spreadsheets',
            'Self-service for customers on quotes, cover and claims status',
            'Faster issuance with fewer re-keyed data errors',
            'Clear audit trail for every policy change'
        ],
        partners: ['Mindfire Solutions', 'oneLogin', 'hoduSoft', 'ShareDocs']
    },
    {
        Id: '12',
        pImg: cImg1,
        title: 'Core Network, Data Centre & Backup Modernisation',
        slug: 'cic-core-network-data-centre-backup-modernisation',
        sub: 'Insurance & Financial Services',
        thumb1: 'ICT Solutions, Systems & Hardware',
        thumb2: 'CIC Insurance Group',
        category: 'ict-solutions-systems-and-hardware',
        client: 'CIC Insurance Group',
        clientLogo: cicGroup,
        service: 'ICT Solutions, Systems & Hardware',
        serviceSlug: 'ict-solutions-systems-and-hardware',
        Industry: 'Insurance & Financial Services',
        Country: 'Nairobi, Kenya',
        Year: '2023',
        Duration: '4 months',
        summary: 'Core network, server and backup refresh with a hardened data centre and tested recovery for business-critical insurance systems.',
        description: 'Business-critical insurance platforms were running on an estate we could not demonstrate recovery for. We modernised the core network and data centre, refreshed the server environment, and implemented backup and disaster recovery with scheduled restore testing so recovery time is a measured figure rather than an assumption.',
        scope: [
            'Core and branch network refresh with segmented architecture',
            'Data centre hardening with rack, power and environmental monitoring',
            'Server virtualisation and storage consolidation',
            'Backup redesign with off-site replication',
            'Scheduled restore testing and recovery time reporting',
            'Security hardening and threat monitoring upgrade'
        ],
        outcomes: [
            'Demonstrated recovery times for tier-1 systems',
            'Fewer single points of failure in the core estate',
            'Cyber security controls upgraded and monitored',
            'Capacity headroom without a matching hardware spend'
        ],
        partners: ['Hewlett Packard Enterprise', 'xFusion', 'Synology', 'EisenVault', 'CISCO']
    },
    {
        Id: '13',
        pImg: cImg2,
        title: 'Smart Building Management, Metering & Tenant Portal',
        slug: 'pdm-holdings-smart-building-management-metering-tenant-portal',
        sub: 'Property Development & Management',
        thumb1: 'Smart Facilities & Building Automation',
        thumb2: 'PDM Holdings',
        category: 'smart-facilities-and-automation',
        client: 'PDM Holdings',
        clientLogo: pdmHoldings,
        service: 'Smart Facilities & Building Automation',
        serviceSlug: 'smart-facilities-and-automation',
        Industry: 'Property Development & Management',
        Country: 'Nairobi, Kenya',
        Year: '2024',
        Duration: 'Ongoing, estate by estate',
        summary: 'Building management, smart metering and a tenant maintenance portal across PDM Holdings residential and commercial estates.',
        description: 'PDM Holdings manages estates where utilities, maintenance requests and access were tracked in separate places. We integrated building management and smart metering with a tenant portal for maintenance requests, added environmental and leak detection, and gave the property team one view of consumption and service delivery across the portfolio.',
        scope: [
            'Building management integration for lighting, HVAC and common areas',
            'Smart metering with consumption analytics per unit and estate',
            'Environmental, leak and intrusion detection',
            'Tenant portal and maintenance request application',
            'Cloud dashboards and mobile access for facility managers',
            'Remote video surveillance and panic buttons in shared areas'
        ],
        outcomes: [
            'Tenants raise and track maintenance requests themselves',
            'Per-unit consumption visibility for landlords and tenants',
            'Early detection of leaks and environmental risks',
            'Common-area energy use reduced through automation'
        ],
        partners: ['BlueIOT', 'Mesh++', 'Tsingoal', 'Telit', 'LoRaWAN']
    },
    {
        Id: '14',
        pImg: cImg3,
        title: 'Estate Security Systems Integration',
        slug: 'pdm-holdings-estate-security-systems-integration',
        sub: 'Property Development & Management',
        thumb1: 'Integrated Security Solutions',
        thumb2: 'PDM Holdings',
        category: 'integrated-security-solutions',
        client: 'PDM Holdings',
        clientLogo: pdmHoldings,
        service: 'Integrated Security Solutions',
        serviceSlug: 'integrated-security-solutions',
        Industry: 'Property Development & Management',
        Country: 'Nairobi, Kenya',
        Year: '2023',
        Duration: '4 months',
        summary: 'Access control, CCTV, powered perimeter and automated gates integrated into a single command view across the PDM estate.',
        description: 'Each PDM estate ran its own security kit with no common view. We standardised on one integrated security design — access control, IP CCTV with analytics, powered perimeter protection and automated gates — brought them into a single command platform, and left the estate teams with a monitoring routine they can actually sustain.',
        scope: [
            'Threat and compliance assessment across the estate',
            'IP CCTV with analytics, LPR and facial recognition where appropriate',
            'Biometric and card access control integrated with the tenant portal',
            'Powered perimeter fencing, barriers and automated gates',
            'Unified command platform with multi-site visibility',
            'Operator training, maintenance plan and warranty management'
        ],
        outcomes: [
            'One security picture across all estates',
            'Automated access that follows tenancy records',
            'Perimeter incidents detected and stopped earlier',
            'A documented maintenance routine instead of reactive repairs'
        ],
        partners: ['AJAX Systems', 'Aratek', 'Veze Auto Door', 'ZKTECO', 'SafeAgle', 'LogSign']
    },
    {
        Id: '15',
        pImg: cImg4,
        title: 'Cold Chain Monitoring & Regulatory Traceability',
        slug: 'cosmos-cold-chain-monitoring-regulatory-traceability',
        sub: 'Pharmaceutical Manufacturing',
        thumb1: 'IoT Solutions & Remote Monitoring',
        thumb2: 'Cosmos Limited',
        category: 'iot-solutions-and-remote-monitoring',
        client: 'Cosmos Limited',
        clientLogo: cosmos,
        service: 'IoT Solutions & Remote Monitoring',
        serviceSlug: 'iot-solutions-and-remote-monitoring',
        Industry: 'Pharmaceutical Manufacturing',
        Country: 'Nairobi, Kenya',
        Year: '2024',
        Duration: 'Ongoing, site rollout in progress',
        summary: 'Sensor-driven cold chain monitoring with automated alerting and full batch traceability from production to dispatch.',
        description: 'For a pharmaceutical manufacturer, a temperature excursion is a compliance event before it is an operational one. We deployed calibrated sensors across cold chain storage and transport, wired automatic escalation rules to the team on call, and integrated the readings with manufacturing execution so each batch carries a complete, auditable history.',
        scope: [
            'Temperature and humidity monitoring across storage and transport',
            'Gateway connectivity with edge processing for offline sites',
            'Automated alert rules with escalation to the team on call',
            'Integration with manufacturing execution and traceability',
            'Regulatory compliance records and audit reporting',
            'Dashboard and mobile alerting for cold chain managers'
        ],
        outcomes: [
            'Excursions caught before product is written off',
            'Complete audit history for every batch',
            'Compliance reporting produced from the same live data',
            'Reduced manual temperature logging'
        ],
        partners: ['BlueIOT', 'Tsingoal', 'Mesh++', 'Telit', 'TELTONIKA', 'Milesight']
    },
    {
        Id: '16',
        pImg: pImg1,
        title: 'Campus Wi-Fi, Virtual Classrooms & Data Centre Consolidation',
        slug: 'machakos-university-campus-wifi-virtual-classrooms-data-centre',
        sub: 'Higher Education & Research',
        thumb1: 'ICT Solutions, Systems & Hardware',
        thumb2: 'Machakos University',
        category: 'ict-solutions-systems-and-hardware',
        client: 'Machakos University',
        clientLogo: machakosUniversity,
        service: 'ICT Solutions, Systems & Hardware',
        serviceSlug: 'ict-solutions-systems-and-hardware',
        Industry: 'Higher Education & Research',
        Country: 'Machakos, Kenya',
        Year: '2024',
        Duration: '5 months',
        summary: 'High-density campus wireless, virtual classroom delivery and a consolidated data centre replacing standalone servers in departments.',
        description: 'Machakos University was running teaching delivery on a mix of standalone departmental servers and uneven wireless coverage. We consolidated the server estate into a single supported data centre, deployed high-density wireless designed for lecture halls, and set up virtual classroom delivery so teaching can continue when rooms are occupied.',
        scope: [
            'High-density wireless survey, design and deployment for lecture halls',
            'Student and staff network segmentation',
            'Data centre and server consolidation with shared storage',
            'Learning management and virtual classroom platform deployment',
            'Laboratory and workshop network installation',
            'Backup and restore for consolidated services'
        ],
        outcomes: [
            'Reliable connectivity during full lecture attendance',
            'One supported platform instead of many standalone servers',
            'Teaching continuity through virtual classroom delivery',
            'Faster recovery of shared academic services'
        ],
        partners: ['Hewlett Packard Enterprise', 'HUAWEI', 'aruba', 'Synology', 'Unilumin']
    },
    {
        Id: '17',
        pImg: pImg2,
        title: 'Cold Chain & Rural Health Facility Connectivity',
        slug: 'kemri-cold-chain-rural-health-facility-connectivity',
        sub: 'Health Research & Public Health',
        thumb1: 'IoT Solutions & Remote Monitoring',
        thumb2: 'Kenya Medical Research Institute',
        category: 'iot-solutions-and-remote-monitoring',
        client: 'Kenya Medical Research Institute',
        clientLogo: kemri,
        service: 'IoT Solutions & Remote Monitoring',
        serviceSlug: 'iot-solutions-and-remote-monitoring',
        Industry: 'Health Research & Public Health',
        Country: 'Nairobi & field stations, Kenya',
        Year: '2023',
        Duration: '6 months',
        summary: 'Monitoring and connectivity for cold chain equipment across rural health facilities and research field stations.',
        description: 'KEMRI health facilities and field stations were carrying vaccines and samples on temperature assumptions rather than readings. We deployed monitoring on cold chain equipment, connected sites where carrier coverage was weak, and built alerting so the team on call learns about a failing unit or an excursion before the stock is affected.',
        scope: [
            'Cold chain monitoring for vaccine and sample storage',
            'Remote alerting for temperature excursions and equipment failure',
            'Connectivity for facilities with weak carrier coverage',
            'Integration with health information systems',
            'Solar backup to keep monitoring live through outages',
            'Field maintenance kit and technician training'
        ],
        outcomes: [
            'Excursions and equipment failures caught early',
            'Monitoring that stays live through power interruptions',
            'Field teams work from the same data as the centre',
            'Fewer spoilage write-offs in remote locations'
        ],
        partners: ['BlueIOT', 'Telit', 'Mesh++', 'HUAWEI', 'TELTONIKA']
    },
    {
        Id: '18',
        pImg: pImg3,
        title: 'Field Data Collection App & GIS Platform',
        slug: 'landscape-alliance-field-data-collection-app-gis-platform',
        sub: 'Landscape Architecture & Environment',
        thumb1: 'Custom Software & Integration',
        thumb2: 'The Landscape Alliance',
        category: 'custom-software-and-integration',
        client: 'The Landscape Alliance',
        clientLogo: landscapeAlliance,
        service: 'Custom Software & Integration',
        serviceSlug: 'custom-software-and-integration',
        Industry: 'Landscape Architecture & Environment',
        Country: 'Nairobi, Kenya',
        Year: '2024',
        Duration: '4 months',
        summary: 'An offline-first field data collection application feeding a GIS platform and member portal for a landscape architecture network.',
        description: 'Field teams for landscape projects were collecting survey data on paper and re-keying it later, which delayed analysis and lost detail. We built an offline-first mobile application for field capture with GPS and photo attachment, a GIS platform for spatial analysis, and a member portal for the wider alliance network.',
        scope: [
            'Discovery and user research with field and technical teams',
            'Offline-first mobile application for field capture',
            'GIS platform with spatial analysis and layer management',
            'Member portal and public website development',
            'Cloud infrastructure, backup and data residency',
            'Staged rollout, training and adoption support'
        ],
        outcomes: [
            'Field data captured once, at source, with location and images',
            'Analysis available the same day surveys are completed',
            'Consistent data formats across field teams and regions',
            'Low connectivity handled without blocking survey work'
        ],
        partners: ['Mindfire Solutions', 'ShareDocs', 'BlueIOT']
    },
    {
        Id: '19',
        pImg: pImg4,
        title: 'Omnichannel Contact Centre & Service Desk Automation',
        slug: 'ringcentral-omnichannel-contact-centre-service-desk-automation',
        sub: 'Unified Communications',
        thumb1: 'Enterprise Applications',
        thumb2: 'RingCentral Solutions',
        category: 'enterprise-applications',
        client: 'RingCentral Solutions',
        clientLogo: ringcentral,
        service: 'Enterprise Applications',
        serviceSlug: 'enterprise-applications',
        Industry: 'Unified Communications',
        Country: 'Nairobi, Kenya',
        Year: '2024',
        Duration: 'Ongoing, service expansion',
        summary: 'An omnichannel contact centre and automated service desk giving customers one entry point across voice, email, chat and social channels.',
        description: 'RingCentral Solutions needed a customer contact layer that brought every channel into one queue with one view of the customer. We implemented the omnichannel contact centre, automated the service desk for first-line resolution, and integrated the telephony and customer systems so agents work from a single screen.',
        scope: [
            'Omnichannel contact centre deployment across voice, email and chat',
            'Service desk and incident management automation',
            'Customer portal and remote collaboration enablement',
            'Telephony and unified communications integration',
            'Agent dashboards, queues and service reporting',
            'Training, change management and support handover'
        ],
        outcomes: [
            'One queue instead of a channel per team',
            'Faster first response on customer contacts',
            'Reduced handling time through automation',
            'Clear service reporting for every channel'
        ],
        partners: ['RingCentral', 'freshdesk', 'Asterisk', 'Yeastar', 'KIOUDIP']
    }
];

// Engagements that are still running. Everything else in the catalogue has
// been delivered. The site navigation links to /portfolio#ongoing and
// /portfolio#completed, so both states are published here.
const ONGOING_SLUGS = new Set([
    'sameer-africa-fleet-management-platform',
    'piontech-integrated-security-enterprise-sites',
    'piontech-enterprise-applications-fleet-operations',
    'piontech-solar-hybrid-power-smart-facilities',
    'sifanet-managed-network-operations-threat-monitoring',
    'caf-secure-ticketing-stadium-access-control',
    'cic-policy-administration-platform-customer-portal',
    'pdm-holdings-smart-building-management-metering-tenant-portal',
    'cosmos-cold-chain-monitoring-regulatory-traceability',
    'ringcentral-omnichannel-contact-centre-service-desk-automation'
]);

export default Project.map(project => ({
    ...project,
    status: ONGOING_SLUGS.has(project.slug) ? 'ongoing' : 'completed'
}));
