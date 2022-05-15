import React from 'react';

export const Messages = {
  forms: {
    validationError: {
      message: 'form not satisfied, <== waiting to change this tho ',
      title: 'Validation Error',
      pickKid: 'choose at least one',
      pickOne: 'choose one',
      empty: "can't be empty",
      invalidValue: 'invalid value',
    },
  },
  requests: {
    serverError: {
      title: 'Server Error',
      message: (
        <div>
          <p>Ooops, we couldn't complete your request.</p>
          <p> Please try again. </p>
        </div>
      ),
    },
    userNotVerified: {
      title: 'Unauthorized Session',
      message: 'Email not verified, check your mail to verify',
    },
  },
};

export const Interests = [
  'languages',
  'technology',
  'sport&fitness',
  'travel',
  'music',
  'photography',
  'arts',
  'food&drink',
];

export const AgeGroupIcons = {
  baby: 'icon-hmv-baby',
  toddler: 'icon-hmv-socks',
  primary: 'icon-hmv-apple',
  lowerElementary: 'icon-hmv-lower-elem',
  upperElementary: 'icon-hmv-pen',
  juniorHigh: 'icon-hmv-scroll',
  seniorHigh: 'icon-hmv-graduation',
};

export const Colors = {
  pink: '#F8ADD0',
  blue: '#ACF6F9',
  yellow: '#FFDA00',
  white: '#ffffff',
  grey: '#D4D4D4',
};

export const Days = [
  {
    name: 'sunday',
    alias: 'su',
  },
  {
    name: 'monday',
    alias: 'm',
  },
  {
    name: 'tuesday',
    alias: 't',
  },
  {
    name: 'wednesday',
    alias: 'w',
  },
  {
    name: 'thursday',
    alias: 'th',
  },
  {
    name: 'friday',
    alias: 'f',
  },
  {
    name: 'saturday',
    alias: 'sa',
  },
];

export const freeTrial = {
  // free
  cost: 0,
  access: 'Access to Communities',
  view: 'View Activities',
  calendar: 'Calendar',
  inbox: 'Inbox',
  link: '/',
};

export const tfPlans = [
  // monthly
  {
    access: 'Access to Barter System',
    build: 'Build or Invite your Tribe',
    join: 'Join or Host Activities',
    feed: 'Live Interactive Feed',
    foundation: '+ The Foundation',
    link: '/payment',
  },
  // yearly
  {
    access: 'Access to Barter System',
    build: 'Build or Invite your Tribe',
    join: 'Join or Host Activities',
    feed: 'Live Interactive Feed',
    foundation: '+ The Foundation',
    link: '/payment',
  },
];

export const FAQ = [
  {
    title: 'How do I know which subscription package to choose?',
    content:
      'We recommend The Foundation to new moms or parents that are only looking to join activities and connect with other parents within communities of interest, The Pillars to volunteers, especially those with children outside of our service range (0-12 yrs), and The Works to parents that want to tap into the full benefits of having a complete ecosystem of support. ',
  },
  {
    title: 'How does bartering work?',
    content:
      'Our platform is based on a credit system that allows you to compensate caregivers, aka your friends and neighbors, without having to use hard currency–we know how awkward that can get. Purchase additional credits if you are strapped for time and aren’t able to pick-up other’s requests. Earn credits when you help others and make money by cashing out your banked credits. The more people you help, the more you earn!',
  },
  {
    title: 'Which age groups do you serve?',
    content:
      'We serve children between the ages of 0-12 yrs. Activities are hosted based on the following age classification:',
    subcontent: [
      { icon: 'Baby', age: '0-2 yrs', img: 'baby.svg' },
      { icon: 'Toddler', age: '3-4 yrs', img: 'toddler.svg' },
      { icon: 'Primary', age: '5-6 yrs', img: 'primary.svg' },
      { icon: 'Lower_Elemen...', age: '7-9 yrs', img: 'lower-elementary.svg' },
      { icon: 'Upper_Elemen...', age: '10-12 yrs', img: 'upper-elementary.svg' },
    ],
  },
  {
    title: 'How do you ensure safety?',
    content:
      'The safety of our children is of utmost importance to us therefore we thoroughly vet users joining our platform. Each user goes through an identity verification process and a background check, which is displayed on each user profile so that parents can make informed decisions. Users are also able to hand-pick members of their tribe to which they can form a trusted bond .Personal adult and children’s information is regulated on the platform, on a need-to-know basis (typically point of service).',
  },
  {
    title: 'What are your COVID-19 safety guidelines?',
    content:
      'Most of our activities and services are held online due to COVID-19. Whenever in-person contact is necessary, we limit cohorts to a very small group and follow the CDC guidelines on social distancing, face mask wearing and proper hygiene protocols. We are doing our part to help curb the virus, please stay safe.',
  },
];
