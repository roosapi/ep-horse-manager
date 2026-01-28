import {createFileRoute } from "@tanstack/react-router";

import { AddHorseForm } from "./-components/AddHorseForm";


export const Route = createFileRoute("/horses/add")({
  component: () => (
        <>
        <h1>Add a horse</h1>
        <AddHorseForm/>
        </>
    ),
})

