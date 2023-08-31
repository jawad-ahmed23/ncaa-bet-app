import { useState } from "react";
import {
  Box,
  Text,
  Image,
  HStack,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
} from "@chakra-ui/react";
import { BsCheckLg } from "react-icons/bs";
import team1Src from "../../assets/ncaa-app/team-1.png";
import team2Src from "../../assets/ncaa-app/team-2.png";

const CustomCheckbox = ({ notSelected }: { notSelected?: boolean }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Box
      w="35px"
      h="35px"
      bg={isChecked ? "#011627" : notSelected ? "#d9d9d9" : ""}
      border={notSelected ? "2px solid #d9d9d9" : "2px solid #011627"}
      rounded="lg"
      onClick={() => setIsChecked(!isChecked)}
      cursor="pointer"
      display="grid"
      placeContent="center"
    >
      {isChecked ? <BsCheckLg color="#FF9F1C" size="30px" /> : null}
    </Box>
  );
};

export default function CDashboard() {
  return (
    <Box maxW={{ base: "full", md: "80%" }} mx="auto">
      <Stack direction={{ base: "column", md: "row" }} gap="5" h="full">
        <Box
          w={{ base: "full", md: "20%" }}
          bg="#fff"
          color="brand.primary"
          px="5"
          py="3"
          rounded="lg"
        >
          <Box mb="10">
            <Text fontSize="lg" fontWeight={700} mb="2">
              Live Matches
            </Text>
            <HStack justifyContent="center" spacing="5">
              <Image src={team1Src} />
              <Text color="#A0A8B1">
                <Text as="span">3</Text>
                <Text as="span" px="3">
                  :
                </Text>
                <Text as="span">2</Text>
              </Text>
              <Image src={team2Src} />
            </HStack>
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight={700} mb="2">
              Teams
            </Text>

            <VStack alignItems="flex-start" spacing="4">
              <HStack spacing="4">
                <Image src={team2Src} />
                <Text color="#A0A8B1">Tigers VI</Text>
              </HStack>
              <HStack spacing="4">
                <Image src={team2Src} />
                <Text color="#A0A8B1">Tigers VI</Text>
              </HStack>
              <HStack spacing="4">
                <Image src={team2Src} />
                <Text color="#A0A8B1">Tigers VI</Text>
              </HStack>
              <HStack spacing="4">
                <Image src={team2Src} />
                <Text color="#A0A8B1">Tigers VI</Text>
              </HStack>
              <HStack spacing="4">
                <Image src={team2Src} />
                <Text color="#A0A8B1">Tigers VI</Text>
              </HStack>
              <HStack spacing="4">
                <Image src={team2Src} />
                <Text color="#A0A8B1">Tigers VI</Text>
              </HStack>
            </VStack>
          </Box>
        </Box>

        <Box
          w={{ base: "full", md: "80%" }}
          bgColor="#fff"
          color="brand.primary"
          px="5"
          py="3"
          rounded="lg"
        >
          <Text fontSize="lg" fontWeight={700} mb="2">
            Upcoming Matches
          </Text>
          <TableContainer>
            <Table
              variant="unstyled"
              colorScheme="gray"
              style={{ borderCollapse: "separate", borderSpacing: "0 1em" }}
            >
              <Thead>
                <Tr bgColor="#F3F4F7">
                  <Th fontSize="base" textAlign="center">
                    Date
                  </Th>
                  <Th fontSize="base" textAlign="center">
                    Team
                  </Th>
                  <Th fontSize="base" textAlign="center">
                    Spread
                  </Th>
                  <Th fontSize="base" textAlign="center">
                    O/U
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr bgColor="#F3F4F7">
                  <Td textAlign="center" fontSize="xl" lineHeight="8">
                    Sturday <br /> 15:00:00
                  </Td>
                  <Td>
                    <VStack align="center">
                      <HStack>
                        <Image src={team1Src} width={"20px"} />
                        <Text color="#A0A8B1">New York</Text>
                      </HStack>
                      <Text color="#A0A8B1">vs</Text>
                      <HStack>
                        <Image src={team2Src} width={"20px"} />
                        <Text color="#A0A8B1">New York</Text>
                      </HStack>
                    </VStack>
                  </Td>
                  <Td>
                    <HStack justifyContent="center" mb="5">
                      <Box bgColor="#FF9F1C" p="2" rounded="lg">
                        -7.5
                      </Box>
                      <CustomCheckbox notSelected />
                    </HStack>
                    <HStack justifyContent="center">
                      <Box bgColor="#FF9F1C" p="2" rounded="lg">
                        +7.5
                      </Box>
                      <CustomCheckbox />
                    </HStack>
                  </Td>
                  <Td>
                    <HStack justifyContent="center" mb="4">
                      <Box bgColor="#FF9F1C" p="2" rounded="lg">
                        67
                      </Box>
                      <CustomCheckbox />
                    </HStack>
                    <HStack justifyContent="center">
                      <Box bgColor="#FF9F1C" p="2" rounded="lg">
                        67
                      </Box>
                      <CustomCheckbox />
                    </HStack>
                  </Td>
                </Tr>
                <Tr bgColor="#F3F4F7">
                  <Td textAlign="center" fontSize="xl" lineHeight="8">
                    Sturday <br /> 15:00:00
                  </Td>
                  <Td>
                    <VStack align="center">
                      <HStack>
                        <Image src={team1Src} width={"20px"} />
                        <Text color="#A0A8B1">New York</Text>
                      </HStack>
                      <Text color="#A0A8B1">vs</Text>
                      <HStack>
                        <Image src={team2Src} width={"20px"} />
                        <Text color="#A0A8B1">New York</Text>
                      </HStack>
                    </VStack>
                  </Td>
                  <Td>
                    <HStack justifyContent="center" mb="5">
                      <Box bgColor="#FF9F1C" p="2" rounded="lg">
                        -7.5
                      </Box>
                      <CustomCheckbox notSelected />
                    </HStack>
                    <HStack justifyContent="center">
                      <Box bgColor="#FF9F1C" p="2" rounded="lg">
                        +7.5
                      </Box>
                      <CustomCheckbox />
                    </HStack>
                  </Td>
                  <Td>
                    <HStack justifyContent="center" mb="4">
                      <Box bgColor="#FF9F1C" p="2" rounded="lg">
                        67
                      </Box>
                      <CustomCheckbox />
                    </HStack>
                    <HStack justifyContent="center">
                      <Box bgColor="#FF9F1C" p="2" rounded="lg">
                        67
                      </Box>
                      <CustomCheckbox />
                    </HStack>
                  </Td>
                </Tr>
                <Tr bgColor="#F3F4F7">
                  <Td textAlign="center" fontSize="xl" lineHeight="8">
                    Sturday <br /> 15:00:00
                  </Td>
                  <Td>
                    <VStack align="center">
                      <HStack>
                        <Image src={team1Src} width={"20px"} />
                        <Text color="#A0A8B1">New York</Text>
                      </HStack>
                      <Text color="#A0A8B1">vs</Text>
                      <HStack>
                        <Image src={team2Src} width={"20px"} />
                        <Text color="#A0A8B1">New York</Text>
                      </HStack>
                    </VStack>
                  </Td>
                  <Td>
                    <HStack justifyContent="center" mb="5">
                      <Box bgColor="#FF9F1C" p="2" rounded="lg">
                        -7.5
                      </Box>
                      <CustomCheckbox notSelected />
                    </HStack>
                    <HStack justifyContent="center">
                      <Box bgColor="#FF9F1C" p="2" rounded="lg">
                        +7.5
                      </Box>
                      <CustomCheckbox />
                    </HStack>
                  </Td>
                  <Td>
                    <HStack justifyContent="center" mb="4">
                      <Box bgColor="#FF9F1C" p="2" rounded="lg">
                        67
                      </Box>
                      <CustomCheckbox />
                    </HStack>
                    <HStack justifyContent="center">
                      <Box bgColor="#FF9F1C" p="2" rounded="lg">
                        67
                      </Box>
                      <CustomCheckbox />
                    </HStack>
                  </Td>
                </Tr>
                <Tr bgColor="#F3F4F7">
                  <Td textAlign="center" fontSize="xl" lineHeight="8">
                    Sturday <br /> 15:00:00
                  </Td>
                  <Td>
                    <VStack align="center">
                      <HStack>
                        <Image src={team1Src} width={"20px"} />
                        <Text color="#A0A8B1">New York</Text>
                      </HStack>
                      <Text color="#A0A8B1">vs</Text>
                      <HStack>
                        <Image src={team2Src} width={"20px"} />
                        <Text color="#A0A8B1">New York</Text>
                      </HStack>
                    </VStack>
                  </Td>
                  <Td>
                    <HStack justifyContent="center" mb="5">
                      <Box bgColor="#FF9F1C" p="2" rounded="lg">
                        -7.5
                      </Box>
                      <CustomCheckbox notSelected />
                    </HStack>
                    <HStack justifyContent="center">
                      <Box bgColor="#FF9F1C" p="2" rounded="lg">
                        +7.5
                      </Box>
                      <CustomCheckbox />
                    </HStack>
                  </Td>
                  <Td>
                    <HStack justifyContent="center" mb="4">
                      <Box bgColor="#FF9F1C" p="2" rounded="lg">
                        67
                      </Box>
                      <CustomCheckbox />
                    </HStack>
                    <HStack justifyContent="center">
                      <Box bgColor="#FF9F1C" p="2" rounded="lg">
                        67
                      </Box>
                      <CustomCheckbox />
                    </HStack>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </Box>
  );
}
