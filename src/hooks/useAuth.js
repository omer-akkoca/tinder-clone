import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [user,setUser] = useState(null)

    return(
        <AuthContext.Provider
            value={{
                user
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default useAuth = () => useContext(AuthContext);

export { AuthProvider }