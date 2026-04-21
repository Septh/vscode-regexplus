# Regex+

Visual Studio Code syntax highlighter for [Steve Levithan's Regex+ library](https://github.com/slevithan/regex), _"a template tag for readable, high-performance, native JS regexes with extended syntax, context-aware interpolation, and always-on best practices"_.

<p>&nbsp;</p>

![Regex+](https://raw.githubusercontent.com/Septh/vscode-regexplus/refs/heads/main/images/logo.png)

<p>&nbsp;</p>

----

<p>&nbsp;</p>

![screenshot](https://raw.githubusercontent.com/Septh/vscode-regexplus/refs/heads/main/images/screen.png)


## Usage
This extension highlights Regex+ template strings in JavaScript and TypeScript source files, including their React flavours.

You can also create and edit `.regex+` files, their full text is considered a regular expression source. This may help in writing very complex expressions that you can later copy and paste in your JS/TS code (or even read it from disk and feed it to Regex+'s `pattern` utility).

Be sure to [read the docs](https://github.com/slevithan/regex#readme) if you're not familiar with Regex+.

Regex+ is an astonishing piece of software. I highly recommend it you want to be serious about regexes.

![screenshot](https://raw.githubusercontent.com/Septh/vscode-regexplus/refs/heads/main/images/screen2.png)


## Configuration
None yet.


## Known Issues

Although the full regular expression syntax Regex+ brings is supported, not all its features are yet implemented.

For now, the following restrictions apply:

- Only the `regex`, `regex(flags)` and `pattern` tagged templates are supported. The `regex(optionsObject)` variant and the `rewrite` utility are not.
- Only the main Regex+ package is supported. Support for [the recursion plugin](https://github.com/slevithan/regex-recursion) is not.
- You cannot rename the imports, they have to be named `regex` and `pattern`.

There is still work in progress and the missing features will be implemented gradually.


## Release Notes

### 1.0.2

Buf fixes and improvements.
