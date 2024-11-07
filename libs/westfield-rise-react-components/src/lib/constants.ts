export type THEMES =
  | 'peacock'
  | 'ultraviolet'
  | 'candy'
  | 'scarlet'
  | 'canary'
  | 'tangerine';

export const ACCORDION_ITEMS = [
  {
    header: 'What is Lorem Ipsum?',
    content: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value:
                'Malesuada cursus maecenas at neque lobortis euismod et. Ac lectus quis adipiscing volutpat sed elementum in. Id adipiscing placerat lectus mattis turpis vitae congue sit tristique. Gravida feugiat tempus ut leo aenean sit orci. Nisl amet iaculis pulvinar consequat senectus sed egestas vestibulum. Vitae lacus ut non maecenas faucibus tristique. ',
              marks: [],
              data: {},
            },
            {
              nodeType: 'hyperlink',
              data: {
                uri: 'https://somelink.com',
              },
              content: [
                {
                  nodeType: 'text',
                  value: 'Sodales',
                  marks: [],
                  data: {},
                },
              ],
            },
            {
              nodeType: 'text',
              value:
                ' proin ullamcorper condimentum in. Turpis dis cursus enim viverra condimentum tempus. ',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
  },
  {
    header: 'Where does it come from?',
    content: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value:
                'Malesuada cursus maecenas at neque lobortis euismod et. Ac lectus quis adipiscing volutpat sed elementum in. Id adipiscing placerat lectus mattis turpis vitae congue sit tristique. Gravida feugiat tempus ut leo aenean sit orci. Nisl amet iaculis pulvinar consequat senectus sed egestas vestibulum. Vitae lacus ut non maecenas faucibus tristique. ',
              marks: [],
              data: {},
            },
            {
              nodeType: 'hyperlink',
              data: {
                uri: 'https://somelink.com',
              },
              content: [
                {
                  nodeType: 'text',
                  value: 'Sodales',
                  marks: [],
                  data: {},
                },
              ],
            },
            {
              nodeType: 'text',
              value:
                ' proin ullamcorper condimentum in. Turpis dis cursus enim viverra condimentum tempus. ',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
  },
  {
    header: 'Why do we use it?',
    content: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value:
                'Malesuada cursus maecenas at neque lobortis euismod et. Ac lectus quis adipiscing volutpat sed elementum in. Id adipiscing placerat lectus mattis turpis vitae congue sit tristique. Gravida feugiat tempus ut leo aenean sit orci. Nisl amet iaculis pulvinar consequat senectus sed egestas vestibulum. Vitae lacus ut non maecenas faucibus tristique. ',
              marks: [],
              data: {},
            },
            {
              nodeType: 'hyperlink',
              data: {
                uri: 'https://somelink.com',
              },
              content: [
                {
                  nodeType: 'text',
                  value: 'Sodales',
                  marks: [],
                  data: {},
                },
              ],
            },
            {
              nodeType: 'text',
              value:
                ' proin ullamcorper condimentum in. Turpis dis cursus enim viverra condimentum tempus. ',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
  },
];

export const IMAGE_TEXT_DEFAULT = {
  type: 'default',
  title: 'Experiential',
  subtitle: 'Lorem Ipsum',
  text: 'Cras eget eget mauris sagittis sit egestas vitae at. Orci pellentesque eu sem lacus sagittis mauris ut quis. Vel nibh neque egestas dictum. Eget quis faucibus fringilla praesent a magnis.',
  ctaProps: {
    label: 'More information',
    href: 'linktomoreinfo.com',
  },
};

const IMAGE_STATISTIC = {
  text: 'Cras eget eget mauris sagittis sit egestas vitae at. Orci pellentesque eu sem lacus sagittis mauris ut quis. Vel nibh neque egestas dictum. Eget quis faucibus fringilla praesent a magnis.',
  image: {
    src: 'https://placehold.co/630x430',
    alt: 'Default image',
  },
  ctaProps: {
    label: 'More information',
    href: 'linktomoreinfo.com',
    isExternal: false,
  },
  statisticsList: [
    {
      text: 'Annual visits (europe)',
      referenceNumber: 1,
      valuePrefix: '+',
      value: 700,
      valueSuffix: 'Mn',
    },
    {
      text: 'Campaigns  Delivered',
      referenceNumber: 2,
      valuePrefix: '+',
      value: 1000,
      valueSuffix: '',
    },
    {
      text: 'Campaigns  Delivered',
      referenceNumber: 3,
      valuePrefix: '+',
      value: 45,
      valueSuffix: '',
    },
  ],
  brandName: 'Samsung',
};

export const IMAGE_STATISTICS_DEFAULT = {
  title: 'Experiential',
  caseStudyList: [IMAGE_STATISTIC, IMAGE_STATISTIC, IMAGE_STATISTIC],
};

