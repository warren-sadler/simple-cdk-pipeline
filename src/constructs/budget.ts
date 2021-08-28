import { CfnBudget } from "@aws-cdk/aws-budgets";
import { Construct } from "@aws-cdk/core";

interface BudgetProps {
  budgetAmount: number;
  emailAddress: string;
}

export class Budget extends Construct {
  constructor(scope: Construct, id: string, props: BudgetProps) {
    super(scope, id);
    new CfnBudget(this, "Budget", {
      budget: {
        budgetLimit: {
          amount: props.budgetAmount,
          unit: "USD",
        },
        budgetName: "Monthly Budget",
        budgetType: "COST",
        timeUnit: "MONTHLY",
      },
      notificationsWithSubscribers: [
        {
          notification: {
            threshold: 100,
            thresholdType: "PERCENTAGE",
            comparisonOperator: "GREATER_THAN",
            notificationType: "ACTUAL",
          },
          subscribers: [
            {
              address: props.emailAddress,
              subscriptionType: "EMAIL",
            },
          ],
        },
      ],
    });
  }
}
