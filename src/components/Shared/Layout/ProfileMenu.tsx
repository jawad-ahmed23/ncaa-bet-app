import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  HStack,
  Text,
} from "@chakra-ui/react";

import { IoPersonCircleSharp } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa";

interface ProfileProps {
  onLogout: () => void;
}

export default function Profile(props: ProfileProps) {
  const { onLogout } = props;
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        variant="unstyled"
        icon={
          <HStack>
            <IoPersonCircleSharp fontSize="40px" color="black" />
            <Text>John Doe</Text>
          </HStack>
        }
      />

      <MenuList rounded="3px">
        <MenuItem
          py="1"
          _hover={{
            color: "brand.primary",
          }}
        >
          <HStack onClick={onLogout} w="full">
            <FaPowerOff />
            <Text mt="-6px" fontWeight={600}>
              Log out
            </Text>
          </HStack>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
