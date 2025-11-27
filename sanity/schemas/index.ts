import * as componentsSchema from "./components";
import * as documentsSchema from "./documents";
import * as objectSchema from "./objects";

const schemas = [
  ...Object.values(componentsSchema),
  ...Object.values(documentsSchema),
  ...Object.values(objectSchema),
];
export default schemas;
