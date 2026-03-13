import { FullConfig, request, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function globalSetup(config: FullConfig) {

    console.log("🔄 Running API Setup");

    //Create a new API request context
    const apiContext = await request.newContext({
        baseURL: 'https://pwa-dev-cc.faconnable.com/mobify/proxy/api/',
        ignoreHTTPSErrors: true, // helps in corp environments with TLS interception
        
      extraHTTPHeaders: {
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'PlaywrightTest/1.0 (+https://playwright.dev)',
      // Optional but sometimes helpful when a proxy expects a site referrer:
      'Referer': 'https://pwa-dev-cc.faconnable.com/uk/en_gb/'
    },

    })

 // -----------------------------------------------------
  // 1. Fetch Homepage API
  // ---------------------------------------------------

  const homepageResponse = await apiContext.get('experience/shopper-experience/v1/organizations/f_ecom_blrq_dev/pages/fcnhomepage',
    {
        params: {
            siteId: 'FCN-UK',
            locale:  'en-GB'
        }
    }
  );

  if(homepageResponse.status() !== 200){
    throw new Error('Homepage API failed: ${homepageResponse.status()}');
  }

  const homepageJson = await homepageResponse.json();
  console.log('✅ Homepage API reachable');

  
  // -----------------------------------------------------
  // 2. Fetch L1 Category API
  // -----------------------------------------------------
  const categoryRes = await apiContext.get(
    '/product/shopper-products/v1/organizations/f_ecom_blrq_dev/categories/root',
    {
      params: {
        levels: '1',
        locale: 'en-GB',
        siteId: 'FCN-UK'
      }
    }
  );

  if (categoryRes.status() !== 200) {
    throw new Error(`❌ Category API failed: ${categoryRes.status()}`);
  }

  const categoryJson = await categoryRes.json();
  console.log("✅ Category API reachable");

  // -----------------------------------------------------
  // 3. Store response to file for use in spec tests
  // -----------------------------------------------------
  const data = {
    homepage: homepageJson,
    categories: categoryJson
  };

  fs.writeFileSync('test-data/apiData.json', JSON.stringify(data, null, 2));
  console.log("📁 Saved API responses → test-data/apiData.json");

  await apiContext.dispose();
}

export default globalSetup;


