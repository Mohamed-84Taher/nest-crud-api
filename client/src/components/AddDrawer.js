import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay
} from "@chakra-ui/react";
import { useGlobal } from "../context/GlobalWrapper";
import FormInputs from "./FormInputs";

function AddDrawer() {
  const { isOpen, onClose, setErrors } = useGlobal();

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={setErrors} />
          <DrawerHeader>Create / Update User</DrawerHeader>

          <DrawerBody>
            <FormInputs />
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default AddDrawer;
