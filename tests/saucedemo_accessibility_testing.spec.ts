import { expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const { test } = require('./axe-test.ts');



test('accessibility check for only critical violations', async ({ page }, testInfo) => {
  await page.goto('https://www.saucedemo.com/');

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  const criticalViolations = accessibilityScanResults.violations.filter(v => v.impact === 'critical');

  await testInfo.attach('accessibility-scan-results', {
    body: JSON.stringify(criticalViolations, null, 2),
    contentType: 'application/json'
  });


  expect(criticalViolations).toEqual([]);

});

test('accessibility check for all violations', async ({ page }, testInfo) => {
  await page.goto('https://www.saucedemo.com/');

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();


  await testInfo.attach('accessibility-scan-results', {
    body: JSON.stringify(accessibilityScanResults, null, 2),
    contentType: 'application/json'
  });

  expect(accessibilityScanResults.violations).toEqual([]);

});


//Scanning for WCAG violations
test('should not have any automatically detectable WCAG A or AA violations', async ({ page, makeAxeBuilder }) => {
  await page.goto('https://www.saucedemo.com/');

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});



test('check for accessibility violiation using a fixture', async ({ page, makeAxeBuilder }, testInfo) => {
  await page.goto('https://www.saucedemo.com/');

  const accessibilityScanResults = await makeAxeBuilder({ page }).analyze();

  await testInfo.attach('accessibility-scan-results', {
    body: JSON.stringify(accessibilityScanResults, null, 2),
    contentType: 'application/json'
  });

  expect(accessibilityScanResults.violations).toEqual([]);
});





