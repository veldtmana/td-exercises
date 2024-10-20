# My approach

## Git approach

I decided to create a release branch that will contain commits (as small as possible as requested) as if you would want to merge my changes back into your main branch, I created a MR to merge the release into main in gitlab.

My personal preference is to place a higher value on commits than on branches because commits are what last and most branches end up getting deleted. For larger releases or a sprint feature branches should branch of main and be merged into the release branch to make pull requests easier to reason about.

## Commit 1: Get the project running

I noticed the project was nearly 2 years old and the dependencies were out of date. My first step was to update the dependencies.

- I decided what node version to use - at the time of writing the latest LTS node version is 20.18.0
- I had to familiarise myself with yarn as the package manager, usually I use npm.
- My initial attempt to run the project failed, as expected, because the dependencies were out of date and were not compatible with the lates version of node.js.
- I updated the dependencies to the latest versions.
- I addressed all the deprecation warnings and linting errors

At the time of the first commit the project could run in the browser and the tests were running but not passing.

## Commit 2: Introduce typescript

looking at the code in the utils folder, I felt that converting the functions to typescript would eliminate a lot of defensive coding and simplify the code.

The assumption is that in the actual TalentDesk codebase migration to typescript would be a gradual process, thus I intentionally left the App.js as javascript to see if such an hybrid approach would be feasible, luckily `react-scripts` provides the tooling to support this, all that is needed for the compiler to import typescript into a javascript module is to wrap it in a tsx file (a bit of a hack, but I've seen worse). I'm super happy to see you use ES modules already.

- I added a tsconfig.json file
- I converted `detectSums` function to typescript and moved them to a new mathUtils.ts file
- I added types to the jest tests
- I made sure this works in production by ensuring that `yarn build` still compiles correctly and that the built code runs in the browser

## Commit 3: Small maintenance tweak

Doh! I missed a deprecation warning so I quickly fixed it in a separate commit seeing as I was getting ready to do the actual work.
