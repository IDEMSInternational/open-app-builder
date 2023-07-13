# Instance Services

Some services require being created on demand so that they can operate within a given context, such as a specific template container with rows.

To improve handling of dependency injection, these instantiable services use a custom injector to register services. This allows them to call global services without need to be inherited, and can also help to prevent cyclic dependency issues

As such they are not injected, and it is assumed any services required for injection should already be in the global scope (if not should be added to module)

TODO - add importable service that ensures instantiated dependencies available