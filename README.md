# human-conditions

An AI-powered library that evaluates natural language conditions against your data objects. Simplify decision-making with human-readable queries like "is on a paid subscription plan" or "has admin permissions."

## Features
- Parse human-readable conditions into actionable logic.
- Supports customizable data objects.
- Lightweight and extensible.

## Installation
```bash
yarn add human-conditions
```

## Usage Example
```
import { check } from 'human-conditions';

const user = {
  id: '12345',
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  subscriptionType: 'premium',
  billingPlan: {
    planName: 'Premium Plan',
    startDate: '2024-01-01',
    renewalDate: '2025-01-01',
    amount: 99.99,
    currency: 'USD',
  },
};

const isOnPaidPlan = await check('is on a paid plan', user);
```
