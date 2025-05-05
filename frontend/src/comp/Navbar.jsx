import {Container, Button, Flex, HStack, Text} from '@chakra-ui/react'
import {Link} from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import {useColorMode} from "@/components/ui/color-mode.jsx";


const Navbar = () => {

    const { colorMode, toggleColorMode } = useColorMode();
    const textColor = useColorMode("black", "white");
    return (
        <Container maxW="full" px={16}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDirection={{
                base: "column",
                    sm:"row"
                }}
            >
                <Text
                    fontSize={{ base: "22", sm: "28" }}
                    fontWeight="bold"
                    textTransform="uppercase"
                    textAlign="center"
                    color={textColor}  // Utilise la couleur en fonction du mode
                >
                    <Link to="/">Product Store</Link> {/* Lien à l'intérieur du texte */}
                </Text>
                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>
                            <FaPlus size={20} />
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? "Dark Mode" : "Light Mode"}
                    </Button>
                </HStack>

            </Flex>
        </Container>
    )
}
export default Navbar
