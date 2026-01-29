import HorseList from "./-components/HorseList";

import {createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/horses/")({
  component: () => (
        <>
        <h1>Horses</h1>
        <HorseList />
        </>
    ),
})
