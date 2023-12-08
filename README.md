Certainly! Here's the content of the README in a Markdown code block:

# Project Name

## Description

This CLI application is designed to streamline your workflow by allowing you to quickly create new items with specified parameters. It's built using Node.js, TypeScript, and Commander.js, and includes features like input validation with Yup and styled console output with Chalk.

## Installation

To install the application globally:

```bash
npm install -g .
```

## Usage

To use the application, run the following command after installing the CLI:

```bash
aoc
```

This will display the help menu, which includes a list of available commands and their descriptions.

### Commands

#### new

Create a new item with specified year, day, and an optional template.

```bash
aoc new <basePath> -y <year> -d <day> [-t <template>]
```

- `<basePath>`: The location in which to create files and directories.
- `-y, --year <year>`: The year for the problem.
- `-d, --day <day>`: The day of the problem. Must be a number between 1 and 25.
- `-t, --template [template]`: Specify a template (optional). Defaults to 'typescript'. For more information on adding templates, see [Custom Templates](#custom-templates).

Example:

```bash
your-cli-name new myItem -y 2023 -d 15 -t basicTemplate
```

## Features

- Simple and intuitive CLI commands to save you those precious seconds late at night
- Customizable templates to support whatever weird ass languages you are using for AoC

## Contributing

Contributions to this project are welcome! Please feel free to submit pull requests or create issues for any bugs or enhancements.