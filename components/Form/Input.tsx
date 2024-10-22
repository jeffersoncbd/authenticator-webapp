import { HTMLInputTypeAttribute } from "react"
import { Control, FieldValues, Path } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

interface Properties<T extends FieldValues> {
    control: Control<T>
    name: Path<T>
    label: string
    placeholder?: string
    type?: HTMLInputTypeAttribute
}

const FormInput = <T extends FieldValues>(properties: Properties<T>) => {
    return (
        <FormField
            control={properties.control}
            name={properties.name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{properties.label}</FormLabel>
                    <FormControl>
                        <Input
                            type={properties.type}
                            placeholder={properties.placeholder}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default FormInput
