const { createContext } = require("react");

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
  return <GlobalContext.Provider>{children}</GlobalContext.Provider>;
};
export default GlobalState;
