# Install nodeJS

# create a new reporsitory in github
use git init to initialize the local folder as git repo
set git config user.name
use git clone to clone the https value of the reporsitory from github

# Install playwright 
For cloned repo -
use command npm init playwright@latest and click enter for all default options listed/answers

# create folder for pages under repository for pom
create .ts file for each page
add / define locators and methods

# Create spec file and add scripts 
create .spec.ts file under tests folder
add tests to it 
- by default tests from spec file will run parallelly using mutiple workers
- if tests are depedent ,use 'serial' mode in spec file and only one worker will be used to      execute them
    test.describe.configure({ mode: 'serial' });
    

# make test run headed and take screenshots only on failures
update "use" xection of config file with below attributes -
headless: false,
screenshot : 'only-on-failure',

# For visual testing snapshots
- Add an "expect" section for maxPixelDifferenceRatio in config file
  expect :
  {
    toHaveScreenshot: { maxDiffPixelRatio: 0.01,threshold: 0.1 } 
  }
  
 - define custom path for snapshots in config file  
    snapshotPathTemplate: '.test/snaps/{projectName}/{testFilePath}/{arg}{ext}',

# Run all the tests using below command
npx playwright test

# Run tests f
- From a specific file use below command
    npx playwright test inventory_sort_add_remove_checkout.spec.ts
    npx playwright test saucedemo_visual_testing.spec.ts

- For running all tests
    npx playwright test

