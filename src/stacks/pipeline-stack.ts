import { Artifact, Pipeline } from "@aws-cdk/aws-codepipeline";
import { GitHubSourceAction } from "@aws-cdk/aws-codepipeline-actions";
import { SecretValue } from "@aws-cdk/core";
import * as cdk from "@aws-cdk/core";

export class PipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const pipeline = new Pipeline(this, "SimplePipeline", {
      pipelineName: "SimplePipeline",
      crossAccountKeys: false,
    });
    const sourceOutput = new Artifact("SourceOutput");
    pipeline.addStage({
      stageName: "Source",
      actions: [
        new GitHubSourceAction({
          owner: "warren-sadler",
          repo: "simple-cdk-pipeline",
          branch: "main",
          actionName: "Pipeline Source",
          oauthToken: SecretValue.secretsManager(
            "simple-cdk-pipeline-gh-token"
          ),
          output: sourceOutput,
        }),
      ],
    });
  }
}
