# graphql-map-selections

A simple package to map selections from graphql resolver info object.

#### To install:

```
> yarn add graphql-map-selections
```

or

```
> npm install graphql-map-selections
```

#### Basic Usage:

```
import { mapSelections } from "graphql-map-selections";

const resolverFn = (source, args, context, info) => {
    const select = mapSelections(info)
    ...
}
```

#### Example:

Graphql query to fetch profile:

```
query MyProfile {
    myProfile {
        id
        firstName
        lastName
        email
        phoneNumber
        address {
            id
            city
            country
            street
            postalCode
        }
    }
}
```

Query resolver function:

```
import { mapSelections } from "graphql-map-selections";

const resolvers = {
    Query: {
        myProfile: (source, args, context, info) => {
            const select = mapSelections(info)
            ...
        }
    }
}
```

In above resolver function, the mapSelectons(info) will return:

```
{
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
    address {
        id: true,
        city: true,
        country: true,
        street: true,
        postalCode: true,
    }
}
```

#### Usage with Prisma

If you are using prisma ORM you can use the returned object by mapSelections to select object accepted by prisma client
