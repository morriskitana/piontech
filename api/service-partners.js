const getPartnerFolder = (slug) => {
  const map = {
    'ict-solutions-systems-and-hardware': 'ict solutions',
    'integrated-security-solutions': 'integrated security',
    'enterprise-applications': 'enterprise applications',
    'custom-software-and-integration': 'custom software',
    'telecommunication-solutions': 'telecommunication',
    'power-and-renewable-energy': 'power energy',
    'smart-facilities-and-automation': 'smart facilities automation',
    'iot-solutions-and-remote-monitoring': 'iot solutions',
  };
  return map[slug] || '';
};

export const makePartners = (slug, extraGroups = []) => {
  const folder = getPartnerFolder(slug);
  const group = (title, nums) => ({
    title,
    logos: folder
      ? nums.map(n => ({
          src: `/images/partners/${folder}/partner_logo_${n}.webp`,
          alt: `Partner Logo ${n}`,
        }))
      : [],
  });

  return [
    group('Technology Partners', [4, 18, 27, 29]),
    group('Solutions Partners', [22, 23, 38]),
    ...extraGroups,
  ];
};
