import {createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/horses/add")({
  component: () => (
        <>
        <h1>Add a horse</h1>
        <form className="input-form">
            <label htmlFor="id">Horse ID</label>
            <input type="number" name="id" />
            <label htmlFor="name">Name</label>
            <input type="string" name="name" />            
            <label htmlFor="sex">Sex</label>
            <input type="string" name="sex" />
            <label htmlFor="breed">Breed</label>
            <input type="string" name="breed" />
            <div>
                <button type="button" className="confirm-button">Save</button>
                <span />
                <button type="button" className="cancel-button">Cancel
                </button>
            </div>
        </form>
        </>
    ),
})

