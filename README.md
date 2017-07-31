# jest-timing-reporter

## Installing

```
$ npm install jest-timing-reporter --save-dev
```

In jest configuration:

```json
{
  "reporters": [
    "default",
    "<rootDir>/node_modules/jest-timing-reporter/lib/index.js"
  ]
}
```

(The `"default"` entry is to keep the original reporter while also adding jest-timing-reporter. It's of course optional if you want this or not).

## Options

### `verbose: bool`
**Default:** `false`

The reporter will by default write the duration for each test suite to the console. If you wish to also write the duration for each test case under each test suite, add the verbose switch:

```json
{
  "reporters": [
    "default",
    ["<rootDir>/node_modules/jest-timing-reporter/lib/index.js", { "verbose": true }]
  ]
}
```

### `outputAs: string`
**Possible values:** `json` | `text`  
**Default:** `text`

Describes how the result will be printed to the console.

```json
{
  "reporters": [
    "default",
    ["<rootDir>/node_modules/jest-timing-reporter/lib/index.js", { "outputAs": "text" }]
  ]
}
```
