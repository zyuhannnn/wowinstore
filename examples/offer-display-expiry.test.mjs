import test from 'node:test';
import assert from 'node:assert/strict';
import { displayExpiryAt } from './offer-display-expiry.ts';

// Synthetic dates; these tests do not read production data or call a model.
test('open-ended offer gets a display window without mutating source', () => {
  const offer = { startsAt: '2026-08-08', endsAt: null };
  assert.equal(displayExpiryAt(offer), '2026-09-08T00:00:00+08:00');
  assert.equal(offer.endsAt, null);
});
test('month-end is clamped', () => {
  assert.equal(displayExpiryAt({ startsAt: '2026-01-31', endsAt: null }), '2026-02-28T00:00:00+08:00');
});
test('explicit end date wins', () => {
  const end = '2026-08-20T23:59:59+08:00';
  assert.equal(displayExpiryAt({ startsAt: '2026-08-08', endsAt: end }), end);
});
test('missing or invalid start does not create a merchant fact', () => {
  assert.equal(displayExpiryAt({ startsAt: '', endsAt: null }), null);
  assert.equal(displayExpiryAt({ startsAt: '2026-02-30', endsAt: null }), null);
});
