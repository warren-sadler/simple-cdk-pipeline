const { AwsCdkTypeScriptApp } = require("projen");
const project = new AwsCdkTypeScriptApp({
  cdkVersion: "1.95.2",
  defaultReleaseBranch: "main",
  cdkDependencies: [
    "@aws-cdk/aws-codepipeline",
    "@aws-cdk/aws-codepipeline-actions",
    "@aws-cdk/aws-budgets",
    "@aws-cdk/aws-codebuild",
  ],
  name: "simple-cdk-pipeline",
  eslintOptions: {
    prettier: true,
  },
});
const COMMON_IGNORE = ["cdk.out"];
project.npmignore.exclude(...COMMON_IGNORE);
project.gitignore.exclude(...COMMON_IGNORE);
project.synth();
