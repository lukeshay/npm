# @lukeshay/next-router

Adds basic routing to Next.js API routes. Also allows for wrapping handler functions to mutate the context that is being passed in.

## Example

`pages/api/hello.js`:

```javascript
import { router } from "@lukeshay/next-router";

const wrapper = (req, res, handler) => handler({ req, res, wrapped: true });

const get = (ctx) => ctx.res.json({ message: "Hello, World!" });

export default middleware(wrapper).get(get).handler();
```
