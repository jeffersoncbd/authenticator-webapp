'use client'

import { useFormCreator } from "@/hooks/use-form-creator"
import { Link } from "@/i18n/routing"
import { Pencil } from "lucide-react"
import { useTranslations } from "next-intl"
import React, { useState } from "react"
import { z } from "zod"
import { H2 } from "./typography/headers"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb"

interface BreadcrumbData {
  label: string
  href?: string
}

interface Properties {
  children?: React.ReactNode
  title: string
  breadcrumb?: BreadcrumbData[]
  handleEditTitle?: (newTitle: string) => void
}

const PageContainer: React.FC<Properties> = (props) => {
  const t = useTranslations('components.pageContainer')

  const [editTitle, setEditTitle] = useState(false)

  const Form = useFormCreator({
    title: z.string({ message: t('titleInput.validations.required') })
  }, { title: props.title })

  return (
    <div className="flex flex-col gap-4 px-4 pb-4 w-full max-w-[1000px] mx-auto">
      {props.breadcrumb !== undefined && (
        <Breadcrumb>
          <BreadcrumbList>
            {props.breadcrumb.map((item, i) => (
              <React.Fragment key={`${item.label}-${item.href}`}>
                <BreadcrumbItem>
                  {item.href === undefined ? <p className="truncate max-w-[100px]">{item.label}</p> : (
                    <Link href={item.href} className="hover:text-black dark:hover:text-white">
                      {item.label}
                    </Link>
                  )}
                </BreadcrumbItem>
                {props.breadcrumb?.length !== i + 1 && (
                  <BreadcrumbSeparator />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      {props.handleEditTitle !== undefined && !editTitle ? (
        <H2 className="flex gap-4 justify-center items-center">
          {props.title}
          {props.handleEditTitle !== undefined &&
            <Pencil
              className="cursor-pointer dark:hover:fill-gray-600"
              onClick={() => setEditTitle(true)}
            />
          }
        </H2>
      ) : (
        <Form.Container onSubmit={(values) => {
          setEditTitle(false)
          Form.setValue('title', props.title)
          if (props.handleEditTitle !== undefined) {
            props.handleEditTitle(values.title)
          }
        }}>
          <Form.SimpleInput
            name="title"
            onChange={(e) => e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "")}
            className="text-3xl w-full font-bold text-center py-5 mb-[2px]"
          />
        </Form.Container>
      )}

      {props.children}
    </div>
  )
}

export default PageContainer

