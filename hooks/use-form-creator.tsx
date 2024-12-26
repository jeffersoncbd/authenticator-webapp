/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { Path, useForm } from "react-hook-form";
import { baseObjectInputType, z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { Input as ShadcnInput } from "@/components/ui/input"
import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox"

type ChangeHandler = ChangeEventHandler<HTMLInputElement>

export function useFormCreator<T extends { [name: string]: z.ZodTypeAny }, U extends baseObjectInputType<T>>(shape: T, initialValues?: U) {
  const formSchema = z.object(shape)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: initialValues
  })

  type ChangeHandlerMiddleware = (onChange: ChangeHandler, middleware?: ChangeHandler) => ChangeHandler
  const onChangeMiddleWare: ChangeHandlerMiddleware = (onChange, middleware) => (e) => {
    if (middleware !== undefined) {
      middleware(e)
    }
    onChange(e)
  }
  return useMemo(() => {
    interface ContainerProperties {
      children: ReactNode
      onSubmit: (data: z.infer<typeof formSchema>) => void
      className?: string
    }
    const Container = (props: ContainerProperties) => (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(props.onSubmit)} className={twMerge(
          'flex flex-col gap-4',
          props.className
        )}>
          {props.children}
        </form>
      </Form>
    )

    interface InputProperties {
      name: Path<baseObjectInputType<T>>
      label: string
      placeholder?: string
      type?: HTMLInputTypeAttribute
      onChange?: ChangeHandler
    }
    const Input = (properties: InputProperties) => (
      <FormField
        control={form.control}
        name={properties.name}
        render={({ field: { value, ...field } }) => (
          <FormItem>
            <FormLabel>{properties.label}</FormLabel>
            <FormControl>
              <ShadcnInput
                {...field}
                type={properties.type}
                placeholder={properties.placeholder}
                onChange={onChangeMiddleWare(field.onChange, properties.onChange)}
                value={value as any}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )

    interface CheckboxProperties {
      name: Path<baseObjectInputType<T>>
      label: string
    }
    const Checkbox = (properties: CheckboxProperties) => {
      return (
        <FormField
          control={form.control}
          name={properties.name}
          render={({ field: { value, ...field } }) => (
            <FormItem className="flex gap-2 items-center">
              <ShadcnCheckbox
                {...field}
                checked={value as any}
                onCheckedChange={field.onChange}
                id={properties.name}
              />
              <label className="cursor-pointer" htmlFor={properties.name}>{properties.label}</label>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    }

    interface SimpleInputProperties {
      name: Path<baseObjectInputType<T>>
      placeholder?: string
      type?: HTMLInputTypeAttribute
      onChange?: ChangeHandler
      className?: string
    }

    const SimpleInput = (properties: SimpleInputProperties) => {
      return (
        <FormField
          control={form.control}
          name={properties.name as Path<Record<keyof typeof shape, any>>}
          render={({ field: { value, ...field } }) => (
            <FormItem>
              <FormControl>
                <ShadcnInput
                  value={value as any}
                  type={properties.type}
                  placeholder={properties.placeholder}
                  onChange={onChangeMiddleWare(field.onChange, properties.onChange)}
                  className={properties.className}
                />
              </FormControl>
            </FormItem>
          )} />
      )
    }

    return { Container, Input, Checkbox, SimpleInput, ...form }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
