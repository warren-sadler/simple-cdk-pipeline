import {
  BuildSpec,
  LinuxBuildImage,
  PipelineProject,
} from "@aws-cdk/aws-codebuild";
import { Artifact, Pipeline } from "@aws-cdk/aws-codepipeline";
import {
  CodeBuildAction,
  GitHubSourceAction,
} from "@aws-cdk/aws-codepipeline-actions";
import { SecretValue } from "@aws-cdk/core";
import * as cdk from "@aws-cdk/core";

export class PipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const SOURCE_OUTPUT = new Artifact("SourceOutput");
    const pipeline = new Pipeline(this, "SimplePipeline", {
      pipelineName: "SimplePipeline",
      crossAccountKeys: false,
    });
    pipeline.addStage({
      stageName: "Source",
      actions: [
        new GitHubSourceAction({
          owner: "warren-sadler",
          repo: "simple-cdk-pipeline",
          branch: "main",
          actionName: "Pipeline_Source",
          oauthToken: SecretValue.secretsManager(
            "simple-cdk-pipeline-gh-token"
          ),
          output: SOURCE_OUTPUT,
        }),
      ],
    });
    const CDK_BUILD_OUTPUT = new Artifact("CdkBuildOutput");
    pipeline.addStage({
      stageName: "Build",
      actions: [
        new CodeBuildAction({
          actionName: "CDK_BUILD",
          input: SOURCE_OUTPUT,
          outputs: [CDK_BUILD_OUTPUT],
          project: new PipelineProject(this, "CdkBuildProject", {
            environment: {
              buildImage: LinuxBuildImage.STANDARD_5_0,
            },
            buildSpec: BuildSpec.fromSourceFilename(
              "build-specs/cdk-build-spec.yml"
            ),
          }),
        }),
      ],
    });
  }
}
