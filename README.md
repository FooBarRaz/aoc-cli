# Advent of Code CLI

## Description

This is a set of command line tools to help automate repetitive tasks and speed up your daily Advent of Code workflow.

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
aoc new src/problems 2023 15
```

### Custom Templates
You can create custom templates for any language, framework, or style by adding a new directory to the `templates` directory. The name of the directory will be the name of the template. Inside the directory, you can add any files or directories you want to be created when the template is used. You can use the following variables in your file and directory names to have them replaced with the appropriate values: 

- `{{year}}`: The year of the problem.
- `{{day}}`: The day of the problem.

## Features

- Simple and intuitive CLI commands to save you those precious seconds late at night
- Customizable templates to support whatever weird ass languages you are using for AoC


## Contributing

Contributions to this project are welcome! Please feel free to submit pull requests or create issues for any bugs or enhancements.