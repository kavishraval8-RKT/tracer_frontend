// Run: node --test lib/security.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { email, looksAutomated, oneOf, rateLimit, safeNextPath, text } from "./guard.ts";
import { verifyStripeSignature } from "./stripe-signature.ts";

test("looksAutomated flags honeypot, missing and too-fast submissions", () => {
  const now = 1_000_000;
  assert.equal(looksAutomated("", now - 5000, now), false);
  assert.equal(looksAutomated("Acme Inc", now - 5000, now), true);
  assert.equal(looksAutomated("", now - 500, now), true);
  assert.equal(looksAutomated("", "", now), true);
  assert.equal(looksAutomated("", now + 60_000, now), true);
});

test("rateLimit blocks after the limit and resets after the window", () => {
  const key = `test:${Math.random()}`;
  assert.equal(rateLimit(key, 2, 1000, 0), true);
  assert.equal(rateLimit(key, 2, 1000, 10), true);
  assert.equal(rateLimit(key, 2, 1000, 20), false);
  assert.equal(rateLimit(key, 2, 1000, 1000), true);
});

test("validators", () => {
  assert.equal(email("  Ada@Example.com "), "ada@example.com");
  assert.equal(email("not-an-email"), null);
  assert.equal(text("   ", 10), null);
  assert.equal(text("x".repeat(11), 10), null);
  assert.equal(oneOf("Linux", ["Windows", "Linux"]), "Linux");
  assert.equal(oneOf("BeOS", ["Windows", "Linux"]), null);
});

test("safeNextPath blocks open redirects", () => {
  assert.equal(safeNextPath("/billing?plan=pro&billing=yearly"), "/billing?plan=pro&billing=yearly");
  assert.equal(safeNextPath("https://evil.example"), "/billing");
  assert.equal(safeNextPath("//evil.example"), "/billing");
  assert.equal(safeNextPath("/\\evil.example"), "/billing");
  assert.equal(safeNextPath(null), "/billing");
});

test("verifyStripeSignature accepts valid and rejects forged, stale, or malformed signatures", () => {
  const secret = "whsec_test";
  const payload = '{"id":"evt_1"}';
  const t = 1_700_000_000;
  const sig = createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex");

  assert.equal(verifyStripeSignature(payload, `t=${t},v1=${sig}`, secret, t + 10), true);
  assert.equal(verifyStripeSignature(payload, `t=${t},v0=abc,v1=${sig}`, secret, t), true);
  assert.equal(verifyStripeSignature(payload + " ", `t=${t},v1=${sig}`, secret, t), false);
  assert.equal(verifyStripeSignature(payload, `t=${t},v1=${sig}`, "whsec_other", t), false);
  assert.equal(verifyStripeSignature(payload, `t=${t},v1=${sig}`, secret, t + 301), false);
  assert.equal(verifyStripeSignature(payload, `t=${t},v1=zz`, secret, t), false);
  assert.equal(verifyStripeSignature(payload, null, secret, t), false);
});
