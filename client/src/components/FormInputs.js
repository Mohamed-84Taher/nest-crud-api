import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGlobal } from "../context/GlobalWrapper";

const FormInputs = () => {
  const [data, setData] = useState({});
  const { addUser, errors, setErrors, user, updateUser, onClose, setUser } =
    useGlobal();

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
    const updateErrors = { ...errors };

    delete updateErrors[e.target.name];

    setErrors(updateErrors);
    console.log(errors);
  };

  const onAdd = () => {
    addUser(data, setData);
  };

  const onUpdate = () => {
    updateUser(user?._id, data);
    onClose();
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      setData(user);
    } else {
      setData({});
    }
  }, [user]);

  return (
    <Box>
      <FormControl isInvalid={errors?.fullName}>
        <FormLabel>Full Name</FormLabel>
        <Input
          type="text"
          name="fullName"
          onChange={handleChange}
          value={data?.fullName || ""}
        />
        {errors &&
          errors?.fullName?.map(err => (
            <FormErrorMessage key={err}>{err}</FormErrorMessage>
          ))}
      </FormControl>
      <FormControl isInvalid={errors?.email}>
        <FormLabel>Email</FormLabel>
        <Input
          type="text"
          name="email"
          onChange={handleChange}
          value={data?.email || ""}
        />
        {errors &&
          errors?.email?.map(err => (
            <FormErrorMessage key={err}>{err}</FormErrorMessage>
          ))}
      </FormControl>
      <FormControl isInvalid={errors?.age}>
        <FormLabel>Age</FormLabel>
        <Input
          type="text"
          name="age"
          onChange={handleChange}
          value={data?.age || ""}
        />
        {errors &&
          errors?.age?.map(err => (
            <FormErrorMessage key={err}>{err}</FormErrorMessage>
          ))}
      </FormControl>
      <FormControl isInvalid={errors?.country}>
        <FormLabel>Country</FormLabel>
        <Select
          name="country"
          onChange={handleChange}
          defaultValue={data?.country || ""}>
          <option value="tunisia">Tunisia</option>
          <option value="morroco">Morroco</option>
          <option value="algerie">Algerie</option>
        </Select>
        {errors &&
          errors?.country?.map(err => (
            <FormErrorMessage key={err}>{err}</FormErrorMessage>
          ))}
      </FormControl>
      <FormControl>
        <Button
          size="md"
          width="100%"
          mt="20px"
          onClick={data?._id ? onUpdate : onAdd}>
          Save
        </Button>
      </FormControl>
    </Box>
  );
};

export default FormInputs;
