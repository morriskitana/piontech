/**
 * Brand -> where to get its logo.
 *
 * domains : candidate official domains, tried in order (https://<d> then variants)
 * tokens  : words that must appear in the page title/og:site_name for the domain
 *           to be accepted as this brand. Guards against grabbing another company.
 * slugs   : simpleicons slugs to try (CC0 vector wordmarks - highest quality)
 * wiki    : English Wikipedia article title, used for the infobox-logo fallback
 * assets  : direct logo URLs on a vendor CDN, used before any page parsing
 * slug    : output filename stem, when it differs from the display name
 *
 * Keys match the partner names used in pages/partners/index.js.
 */
module.exports = {
    // ---------------------------------------------------------------- ICT
    'QNAP': { domains: ['qnap.com'], tokens: ['qnap'], slugs: ['qnap'], wiki: 'QNAP Systems' },
    'Hewlett Packard Enterprise': { domains: ['hpe.com'], tokens: ['hpe', 'hewlett'], slugs: ['hp', 'hewlettpackardenterprise'] },
    'ARISTA': { domains: ['arista.com'], tokens: ['arista'], slugs: ['arista', 'aristanetworks'], wiki: 'Arista Networks' },
    'BROADCOM': { domains: ['broadcom.com'], tokens: ['broadcom'], slugs: ['broadcom'], wiki: 'Broadcom Inc.' },
    'RingCentral': { domains: ['ringcentral.com'], tokens: ['ringcentral'], slugs: ['ringcentral'], wiki: 'RingCentral' },
    'SIEMON™': { domains: ['siemon.com'], tokens: ['siemon'], slugs: ['siemon'], slug: 'siemon' },
    'CISCO': { domains: ['cisco.com'], tokens: ['cisco'], slugs: ['cisco'], wiki: 'Cisco' },
    'D-Link': { domains: ['dlink.com'], tokens: ['d-link', 'dlink'], slugs: ['dlink'], wiki: 'D-Link' },
    'mimosa by Airspan': { domains: ['mimosa.com'], tokens: ['mimosa'], slugs: ['mimosa', 'mimosanetworks'], wiki: 'Mimosa Networks' },
    'UBIQUITI NETWORKS': { domains: ['ui.com', 'ubnt.com'], tokens: ['ubiquiti', 'ui.com'], slugs: ['ubiquiti'], wiki: 'Ubiquiti Inc.' },
    'ZYXEL NETWORKS': { domains: ['zyxel.com'], tokens: ['zyxel'], slugs: ['zyxel'], wiki: 'Zyxel' },
    'tp-link': { domains: ['tp-link.com'], tokens: ['tp-link', 'tplink'], slugs: ['tplink'], wiki: 'TP-Link' },
    'datto': { domains: ['datto.com'], tokens: ['datto'], slugs: ['datto'], wiki: 'Datto (company)' },
    'NETGEAR': { domains: ['netgear.com'], tokens: ['netgear'], slugs: ['netgear'], wiki: 'Netgear' },
    'CERAGON': { domains: ['ceragon.com'], tokens: ['ceragon'], slugs: ['ceragon'], wiki: 'Ceragon' },
    'aruba': { domains: ['aruba.com'], tokens: ['aruba'], slugs: ['aruba', 'arubanetworks'], wiki: 'Aruba Networks' },
    'freshdesk': { domains: ['freshdesk.com'], tokens: ['freshdesk'], slugs: ['freshdesk'], wiki: 'Freshdesk' },
    'Asterisk': { domains: ['asterisk.org'], tokens: ['asterisk'], slugs: ['asterisk'], wiki: 'Asterisk' },
    'Panasonic': { domains: ['panasonic.com'], tokens: ['panasonic'], slugs: ['panasonic'], wiki: 'Panasonic' },
    'SYSCOM DISTRIBUTIONS LLC': { domains: ['syscom.com'], tokens: ['syscom'], slugs: [] },

    // ------------------------------------------------------------ Security
    'ADAPTIVE RECOGNITION': { domains: ['adaptiverecognition.com'], tokens: ['adaptive', 'recognition'], slugs: [], wiki: 'Adaptive Recognition' },
    'Honeywell': { domains: ['honeywell.com'], tokens: ['honeywell'], slugs: ['honeywell'], wiki: 'Honeywell' },
    'AXIS': { domains: ['axis.com'], tokens: ['axis'], slugs: ['axis'], wiki: 'Axis Communications' },
    'Dahua TECHNOLOGY': { domains: ['dahuatech.com'], tokens: ['dahua'], slugs: ['dahuatechnology'], wiki: 'Dahua Technology' },
    'Dedrone': { domains: ['dedrone.com'], tokens: ['dedrone'], slugs: ['dedrone'], wiki: 'Dedrone' },
    'EVTRACK': { domains: ['evtrack.com'], tokens: ['evtrack'], slugs: [], wiki: 'EVTrack' },
    'leidos': { domains: ['leidos.com'], tokens: ['leidos'], slugs: ['leidos'], wiki: 'Leidos' },
    'RAFAEL': { domains: ['rafael.co.il'], tokens: ['rafael'], slugs: [], wiki: 'Rafael Advanced Defense Systems' },
    'suprema BIOMETRICS & SECURITY': { domains: ['supremaid.com'], tokens: ['suprema'], slugs: [], wiki: 'Suprema ID' },
    'viisights Intelligence by vision': { domains: ['viisights.com'], tokens: ['viisights'], slugs: [], wiki: 'Viisights' },
    'HIKVISION': { domains: ['hikvision.com'], tokens: ['hikvision'], slugs: ['hikvision'], wiki: 'Hikvision' },
    'iOmniscient High IQ Surveillance': { domains: ['iomniscient.com'], tokens: ['iomniscient', 'omniscient'], slugs: [], wiki: 'iOmniscient' },
    'FLIR': { domains: ['flir.com'], tokens: ['flir'], slugs: ['flir'], wiki: 'FLIR Systems' },
    'ASCENDENT': { domains: ['ascendentgroup.com'], tokens: ['ascendent'], slugs: [], wiki: 'Ascendent Technology Group' },
    'PatriotOne TECHNOLOGIES': { domains: ['patriot1tech.com', 'xtractone.com'], tokens: ['patriotone', 'patriot', 'xtractone'], slugs: [] },
    'Cortech Developments': { domains: ['cortech.co.uk'], tokens: ['cortech'], slugs: [] },
    'ProxerSafe®': { domains: ['proxersafe.com'], tokens: ['proxersafe'], slugs: [], slug: 'proxersafe' },

    // ---------------------------------------------------------- Enterprise
    'monday.com': { domains: ['monday.com'], tokens: ['monday'], slugs: ['monday'], wiki: 'Monday.com' },
    'onelogin': { domains: ['onelogin.com'], tokens: ['onelogin', 'one login'], slugs: ['onelogin'], wiki: 'OneLogin' },
    'DIGITAL REALTY': { domains: ['digitalrealty.com'], tokens: ['digital realty'], slugs: ['digitalrealty'], wiki: 'Digital Realty' },
    'CORESITE': { domains: ['coresite.com'], tokens: ['coresite'], slugs: [], wiki: 'CoreSite' },
    'HoduSoft': { domains: ['hodusoft.com'], tokens: ['hodusoft'], slugs: [], wiki: 'HoduSoft' },
    'Trackplan': { domains: ['trackplan.com'], tokens: ['trackplan'], slugs: [], wiki: 'Trackplan' },
    'TELTONIKA': { domains: ['teltonika.com'], tokens: ['teltonika'], slugs: ['teltonika'], wiki: 'Teltonika' },
    'CHINA TELECOM': { domains: ['chinatelecom.com.cn', 'chinatelecomglobal.com'], tokens: ['china telecom'], slugs: ['chinatelecom'], wiki: 'China Telecom' },
    'KIOUDIP': { domains: ['kloudip.com'], tokens: ['kloudip', 'kLOUDip', 'koudip'], slugs: [], wiki: 'KLOUDIP' },

    // --------------------------------------------------------- Telecom
    'XENTAURIX': { domains: ['xentaurix.com'], tokens: ['xentaurix'], slugs: [], wiki: 'Xentaurix' },
    'ATDI': { domains: ['atdi.com'], tokens: ['atdi'], slugs: [], wiki: 'ATDI' },
    'ROHDE&SCHWARZ': { domains: ['rohde-schwarz.com'], tokens: ['rohde', 'schwarz'], slugs: ['rohdeandschwarz'], wiki: 'Rohde & Schwarz' },
    'TEOCO': { domains: ['teoco.com'], tokens: ['teoco'], slugs: ['teoco'], wiki: 'Teoco' },
    'Hytera': { domains: ['hytera.com'], tokens: ['hytera'], slugs: ['hytera'], wiki: 'Hytera' },
    'EQUINIX': { domains: ['equinix.com'], tokens: ['equinix'], slugs: ['equinix'], wiki: 'Equinix' },
    'LS/telcom': { domains: ['lstelcom.com'], tokens: ['lstelcom', 'ls/telcom', 'telcom'], slugs: [] },
    'ACTUS Monitor. Verify. Repurpose.': {
        domains: ['actusdigital.com'],
        tokens: ['actus', 'monitor', 'actusdigital'],
        slugs: [],
        slug: 'actus-monitor'
    },
    'Ovaview MEDIA MONITORING & ANALYSIS': {
        domains: ['ovaviewanalytics.com', 'ovaviewmonitoring.com'],
        tokens: ['ovaview'],
        slugs: [],
        slug: 'ovaview'
    },

    // ------------------------------------------------------------- Power
    'BENNING': { domains: ['benning.de', 'benning.com'], tokens: ['benning'], slugs: ['benning'], wiki: 'Benning' },
    'SOKOYO': { domains: ['sokoyo.com'], tokens: ['sokoyo'], slugs: [], wiki: 'Sokoyo' },
    'BYD': { domains: ['byd.com'], tokens: ['byd'], slugs: ['byd'], wiki: 'BYD Auto' },
    'victron energy': { domains: ['victronenergy.com'], tokens: ['victron'], slugs: ['victronenergy'], wiki: 'Victron Energy' },

    // --------------------------------------------------- Smart facilities
    // UrsaLink merged into Milesight (Dec 2020) and now trades under that brand,
    // so ursalink.com redirects to milesight.com - same company, same logo.
    'URSALINK': { domains: ['milesight.com'], tokens: ['milesight'], slugs: [], wiki: 'Milesight' },
    'my Devices': {
        domains: ['mydevices.com', 'status.mydevices.com'],
        tokens: ['mydevices', 'my devices'],
        slugs: [],
        wiki: 'MyDevices',
        assets: ['https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/149257/myDevices2019-logo-black.png']
    },
    'Telit': { domains: ['telit.com'], tokens: ['telit'], slugs: ['telit'], wiki: 'Telit' },
    'Milesight': { domains: ['milesight.com'], tokens: ['milesight'], slugs: [], wiki: 'Milesight' },
    'LoRaWAN': { domains: ['lora-alliance.org'], tokens: ['lora'], slugs: ['lorawan'], wiki: 'LoRa' },
    'THE THINGS NETWORK': { domains: ['thethingsnetwork.org'], tokens: ['things network'], slugs: [], wiki: 'The Things Network' },

    // ------------------------------------------------------------- Other
    'logitech': { domains: ['logitech.com'], tokens: ['logitech'], slugs: ['logitech'], wiki: 'Logitech' },
    'Microsoft': { domains: ['microsoft.com'], tokens: ['microsoft'], slugs: ['microsoft'], wiki: 'Microsoft' },
    'Lenovo': { domains: ['lenovo.com'], tokens: ['lenovo'], slugs: ['lenovo'], wiki: 'Lenovo' },
    'Google Workspace': { domains: ['workspace.google.com'], tokens: ['workspace', 'google'], slugs: ['googleworkspace'], wiki: 'Google Workspace' },
    'kaspersky': { domains: ['kaspersky.com'], tokens: ['kaspersky'], slugs: ['kaspersky'], wiki: 'Kaspersky Lab' },
    'Yeastar': { domains: ['yeastar.com'], tokens: ['yeastar'], slugs: ['yeastar'], wiki: 'Yeastar' },
    'SONY': { domains: ['sony.com'], tokens: ['sony'], slugs: ['sony'], wiki: 'Sony' },
    'poly': { domains: ['poly.com'], tokens: ['poly'], slugs: ['poly'], wiki: 'Poly (company)' },
    'SAMSUNG': { domains: ['samsung.com'], tokens: ['samsung'], slugs: ['samsung'], wiki: 'Samsung' },
    'LG': { domains: ['lg.com'], tokens: ['lg'], slugs: ['lg'], wiki: 'LG Corporation' },
    'Hisense': { domains: ['hisense.com'], tokens: ['hisense'], slugs: ['hisense'], wiki: 'Hisense' }
};
