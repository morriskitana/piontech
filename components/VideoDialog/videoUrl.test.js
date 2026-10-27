import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { getYouTubeEmbedUrl } from './videoUrl.js'

describe('getYouTubeEmbedUrl', () => {
  it('creates an autoplaying embed URL for a valid video id', () => {
    assert.equal(
      getYouTubeEmbedUrl('7e90gBu4pas'),
      'https://www.youtube-nocookie.com/embed/7e90gBu4pas?autoplay=1&rel=0'
    )
  })

  it('returns null for an empty or unsafe video id', () => {
    assert.equal(getYouTubeEmbedUrl(''), null)
    assert.equal(getYouTubeEmbedUrl('https://example.com'), null)
    assert.equal(getYouTubeEmbedUrl('bad id'), null)
  })
})
