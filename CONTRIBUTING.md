# Contribution Guidelines

- [Contribution Guidelines](#contribution-guidelines)
  - [Our Stack](#our-stack)
    - [Angular](#angular)
    - [Tailwind](#tailwind)
    - [Husky](#husky)
      - [Conventional Commits](#conventional-commits)
      - [ESLint](#eslint)
    - [GitLab CI/CD](#gitlab-cicd)
  - [Getting Started](#getting-started)
    - [Angular App (UI only, dummy data)](#angular-app-ui-only-dummy-data)
    - [Server + Auth](#server--auth)
    - [Authenticating](#authenticating)
      - [UI](#ui)
      - [API](#api)
  - [Developing](#developing)
  - [Conventional Commits TL;DR](#conventional-commits-tldr)
    - [Examples](#examples)

## Our Stack

Before starting work on this project, familiarize yourself with the frameworks and practices you will encounter in our projects.

### Angular

We are targeting the latest version of the Angular framework, and are updating regularly.

* [Docs](https://angular.io/docs)

### Tailwind

Tailwind is our CSS framework. Our core styles are defined into reusable classes that you apply to your HTML instead of creating single-use stylesheets. It should be rare that you write actual CSS/LESS code while developing components.

* [Core Concepts](https://tailwindcss.com/docs/utility-first/)
* [Docs](https://tailwindcss.com/docs)

### Husky

We use Husky to perform lint and commit message validation prior to allowing commits. Do not disable Husky in order to bypass linting or validation.

Husky checks the following:

#### Conventional Commits

This is our commit message format. All commits to all branches MUST adhere to this format.

* [Docs](https://www.conventionalcommits.org/en/v1.0.0/)

#### ESLint

All code must pass linting prior to committing. Our ESLint config is shared across all projects, and shouldn't be overridden without checking with a project maintainer.

### GitLab CI/CD

While you probably won't need to worry much about our deployment pipelines, it may be useful to know that we're using GitLab Auto DevOps. This means that pushed feature branches will automatically generate Review Apps that you can use to see your work in a production-like environment.

* [Docs](https://docs.gitlab.com/ee/ci/)

## Getting Started

### Angular App (UI only, dummy data)
1. Clone the repository to your local machine
1. Create a [GitLab Personal Access Token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) if you haven't already
   * The token requires the `api` and `read_registry` scopes
2. Set the following environment variables on your machine:
    * `NPM_TOKEN = <your personal access token>`  
      this allows NPM to pull from GitLab's private repositories  
      Do **not** edit `.npmrc` to hard-code your token!
    * `NODE_ENV = development`  
      Sets the app to development mode
    * To set environment variables:
      * Windows: in a `cmd` window, run:
        * `setx NODE_ENV development`
        * `setx NPM_TOKEN <your personal access token>`
      * macOS/Linux: in a terminal, run
        * `echo export NODE_ENV=development >> ~/.bash_profile`
        * `echo export NPM_TOKEN=<your personal access token> >> ~/.bash_profile`
3. `npm install`
4. `ng serve`

### Server + Auth
1. Follow the steps in _Angular App_
2. Run `docker-compose -f docker-compose.debug.yml` to start the local Redis server
3. Request `development.yaml` and `production.yaml` from another developer and place them in the `config` folder. **DO NOT TRACK THESE FILES IN GIT**
4. Run `ng build` to build the Angular app and place it in the `dist` folder.
5. `npm start`

### Authenticating

Authentication is managed by the Single Sign-On Server ("SSO") at sso.twohat.io. It is configured to allow you to login to your localhost instance with your "production" credentials.

#### UI

Cookies are used to store session information. [server.js](./server.js) performs authentication and stores a local session in a Redis.

Implementation logic is inherited through the `authHelpers` component provided by `@two-hat-engineering/shared-libs-node`.

#### API

[server.js](./server.js) captures all requests to `/api/v1/*`, replaces your session cookie with an API key associated to your account, and proxies the request to the API server through a cluster-local connection.

If you need to communicate with the API server directly, authentication occurs via bearer token.

See [ModTools API](https://gitlab.com/two-hat-engineering/modtools/rule-audit-api) for more information on the backend API.

eg.
```
Authorization: Bearer AAABBBCCC111222333
```

At the moment, there is no UI or endpoint to get your API key. To get your API key, uncomment the line in [server.js](./server.js) inside of `app.all('/api/*'...`

## Developing

Please consider these guidelines when filing a pull request:

*  Commits follow the [Conventional Commits convention](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#summary)
*  2 spaces indentation
*  JavaScript is written using ES2018 features or newer
*  Targets NodeJS `10.14.2` or newer.
*  See our [Style Guidelines on CSS](CONTRIBUTING-STYLE-GUIDE)

## Conventional Commits TL;DR

Commit messages must follow this format:

```
<type>([optional ticket number]): <description in imperative mood>

[optional body]

[optional footer]
```

Possible values of `type` include:
* `fix`: a commit of the type `fix` patches a bug in your codebase (this correlates with `PATCH` in semantic versioning).
* `feat`: a commit of the type `feat` introduces a new feature to the codebase (this correlates with `MINOR` in semantic versioning).
* **BREAKING CHANGE**: a commit that has the text `BREAKING CHANGE:` at the beginning of its optional body or footer section introduces a breaking API change (correlating with `MAJOR` in semantic versioning). A breaking change can be part of commits of any _type_. e.g., a `fix:`, `feat:` & `chore:` types would all be valid, in addition to any other type.
* Others: commit types other than `fix:` and `feat:` are allowed, for example [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) recommends `chore:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `ci:`, and others.

### Examples

```
feat(ENG-0000): Add widget interface
```

```
fix: Handle exception in edge case
```

```
feat(ENG-0000): Replace widget backend

Replaced the widget backend with a new plumbus-based system.

BREAKING CHANGE:
Widgets can no longer use Gadget IDs. Widgets in the backend with Gadget IDs should be updated to the new Plumbus format.
```