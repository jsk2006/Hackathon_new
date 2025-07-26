import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const mockUsers = [
  { username: 'vendor', password: 'demo123', roles: ['vendor'] },
  { username: 'supplier', password: 'demo123', roles: ['supplier'] },
  { username: 'both', password: 'demo123', roles: ['vendor', 'supplier'] },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedRole = localStorage.getItem('role');
    if (storedUser) setUser(storedUser);
    if (storedRole) setRole(storedRole);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
    if (role) localStorage.setItem('role', role);
    else localStorage.removeItem('role');
  }, [user, role]);

  const login = (username, password) => {
    const found = mockUsers.find(u => u.username === username && u.password === password);
    if (found) {
      setUser({ username: found.username, roles: found.roles });
      setRole(found.roles.length === 1 ? found.roles[0] : null);
      return { success: true, needsRole: found.roles.length > 1 };
    }
    return { success: false };
  };

  const selectRole = (selectedRole) => {
    setRole(selectedRole);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, selectRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 