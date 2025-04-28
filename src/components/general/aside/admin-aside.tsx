"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Card,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components"
import { adminNavigation } from "@/data"
import { cn } from "@/lib"

interface Props {
  children: React.ReactNode
}

export const AdminAside = ({ children }: Props) => {
  const [defaultSize, setDefaultSize] = useState(15)
  const pathname = usePathname()

  const handleOnResize = (size: number) => {
    setDefaultSize(size)

    if (size <= 12) {
      setDefaultSize(5)
    }
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full rounded-lg"
    >
      <ResizablePanel
        minSize={5}
        maxSize={15}
        defaultSize={defaultSize}
        onResize={handleOnResize}
        onResizeCapture={() => setDefaultSize(5)}
        className="hidden xl:block"
      >
        <aside className="sticky top-0 hidden xl:block">
          <section className="mt-5 space-y-2 p-3">
            {adminNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex w-full items-center rounded-lg p-3",
                  defaultSize <= 5 && "justify-center",
                  pathname === item.href
                    ? "bg-gray-100 dark:bg-accent"
                    : "hover:bg-gray-100 dark:hover:bg-accent"
                )}
              >
                {item.icon}
                <span
                  className={cn({
                    hidden: defaultSize <= 5
                  })}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </section>
        </aside>
      </ResizablePanel>

      <ResizableHandle
        withHandle
        className="hidden xl:flex"
      />

      <ResizablePanel defaultSize={85}>
        <main className="p-3 sm:p-5">
          <Card className="mt-5 overflow-y-auto p-5 xl:h-[650px] xl:p-10 2xl:h-[850px]">
            {children}
          </Card>
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
