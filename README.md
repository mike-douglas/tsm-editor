# TSM Custom String Editor

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/mike-douglas/tsm-editor/CI)
![GitHub issues](https://img.shields.io/github/issues/mike-douglas/tsm-editor)

The TSM Custom String Editor is a web-based tool for creating and sharing pricing strings for the TSM addon in World of Warcraft. You can think of this thing kind of like an Excel formula bar for TSM. It provides a function/variable reference and syntax highlighting, and the URLs are sharable.

It is deployed on Github Pages, so it can be accessed at [http://directive.io/tsm-editor/](http://directive.io/tsm-editor/).

This project is *not* affiliated or supported by the TradeSkillMaster team. It was built in great admiration of their work 😊

If you have feature requests or support questions, please use [this link](https://github.com/mike-douglas/tsm-editor/issues/new/choose).

This project is open-source, so please contribute! Some guidelines on how to do so are in [CONTRIBUTING.md](CONTRIBUTING.md).

## Project setup

This project is built with Vue/Vuex.

```bash
yarn install
```

### Compiles and hot-reloads for development

```bash
yarn serve
```

### Compiles and minifies for production

```bash
yarn build
```

### Lints and fixes files

```bash
yarn lint
```

### Testing

This project has unit and functional tests.

To run the unit tests:

```bash
yarn test:unit
```

To run the functional test, you need to start the app in one tab and then run the testcafe tests:

```bash
yarn serve # (in one tab)
yarn test:func # (in another tab, and them chrome opens)
```

## License and Attribution

This project is licensed under the [MIT License](LICENSE).
