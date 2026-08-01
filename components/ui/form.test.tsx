import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./form"

// Test schema
const testSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
})

type TestFormData = z.infer<typeof testSchema>

// Test component that uses the form
function TestFormComponent() {
  const form = useForm<TestFormData>({
    resolver: zodResolver(testSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      name: "",
    },
  })

  const onSubmit = (data: TestFormData) => {
    // Just log, we're testing validation errors, not submission
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <input {...field} data-testid="name-input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input {...field} data-testid="email-input" type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button type="submit">Submit</button>
      </form>
    </Form>
  )
}

describe("Form component", () => {
  it("should render form fields and display validation errors on submit", async () => {
    render(<TestFormComponent />)

    // Initially, no error messages should be visible
    expect(screen.queryByText("Invalid email address")).not.toBeInTheDocument()
    expect(
      screen.queryByText("Name must be at least 2 characters")
    ).not.toBeInTheDocument()

    // Submit the form with empty/invalid values
    const submitButton = screen.getByText("Submit")
    fireEvent.click(submitButton)

    // Wait for error messages to appear
    await waitFor(() => {
      expect(
        screen.getByText("Name must be at least 2 characters")
      ).toBeInTheDocument()
      expect(screen.getByText("Invalid email address")).toBeInTheDocument()
    })
  })

  it("should clear error messages when valid data is entered", async () => {
    render(<TestFormComponent />)

    // Submit to trigger validation errors
    const submitButton = screen.getByText("Submit")
    fireEvent.click(submitButton)

    // Wait for errors
    await waitFor(() => {
      expect(
        screen.getByText("Name must be at least 2 characters")
      ).toBeInTheDocument()
    })

    // Fill in valid data
    const nameInput = screen.getByTestId("name-input") as HTMLInputElement
    const emailInput = screen.getByTestId("email-input") as HTMLInputElement

    fireEvent.change(nameInput, { target: { value: "John Doe" } })
    fireEvent.change(emailInput, { target: { value: "john@example.com" } })

    // Submit again
    fireEvent.click(submitButton)

    // Wait for errors to be cleared
    await waitFor(() => {
      expect(
        screen.queryByText("Name must be at least 2 characters")
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText("Invalid email address")
      ).not.toBeInTheDocument()
    })
  })

  it("should show FormLabel in red when field has error", async () => {
    render(<TestFormComponent />)

    // Get labels
    const emailLabel = screen.getByText("Email")

    // Submit to trigger validation
    const submitButton = screen.getByText("Submit")
    fireEvent.click(submitButton)

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument()
    })

    // Check that the label has the error styling class
    expect(emailLabel).toHaveClass("text-destructive")
  })

  it("should mark FormControl with data-invalid when field has error", async () => {
    render(<TestFormComponent />)

    // Get the email input wrapper (FormControl)
    const emailInput = screen.getByTestId("email-input")
    const formControl = emailInput.parentElement

    // Submit to trigger validation
    const submitButton = screen.getByText("Submit")
    fireEvent.click(submitButton)

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument()
    })

    // Check that FormControl has data-invalid attribute
    expect(formControl).toHaveAttribute("data-invalid", "true")
  })
})
