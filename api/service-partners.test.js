import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { makePartners } from './service-partners.js'

describe('makePartners', () => {
  it('returns partner groups as an array, including when no extra groups are supplied', () => {
    const groups = makePartners('integrated-security-solutions')

    assert.equal(Array.isArray(groups), true)
    assert.deepEqual(groups.map(({ title }) => title), [
      'Technology Partners',
      'Solutions Partners',
    ])
    assert.ok(groups.every(({ logos }) => Array.isArray(logos)))
  })

  it('preserves extra partner groups after the generated groups', () => {
    const extra = { title: 'Additional Partners', logos: [] }
    const groups = makePartners('unknown-service', [extra])

    assert.equal(groups.at(-1), extra)
    assert.deepEqual(groups[0].logos, [])
    assert.deepEqual(groups[1].logos, [])
  })
})
