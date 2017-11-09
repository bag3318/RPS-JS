[//]: # (Start README.md file)

Rock Paper Scissors
===================

## Command Line

### The following packages are needed:

1. (*for Mac only*) Xcode command line tools: `xcode-select --install`
2. [NodeJS](https://nodejs.org/en/)
3. [RubyGems & Ruby](https://www.ruby-lang.org/en/downloads/)
4. typescript: `npm install -g typescript` (_for Mac, add `sudo` at the beginning of the command_)
5. Sass: `gem install sass` (_for Mac, add `sudo` at the beginning of the command_)
6. typescript-formatter: `npm i typescript-formatter` (_for Mac, add `sudo` at the beginning of the command_)
7. __Optional__: [git command line tools](https://git-scm.com/downloads/)

### Useful Commands

> Note: **make sure to `cd` to the root of the project directory before running the following commands!**

1. `tsc -w` = compile and watch typescript (settings for directories are in `tsconfig.json`)
2. `tsc -init` = creates typescript config file
3. `sass --watch assets/stylesheets/sass:assets/stylesheets/css` = compile and watch sass and/or scss
4. `tsfmt -r --baseDir assets/scripts/ts` = format typescript (replaces & reformats)
5. `sass-convert assets/stylesheets/sass/*.sass assets/stylesheets/sass/rps/*.scss` = convert `sass` to `scss`
6. `sass-convert assets/stylesheets/sass/*.scss assets/stylesheets/sass/rps/*.sass` = convert `scss` to `sass`

--------

> **_Enjoy!_**

[//]: # "End README.md file"
