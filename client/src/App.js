import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { Search2Icon, AddIcon } from "@chakra-ui/icons";
import { useGlobal } from "./context/GlobalWrapper";
import Row from "./components/Row";
import { useEffect, useState } from "react";
import AddDrawer from "./components/AddDrawer";

function App() {
  const [key, setKey] = useState("");
  const { fetchUsers, users, search, onOpen } = useGlobal();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <Container
        maxW={"full"}
        p="4"
        fontSize={"18px"}>
        <Box
          rounded="lg"
          boxShadow="base"
          p="4">
          <Box
            mt="2"
            gap={"2"}
            mb="4"
            display={"flex"}>
            <FormControl>
              <Input
                type="text"
                onChange={e => setKey(e.target.value)}
                value={key}
              />
            </FormControl>
            <Button
              leftIcon={<Search2Icon />}
              colorScheme="teal"
              variant="outline"
              maxW="300px"
              minW="150px"
              onClick={() => search(key)}>
              Search
            </Button>
          </Box>
        </Box>
        <Box
          mt="5"
          rounded={"lg"}
          boxShadow="base">
          <Box
            p="4"
            display={"flex"}
            justifyContent="space-between">
            <Text
              fontSize="xl"
              fontWeight="bold">
              List Users
            </Text>
            <Button
              colorScheme="teal"
              variant="outline"
              maxW={"300px"}
              minW="150px"
              leftIcon={<AddIcon fontSize={"20px"} />}
              onClick={onOpen}>
              Add User
            </Button>
          </Box>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Avatar</Th>
                  <Th>Fullname</Th>
                  <Th>Email</Th>
                  <Th>Age</Th>
                  <Th>Country</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users?.map(user => (
                  <Row
                    key={user._id}
                    {...user}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <AddDrawer />
      </Container>
    </div>
  );
}

export default App;
