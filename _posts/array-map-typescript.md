---
title: "Array.Map in TypeScript: a brief look"
excerpt: "Let's have a look at one of the most loved array method from JavaScript, and how it looks in Typescript."
coverImage: "/assets/blog/array-map/cover.png"
date: "2021-04-16T16:51:26.372Z"
author:
  name: Claudio Restifo
  picture: "/assets/blog/authors/joe.jpeg"
ogImage:
  url: "/"
---

Array.map is a method that _creates a new array_ with the value that a callback function return on each element of the original array.
The two key points are:

- the original array is untouched.
- a new array is created.

Let's see the example that [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) has on its page but make it in Typescript:

```typescript
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map((x) => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
```

That's right: it's the exact same as the one for Javascript.
Let's analyze it.

- We have a starting `array1: number[]`.
- We apply a function `(x) => x * 2` that multiply each entry.
- We get back a new array `map1: number[]`.

And that's `map` in a nutshell: we applied our callback function on each element and now we have a second array with each value doubled.

## With types.

In the above example Typescript was able to infer all the types and check before hand that everything was es expected.

Let's try to make the compiler angry and see what's happens.

```typescript
const stringArray = ["h", "e", "l", "l", "o"];

// pass a function to map
const map1 = stringArray.map((x) => x * 2);
```

Will give us the warning:

```console
The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
```

Which is Typescript way of warning that using a function that multiply makes no sense on strings.

## A more broad example example.

I often use map when I want to iterate over a collection to create some elements in React.
However there are instances where I use it to serialize data.

Let's imagine an hypothetical scenario where we receive some legacy pice of data related to users; and we want to normalize it to our needs.

```typescript
// Legacy data - we don't have strong guarantees.
type LegacyData = {
  id: number;
  [key: string]: any;
};

// We now want to normalize roles.
enum Roles {
  ADMIN,
  USER,
}

// We want to end with a data type like this.
type User = {
  id: number;
  role: Roles;
};

const legacyData: LegacyData[] = [
  {
    id: 0,
    role: "ADMIN",
  },
  {
    id: 1,
    email: "fake@email.com",
  },
  {
    id: 2,
    bio: "lorem ipsum",
  },
];

// Our logic to determine the role of a user
const giveRole = (n: any) => (n === "ADMIN" ? Roles.ADMIN : Roles.USER);

// We can map our legacy data to normalize to our needs.
const users = legacyData.map((user) => ({
  ...user,
  role: giveRole(user.role),
}));
```

We can verify that our function worked as expected:

```typescript
const u = users.find((u) => u.role === Roles.ADMIN);
console.log(u?.id);

// 0 <-- our ADMIN user
```

## That's it!

I hope you learned something valuable today; and for any question or feedback don't hesitate and reach out to me.

---

Thanks for reading and happy coding! :heart:
