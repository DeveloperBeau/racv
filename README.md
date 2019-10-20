# RACV

## Domain Listing App

Welcome to the Domain Listing app for RACV from Beau Ayres

Please note:

- The layout of this project is not future proofed, this would require planning and structure mapping.
- There is a problem with current iOS X+ simulators, which can cause issues telling the app in time that it is an iPhone x style phone and render it as if it was a normal device. This is fixable but would require a bit more time to be robust and because it only effects simulators, i didn't feel it necessary for this test.
- This is a test project, as such the secure keys like the domain api key may be included though this should never be done in a real project
- The abstraction is not to production grade but is enough for this small project.
- If this was a bigger project, i would implement a framework to properly test the hooks and state management of each of the components as well. however, each hook is simple and we would really only be testing the react framework itself which is counter productive.

### How to run?

1. yarn install all dependencies
2. yarn start to start the metro bundler
3. Setup either your xcode or android studio with the correct simulator/emulator requirements.
4. yarn run-ios or yarn run-android will boot up the simulator/emulator and run the project
