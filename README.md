![version-badge](https://img.shields.io/npm/v/within-time)

# Within Time

Within-Time was made to facilitate handling time constraints when running Node.js files. Really, it's because I got tired of using my fans as an indicator of a broken recursive function.

## Usage

With how small and focused in scope Within-Time is, I'd advise using good ol' [npx](https://www.npmjs.com/package/npx) to handle it.

### Recommended

`npx within-time <file-name>`

### Global

Of course, sometimes it's nice to not have to write `npx` every time, or perhaps you want to alias for maximum convenience. In that case, install via `yarn` globally and you can simply run the command.

```
yarn global add within-time
within-time <file-name>
```

You can also pass relative paths to the file

```
within-time test/scenarios/doesNotClose.js
```

```
within-time ./test/scenarios/doesNotClose.js
```

## Upcoming

- Run multiple files in a directory
- Configure time constraint via cli
- Prettier outputting
- Relevant examples?
