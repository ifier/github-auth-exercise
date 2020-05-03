## How to start
You need to paste clientId and clientSecret (`src/config/index.ts` and `src/config/config.json`) before starting that project. We have two files - one for the client and second for server.
```$xslt
git clone git@github.com:ifier/github-auth-exercise.git
cd github-auth-exercise
npm i
npm run build
npm run server // proxy for auth
npm run prod
```

## External Libraries
- lodash - debounce and union (We can create our own and not install such big lib)
- query-string - just to parse query params
- react-toastify - to show some errors
- react-infinite-scroller - better to write own, really. There was some issues with that lib. Was curious, that's why used it.

## Conclusions
It was really interesting to build an APP that will search through repositories.
GitHub has issues with CORS that's why I've added server (Express).

I have added sign in form like every app has, but it is not working.
Using typescript - love it and still learning.

## How can be improved
- Unit tests - minimum redux (actions, reducers, sagas, selectors and etc.)
- Better error handling (consistent)
- Smaller components
- Use hooks more (or not)
- Config variables and secrets move to env variables (critical place)

P.S: Was really interesting and challenging :)
