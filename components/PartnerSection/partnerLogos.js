/**
 * Brand artwork for the partners wall.
 *
 * Every entry is a real brand logo supplied in `public/images/clients`. Logos are
 * matched to partners by a normalised form of the partner name (lowercased,
 * punctuation removed), so 'Picus Security', 'picus security' and 'PicusSecurity'
 * all resolve to the same artwork.
 *
 * invert: true - the brand publishes white artwork for dark backgrounds. On the
 *              light partner tile the artwork is inverted so it stays legible.
 * icon:   true - a square app-style mark rather than a horizontal wordmark, so
 *              it is scaled down to sit comfortably beside the wordmarks.
 */

import ajaxSystems from 'public/images/clients/ajax-systems.png';
import alliedTelesis from 'public/images/clients/allied-telesis.png';
import aratek from 'public/images/clients/aratek.png';
import barracuda from 'public/images/clients/barracuda.png';
import binalyze from 'public/images/clients/binalyze.png';
import blueiot from 'public/images/clients/blueiot.png';
import cryotos from 'public/images/clients/cryotos.png';
import daosafe from 'public/images/clients/daosafe.png';
import droneDetection from 'public/images/clients/drone-detection-system.png';
import eisenvault from 'public/images/clients/eisenvault.png';
import elefineTech from 'public/images/clients/elefine-tech.png';
import extremeNetworks from 'public/images/clients/extreme-networks.png';
import forescout from 'public/images/clients/forescout.png';
import h3c from 'public/images/clients/h3c.png';
import huawei from 'public/images/clients/huawei.png';
import iflytek from 'public/images/clients/iflytek.png';
import inmarsat from 'public/images/clients/inmarsat.png';
import ioco from 'public/images/clients/ioco.png';
import juniperNetworks from 'public/images/clients/juniper-networks.png';
import lastLineSolutions from 'public/images/clients/last-line-solutions.png';
import logsign from 'public/images/clients/logsign.png';
import meshPlusPlus from 'public/images/clients/mesh-plus-plus.png';
import mindfireSolutions from 'public/images/clients/mindfire-solutions.png';
import nordenCommunication from 'public/images/clients/norden-communication.png';
import picusSecurity from 'public/images/clients/picus-security.png';
import qburst from 'public/images/clients/qburst.png';
import segura from 'public/images/clients/segura.png';
import sharedocs from 'public/images/clients/sharedocs.png';
import shoghiCommunications from 'public/images/clients/shoghi-communications.png';
import sonicwall from 'public/images/clients/sonicwall.png';
import synology from 'public/images/clients/synology.png';
import tanium from 'public/images/clients/tanium.png';
import tigerwong from 'public/images/clients/tigerwong.png';
import tsingoal from 'public/images/clients/tsingoal.png';
import unilumin from 'public/images/clients/unilumin.png';
import vectraAi from 'public/images/clients/vectra-ai.png';
import vezeAutoDoor from 'public/images/clients/veze-auto-door.png';
import watchguard from 'public/images/clients/watchguard.png';
import wiiParking from 'public/images/clients/wii-parking.png';
import wisestamp from 'public/images/clients/wisestamp.png';
import xfusion from 'public/images/clients/xfusion.png';
import zkteco from 'public/images/clients/zkteco.png';
























export const partnerLogos = {
    // Integrated security
    ajaxsystems: { src: ajaxSystems },
    aratek: { src: aratek },
    barracuda: { src: barracuda, invert: true },
    cryotos: { src: cryotos },
    dronedetectionsystem: { src: droneDetection, icon: true },
    forescout: { src: forescout },
    logsign: { src: logsign },
    picussecurity: { src: picusSecurity, invert: true },
    qburst: { src: qburst, invert: true },
    segura: { src: segura },
    shoghi: { src: shoghiCommunications },
    sonicwall: { src: sonicwall },
    tanium: { src: tanium },
    tigerwong: { src: tigerwong },
    vectraai: { src: vectraAi },
    vezeautodoor: { src: vezeAutoDoor, icon: true },
    watchguard: { src: watchguard },
    wisestamp: { src: wisestamp, invert: true },
    daosafe: { src: daosafe, invert: true },
    zkteco: { src: zkteco },

    // ICT solutions, systems and hardware
    alliedtelesis: { src: alliedTelesis },
    eisenvault: { src: eisenvault },
    elefinetech: { src: elefineTech },
    extremenetworks: { src: extremeNetworks },
    h3c: { src: h3c },
    huawei: { src: huawei },
    iflytek: { src: iflytek },
    ioco: { src: ioco, icon: true },
    junipernetworks: { src: juniperNetworks },
    synology: { src: synology },
    unilumin: { src: unilumin },
    xfusion: { src: xfusion },

    // Telecommunication
    binalyze: { src: binalyze, invert: true },
    inmarsat: { src: inmarsat },
    lastlinesolutions: { src: lastLineSolutions },
    nordencommunication: { src: nordenCommunication },

    // Enterprise applications
    mindfiresolutions: { src: mindfireSolutions },
    sharedocs: { src: sharedocs },
    wiiparking: { src: wiiParking },

    // Smart facilities
    blueiot: { src: blueiot },
    mesh: { src: meshPlusPlus, invert: true },
    tsingoal: { src: tsingoal, icon: true },












































};

export const normalisePartnerName = (value) =>
    value.toLowerCase().replace(/[^a-z0-9]/g, '');

export const findPartnerLogo = (partnerName) =>
    partnerLogos[normalisePartnerName(partnerName)] || null;

/**
 * Initials used on the placeholder tile for partners we have no artwork for.
 */
export const partnerMonogram = (partnerName) => {
    const trimmed = partnerName.trim();
    const words = trimmed.replace(/[^A-Za-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);

    if (words.length > 1) {
        return words
            .slice(0, 2)
            .map((word) => word[0])
            .join('')
            .toUpperCase();
    }

    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    }

    // Names without Latin characters (e.g. 中国电信) keep their first two glyphs.
    return Array.from(trimmed).slice(0, 2).join('');
};
