const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const vfs = require('vinyl-fs');
const compileSass = require('gulp-sass');
const rename = require('gulp-rename');
const inlineTemplates = require('gulp-inline-ng2-template');
const tsc_wrapped = require('@angular/tsc-wrapped');

const src = '.';
const dest = './tmp';
const lib = 'angular-draft-js';

const draftJsDist = './node_modules/draft-js/dist';

gulp.task('vendorDraftJsCss', function () {
  return gulp
    .src([`${draftJsDist}/Draft.css`])
    .pipe(rename('_draft-js.scss'))
    .pipe(gulp.dest(`${src}/${lib}`));
});

gulp.task('compileDraftComponentSass', ['vendorDraftJsCss'], function () {
  return gulp
    .src([`${src}/${lib}/draft-js.component.scss`])
    .pipe(compileSass())
    .pipe(gulp.dest(`${src}/${lib}`));
});

gulp.task('compileRichEditorComponentSass', function () {
  return gulp
    .src([`${src}/${lib}/editors/*.scss`])
    .pipe(compileSass())
    .pipe(gulp.dest(`${src}/${lib}/editors`));
});

gulp.task('inlineCss', ['copyEditorTs', 'copyLibTs', 'compileDraftComponentSass', 'compileRichEditorComponentSass'], function () {
  inlineSync(
    `${src}/${lib}/draft-js.component.ts`,
    `${dest}/${lib}/draft-js.component.ts`);
  inlineSync(
    `${src}/${lib}/editors/rich.component.ts`,
    `${dest}/${lib}/editors/rich.component.ts`);
});

gulp.task('copyEditorTs', function () {
  return gulp
    .src([`${src}/${lib}/editors/*.ts`, `!${src}/${lib}/editors/*.spec.ts`])
    .pipe(gulp.dest(`${dest}/${lib}/editors`));
});

gulp.task('copyLibTs', function () {
  return gulp
    .src([`${src}/${lib}/*.ts`, `!${src}/${lib}/*.spec.ts`])
    .pipe(gulp.dest(`${dest}/${lib}`));
});

gulp.task('copyTs', function () {
  return gulp
    .src([`${src}/*.ts`])
    .pipe(gulp.dest(dest));
});

gulp.task('inlineComponent', ['copyTs', 'inlineCss']);


/* Inlining-related utilities */

function inlineSync(sourcePath, destPath) {
  var fileContent = fs.readFileSync(sourcePath, 'utf-8');
  fileContent = inlineStyles(fileContent, sourcePath);
  fs.writeFileSync(destPath, fileContent, 'utf-8');
}

function inlineStyles(fileContent, filePath) {
  return fileContent.replace(/styleUrls:\s*(\[[\s\S]*?])/gm, function (_match, styleUrlsValue) {
    // The RegExp matches the array of external style files. This is a string right now and
    // can to be parsed using the `eval` method. The value looks like "['AAA.css', 'BBB.css']"
    var styleUrls = eval(styleUrlsValue);
    var styleContents = styleUrls
      .map(function (url) { return path.join(path.dirname(filePath), url); })
      .map(function (path) { return loadResourceFile(path); });
    return "styles: [\"" + styleContents.join(' ') + "\"]";
  });
}

function loadResourceFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8')
    .replace(/([\n\r]\s*)+/gm, ' ')
    .replace(/"/g, '\\"');
}
