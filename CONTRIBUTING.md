# Contributing to ngx-fluentvalidation

🙏 We would ❤️ for you to contribute to ngx-fluentvalidation and help make it even better than it is today!

## git-Workflow

This repository follows the [git-flow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).
So please make sure to create PRs only pointing to the `develop` branch.

# Developing

Start by installing all dependencies:

```bash
npm i
```

Run the tests:

```bash
npm run test ngx-fluentvalidation
```

Run the playground app:

```bash
ng serve
```

## Building

```bash
ng build ngx-fluentvalidation --prod
```

## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- All features or bug fixes **must be tested** by one or more specs (unit-tests).
- All public API methods **must be documented**.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Samples: (even more [samples](https://github.com/angular/angular/commits/master))

```
docs(changelog): update changelog to beta.5
```

```
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

### Updating the demo

```bash
npm run build:prod
```
