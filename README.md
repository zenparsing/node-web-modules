# Web Modules for Node.js

This proposal adds support for browser-like ES modules to Node.js.

- [Prototype](https://github.com/zenparsing/node/tree/node-web-modules)
- [Diff](https://github.com/nodejs/node/compare/master...zenparsing:node-web-modules)

## What is a Web Module?

A *Web Module* is an ECMAScript module whose source text is JavaScript module code. Web modules have the following characteristics:

- Web modules are identified by a URL.
- Web modules can only import from other web modules. In particular, web modules cannot use `import` syntax to load scripts or CommonJS modules.
- Web modules can only import other modules using the following specifier types:
  - A fully-qualified URL that exactly matches a web module.
  - A relative URL that exactly matches a web module.
  - A package path that is resolved using [import maps](https://github.com/WICG/import-maps) or [export maps](https://github.com/jkrems/proposal-pkg-exports).

**Provided suitable import and export maps (for the browser and node respectively), a connected graph of web modules that do not use platform-specific APIs should work unmodified across platforms.**

## Requirements and Goals

### MVP Requirements

The following capabilities are considered essential for shipping web modules in Node.js:

- A way to import web modules using relative URLs.
- A way to import packages of web modules installed by npm.
- A way to import Node.js built-in modules.
- An ergonomic way to load CommonJS modules from web modules.
- An ergonomic way to import web modules from CommonJS modules.

### Post-MVP Features

The following features should remain open for exploration after MVP support is shipped:

- A way to customize the import policy of the default module loader.
- A way to specify the import policy of newly created contexts.
- A way to load the main file as a web module without a command-line flag.
- Additional properties on `import.meta` for interacting with the filesystem.
- Support for importing additional file types such as JSON or WASM.
- The ability to dynamically update bindings for node built-ins.
- Exposing the node API using a new set of built-in modules.
- A way to control deep package imports.

### Non-goals

The following elements are not goals of this proposal:

- Using `import` syntax to load scripts or CommonJS modules.
- Eliminating node-specific APIs from the global environment.

## MVP Design Overview

### Import Resolution

Static import declarations are only allowed within web modules.

- Import specifiers that begin with `/` are not allowed by the MVP.
- Import specifiers that begin with `./` and `../` are considered to be [relative URL paths](#relative-url-paths).
- All other import specifiers are considered to be [package URL paths](#package-url-paths).

#### Relative URL paths

```js
import something from './some-web-module.js';
import somethingElse from '../some-other-web-module.js';
```

- Relative URL paths are resolved relative to the file system path of the current module.
- The fully resolved path must point to a file with a valid web module extension.
- Importing directories using relative URL paths is not supported by the MVP.
- File extensions are not automatically added.

#### Package URL paths

```js
import something from 'package';
import somethingElse from 'package/main.js';
```

- Package imports are resolved using [export maps](https://github.com/jkrems/proposal-pkg-exports) contained within package.json files.
- After resolving with an export map, the fully resolved path must point to a file with a valid web module extension.
- File extensions are not automatically added to the resolved path.
- Only string-valued export maps are supported by the MVP. Object-valued export maps will be supported post-MVP.

Given a package URL path _specifier_, the URL will be resolved in the following manner:

- If _specifier_ matches one of Node's built-in module names,
  - Return a URL corresponding to that built-in module.
- For each `node_modules` folder _folder_ starting with the file system path of the current module:
  - If _folder_ contains a `package.json` file,
    - Read the contents of the `package.json` file as JSON into _pjson_.
    - Let _match_ be `null`.
    - If _pjson_ contains a property "exports",
      - Let _match_ be the result of running the export map matching algorithm with _specifier_ and _pjson.exports_.
    - Else,
      - Let _match_ be _specifier_.
    - If _match_ is not `null`,
        - Let _fullPath_ be the result of resolving _match_ relative to the directory containing this `package.json` file.
        - If _fullPath_ points to a file with a valid web module extension,
          - Return the result of converting _fullPath_ to a file URL.
    - Break from this loop.
- Throw a `MODULE_NOT_FOUND` error.

### Dynamic Import

Dynamic import is supported in ES modules, CommonJS modules and the REPL.

```js
// From within a CommonJS module
import('./some-web-module.js').then(namespace => {
  console.log('Web module loaded!');
});
```

- For CommonJS modules, the corresponding filename is used as the `baseURL` during resolution. For the REPL the current working directory is used instead.
- Dynamic import is *not* supported within sandboxes created using `vm.createContext` and similar APIs. Support for this feature will be added post-MVP.

### Module Environments

Module execute in the same global environment as CommonJS modules. The following properties are available on `import.meta`:

- `url` (string): The fully-qualified URL of the current module.
- `require` (function): Loads CommonJS modules, using the current module's file system path as the base path.

### Command-line Options

The following command line option is added to support executing web modules:

- `--module` (alias `-m`): Indicates that `process.argv[1]` points to a web module.

Directory paths in combination with `--module` are not supported by the MVP.
