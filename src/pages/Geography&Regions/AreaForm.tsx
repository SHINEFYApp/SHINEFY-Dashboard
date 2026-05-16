import { Form, Formik } from "formik"
import DrawMap from "../../common/map"
import { FormDropdown } from "../../common/FormDropdown"
import { FormInput } from "../../common/FormInput"
import { Button } from "../../components/ui/button"
import { Link } from "react-router-dom"
import { toast } from "sonner"

interface AreaFormProps {
  title: string
  initialValues: any
  validationSchema: any
  onSubmit: (values: any) => void
  isPending: boolean
  submitLabel: string
  submittingLabel: string
  type: "mainArea" | "subArea"
  mainAreaOptions?: { label: string; value: number }[]
  isLoading?: boolean
  loadingText?: string
}

const countryOptions = [
  { label: "Egypt", value: 1 },
  { label: "Saudi Arabia", value: 2 },
]

const regionOptions = [
  { label: "Cairo", value: 1 },
  { label: "Riyadh", value: 2 },
]

export default function AreaForm({
  title,
  initialValues,
  validationSchema,
  onSubmit,
  isPending,
  submitLabel,
  submittingLabel,
  type,
  mainAreaOptions = [],
  isLoading,
  loadingText = "Loading...",
}: AreaFormProps) {
  if (isLoading) {
    return (
      <main>
        <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
          <p className="text-gray-500">{loadingText}</p>
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
        <h1 className="text-[#242731] text-[20px] mb-5 font-bold">{title}</h1>
        <div className="flex flex-col justify-center items-center">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              if (!values.area || values.area.length === 0) {
                toast.error("Please draw an area on the map")
                return
              }
              onSubmit(values)
            }}
          >
            {({ isValid }) => (
              <Form className="w-full">
                <div className="grid grid-cols-1 gap-2">
                  <div className="z-0 overflow-hidden rounded-2xl">
                    <DrawMap name="area" />
                  </div>
                  <FormDropdown
                    name="country"
                    label="Select Country"
                    placeholder="Select Country"
                    options={countryOptions}
                  />
                  <FormDropdown
                    name="regions"
                    label="Select Regions"
                    placeholder="Select Region"
                    options={regionOptions}
                  />
                  {type === "subArea" ? (
                    <>
                      <FormDropdown
                        name="areaName"
                        label="Main Area"
                        placeholder="Select Main Area"
                        options={mainAreaOptions}
                      />
                      <FormInput
                        name="subAreaName"
                        label="Sub Area Name"
                        placeholder="Sub Area Name"
                        type="text"
                      />
                    </>
                  ) : (
                    <FormInput
                      name="areaName"
                      label="Main Areas Name"
                      placeholder="Area Name"
                      type="text"
                    />
                  )}
                  <div className="grid grid-cols-2 gap-5 mt-10">
                    <Link
                      to="/geography&regions/manage/area"
                      className="border text-[20px] py-3 text-center border-black rounded-[10px]"
                    >
                      Back
                    </Link>
                    <Button
                      type="submit"
                      disabled={!isValid || isPending}
                      className="bg-primary hover:bg-primary-600 text-gray-900 font-bold h-[58px] rounded-xl text-[20px] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isPending ? submittingLabel : submitLabel}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  )
}
