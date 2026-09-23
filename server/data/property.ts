import type { PropertyData } from '~/types/property'

// Values are transcribed from the supplied design, not a live property feed.
export const property: PropertyData = {
  name: 'Berkeley Square North',
  sections: [
    {
      id: 'overview',
      eyebrow: 'The overview',
      title: 'Berkeley Square North',
      image: 'villa.png',
      alt: 'Modern white villa with floor-to-ceiling windows and a landscaped pool',
      metricLabel: 'Handover',
      metric: 'Q3 2026',
      description: '',
      facts: [
        { label: 'Investment from…', value: 'AED 2.8M', detail: '2 Bed · 1,489–2,300 sqft' },
        { label: 'Handover', value: 'Q3 2025', detail: '64% completed' },
        { label: 'Market appreciation', value: '+17.5%', detail: '2.2B in 2026 - 5.7B in 2031' },
        {
          label: 'Rental ROI',
          value: '12.73%',
          detail: '2.2x 5-yr appreciation',
        },
      ],
    },
    {
      id: 'vision',
      eyebrow: 'The vision',
      title: 'Dubai 2040',
      image: 'vision.png',
      alt: 'An aerial view of a green urban neighbourhood in Dubai',
      metricLabel: 'Journey towards',
      metric: 'Sustainability',
      description:
        'Explore the vision for a greener, more connected city, and how the neighbourhood fits into the bigger picture.',
      facts: [
        { label: 'The vision', value: 'Dubai 2040' },
        { label: 'Focus', value: 'Sustainability' },
      ],
    },
    {
      id: 'location',
      eyebrow: 'Location & connectivity',
      title: 'Jumeirah Village Circle',
      image: 'metro.png',
      alt: 'Dubai Metro train passing through the city skyline',
      metricLabel: 'Prime',
      metric: 'Location',
      description:
        'Get to know Jumeirah Village Circle. Ask your advisor about daily journeys, schools, and the places that matter to you.',
      facts: [
        { label: 'Neighbourhood', value: 'Jumeirah Village Circle' },
        { label: 'City', value: 'Dubai, UAE' },
      ],
    },
    {
      id: 'home',
      eyebrow: 'The details',
      title: 'The Perfect Home',
      image: 'kitchen.png',
      alt: 'A contemporary kitchen with pale cabinetry and integrated appliances',
      metricLabel: 'Starting from',
      metric: '1,489 sqft',
      description:
        'Discover the two-bedroom residences and find a layout that suits the way you live.',
      facts: [
        { label: 'Bedrooms', value: '2' },
        { label: 'Area from', value: '1,489 sqft' },
      ],
    },
    {
      id: 'plans',
      eyebrow: 'Pricing & payment',
      title: 'The Plans',
      image: 'bedroom.png',
      alt: 'A warm neutral bedroom with an upholstered bed and sculptural wall art',
      metricLabel: 'Est. value',
      metric: 'AED 2.8M',
      description:
        'Compare the residences below. Your advisor can confirm current availability, the payment schedule, fees, and final pricing.',
      facts: [
        { label: 'Project estimate', value: 'AED 2.8M' },
        { label: 'Payment schedule', value: 'Ask your advisor' },
      ],
    },
    {
      id: 'numbers',
      eyebrow: 'Returns & investment',
      title: 'The Numbers',
      image: 'living.png',
      alt: 'A modern living room with sculptural ring pendant lights',
      metricLabel: 'Rental ROI',
      metric: '12.73%',
      description:
        'Review the figures shared in the project presentation. These are illustrative figures, not live valuations or guaranteed returns.',
      facts: [
        { label: 'Rental ROI in design', value: '12.73%' },
        { label: 'Market appreciation in design', value: '+17.5%' },
      ],
    },
    {
      id: 'amenities',
      eyebrow: 'Amenities',
      title: 'The Life Here',
      image: 'building.png',
      alt: 'The residential building facade with landscaped surroundings',
      metricLabel: 'Rental ROI',
      metric: '12.73%',
      description:
        'Picture your daily life here and explore the shared spaces that shape everyday life.',
      facts: [
        { label: 'Shared spaces', value: 'Explore the presentation' },
        { label: 'Advisor', value: 'Sara Rahman' },
      ],
    },
  ],
  units: [
    {
      id: '528-floor-5',
      name: 'Unit #528',
      description: '2 Bed · Floor 5 · 1,511 sqft',
      price: 'AED 2.016M',
    },
    {
      id: '528-floor-3',
      name: 'Unit #528',
      description: '2 Bed · Floor 3 · 1,489 sqft',
      price: 'AED 1.97M',
    },
    {
      id: 'g24',
      name: 'Unit #G24',
      description: '2 Bed · Ground · Private Pool',
      price: 'AED 1.68M',
    },
  ],
}
