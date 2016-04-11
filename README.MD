# Hyperion Web
This is the web front-end to [Hyperion](https://github.com/mthmulders/hyperion).

## Building
There are two ways to build the Hyperion frontend.

### For development
Just run

    npm install
    npm run build-dev

Or you could run `npm run dev-server` as the last command instead to have a full webserver with hot reloading.
You can override the hostname where the API is expected to live by supplying an environment variable named `API_HOST`.

### For production
Just run

    npm install
    npm run build-prod

## About the code
Hyperion Web is written in Ecmascript 6 using the ReactJS-framework.

Build status: [![Circle CI](https://circleci.com/gh/mthmulders/hyperion-web/tree/master.svg?style=svg)](https://circleci.com/gh/mthmulders/hyperion-web/tree/master)


## License
Hyperion Web is licensed under the MIT License. See the `LICENSE` file for details.