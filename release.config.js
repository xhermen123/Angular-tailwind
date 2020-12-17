const SENTRY_SLUG = process.env.SENTRY_SLUG || require('./package.json').name.replace(/-/g, '.');

module.exports = {
  branches: [
    'master'
  ],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        'preset': 'angular',
        'parserOpts': {
          'noteKeywords': [
            'BREAKING CHANGE',
            'BREAKING CHANGES',
            'BREAKING'
          ]
        }
      }
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        'preset': 'angular',
        'parserOpts': {
          'noteKeywords': [
            'BREAKING CHANGE',
            'BREAKING CHANGES',
            'BREAKING'
          ]
        },
        'writerOpts': {
          'headerPartial': '{{#if isPatch~}}\n  ##\n{{~else~}}\n  #\n{{~/if}} {{#if @root.linkCompare~}}\n  [Release {{version}}](\n  {{~#if @root.repository~}}\n    {{~#if @root.host}}\n      {{~@root.host}}/\n    {{~/if}}\n    {{~#if @root.owner}}\n      {{~@root.owner}}/\n    {{~/if}}\n    {{~@root.repository}}\n  {{~else}}\n    {{~@root.repoUrl}}\n  {{~/if~}}\n  /compare/{{previousTag}}...{{currentTag}})\n{{~else}}\n  Release {{~version}}\n{{~/if}} {{~#if title}} "{{title}}"{{~/if}}',
          'commitsSort': [
            'scope',
            'subject'
          ]
        }
      }
    ],
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        'npmPublish': false
      }
    ],
    [
      '@semantic-release/git',
      {
        'message': 'chore(release): ${nextRelease.version}\n\n${nextRelease.notes}\n\n[skip ci]'
      }
    ],
    '@semantic-release/gitlab',
    [
      '@semantic-release/exec',
      {
        'successCmd': [
          // SENTRY_SLUG should be a *dot-separated* version of a project's slug
          // This is due to a weird behaviour of the CLI
          // eg. my-project-name would be slugged for Sentry as my.project.name
          './node_modules/.bin/sentry-cli releases new ' + SENTRY_SLUG + '-${nextRelease.version}',
          './node_modules/.bin/sentry-cli releases set-commits ' + SENTRY_SLUG + '-${nextRelease.version} --auto',
          './node_modules/.bin/sentry-cli releases finalize ' + SENTRY_SLUG + '-${nextRelease.version}',
          // './node_modules/.bin/sentry-cli releases files ' + SENTRY_SLUG + '-${nextRelease.version} upload-sourcemaps build/js --ext map --rewrite'
        ].join(' && ')
      }
    ]
  ]
}