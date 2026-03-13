import {test, expect} from '@playwright/test';
import fs from 'fs';

test.describe('Fetch API Test', () => {

    test('Validate Homepage and L1 Category API Data', async () => {

        //Load Stored API responses from global setup
        const apiData = JSON.parse(fs.readFileSync('apiData.json', 'utf-8'));

        const homepage = apiData.homepage;
        const categories = apiData.categories;
        
    // -----------------------------------------------------
    // 1. Validate Homepage Response
    // -----------------------------------------------------
        expect(homepage).toBeTruthy();
        expect(homepage.pageId).toBeDefined();
        console.log("Homepage Loaded:", homepage.pageId);
        
    // -----------------------------------------------------
    // 2. Validate L1 Categories
    // -----------------------------------------------------
        const l1Categories = categories?.data?.categories ?? [];

        expect(l1Categories.length).toBeGreaterThan(0);
        expect(Array.isArray(l1Categories)).toBe(true);

        
        console.log("L1 Category List:", l1Categories);

        // Example: validate keys exist
        l1Categories.forEach((cat: { id: string; name: string }) => {
      expect(cat.id).toBeDefined();
      expect(cat.name).toBeDefined();


    })

})
});