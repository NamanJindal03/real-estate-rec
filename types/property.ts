export interface PropertySection {
  id: string
  eyebrow: string
  title: string
  image: string
  alt: string
  metricLabel: string
  metric: string
  description: string
  facts: { label: string; value: string; detail?: string }[]
}
export interface PropertyUnit {
  id: string
  name: string
  description: string
  price: string
}
export interface PropertyData {
  name: string
  sections: PropertySection[]
  units: PropertyUnit[]
}
