# AngularJestMutator

This project is an example of a basic mutation testing configuration for Angular project that uses jest for unit testing.

## How to recreate this Steps from scratch
Please note that this configuration is only tested with certain package versions and most likely I'll leave this project untouched for years that is why instructions contain fixed versions as much as possible.

You may as well look through commit in this repository to get better picture of the main setup steps.

1. Generate new Angular project
```shell
npx -p @angular/cli@14 ng new <your-project-name>
```

2. Add jest packages
```shell
npm i --save-dev jest@28 @types/jest@28 jest-preset-angular@12.2.2
```

3. Create setup-jest.ts file with the following content
```ts
import 'jest-preset-angular/setup-jest';
```

4. Make changes in `package.json`
   1. Replace `"test": "ng test"` with `"test": "jest"` 
   2. Add jest configuration as `jest` section
```json
  "jest": {
    "preset": "jest-preset-angular",
    "setupFilesAfterEnv": [
      "<rootDir>/setup-jest.ts"
    ]
  }
```

5. Remove `karma.conf.js` and `test.ts` files
6. Remove `test` section from `angular.json` file
7. Make changes in `tsconfig.spec.json` file:
   1. Remove `src/test.ts` from `files`
   2. Change `types` from `jasmine` to `jest`
   3. Add `"esModuleInterop": true` to `compilerOptions` section
8. Uninstall `karma` and `jasmine`
```shell
npm uninstall --save-dev karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter @types/jasmine jasmine-core karma-coverage
```

At this point we should have working `jest` setup. It is worth it to check if it works by running `npm run test` and fix it if something does not work.

9. Add `@stryker-mutator/core` and `@stryker-mutator/jest-runner` packages (alternatively `stryker` cli tool can be used)
```shell
npm i --save-dev @stryker-mutator/core@6.2.2 @stryker-mutator/jest-runner@6.2.2
```

10. Add `stryker.conf.json` file with the following content
```json
{
  "$schema": "./node_modules/@stryker-mutator/core/schema/stryker-schema.json",
  "packageManager": "npm",
  "reporters": [
    "html",
    "clear-text",
    "progress"
  ],
  "testRunner": "jest",
  "jest": {
    "projectType": "custom",
    "enableFindRelatedTests": true
  },
  "mutate": [ "src/**/*.component.ts" ],
  "coverageAnalysis": "off"
}
```

11. Add `"test:mutation": "stryker run"` to `scripts` section of `package.json`

At this point we should have working `stryker-mutator` setup. It is worth it to check if it works by running `npm run test:mutation` and fix it if something does not work.

It may be a good idea to make use of [typescript-checker](https://stryker-mutator.io/docs/stryker-js/typescript-checker/) plugin so that stryker would faster eliminate mutations that lead to compilation errors.
If you want to do this please use the following steps

12. Add `@stryker-mutator/typescript-checker` package
```shell
npm i --save-dev @stryker-mutator/typescript-checker@6.2.2
```

13. Create `tsconfig.stryker.json` by copying `tsconfig.app.json`
14. Make the following changes in `tsconfig.stryker.json`
    1. Remove `files` section
    2. Add `"src/**/*.ts"` to `include` array
    3. Add `exclude` section:
       ```json 
       "exclude": [
          "src/**/*.spec.ts"
       ]
       ```

15. Add the following lines to `stryker.conf.json`
```json
  "checkers": ["typescript"],
  "tsconfigFile": "tsconfig.stryker.json"
```

## FAQ

Q: How do I configure stryker-mutator with [@angular-builders/jest](https://www.npmjs.com/package/@angular-builders/jest) or [@nrwl/jest](https://www.npmjs.com/package/@nrwl/jest)

A: I do not know. For Nx setup there was a try to make a [plugin](https://github.com/SebasG22/nx-mutation), but I have not tried it.
