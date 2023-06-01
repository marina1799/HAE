import React from "react";
import { NativeBaseProvider, Button } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <Button>Hello world</Button>
    </NativeBaseProvider>
  );
}