export const IMAGE_TEXT_LIST_DEFAULT = [
  IMAGE_TEXT_DEFAULT,
  IMAGE_TEXT_DEFAULT,
  IMAGE_TEXT_DEFAULT,
];

export const IMAGE_TEXT_PEOPLE = {
  type: 'people',
  name: 'Caroline White',
  role: 'Managing Director',
  subtitle: 'Lorem Ipsum',
  text: 'Cras eget eget mauris sagittis sit egestas vitae at. Orci pellentesque eu sem lacus sagittis mauris ut quis. Vel nibh neque egestas dictum. Eget quis faucibus fringilla praesent a magnis.',
  ctaProps: {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    isExternal: true,
  },
  image: {
    src: 'https://generation-sessions.s3.amazonaws.com/7b450061e3961126dfea9726c4d79e6f/img/image.png',
    alt: 'Photo of Caroline White',
  },
};

export const IMAGE_TEXT_LIST_PEOPLE = [
  IMAGE_TEXT_PEOPLE,
  IMAGE_TEXT_PEOPLE,
  IMAGE_TEXT_PEOPLE,
];

export const CASE_STUDY_CARD = {
  type: 'case-study',
  image: {
    src: 'https://via.placeholder.com/340x300',
    alt: 'Placeholder Image',
  },
  brandName: 'Samsung',
  value: '+40%',
  title: 'Increase in awareness',
  text: 'Cras eget eget mauris sagittis sit egestas vitae at. Orci pellentesque eu sem mauris.',
};

export const INSIGHT_CARD = {
  type: 'insight',
  title: 'Our insider tip this summer: surfing in Vienna',
  image: {
    src: 'https://via.placeholder.com/340x340',
    alt: 'Placeholder Image',
  },
};

export const SERVICE_CARD = {
  type: 'service',
  title: 'Brand Experience',
  text: 'Cras eget eget mauris sagittis sit egestas vitae at. Orci pellentesque eu sem lacus sagittis mauris ut quis. Vel nibh neque egestas dictum. Eget quis faucibus fringilla praesent a magnis.',
  image: {
    src: 'https://via.placeholder.com/340x227',
    alt: 'Placeholder Image',
  },
  ctaProps: {
    href: 'brandexperience',
    title: 'Read more',
  },
};

export const CASE_STUDY_CARD_LIST = [
  CASE_STUDY_CARD,
  CASE_STUDY_CARD,
  CASE_STUDY_CARD,
];
export const INSIGHT_CARD_LIST = [INSIGHT_CARD, INSIGHT_CARD, INSIGHT_CARD];
export const SERVICE_CARD_LIST = [SERVICE_CARD, SERVICE_CARD, SERVICE_CARD];

export const IMAGE_CAROUSEL_LIST = [
  {
    src: 'https://images.ctfassets.net/tvi9upeknft2/4kjWuUwInqNae6o1l8Em5H/93a903974b33bf8320924605590b0183/Southern_Terrace_Totem_-_WL.jpeg',
    alt: 'Default image',
    textContainer: {
      textLeft: 'Attention-grabbing advertising space',
      textRight:
        'The innovative 360° infinity display is the ideal space for your brand presentation and product staging',
    },
  },
  {
    src: 'https://images.ctfassets.net/tvi9upeknft2/4kjWuUwInqNae6o1l8Em5H/93a903974b33bf8320924605590b0183/Southern_Terrace_Totem_-_WL.jpeg',
    alt: 'Default image',
    textContainer: {
      textLeft: 'Attention-grabbing advertising space',
      textRight:
        'The innovative 360° infinity display is the ideal space for your brand presentation and product staging',
    },
  },
  {
    src: 'https://images.ctfassets.net/tvi9upeknft2/4kjWuUwInqNae6o1l8Em5H/93a903974b33bf8320924605590b0183/Southern_Terrace_Totem_-_WL.jpeg',
    alt: 'Default image',
    textContainer: {
      textLeft: 'Attention-grabbing advertising space',
      textRight:
        'The innovative 360° infinity display is the ideal space for your brand presentation and product staging',
    },
  },
];

export const PEOPLE_CAROUSEL_LIST = [
  {
    src: 'https://generation-sessions.s3.amazonaws.com/60d30761898ec601a94ee08f30a2e11f/img/image-18.png',
    alt: 'Default person',
    textContainer: {
      textLeft: 'Caroline White, Managing Director',
    },
  },
  {
    src: 'https://generation-sessions.s3.amazonaws.com/60d30761898ec601a94ee08f30a2e11f/img/image-18.png',
    alt: 'Default person',
    textContainer: {
      textLeft: 'Caroline White, Managing Director',
    },
  },
  {
    src: 'https://generation-sessions.s3.amazonaws.com/60d30761898ec601a94ee08f30a2e11f/img/image-18.png',
    alt: 'Default person',
    textContainer: {
      textLeft: 'Caroline White, Managing Director',
    },
  },
];

