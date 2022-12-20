import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Td, Tr } from "@chakra-ui/react";
import { useGlobal } from "../context/GlobalWrapper";

const Row = ({ _id, fullName, email, age, country }) => {
  const { deleteUser, onOpen, getOneUser } = useGlobal();
  const handleDelete = () => {
    if (window.confirm("Are sur want to delete this user")) {
      deleteUser(_id);
    }
  };
  return (
    <Tr>
      <Td>
        <Avatar name={fullName} />
      </Td>
      <Td>{fullName}</Td>
      <Td>{email}</Td>
      <Td>{age}</Td>
      <Td>{country}</Td>
      <Td>
        <Box
          display={"flex"}
          gap="1">
          <Button
            colorScheme={"blue"}
            onClick={() => {
              getOneUser(_id);
              onOpen();
            }}>
            <EditIcon />
          </Button>
          <Button
            colorScheme={"red"}
            onClick={handleDelete}>
            <DeleteIcon />
          </Button>
        </Box>
      </Td>
    </Tr>
  );
};

export default Row;
