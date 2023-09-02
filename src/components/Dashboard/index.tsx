import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Text,
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
  BoxProps,
} from "@chakra-ui/react";
import { BsCheckLg } from "react-icons/bs";
import { CSpinner } from "..";
import moment from "moment";

interface CustomCheckbox extends BoxProps {
  disabled?: boolean;
}

const CustomCheckbox = ({ disabled, ...otherProps }: CustomCheckbox) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Box
      w="35px"
      h="35px"
      bg={isChecked ? "#011627" : disabled ? "#d9d9d9" : ""}
      border={disabled ? "2px solid #d9d9d9" : "2px solid #011627"}
      rounded="lg"
      onClick={() => setIsChecked(!isChecked)}
      cursor="pointer"
      display="grid"
      placeContent="center"
      pointerEvents={disabled ? "none" : "all"}
      {...otherProps}
    >
      {isChecked ? <BsCheckLg color="#FF9F1C" size="30px" /> : null}
    </Box>
  );
};

interface IMatchObject {
  id: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: {
    key: string;
    title: string;
    last_update: string;
    markets: {
      key: string;
      last_update: string;
      outcomes: {
        name: string;
        price: number;
        point: number;
      }[];
    }[];
  }[];
}

interface CDashboardProps {
  data: IMatchObject[];
  isLoading: boolean;
  onAddGuess: ({
    home_team,
    away_team,
    key,
    point,
  }: {
    home_team: string;
    away_team: string;
    key: string;
    point: number;
  }) => Promise<void>;
  addGuessLoading: boolean;
}

export default function CDashboard(props: CDashboardProps) {
  // const {} =
  const { data, isLoading, onAddGuess, addGuessLoading } = props;

  console.log(addGuessLoading);

  return (
    <Box maxW={{ base: "full", md: "80%" }} mx="auto">
      <Stack direction={{ base: "column", md: "row" }} gap="5" h="full">
        {/* <Box
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
        </Box> */}

        <Box
          // w={{ base: "full", md: "80%" }}
          w={{ base: "full", md: "full" }}
          bgColor="#fff"
          color="brand.primary"
          px="5"
          py="3"
          rounded="lg"
        >
          <Text fontSize="3xl" fontWeight={700} mb="2">
            Matches
          </Text>
          <Box maxH="75vh" overflow="auto">
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
                  {data
                    ? data.map((sport) => (
                        <Tr key={sport.id} bgColor="#F3F4F7">
                          <Td textAlign="center" fontSize="base" lineHeight="8">
                            <Text>
                              {moment(sport.commence_time).format(
                                "dddd MMM, YYYY HH:mm:A"
                              )}
                            </Text>
                          </Td>
                          <Td>
                            <VStack align="center">
                              <HStack>
                                {/* <Image src={team1Src} width={"20px"} /> */}
                                <Text color="#A0A8B1">{sport.home_team}</Text>
                              </HStack>
                              <Text color="#A0A8B1">vs</Text>
                              <HStack>
                                {/* <Image src={team2Src} width={"20px"} /> */}
                                <Text color="#A0A8B1">{sport.away_team}</Text>
                              </HStack>
                            </VStack>
                          </Td>
                          <Td>
                            <HStack justifyContent="center" mb="5">
                              {sport.bookmakers[0].markets[0] ? (
                                <>
                                  <Box bgColor="#FF9F1C" p="2" rounded="lg">
                                    {
                                      sport.bookmakers[0].markets[0].outcomes[1]
                                        .point
                                    }
                                  </Box>
                                  <CustomCheckbox
                                    onClick={async () => {
                                      await onAddGuess({
                                        away_team: sport.away_team,
                                        home_team: sport.home_team,
                                        key: "spreads",
                                        point:
                                          sport.bookmakers[0].markets[0]
                                            .outcomes[1].point,
                                      });
                                    }}
                                    // isSelected
                                  />
                                </>
                              ) : null}
                            </HStack>
                            <HStack justifyContent="center">
                              {sport.bookmakers[0].markets[0] ? (
                                <>
                                  <Box bgColor="#FF9F1C" p="2" rounded="lg">
                                    {
                                      sport.bookmakers[0].markets[0].outcomes[0]
                                        .point
                                    }
                                  </Box>
                                  <CustomCheckbox
                                    onClick={async () => {
                                      await onAddGuess({
                                        away_team: sport.away_team,
                                        home_team: sport.home_team,
                                        key: "spreads",
                                        point:
                                          sport.bookmakers[0].markets[0]
                                            .outcomes[0].point,
                                      });
                                    }}
                                  />
                                </>
                              ) : null}
                            </HStack>
                          </Td>
                          <Td>
                            <HStack justifyContent="center" mb="4">
                              {sport.bookmakers[0].markets[1] ? (
                                <>
                                  <Box bgColor="#FF9F1C" p="2" rounded="lg">
                                    {
                                      sport.bookmakers[0].markets[1].outcomes[0]
                                        .point
                                    }
                                  </Box>
                                  <CustomCheckbox
                                    onClick={async () => {
                                      await onAddGuess({
                                        away_team: sport.away_team,
                                        home_team: sport.home_team,
                                        key: "totals",
                                        point:
                                          sport.bookmakers[0].markets[1]
                                            .outcomes[0].point,
                                      });
                                    }}
                                  />
                                </>
                              ) : null}
                            </HStack>
                            <HStack justifyContent="center">
                              {sport.bookmakers[0].markets[1] ? (
                                <>
                                  <Box bgColor="#FF9F1C" p="2" rounded="lg">
                                    {
                                      sport.bookmakers[0].markets[1].outcomes[1]
                                        .point
                                    }
                                  </Box>
                                  <CustomCheckbox
                                    onClick={async () => {
                                      await onAddGuess({
                                        away_team: sport.away_team,
                                        home_team: sport.home_team,
                                        key: "totals",
                                        point:
                                          sport.bookmakers[0].markets[1]
                                            .outcomes[1].point,
                                      });
                                    }}
                                  />
                                </>
                              ) : null}
                            </HStack>
                          </Td>
                        </Tr>
                      ))
                    : null}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>

          {isLoading ? (
            <Box my="10">
              <CSpinner />
            </Box>
          ) : null}
        </Box>
      </Stack>
    </Box>
  );
}
