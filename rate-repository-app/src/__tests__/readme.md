installing jest for expo

```
 npm install --save-dev jest jest-expo eslint-plugin-jest
```

⚠️ Версия react-test-renderer должна совпадать с версией React.

```
npm list react --depth=0

npm install --save-dev --legacy-peer-deps react-test-renderer@18.2.0 @testing-library/react-native @testing-library/jest-native

```

в package.json:
"setupFilesAfterEnv": ["<rootDir>/setupTests.js"]

🔥 Зачем это нужно? Чтобы использовать такие проверки:

toHaveTextContent()
toHaveProp()

by describe

```
npm test -- -t "SignInContainer"
```

by files name

```
npm test SignIn
```
