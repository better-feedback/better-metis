# Better

## Setting up Better (work in progress)

Better automatically mirrors your Github issues to a hosted website, which allows your community to vote on them, fund them as bounties and claim the funds for implementing them. Issues might be anything from feature requests, to DAO proposals or content marketing ideas.

Setting up your own Better project takes only two steps:

### Fork me

Start by forking this repository.

### Host the page

Next, set up your hosted page under your own URL:

1. ...
2. Vercel
3. Set DNS
4. Set env variables
    a. ...
    b. ...
5. ...

### Creating an issue

Create a new issue at https://github.com/better-feedback/better-app/issues.

### Managing an issue

You can set an issues state in Github. To list an issue on your site's board, tag the issue as ... and it should appear in the "open" tab.

These are the options:

- ...
- ...

### Questions & Suggestions

[Join our discord chat](https://discord.com/invite/wwwwRFa6aj) and let us know about your questions or suggestions :)

## Customizing Better aka Development

Checkout the repo and set the required environmental variables by copying `./.env.example` into `./.env.local`.

Next, install the dependencies:

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```
