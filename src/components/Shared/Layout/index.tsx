import { Box } from "@chakra-ui/react";
import Header from "./Header";

const Layout = ({ children, onLogout }: any) => {
  return (
    <Box minH="100vh">
      <Box>
        <Header onLogout={onLogout} />
        {/* Content */}
        <Box p="4" mb="100px">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
