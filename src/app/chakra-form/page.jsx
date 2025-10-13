
"use client";
import { useState } from "react";
import { Box, 
    Heading, 
    Stack, 
    useTheme, 
    extendTheme, 
    ChakraProvider, 
    FormControl, 
    FormLabel, 
    Input, 
    Textarea, 
    FormErrorMessage, 
    useToast, 
    IconButton, 
    InputGroup, 
    InputLeftElement, 
    Tooltip } from "@chakra-ui/react";
import { FaUser, FaEnvelope, FaPaperPlane, FaRedo } from "react-icons/fa";
import { motion } from "framer-motion";

// Simple custom theme for experimentation
const customTheme = extendTheme({
    colors: {
        brand: {
            100: "#ffe066", // gold (light)
            300: "#ffd700", // gold (mid)
            500: "#f7c948", // gold (chakra default)
            700: "#bfa105", // gold (deep)
            900: "#1a365d", // deep blue
        },
        blue: {
            100: "#e3f0ff",
            300: "#90cdf4",
            500: "#3182ce",
            700: "#2b6cb0",
            900: "#1a365d",
        },
        fun: {
            500: "#ff6bcb",
            600: "#ffb86b",
        },
    },
    fonts: {
        heading: "'Montserrat', sans-serif",
        body: "'Inter', sans-serif",
    },
    radii: {
        xl: "2rem",
    },
    shadows: {
        gold: "0 4px 20px 0 #ffe06655",
        blue: "0 4px 20px 0 #3182ce55",
    },
});

function ChakraStylePlayground() {
    const theme = useTheme();
                return (
                    <Stack
                        as={motion.div}
                        spacing={6}
                        p={8}
                        align="center"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeIn" }}
                    >
                        <Heading color="blue.900" fontSize={["2xl", "3xl", "4xl"]} fontFamily="heading">
                            Chakra UI Design Playground
                        </Heading>
                        {/* Instructional text removed as requested */}
                        {/* Buttons removed as requested */}
                        {/* Theme info removed as requested */}
                    </Stack>
                );
}

function ChakraFormDemo() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const toast = useToast();

    const validate = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = 'Name is required';
        if (!form.email) newErrors.email = 'Email is required';
        else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email';
        if (!form.message) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            toast({ title: 'Message sent!', status: 'success', duration: 2000 });
            setForm({ name: '', email: '', message: '' });
        }
    };

        return (
                <Box
                    as={motion.div}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    maxW="md"
                    mx="auto"
                    mt={8}
                    p={6}
                    borderWidth={4}
                    borderRadius="xl"
                    boxShadow="gold"
                >
                <Heading as="h2" size="lg" mb={2} color="brand.700" fontFamily="heading">Contact Us</Heading>
                <form onSubmit={handleSubmit} noValidate>
                    <FormControl isInvalid={!!errors.name} mb={4}>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <FaUser color="#bfa100" />
                            </InputLeftElement>
                            <Input id="name" name="name" value={form.name} onChange={handleChange} borderRadius="xl" focusBorderColor="brand.300" pl={10} />
                        </InputGroup>
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.email} mb={4}>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <FaEnvelope color="#3182ce" />
                            </InputLeftElement>
                            <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} borderRadius="xl" focusBorderColor="fun.600" pl={10} />
                        </InputGroup>
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.message} mb={4}>
                        <FormLabel htmlFor="message">Message</FormLabel>
                        <Textarea id="message" name="message" value={form.message} onChange={handleChange} borderRadius="xl" focusBorderColor="fun.500" />
                        <FormErrorMessage>{errors.message}</FormErrorMessage>
                    </FormControl>
                    <Stack direction="row" spacing={4} mt={4} justify="center">
                        <Tooltip label="Send" hasArrow>
                            <IconButton
                                colorScheme="brand"
                                type="submit"
                                borderRadius="xl"
                                boxShadow="gold"
                                icon={<FaPaperPlane />}
                                aria-label="Send"
                            />
                        </Tooltip>
                        <Tooltip label="Reset" hasArrow>
                            <IconButton
                                colorScheme="blue"
                                type="button"
                                borderRadius="xl"
                                boxShadow="blue"
                                icon={<FaRedo />}
                                aria-label="Reset"
                                onClick={() => setForm({ name: '', email: '', message: '' })}
                            />
                        </Tooltip>
                    </Stack>
                </form>
            </Box>
    );
}

export default function ChakraFormAndPlayground() {
    return (
        <ChakraProvider theme={customTheme}>
            <ChakraStylePlayground />
            <ChakraFormDemo />
        </ChakraProvider>
    );
}
// Explanation:
// - This page now includes both a design playground and a real form using the same custom theme.
// - Students can experiment with styles and see a real, working form with validation and feedback.
