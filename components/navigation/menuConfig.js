import iconAbout from 'public/images/icons/icon_bulb.svg';
import iconClients from 'public/images/icons/icon_users.svg';
import iconPartners from 'public/images/icons/icon_hand_shake.svg';
import iconTeam from 'public/images/icons/icon_user_2.svg';
import iconCareer from 'public/images/icons/icon_pen.svg';

import iconIct from 'public/images/icons/icon_wifi.svg';
import iconSecurity from 'public/images/icons/icon_bug.svg';
import iconApplications from 'public/images/icons/icon_monitor_2.svg';
import iconCustomSoftware from 'public/images/icons/icon_code.svg';
import iconTelecom from 'public/images/icons/icon_chart.svg';
import iconPower from 'public/images/icons/icon_leaf.svg';
import iconSmart from 'public/images/icons/icon_building.svg';
import iconIot from 'public/images/icons/icon_process.svg';
import iconOtherSolutions from 'public/images/icons/icon_box.svg';

import iconProjectsAll from 'public/images/icons/icon_analysis.svg';
import iconProjectsOngoing from 'public/images/icons/icon_clock.svg';
import iconProjectsCompleted from 'public/images/icons/icon_check.svg';

export const aboutMenuItems = [
    {
        title: 'About PionTech',
        href: '/about',
        description: 'Who we are & how we work',
        icon: iconAbout,
        colClass: 'col-lg-3 col-md-6'
    },
    {
        title: 'Clients',
        href: '/clients',
        description: 'Organisations we empower',
        icon: iconClients,
        colClass: 'col-lg-3 col-md-6'
    },
    {
        title: 'Technical Partners',
        href: '/partners',
        description: 'Leading vendors & alliances',
        icon: iconPartners,
        colClass: 'col-lg-3 col-md-6'
    },
    {
        title: 'Team',
        href: '/team',
        description: 'Meet the experts',
        icon: iconTeam,
        colClass: 'col-lg-3 col-md-6'
    },
    {
        title: 'Career',
        href: '/about#career',
        description: 'Join the PionTech team',
        icon: iconCareer,
        colClass: 'col-lg-3 col-md-6'
    }
];

export const servicesMenuItems = [
    {
        title: 'ICT Solutions, Systems & Hardware',
        href: '/service-single/ict-solutions-systems-and-hardware',
        description: 'End-to-end infrastructure services',
        icon: iconIct,
        colClass: 'col-lg-4 col-md-6'
    },
    {
        title: 'Integrated Security Solutions',
        href: '/service-single/integrated-security-solutions',
        description: 'Premise, perimeter & occupant safety',
        icon: iconSecurity,
        colClass: 'col-lg-4 col-md-6'
    },
    {
        title: 'Enterprise Applications',
        href: '/service-single/enterprise-applications',
        description: 'Process automation & visibility',
        icon: iconApplications,
        colClass: 'col-lg-4 col-md-6'
    },
    {
        title: 'Custom Software Solutions',
        href: '/service-single/custom-software-and-integration',
        description: 'Bespoke platforms & integrations',
        icon: iconCustomSoftware,
        colClass: 'col-lg-4 col-md-6'
    },
    {
        title: 'Telecommunication Solutions',
        href: '/service-single/telecommunication-solutions',
        description: 'Broadcast, spectrum & UTM platforms',
        icon: iconTelecom,
        colClass: 'col-lg-4 col-md-6'
    },
    {
        title: 'Power & Renewable Energy Solutions',
        href: '/service-single/power-and-renewable-energy',
        description: 'Solar, backup & efficiency programs',
        icon: iconPower,
        colClass: 'col-lg-4 col-md-6'
    },
    {
        title: 'Smart Facilities',
        href: '/service-single/smart-facilities-and-automation',
        description: 'Automation, safety & comfort systems',
        icon: iconSmart,
        colClass: 'col-lg-4 col-md-6'
    },
    {
        title: 'IoT Solutions',
        href: '/service-single/iot-solutions-and-remote-monitoring',
        description: 'Sensor-driven insight & automation',
        icon: iconIot,
        colClass: 'col-lg-4 col-md-6'
    },
    {
        title: 'Other ICT Solutions',
        href: '/service#other-ict',
        description: 'Additional services & capabilities',
        icon: iconOtherSolutions,
        colClass: 'col-lg-4 col-md-6'
    }
];

export const projectMenuItems = [
    {
        title: 'All Projects',
        href: '/portfolio',
        description: 'Browse the full project portfolio',
        icon: iconProjectsAll,
        colClass: 'col-lg-4 col-md-6'
    },
    {
        title: 'Ongoing Projects',
        href: '/portfolio#ongoing',
        description: 'Current implementations underway',
        icon: iconProjectsOngoing,
        colClass: 'col-lg-4 col-md-6'
    },
    {
        title: 'Completed Projects',
        href: '/portfolio#completed',
        description: 'Delivered case studies & success stories',
        icon: iconProjectsCompleted,
        colClass: 'col-lg-4 col-md-6'
    }
];

export const mobileMenuItems = [
    {
        title: 'Home',
        href: '/'
    },
    {
        title: 'About Us',
        href: '/about',
        submenu: aboutMenuItems
    },
    {
        title: 'Product & Services',
        href: '/service',
        submenu: servicesMenuItems
    },
    {
        title: 'Projects',
        href: '/portfolio',
        submenu: projectMenuItems
    },
    {
        title: 'Contact',
        href: '/contact'
    }
];

