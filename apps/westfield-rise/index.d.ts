/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

// declare module '*.style.module.scss' {
//   const classes: { readonly [key: string]: string };
//   export default classes;
// }
