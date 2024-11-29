import { Control, FieldValues, Path } from "react-hook-form"
import { FormField, FormItem, FormMessage } from "../ui/form"
import { Checkbox } from "../ui/checkbox"

interface Properties<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
}

const FormCheckbox = <T extends FieldValues>(properties: Properties<T>) => {
  return (
    <FormField
      control={properties.control}
      name={properties.name}
      render={({ field }) => (
        <FormItem className="flex gap-2 items-center">
          <Checkbox
            {...field}
            checked={field.value}
            onCheckedChange={field.onChange}
            id={field.name}
          />
          <label className="cursor-pointer" htmlFor={field.name}>{properties.label}</label>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormCheckbox
