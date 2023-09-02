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
import { RootState } from "../../slices/store";

interface CustomCheckbox extends BoxProps {
  disabled?: boolean;
  isSelected: boolean;
  limitExceed: boolean;
}

const CustomCheckbox = ({
  isSelected,
  disabled,
  limitExceed,
  ...otherProps
}: CustomCheckbox) => {
  return (
    <Box
      w="35px"
      h="35px"
      bg={isSelected ? "#011627" : disabled || limitExceed ? "#d9d9d9" : ""}
      border={
        disabled || limitExceed ? "2px solid #d9d9d9" : "2px solid #011627"
      }
      rounded="lg"
      cursor="pointer"
      display="grid"
      placeContent="center"
      pointerEvents={(disabled || limitExceed) && !isSelected ? "none" : "all"}
      {...otherProps}
    >
      {isSelected ? <BsCheckLg color="#FF9F1C" size="30px" /> : null}
    </Box>
  );
};

export interface IMatchObject {
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
  data?: IMatchObject[];
  isLoading: boolean;
  onAddGuess: ({ team }: { team: string }) => Promise<void>;
  onRemoveGuess: ({ team }: { team: string }) => Promise<void>;
  addGuessLoading: boolean;
}

export default function CDashboard(props: CDashboardProps) {
  const { currentUser } = useSelector((state: RootState) => state.app);
  const { data, isLoading, onAddGuess, addGuessLoading, onRemoveGuess } = props;

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
                    ? data.map((sport) => {
                        return (
                          <Tr key={sport.id} bgColor="#F3F4F7">
                            <Td
                              textAlign="center"
                              fontSize="base"
                              lineHeight="8"
                            >
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
                                  <Text color="#A0A8B1">
                                    {
                                      sport.bookmakers[0].markets[0].outcomes[0]
                                        .name
                                    }
                                  </Text>
                                </HStack>
                                <Text color="#A0A8B1">vs</Text>
                                <HStack>
                                  {/* <Image src={team2Src} width={"20px"} /> */}
                                  <Text color="#A0A8B1">
                                    {
                                      sport.bookmakers[0].markets[0].outcomes[1]
                                        .name
                                    }
                                  </Text>
                                </HStack>
                              </VStack>
                            </Td>

                            {/* ---------------------- */}
                            <Td>
                              <HStack justifyContent="center" mb="5">
                                {sport.bookmakers[0].markets[0] ? (
                                  <>
                                    <Box bgColor="#FF9F1C" p="2" rounded="lg">
                                      {
                                        sport.bookmakers[0].markets[0]
                                          ?.outcomes[0].point
                                      }
                                    </Box>
                                    <CustomCheckbox
                                      onClick={async () => {
                                        if (
                                          currentUser
                                            ? currentUser.currentGuesses?.some(
                                                (el: { team: string }) =>
                                                  el.team ===
                                                  sport.bookmakers[0].markets[0]
                                                    ?.outcomes[0].name
                                              )
                                            : false
                                        ) {
                                          await onRemoveGuess({
                                            team: sport.bookmakers[0].markets[0]
                                              ?.outcomes[0].name,
                                          });
                                        } else {
                                          await onAddGuess({
                                            team: sport.bookmakers[0].markets[0]
                                              ?.outcomes[0].name,
                                          });
                                        }
                                      }}
                                      isSelected={
                                        currentUser
                                          ? currentUser.currentGuesses?.some(
                                              (el: { team: string }) =>
                                                el.team ===
                                                sport.bookmakers[0].markets[0]
                                                  ?.outcomes[0].name
                                            )
                                          : false
                                      }
                                      disabled={
                                        currentUser
                                          ? currentUser.currentGuesses?.some(
                                              (el: { team: string }) =>
                                                el.team ===
                                                sport.bookmakers[0].markets[0]
                                                  ?.outcomes[1].name
                                            )
                                          : false
                                      }
                                      limitExceed={
                                        currentUser?.currentGuesses?.length ===
                                        3
                                      }
                                    />
                                  </>
                                ) : null}
                              </HStack>
                              <HStack justifyContent="center">
                                {sport.bookmakers[0].markets[0] ? (
                                  <>
                                    <Box bgColor="#FF9F1C" p="2" rounded="lg">
                                      {
                                        sport.bookmakers[0].markets[0]
                                          ?.outcomes[1].point
                                      }
                                    </Box>
                                    <CustomCheckbox
                                      onClick={async () => {
                                        if (
                                          currentUser
                                            ? currentUser.currentGuesses?.some(
                                                (el: { team: string }) =>
                                                  el.team ===
                                                  sport.bookmakers[0].markets[0]
                                                    ?.outcomes[1].name
                                              )
                                            : false
                                        ) {
                                          await onRemoveGuess({
                                            team: sport.bookmakers[0].markets[0]
                                              ?.outcomes[1].name,
                                          });
                                        } else {
                                          await onAddGuess({
                                            team: sport.bookmakers[0].markets[0]
                                              ?.outcomes[1].name,
                                          });
                                        }
                                      }}
                                      isSelected={
                                        currentUser
                                          ? currentUser.currentGuesses?.some(
                                              (el: { team: string }) =>
                                                el.team ===
                                                sport.bookmakers[0].markets[0]
                                                  ?.outcomes[1].name
                                            )
                                          : false
                                      }
                                      disabled={
                                        currentUser
                                          ? currentUser.currentGuesses?.some(
                                              (el: { team: string }) =>
                                                el.team ===
                                                sport.bookmakers[0].markets[0]
                                                  ?.outcomes[0].name
                                            )
                                          : false
                                      }
                                      limitExceed={
                                        currentUser?.currentGuesses?.length ===
                                        3
                                      }
                                    />
                                  </>
                                ) : null}
                                {addGuessLoading ? <CSpinner /> : null}
                              </HStack>
                            </Td>

                            {/* ----------------------------- */}
                            <Td>
                              <HStack justifyContent="center" mb="4">
                                {sport.bookmakers[0].markets[1] ? (
                                  <>
                                    <Box bgColor="#FF9F1C" p="2" rounded="lg">
                                      {
                                        sport.bookmakers[0].markets[1]
                                          ?.outcomes[0].point
                                      }
                                    </Box>
                                    <CustomCheckbox
                                      onClick={async () => {
                                        if (
                                          currentUser
                                            ? currentUser.currentGuesses?.some(
                                                (el: { team: string }) =>
                                                  el.team ===
                                                  sport.bookmakers[0].markets[0]
                                                    ?.outcomes[0].name
                                              )
                                            : false
                                        ) {
                                          await onRemoveGuess({
                                            team: sport.bookmakers[0].markets[0]
                                              ?.outcomes[0].name,
                                          });
                                        } else {
                                          await onAddGuess({
                                            team: sport.bookmakers[0].markets[0]
                                              ?.outcomes[0].name,
                                          });
                                        }
                                      }}
                                      isSelected={
                                        currentUser
                                          ? currentUser.currentGuesses?.some(
                                              (el: { team: string }) =>
                                                el.team ===
                                                sport.bookmakers[0].markets[0]
                                                  ?.outcomes[0].name
                                            )
                                          : false
                                      }
                                      disabled={
                                        currentUser
                                          ? currentUser.currentGuesses?.some(
                                              (el: { team: string }) =>
                                                el.team ===
                                                sport.bookmakers[0].markets[0]
                                                  ?.outcomes[1].name
                                            )
                                          : false
                                      }
                                      limitExceed={
                                        currentUser?.currentGuesses?.length ===
                                        3
                                      }
                                    />
                                  </>
                                ) : null}
                              </HStack>
                              <HStack justifyContent="center">
                                {sport.bookmakers[0].markets[1] ? (
                                  <>
                                    <Box bgColor="#FF9F1C" p="2" rounded="lg">
                                      {
                                        sport.bookmakers[0].markets[1]
                                          ?.outcomes[1].point
                                      }
                                    </Box>
                                    <CustomCheckbox
                                      onClick={async () => {
                                        if (
                                          currentUser
                                            ? currentUser.currentGuesses?.some(
                                                (el: { team: string }) =>
                                                  el.team ===
                                                  sport.bookmakers[0].markets[0]
                                                    ?.outcomes[1].name
                                              )
                                            : false
                                        ) {
                                          await onRemoveGuess({
                                            team: sport.bookmakers[0].markets[0]
                                              ?.outcomes[1].name,
                                          });
                                        } else {
                                          await onAddGuess({
                                            team: sport.bookmakers[0].markets[0]
                                              ?.outcomes[1].name,
                                          });
                                        }
                                      }}
                                      isSelected={
                                        currentUser
                                          ? currentUser.currentGuesses?.some(
                                              (el: { team: string }) =>
                                                el.team ===
                                                sport.bookmakers[0].markets[0]
                                                  ?.outcomes[1].name
                                            )
                                          : false
                                      }
                                      disabled={
                                        currentUser
                                          ? currentUser.currentGuesses?.some(
                                              (el: { team: string }) =>
                                                el.team ===
                                                sport.bookmakers[0].markets[0]
                                                  ?.outcomes[0].name
                                            )
                                          : false
                                      }
                                      limitExceed={
                                        currentUser?.currentGuesses?.length ===
                                        3
                                      }
                                    />
                                  </>
                                ) : null}
                              </HStack>
                            </Td>
                          </Tr>
                        );
                      })
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
