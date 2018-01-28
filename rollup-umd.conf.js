export default {
  input: 'tmp/esm5/angular-draft-js.js',
  output: {
    file: 'dist/bundles/angular-draft-js.umd.js',
    name: 'angularDraftJs',
    format: 'umd',
    globals: {
      '@angular/core': 'ng.core',
      '@angular/common': 'ng.common',
      'rxjs/Observable': 'Rx.Observable',
      'rxjs/Subject': 'Rx.Subject',
      'draft-js': 'Draft',
      'tslib': 'tslib',
    },
  },
};
