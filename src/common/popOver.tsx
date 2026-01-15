import { Button } from "../components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Formik, Form, Field } from "formik"
import { Link, Send } from "lucide-react"

interface PopOverProps {
  setLink: (value: string) => void
}

export function PopoverDemo({ setLink }: PopOverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-transparent p-0 hover:bg-transparent">
          <Link />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-100 border-0 p-0 rounded-2xl -top-25 right-40 relative z-5000 overflow-hidden bg-white">
        <Formik
          initialValues={{ url: '' }}
          onSubmit={(values) => {
            if (!values.url.trim()) return
            setLink(values.url)
          }}
        >
          <Form className="flex items-center justify-between h-10">
            <Field
              name="url"
              placeholder="Url"
              className="px-5 border-0 h-full outline-0 flex-1"
            />
            <button
              type="submit"
              className="h-full w-15 flex justify-center items-center bg-primary text-white"
            >
              <Send size={15} />
            </button>
          </Form>
        </Formik>
      </PopoverContent>
    </Popover>
  )
}