export const NEWS_INSIGHTS_LIST = [
  {
    src: 'https://images.ctfassets.net/tvi9upeknft2/5cdaOKTydUqTtCLlekAxhD/f2b68bddb230b98d1e0ec6ebd00aadbf/our-vision.jpg',
    alt: 'News & insights',
    textContainer: {
      textLeft:
        'Neque in aenean amet viverra mattis eu ultricies vehicula nibh volutpat elit.',
      textRight: '27 January 2023',
    },
  },
  {
    src: 'https://images.ctfassets.net/tvi9upeknft2/5cdaOKTydUqTtCLlekAxhD/f2b68bddb230b98d1e0ec6ebd00aadbf/our-vision.jpg',
    alt: 'News & insights',
    textContainer: {
      textLeft:
        'Neque in aenean amet viverra mattis eu ultricies vehicula nibh volutpat elit.',
      textRight: '27 January 2023',
    },
  },
  {
    src: 'https://images.ctfassets.net/tvi9upeknft2/5cdaOKTydUqTtCLlekAxhD/f2b68bddb230b98d1e0ec6ebd00aadbf/our-vision.jpg',
    alt: 'News & insights',
    textContainer: {
      textLeft:
        'Neque in aenean amet viverra mattis eu ultricies vehicula nibh volutpat elit.',
      textRight: '27 January 2023',
    },
  },
];

export const STATISTICS_LIST = [
  {
    text: 'Countries across THE GLOBE',
    valuePrefix: '',
    value: 12,
    valueSuffix: '',
  },
  {
    text: 'Annual visits (europe)',
    referenceNumber: 1,
    valuePrefix: '+',
    value: 700,
    valueSuffix: 'Mn',
  },
  {
    text: 'Campaigns  Delivered',
    referenceNumber: 2,
    valuePrefix: '+',
    value: 1000,
    valueSuffix: '',
  },
];

export const DESCRIPTION_LIST = [
  {
    referenceNumber: 1,
    text: 'Vestibulum vitae ullamcorper turpis. Praesent ultricies urna non dui congue, sit amet semper diam finibus eu urna suscipit. Vestibulum vitae ullamcorper turpis. Praesent ultricies urna non dui congue, sit amet semper diam finibus eu urna suscipit.Vestibulum',
  },
  {
    referenceNumber: 2,
    text: 'Vestibulum vitae ullamcorper turpis. Praesent ultricies urna non dui congue, sit amet semper diam finibus eu urna suscipit. Vestibulum vitae ullamcorper turpis. Praesent ultricies urna non dui congue, sit amet semper diam finibus eu urna suscipit.Vestibulum',
  },
];

export const LOGO_LIST = [
  {
    src: '/src/lib/assets/img/logo-chanel.png',
    alt: 'Chanel logo',
  },
  {
    src: '/src/lib/assets/img/logo-clearpay.png',
    alt: 'Clearpay logo',
  },
  {
    src: '/src/lib/assets/img/logo-coca-cola.png',
    alt: 'Coca Cola logo',
  },
  {
    src: '/src/lib/assets/img/logo-coty.png',
    alt: 'Coty logo',
  },
  {
    src: '/src/lib/assets/img/logo-disney.png',
    alt: 'Disney logo',
  },
  {
    src: '/src/lib/assets/img/logo-amazon.png',
    alt: 'Amazon logo',
  },
];

export const FOOTER_VALUES = {
  logoText: 'Your Vision, Our Stage',
  mottoText: 'Creating sustainable places that reinvent being together.',
  copyRight: '© 2023 Westfield Rise',
  linkList: [
    {
      href: 'linktolegal',
      title: 'Legal Notices',
    },
    {
      href: 'linktoprivacy',
      title: 'Privacy Policies',
    },
    {
      href: 'linktocookie',
      title: 'Cookie Policies',
    },
  ],
};

const LOCATION = {
  locationName: 'Wien',
  centerAddress: 'Westfield Donau Zentrum',
  href: 'http://linktolocation.com',
};

