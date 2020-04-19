### Common info

The library must be used along with react-router-dom. Router, Switch, Link must be taken from react-router-dom, this library extends Route from react-router-dom.
The library was made to resolve 3 main issues, which inherent many react apps.

- Child / nested routing
- Route protection
- Provides data for component pages

## Child Routing

Lets imagine, we have the page, in that page, nested 2 subpages/tabs

##### Example:

```
<ExtendedRouter
	path="/page-with-tabs"
	component={PageWithTabs}
	childs={[
		{
			component: FirstNestedChild,
			path: '/page-with-tabs/first-nested-child',
		},
		{
			component: SecondNestedChild,
			path: '/page-with-tabs/second-nested-child',
		},
	]}
/>

function PageWithTabs({ childRoutes }) {
  return (
	<h2>
		Page with tabs
		<div class="content">
			{childRoutes}
		</div>
	</h2>
  );
}
```

(The code for child components doesnt matter for that example)

ExtendedRouter has props **childs**, we can pass into it array of ExtendedRouter to have the functionality of nested routing!

Further, we need to point out to react, where he needs to render content. For component, which is a **parent**, ExtendedRouter provides extra prop with name childRoutes, and we just need to put our extra prop into the right place and child routing has done!

---

**Important note.** When child routes are re-render that doesn't trigger the re-render parent component.
**Important note.** Nesting child routes don't limited.

---

## Guard:

Our application often needs to restrict the user from pages that are available by condition.

Does user authenticated? Has user enough access?

**Guard** it’s a class which must have method canActivate - it’s must return true if user allowed to hit the page and false if can't. The method can be async.

##### Example:

```
export class LoginGuard implements Guard {
  async canActivate() {
    const isLogin = await chechUserAuth();
    return isLogin;
  }
}
```

And how we can use it:

```
<ExtendedRouter
	path="/page-with-tabs"
	component={PageWithTabs}
	guards={[ new LoginGuard () ]},
	redirectUrl='/login'
/>
```

**ExtendedRouter** has prop guards it’s an array, which can be used with combining of guards. Guards are called consistently, from left to right, as they placed at an array. As soon as at least one guard returned false, the chain will be broken and stopped and redirect will happen by default redirect url = ‘/’, we can change it though prop **redirectUrl** as we did at the example above.

##Resolver:
Time to time, we need to preload data, before the show the UI, and the resolver purpose to facilitate us with it.

**Resolver** - it’s a class, which must have method resolve, it must return data, which needs to be displayed at the component. Or we can just dispatch actions at it and if we need, we can wait for successful action in resolver!

##### Example:

```
export class UserInfoResolver implements Resolver {
  async resolve() {
    const userInfo = await getUserInfo();
    return userInfo ;
  }
}
```

And how we can use it:

```
<ExtendedRouter
	path="/page-with-tabs"
	component={PageWithTabs}
	resolvers={{
		userInfo: new UserInfoResolver()
	 }},
/>
```

**ExtendedRouter** has props - resolvers, it’s an object, with key - the prop name in component and the value it must be the instance our’s resolver, in our case it’s a **new UserInfoResolver()**.

The component **PageWithTabs** will not be rendered until, the resolver doesn't finish his work. And receiving data

And getting the information that the resolver returned to us in the component.

```
function PageWithTabs({userInfo}) {
	return (
		<h2>
			{userInfo.firstName}
		</h2>
  	);
}
```

In component props from the resolver with the name that we specified in ExtendedRouter are passed into the component.

More detailed example [link](https://gitlab.aisnovations.com/modules/react-router-extended/-/tree/master/examples%2Ftest 'link')
