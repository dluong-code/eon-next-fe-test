# PLEASE COMPLETE THIS TEST INDEPENDENTLY. DO NOT SHARE THIS MATERIAL ONLINE.

<img src="https://www.eonnext.com/branding/eon/social/social-logo.png" alt="e.on next logo" width="100"/>

# Frontend Software Engineer Technical Assessment (Take Home)

Welcome to the E.ON Next frontend technical assessment. This assessment evaluates your React development skills, problem-solving approach and process, and ability to deliver production-quality code.

## Important information

You will have one week after receiving access to this repo to complete and submit your solution.

### Submission requirements

1. **Clone this repository** to your local machine
2. **Create a new private repository** on your personal GitHub account (**do not fork** this repository)
3. **Push the cloned code** to your new private repository
4. **Complete** the coding exercise and questions
5. **Commit and push** your work regularly to your private repository
6. **Share your repository** with the GitHub users we provide upon completion
7. **You will discuss your approach, git commit history, decision-making process and solution in a follow-up interview should you pass the assessment**

## Content

- [Project Brief](#project-brief)
- [Assessment Criteria](#assessment-criteria)
- [Setup](#setup)
- [Questions - Ways of Working](#questions---ways-of-working)

## Project Brief

### Overview

Create a **meter reading collection application** that allows E.ON Next customers to submit their electricity meter readings for accurate billing.

Customers read the numbers from their electricity meter, and send them to us so we can properly bill them for their electricity usage.

### Tech stack

We have provided a barebones [NextJS](https://nextjs.org/docs) application created via [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app) to help get you started.

The tech stack includes:

- **Next.js 16 (using React 19)** with App Router
- **TypeScript 5** (strict mode enabled)
- **Tailwind CSS 4** for styling
- **Yarn 4.7.0** (managed via Corepack) for package management
- **.nvmrc** for use with NVM (Node Version Manager) to help ensure compatible a node version with the library versions provided

### Requirements

We need this app to do the following:

#### Add new meter readings

We want to allow users to add new meter readings using the input box.

New meter readings should be displayed in a section marked "previous meter readings", ordered from most to least recent.

#### Validate meter readings

New readings should be validated against the following rules:

- a. They must be a 5 digit number between 00000 and 99999.
- b. A new reading must be higher than the last _customer_ reading.

When a customer enters an invalid meter reading, we should display an error message and apply appropriate error styling to the input.

#### Predicted usage

We want to predict the customer's upcoming usage and show it on the page. We predict future usage by taking the last four meter readings, taking the average distance between them, and adding that to the latest reading.

For example, if the customers' readings were (in descending order):

```
00400
00350
00250
00100
```

The average distance between each of these is:

```
00400 - 00350 = 50
00350 - 00250 = 100
00250 - 00100 = 150

(150 + 100 + 50) / 3 = 100

Predicted usage = 00400 + 100 = 00500
```

## Assessment Criteria

### Minimum Requirements (MVP)

Your solution must include:

- ✅ Functional meter reading input and validation
- ✅ Display of previous readings (ordered most to least recent)
- ✅ Predicted usage calculation and display
- ✅ Error handling and user feedback for invalid input
- ✅ Type safety (Valid TypeScript with no type errors)
- ✅ Responsive design and styling that works on mobile and desktop
- ✅ Tests: Unit and/or component tests covering key functionality

### Code Quality & Developer Experience

We value professional development practices. Your solution will be assessed on:

- **Correct functionality**: Ensure you have met all product requirements in the [Requirements](#requirements) section
- **UI styling**: Apply appropriate styling to ensure the user interface is clear, well-presented, and works across mobile and desktop screen widths
- **Accessibility**: Follow web accessibility best practices to ensure the application is usable by all users
- **Code quality and formatting**: Clean, readable, well-structured, maintainable code with consistent code style throughout the project
- **Type safety**: No TypeScript errors - verify with `npx tsc --noEmit`
- **Error handling**: Appropriate error states and edge case management
- **Git hygiene**: Clear, descriptive commit messages showing your development process and incremental progress
- **Testing**: Your solution must include tests demonstrating your approach to verifying code quality and functionality

You are free to add any tooling or dependencies you feel will improve code quality or developer experience (e.g. linting, formatting tools, testing frameworks). We will discuss your testing approach, tooling choices, and trade-offs during the interview.

### Use of AI coding assistants

You are welcome to use AI-powered coding tools (such as GitHub Copilot, Claude Code, Cursor, etc.) during this assessment. We use these tools at E.ON Next and value understanding how developers integrate them into their workflow.

If you choose to use AI assistants:

- Be prepared to discuss your approach and how you work with AI tools in the follow-up interview should you pass the assessment
- Ensure your git commit history remains detailed and incremental, clearly showing your development process and decision-making
- You should understand and be able to explain all code in your submission

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.19.0 - managed via `.nvmrc`)
- [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) - recommended for Node version management
- [Yarn](https://yarnpkg.com/) (v4.7.0 - managed via Corepack)

### Installation

1. **Set the correct Node.js version** (if using NVM):

   ```bash
   nvm use
   ```

   This will automatically switch to Node.js v20.19.0 as specified in `.nvmrc`.

2. **Enable Corepack** to manage the Yarn version:

   ```bash
   corepack enable
   ```

   This enables Yarn v4.7.0 as specified in `package.json`.

3. **Install dependencies**:

   ```bash
   yarn install
   ```

   Or simply:

   ```bash
   yarn
   ```

4. **Start the development server**:

   ```bash
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build the application for production
- `yarn start` - Start the production
- `yarn test` - Not included by default - you'll need to set up your own testing framework

## Questions - Ways of Working

_Please answer these two questions in a respective MD or text file (e.g. w1.txt and w2.txt) saved to the cloned repo._

**W1.**
You have taken the lead on this project which currently has the highest priority on our backlog. On one of the other apps you maintain, the product owner has contacted you personally and asked you to create some new features as well as fix a bug. You feel you cannot complete all of this work in a reasonable amount of time. How would you handle this situation?

Answer:
I’m going in with the assumption that I’m either already in a sprint or I’ve just started a sprint with my current workload planned out. Given that my current project has the highest priority. The first thing I would do is avoid immediately committing to the additional work without understanding the impact. I would make the product owner aware that what capacity I currently am at and already have committed work that I need to deliver.

However, I wouldn’t just push their request aside. I would first try to understand what the bug fixes and new requirements are, how important or critical they are. That way I can get a better idea of whether it’s something simple or whether it’s a bigger piece of work that needs more planning.
I would probably schedule a quick 15–30 minute conversation with them to go through the issue, understand the requirements properly, and break it down into tickets. From there, I can look at the effort involved, any risks, and whether there are other areas of the application that could be impacted by the changes.

If the bug is business-critical, we may need to adjust the current sprint priorities. If it’s lower priority, I would make sure it’s captured in the backlog and planned appropriately rather than impacting delivery of the highest-priority project. I would then raise this with the product owner of the higher priority project and discuss whether we have capacity to fit this in or whether we need to adjust some of the work that has already been planned for the current or upcoming sprint.
For me, the main thing is having visibility of the work before committing to anything. I would want to understand my capacity, the effort involved, and the priority of the request rather than jumping straight into the work. Clear communication between myself, the product owners, and the wider team is important so expectations are managed properly and we can make the right decision based on business priority.

**W2.**
You have a preliminary meeting to discuss some of the features for an existing frontend application, one of the senior members of the team suggests a solution that you strongly believe will not work. What, if any, actions would you take?