export const REGIONS_LIST = [
  {
    name: 'United States',
    image: {
      src: '/src/lib/assets/img/map-US.png',
      alt: 'United States',
    },
    imageMobile: {
      src: '/src/lib/assets/img/map-US-mobile.png',
      alt: 'United States',
    },
    imageTablet: {
      src: '/src/lib/assets/img/map-US-tablet.png',
      alt: 'United States',
    },
    areasList: [
      {
        areaName: 'East Coast',
        locationsList: [LOCATION, LOCATION, LOCATION, LOCATION],
      },
      {
        areaName: 'Central',
        locationsList: [LOCATION, LOCATION, LOCATION, LOCATION, LOCATION],
      },
      {
        areaName: 'West Coast',
        locationsList: [LOCATION],
      },
    ],
  },
  {
    name: 'Europe Central',
    image: {
      src: '/src/lib/assets/img/map-EU-Central.png',
      alt: 'Europe Central',
    },
    imageMobile: {
      src: '/src/lib/assets/img/map-EU-Central-mobile.png',
      alt: 'Europe Central',
    },
    imageTablet: {
      src: '/src/lib/assets/img/map-EU-Central-tablet.png',
      alt: 'United States',
    },
    areasList: [
      {
        areaName: 'France',
        locationsList: [
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
        ],
      },
      {
        areaName: 'Germany',
        locationsList: [LOCATION, LOCATION],
      },
      {
        areaName: 'Austria',
        locationsList: [LOCATION, LOCATION, LOCATION],
      },
    ],
  },
  {
    name: 'Europe Eastern',
    image: {
      src: '/src/lib/assets/img/map-EU-Eastern.png',
      alt: 'Europe Central',
    },
    imageMobile: {
      src: '/src/lib/assets/img/map-EU-Eastern-mobile.png',
      alt: 'Europe Central',
    },
    imageTablet: {
      src: '/src/lib/assets/img/map-EU-Eastern-tablet.png',
      alt: 'United States',
    },
    areasList: [
      {
        areaName: 'France',
        locationsList: [
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
        ],
      },
      {
        areaName: 'Germany',
        locationsList: [LOCATION, LOCATION],
      },
      {
        areaName: 'Austria',
        locationsList: [LOCATION, LOCATION, LOCATION],
      },
    ],
  },
  {
    name: 'Europe Southern',
    image: {
      src: '/src/lib/assets/img/map-EU-Southern.png',
      alt: 'Europe Central',
    },
    imageMobile: {
      src: '/src/lib/assets/img/map-EU-Southern-mobile.png',
      alt: 'Europe Central',
    },
    imageTablet: {
      src: '/src/lib/assets/img/map-EU-Southern-tablet.png',
      alt: 'United States',
    },
    areasList: [
      {
        areaName: 'France',
        locationsList: [
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
        ],
      },
      {
        areaName: 'Germany',
        locationsList: [LOCATION, LOCATION],
      },
      {
        areaName: 'Austria',
        locationsList: [LOCATION, LOCATION, LOCATION],
      },
    ],
  },
  {
    name: 'Europe Northern',
    image: {
      src: '/src/lib/assets/img/map-EU-Northern.png',
      alt: 'Europe Central',
    },
    imageMobile: {
      src: '/src/lib/assets/img/map-EU-Northern-mobile.png',
      alt: 'Europe Central',
    },
    imageTablet: {
      src: '/src/lib/assets/img/map-EU-Northern-tablet.png',
      alt: 'United States',
    },
    areasList: [
      {
        areaName: 'France',
        locationsList: [
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
        ],
      },
      {
        areaName: 'Germany',
        locationsList: [LOCATION, LOCATION],
      },
      {
        areaName: 'Austria',
        locationsList: [LOCATION, LOCATION, LOCATION],
      },
    ],
  },
  {
    name: 'Europe UK',
    image: {
      src: '/src/lib/assets/img/map-EU-UK.png',
      alt: 'Europe Central',
    },
    imageMobile: {
      src: '/src/lib/assets/img/map-EU-UK-mobile.png',
      alt: 'Europe Central',
    },
    imageTablet: {
      src: '/src/lib/assets/img/map-EU-UK-tablet.png',
      alt: 'United States',
    },
    areasList: [
      {
        areaName: 'France',
        locationsList: [
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
          LOCATION,
        ],
      },
      {
        areaName: 'Germany',
        locationsList: [LOCATION, LOCATION],
      },
      {
        areaName: 'Austria',
        locationsList: [LOCATION, LOCATION, LOCATION],
      },
    ],
  },
];

export const INFO_LIST = [
  {
    key: 'Centre',
    fact: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Key fact detail estibulum vitae ullamcorper turpis',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
  },
  {
    key: 'Country',
    fact: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Key fact detail estibulum vitae ullamcorper turpis',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
  },
  {
    key: 'Objectives',
    fact: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Key fact detail estibulum vitae ullamcorper turpis',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
  },
];

export const REFERENCE_POINT_LIST = [
  'Responsible for the contents of these web pages',
  'Manager',
  'Supervisory authority',
  'Contact',
  'Concept, design, production',
  'Disclaimer',
  'Privacy',
];
