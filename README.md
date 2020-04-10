# React Router Extended documentation

The idea was inspired by angular and how he copes with routing.
So, I wanted to add some extra features for react-router-dom.
That lib can handle with guarding for the route, can handle async loading data before a route has been activated and provide nested/child routing.

# Guards

Let's take a look at guard

```sh
class FirstGuard {
  canActivate() {
  	return true;
  }
}
```

It's a simple class which must have one method **canActivate** and that method must return **boolean**, **true** If the user has access to a certain page, **false** If the user hasn't had access
