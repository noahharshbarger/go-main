"use client";
import { useState } from "react";
import {
    Box,
    Button, 
    FormControl,
    FormLabel,
    Input,
    Textarea,
    FormErrorMessage,
    useToast,
    Heading,
} from '@chakra-ui/react';

export default function ChakraFormDemo() {
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
        setErrors({ ...errors, [e.target.name]: ''});
    }

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
        <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={4} borderRadius="lg" boxShadow="md">
            <Heading as="h2" size="lg" mb={2}>Contact Us</Heading>
            <form onSubmit={handleSubmit} noValidate>
                <FormControl isInvalid={!!errors.name} mb={4}>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input id="name" name="name" value={form.name} onChange={handleChange} />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.message} mb={4}>
                    <FormLabel htmlFor="message">Message</FormLabel>
                    <Textarea id="message" name="message" value={form.message} onChange={handleChange} />
                    <FormErrorMessage>{errors.message}</FormErrorMessage>
                </FormControl>
                <Button colorScheme="green" type="submit" width="full">Send</Button>
            </form>
        </Box>
    )
}
