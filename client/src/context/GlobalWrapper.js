import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useDisclosure, useToast } from "@chakra-ui/react";

export const GlobalContext = createContext();

export default function Wrapper({ children }) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const search = async key => {
    try {
      const res = await axios.post(`/api/users/search?key=${key}`);
      setUsers(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const deleteUser = async id => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers(prev => {
        return prev.filter(user => user._id !== id);
      });
      toast({
        title: "User deleted",
        duration: 3000,
        isClosable: true,
        position: "top-left",
        status: "success"
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getOneUser = async id => {
    try {
      const res = await axios.get(`/api/users/${id}`);
      setUser(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const updateUser = async (id, data) => {
    try {
      const res = await axios.patch(`/api/users/${id}`, data);
      setUsers(prev => {
        return prev.map(user => (user._id === id ? res.data : user));
      });
      toast({
        title: "User updated",
        duration: 3000,
        isClosable: true,
        position: "top-left",
        status: "success"
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const addUser = async (data, setData) => {
    try {
      const res = await axios.post("/api/users", data);
      setUsers(prev => {
        return [...prev, res.data];
      });
      toast({
        title: "User added",
        duration: 3000,
        isClosable: true,
        position: "top-left",
        status: "success"
      });
      setData({});
      setErrors(null);
      onClose();
    } catch (error) {
      setErrors(error.response.data.error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        fetchUsers,
        users,
        search,
        deleteUser,
        isOpen,
        onClose,
        onOpen,
        updateUser,
        addUser,
        errors,
        setErrors,
        getOneUser,
        user,
        setUser
      }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobal = () => {
  return useContext(GlobalContext);
};
