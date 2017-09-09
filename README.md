# Sighten Intern Coding Challenge

The goal of this challenge is to create a program that will evaluate various solar installation scenarios by calculating the number of months until various solar investments pay for themselves.

Your program will read in input data from 2 csvs.
customers.csv contains potential solar customers: their customer id, monthly utility bill in dollars, and monthly usage in kWh.
systems.csv contains systems with system id, the system cost in dollars, and monthly energy production in kWh.

Your program should write to an output results.csv with 3 columns: `customer_id`, `system_id`, and `payback_months`, the number of months from the start of the installation until the cumulative savings from going solar are greater than or equal to the cost of the system.

There should be 1 row per combination of customer and system. Since the example systems.csv contains 3 rows and the customers.csv 2, we expect 6 resulting customer-system-combination rows to be written to results.csv (as well as 1 header row).

Don't make any assumptions about the number of rows in the input data - your solution should be able to process to any reasonable number of customer-system scenarios.

See example_results.csv for an example of valid output.

## Formulas

- The customer's cost of power (in dollars per kWh) can be calculated by dividing the customer's utility bill by the customer's usage.
- The post-solar usage can be calculated by subtracting the solar production from the customer's usage.
- The post-solar utility bill can be calculated by multiplying the post-solar usage with the customer's average cost of power.
- Savings are the difference between the customer's utility bill and the post-solar utility bill.

## Other Specifics

- The utility will not pay for excess production; a month's bill cannot be negative.
- If the solar system would not pay itself off in 20 years, the resulting csv should have a blank value for payback_months.
- Payments are made monthly, so the payback months should be a whole number.

## Example

A customer with 500 kWh/month of usage and a $50 monthly utility bill has a cost of power of 10¢/kWh. If they were to purchase a 400 kWh/month-producing system for $4000, they would reduce their usage to 100kWh/month, which would lower their utility bill to $10/month, saving them $40/month. At month 100, the system would pay for itself.

If this scenario was the combination of customer 1 and system 1, we would expect the following row to be written to results.csv:

```csv
customer_id,system_id,payback_months
1,1,100
```

## Another example

A tiny system that only produces 1 kWh/month would not pay itself off in 20 years for the above customer 1 (in that time it would only produce $24 worth of electricity, which is less than the cost of $4000), so if that system had id 2, the csv would contain the following:

```csv
customer_id,system_id,payback_months
1,2,
```

# Submission details

You may implement your solution in any language you wish - we here at Sighten use mostly Python and JavaScript but we invite you to use whatever language + libraries you are most comfortable with.

Document any language and library versions that your solution uses in a README and/or other language-specific versioning files. If you choose a compiled language, please include a shell or batch script that will build and run your program.

Put your code in a zip file or tarball and attach via email, or create a (private) gist such as this and send a link.
