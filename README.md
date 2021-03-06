# Schedules

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Instrukcja uruchomienia na serwerze

Wymagania lokalne:
- node.js 14
- yarn

Wymagania serwera:
- serwer plików statycznych
- certyfikat SSL

### Instalacja

1. Instalacja zależności

    ```bash
    yarn install
    ```

2. Konfiguracja: ustawienie adresu backendu w pliku `.env.production`.

3. Zbudowanie projektu

    ```bash
    yarn build
    ```

4. W folderze `dist` pojawią się zbudowane pliki projektu. Mogą być serwowane przez dowolny serwer obsługujący statyczne pliki, na przykład `apache2` lub `nginx`. Zalecane jest użycie certyfikatu SSL.
