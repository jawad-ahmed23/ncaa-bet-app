import {
  useDisclosure,
  chakra,
  Flex,
  HStack,
  Text,
  Badge,
  Icon,
  Button,
  Box,
} from "@chakra-ui/react";
import React from "react";
import Profile from "./ProfileMenu";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";

interface HeaderProps {
  onLogout: () => void;
}

const Header = (props: HeaderProps) => {
  const { onLogout } = props;
  const mobileNav = useDisclosure();
  return (
    <React.Fragment>
      <chakra.header
        bg="#fff"
        w="full"
        px={{
          base: 2,
          sm: 10,
        }}
        shadow="sm"
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Text
            as={Link}
            to="/dashboard"
            color="#000"
            borderTop="2px solid #2DCC70"
            py="5"
          >
            Matches
          </Text>
          <HStack spacing={3} alignItems="center">
            <Box pos="relative">
              <IoNotificationsOutline size="25px" />
              <Text
                pos="absolute"
                top="-8px"
                right="-8px"
                bg="#FF9F1C"
                w="20px"
                h="20px"
                fontSize="sm"
                rounded="full"
                display="grid"
                placeContent="center"
              >
                0
              </Text>
            </Box>
            <Profile onLogout={onLogout} />
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};

export default Header;
