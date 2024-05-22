const { createContext, useState } = require("react");

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [blogList, setBlogList] = useState([]);
  const [pending, setPending] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        pending,
        setPending,
        blogList,
        setBlogList,
        formData,
        setFormData,
        isEdit,
        setIsEdit,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalState;
