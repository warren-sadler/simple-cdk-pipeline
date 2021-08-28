import { expect as expectCDK, haveResourceLike } from "@aws-cdk/assert";
import { App, Stack } from "@aws-cdk/core";
import { Budget } from "../../src/constructs/budget";

test("Budget Construct", () => {
  const app = new App();
  const stack = new Stack(app, "test");
  new Budget(stack, "Billing", {
    emailAddress: "test@test.com",
    budgetAmount: 1_000,
  });

  expectCDK(stack).to(
    haveResourceLike("AWS::Budgets::Budget", {
      Budget: {
        BudgetLimit: {
          Amount: 1_000,
        },
      },
      NotificationsWithSubscribers: [
        {
          Subscribers: [{ Address: "test@test.com" }],
        },
      ],
    })
  );
});
