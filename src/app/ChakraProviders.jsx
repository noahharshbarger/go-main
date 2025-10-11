"use client";

import { ChakraProvider } from '@chakra-ui/react';

export default function ChakraProviders({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
