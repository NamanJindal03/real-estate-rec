import { property } from '../data/property'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ question?: unknown }>(event)
  if (typeof body?.question !== 'string' || !body.question.trim() || body.question.length > 500)
    throw createError({ statusCode: 400, statusMessage: 'Enter a question of 1–500 characters.' })
  const q = body.question.toLowerCase()
  await randomApiDelay()
  if (/bed|unit|available|residence/.test(q))
    return {
      answer:
        'The presentation includes three two-bedroom residences: Unit #528 on floors 5 and 3, and Unit #G24 with a private pool. Live availability needs advisor confirmation.',
      path: '/project/overview?panel=units',
      label: 'Compare residences',
    }
  if (/price history|appreciation|roi|return|invest/.test(q))
    return {
      answer:
        'The design lists 12.73% rental ROI and +17.5% market appreciation. These are presentation figures, not verified market data or a guarantee. No price-history series was supplied.',
      path: '/project/numbers',
      label: 'Explore the numbers',
    }
  if (/price|payment|cost|plan/.test(q))
    return {
      answer:
        'The project estimate is AED 2.8M, with individual residences shown from AED 1.68M. Payment schedules and floor-plan drawings were not supplied; ask your advisor to confirm them.',
      path: '/project/plans',
      label: 'Explore pricing and residences',
    }
  if (/location|school|metro|proximity|where/.test(q))
    return {
      answer:
        'The project is presented in Jumeirah Village Circle, Dubai. Exact school distances and travel times were not provided.',
      path: '/project/location',
      label: 'Explore the location',
    }
  if (/handover|complet/.test(q))
    return {
      answer:
        'The source lists Q3 2026 on the discovery card, and Q3 2025 with 64% completion on the overview. These conflict, so please confirm the current handover date with your advisor.',
      path: '/project/overview',
      label: 'View project overview',
    }
  return {
    answer: `I can help you explore the supplied ${property.name} presentation: residences, pricing, location, and project details. That question isn’t covered by the supplied project data.`,
    path: '/project/overview',
    label: 'Explore the project',
  }
})
