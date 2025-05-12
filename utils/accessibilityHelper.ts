import { expect, Page } from '@playwright/test';
//import { test } from '../tests/axe-test'; // Import makeAxeBuilder from axe-test.ts
import AxeBuilder from '@axe-core/playwright';

/* Utility function to check for accessibility violations on a given page.
 * @param page - The Playwright Page object.
 * @param url - The URL to navigate to for the accessibility check.
 */

//function checkAccessibilityViolations() {
    export async  function checkAccessibilityViolations(page: Page, url: string, makeAxeBuilder: (args: { page: Page }) => AxeBuilder,tags?: string[]): Promise<void> 
    {
  await page.goto(url);

  // Use makeAxeBuilder from axe-test.ts
  const axeBuilder = makeAxeBuilder({ page });
  if (tags) {
    axeBuilder.withTags(tags);
  }

  const accessibilityScanResults = await axeBuilder.analyze();
  if (accessibilityScanResults.violations.length > 0) {
    console.error('Accessibility violations found:', accessibilityScanResults.violations);
  }
  expect.soft(accessibilityScanResults.violations).toEqual([]);

}