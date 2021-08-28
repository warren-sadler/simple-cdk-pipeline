import { SynthUtils } from "@aws-cdk/assert";
import { App } from "@aws-cdk/core";
import { BillingStack } from "../src/stacks/billing-stack";

test("Snapshot", () => {
  const app = new App();
  const stack = new BillingStack(app, "test", {
    budgetAmount: 10,
    emailAddress: "test@test.com",
  });
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});
