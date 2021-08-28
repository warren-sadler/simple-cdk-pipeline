import { App } from "@aws-cdk/core";
import { BillingStack } from "./stacks/billing-stack";

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();
new BillingStack(app, "BillingStack", {
  budgetAmount: 5,
  emailAddress: "warren@therify.co",
  env: devEnv,
});
// new MyStack(app, 'my-stack-prod', { env: prodEnv });

app.synth();
