# Regex+

Visual Studio Code syntax highlighter for [Steve Levithan's Regex+ library](https://github.com/slevithan/regex), _"a template tag for readable, high-performance, native JS regexes with extended syntax, context-aware interpolation, and always-on best practices"_.

<p>&nbsp;</p>

![Regex+](./docs/logo.png)

<p>&nbsp;</p>


## Features
They say an image is worth a thousand words, so...:

<p>&nbsp;</p>

![screenshot](./docs/screen.png)


## Usage
The extension adds highlighting out of the box for Regex+ template strings in JavaScript and TypeScript, including in their React flavours.

You can also create and edit `.regex+` files. In this case, the whole file is considered a Regex+ regular expression source. This may help in writing very complex expressions that you can later copy and paste in your JS/TS code.


## Configuration
None yet.


## Known Issues

Although the full regular expression syntax Regex+ brings is supported, not all its features are yet implemented.

For now, the following restrictions apply:

- Only the `regex` and `regex(flags)` tagged templates are supported. The `regex(options_object)` variant and the `pattern` template are not.
- You cannot rename the import, it has to be named `regex`.

There is still work in progress and the missing features will be implemented gradually.


## Release Notes

### 1.0.0

Initial release
