/**
 * Per-service detail photography.
 *
 * Every service detail page used to render the same four placeholder photos
 * (service_details_image_1..4), so all eight service pages looked identical.
 * Each service line now owns a hero banner plus three gallery tiles that are
 * sourced for that specific subject.
 *
 * Filenames follow the service slug from api/service.js:
 *   public/images/services/service_details_<slug>_1.webp  wide hero  (2580x1200)
 *   public/images/services/service_details_<slug>_2.webp  tile      (820x820)
 *   public/images/services/service_details_<slug>_3.webp  tile      (820x820)
 *   public/images/services/service_details_<slug>_4.webp  tile      (820x820)
 */
import ictHero from 'public/images/services/service_details_ict-solutions-systems-and-hardware_1.webp'
import ictTile1 from 'public/images/services/service_details_ict-solutions-systems-and-hardware_2.webp'
import ictTile2 from 'public/images/services/service_details_ict-solutions-systems-and-hardware_3.webp'
import ictTile3 from 'public/images/services/service_details_ict-solutions-systems-and-hardware_4.webp'

import secHero from 'public/images/services/service_details_integrated-security-solutions_1.webp'
import secTile1 from 'public/images/services/service_details_integrated-security-solutions_2.webp'
import secTile2 from 'public/images/services/service_details_integrated-security-solutions_3.webp'
import secTile3 from 'public/images/services/service_details_integrated-security-solutions_4.webp'

import appHero from 'public/images/services/service_details_enterprise-applications_1.webp'
import appTile1 from 'public/images/services/service_details_enterprise-applications_2.webp'
import appTile2 from 'public/images/services/service_details_enterprise-applications_3.webp'
import appTile3 from 'public/images/services/service_details_enterprise-applications_4.webp'

import swHero from 'public/images/services/service_details_custom-software-and-integration_1.webp'
import swTile1 from 'public/images/services/service_details_custom-software-and-integration_2.webp'
import swTile2 from 'public/images/services/service_details_custom-software-and-integration_3.webp'
import swTile3 from 'public/images/services/service_details_custom-software-and-integration_4.webp'

import telHero from 'public/images/services/service_details_telecommunication-solutions_1.webp'
import telTile1 from 'public/images/services/service_details_telecommunication-solutions_2.webp'
import telTile2 from 'public/images/services/service_details_telecommunication-solutions_3.webp'
import telTile3 from 'public/images/services/service_details_telecommunication-solutions_4.webp'

import pwrHero from 'public/images/services/service_details_power-and-renewable-energy_1.webp'
import pwrTile1 from 'public/images/services/service_details_power-and-renewable-energy_2.webp'
import pwrTile2 from 'public/images/services/service_details_power-and-renewable-energy_3.webp'
import pwrTile3 from 'public/images/services/service_details_power-and-renewable-energy_4.webp'

import smtHero from 'public/images/services/service_details_smart-facilities-and-automation_1.webp'
import smtTile1 from 'public/images/services/service_details_smart-facilities-and-automation_2.webp'
import smtTile2 from 'public/images/services/service_details_smart-facilities-and-automation_3.webp'
import smtTile3 from 'public/images/services/service_details_smart-facilities-and-automation_4.webp'

import iotHero from 'public/images/services/service_details_iot-solutions-and-remote-monitoring_1.webp'
import iotTile1 from 'public/images/services/service_details_iot-solutions-and-remote-monitoring_2.webp'
import iotTile2 from 'public/images/services/service_details_iot-solutions-and-remote-monitoring_3.webp'
import iotTile3 from 'public/images/services/service_details_iot-solutions-and-remote-monitoring_4.webp'

const ServiceImages = {
    'ict-solutions-systems-and-hardware': {
        hero: ictHero,
        tiles: [ictTile1, ictTile2, ictTile3]
    },
    'integrated-security-solutions': {
        hero: secHero,
        tiles: [secTile1, secTile2, secTile3]
    },
    'enterprise-applications': {
        hero: appHero,
        tiles: [appTile1, appTile2, appTile3]
    },
    'custom-software-and-integration': {
        hero: swHero,
        tiles: [swTile1, swTile2, swTile3]
    },
    'telecommunication-solutions': {
        hero: telHero,
        tiles: [telTile1, telTile2, telTile3]
    },
    'power-and-renewable-energy': {
        hero: pwrHero,
        tiles: [pwrTile1, pwrTile2, pwrTile3]
    },
    'smart-facilities-and-automation': {
        hero: smtHero,
        tiles: [smtTile1, smtTile2, smtTile3]
    },
    'iot-solutions-and-remote-monitoring': {
        hero: iotHero,
        tiles: [iotTile1, iotTile2, iotTile3]
    }
};

export default ServiceImages;
