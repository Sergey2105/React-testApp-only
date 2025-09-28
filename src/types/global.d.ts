declare module "*.scss" {
  const classes: { [key: string]: string };
  export default classes;
}
declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}
declare module "*.svg" {
  import * as React from "react";
  const src: string;
  export default src;
}
