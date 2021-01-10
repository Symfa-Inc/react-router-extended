import React, { ComponentProps } from 'react';
import { Routes } from './router';

// export const RouteContext = React.createContext({
//   parentPath: '',
//   // outlet: null,
//   children: null,
// });

// export function useOutlet() {
//   return React.useContext(RouteContext).outlet;
// }

// export const ChildRoutes = () => {
//   return React.useContext(RouteContext).children;
// };


// export const Parent = (props: ComponentProps<any> & { url: string }) => {
//   return (
//     <RouteContext.Provider value={{ parentPath: props.url, children: props.children }}>
//       <h2>{props.url}</h2>
//       <ChildRoutes></ChildRoutes>
//     </RouteContext.Provider>
//   );
//
// };
// export const RenderUrlFromParentPlusChild = (props: ComponentProps<any> & { childUrl: string }) => {
//   return (
//     <RouteContext.Consumer>
//       {(value) => (<h1>Child {value.parentPath} {props.childUrl}</h1>)}
//     </RouteContext.Consumer>
//   );
// };
// const App = () => {
//   return <>
//     <Parent url="1 Parent context">
//       <RenderUrlFromParentPlusChild childUrl="1 child path"></RenderUrlFromParentPlusChild>
//     </Parent>
//     <Parent url="2 parent context">
//       <RenderUrlFromParentPlusChild childUrl="2 child path"></RenderUrlFromParentPlusChild>
//     </Parent>
//   </>;
//   // return <Routes />;
// };
const App = () => {
  return <Routes/>;
  // return <h2>tewe</h2>
};

export default App;
