# General information #

The main reason why we focused on this topic was the lack of solutions on how to make app routing easier while keeping it standardized. 
In our case, we required certain child routes nested under a single and simplified standard. To understand which routes are assessable under the parent URL in a standard React Router, we needed to enter into the files. That caused pretty much inconvenience.
We have created a library based on Angular router where we have borrowed the basic concept such as nested routes, guards, resolvers.
This allowed us to solve 3 main issues, which are inherent to many react apps:
* Child/nested routing
* Route protection
* Providing data for component pages

## Prerequisites ##

This library extends `Route` from `react-router-dom`. 
You need to take the router, switch, and link from it before using the library.

## Installation ##

Using npm:

`npm i @wellyes/react-router-extended`

Using yarn:

`yarn add @wellyes/react-router-extended`

## Child/nested routing ##

Let's imagine we have a page with 2 nested subpages/tabs.

#### Example ####

```js
<ExtendedRoute path="/page-with-tabs" component={PageWithTabs}>
  <ExtendedRoute path="/first-nested-child" component={FirstNestedChild} />
  <ExtendedRoute path="/second-nested-child" component={SecondNestedChild} />
</ExtendedRoute>

function PageWithTabs() {
  return (
	<h2>
		Page with tabs
		<div class="content">
			<ChildRoutes />
		</div>
	</h2>
  );
}
```

The code for child components is given as an example.
The functionality of nested routing is implemented in the way that we can add inside ExtendedRoute nested routes. Then we should point out to React where it needs to render content. 
For a parent component, ExtendedRoute provides an extra component with the *ChildRoutes* name, and we just need to put it into the right place to have child routing done.

----------------------------------------------------------------------------------

**Important note!** When child routes are re-rendered that doesn't trigger the re-rendering of a parent component. 

**Important note!** Nesting of child routes is unlimited. 

---------------------------------------------------------------------------------

## Route protection: Guard ##

Guard is used to protect the page from the user who does not have enough access rights or is not authorized. 
It allows you to see at the 'very top' of the files which permissions you require to enter the page.
This is a class containing only one method `canActivate` that should return either true when the user can enter the page or false when one doesn’t have access to enter the page. 
`canActivate` can be asynchronous.

#### Example: ####

```ts
export class LoginGuard implements Guard {
  async canActivate() {
    const isLogin = await chechUserAuth();
    return isLogin;
  }
}
```

and how we can use it

```tsx
<ExtendedRoute
	path="/page-with-tabs"
	component={PageWithTabs}
	guards={[ new LoginGuard () ]}
	redirectUrl="/login"
/>
```

ExtendedRoute has prop guards. They are array, which can be used with combining of guards. 
Guards are called consistently, from left to right in the order they are placed in an array. 
As soon as at least one guard returns false, the chain is broken and stopped, and redirect happens and we need to specify on which URL it will be it though prop `redirectUrl` as we did in the example above.

## Providing data for component pages: Resolver ##

From time to time, we need to preload data, before showing the UI, and the purpose of the resolver is to facilitate us with it.
Resolver is a class, which must have the `resolve` method and return data, which needs to be displayed by the component. Or we can just dispatch actions to it and if we need, we can wait for successful action in resolver.

#### Example: ####

```ts
export class UserInfoResolver implements Resolver {
  async resolve() {
    const userInfo = await getUserInfo();
    return userInfo;
  }
}
```

and how we can use it

```tsx
<ExtendedRoute
	path="/page-with-tabs"
	component={PageWithTabs}
	resolvers={{
	  userInfo: new UserInfoResolver()
	}}
/>
```

ExtendedRoute has props with the name resolvers. It is an object with the key that is the prop name in the component and which value should be the instance of our resolver. In this case, it is a new `UserInfoResolver()`.

The `PageWithTabs` component will not be rendered until the resolver has not finished its work.

```tsx
function PageWithTabs() {
    const resolverData = useResolver();
    return (
        <h2>  
            {resolverData.userInfo.firstName}
        </h2>
    );
}
```

In component props from the resolver with the name that we have specified in ExtendedRoute are passed to the component.

For a more detailed example, follow the [link](https://github.com/Aiscom-LLC/react-router-extended/tree/master/examples).
