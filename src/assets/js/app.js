const modules = import.meta.glob(['/assets/js/*.js']);

Object.values(modules).map(module => module());
