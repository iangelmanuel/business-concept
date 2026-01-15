// Script to fix circular dependencies in components by using @ui/ imports for UI components
// Run with: node scripts/fix-circular-imports.mjs
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const componentsDir = path.join(__dirname, "..", "src", "components")

// UI component names that need to be imported from @ui/ or @components/ui/
const uiComponents = [
  "Button",
  "buttonVariants",
  "Card",
  "CardContent",
  "CardDescription",
  "CardFooter",
  "CardHeader",
  "CardTitle",
  "Input",
  "Label",
  "Select",
  "SelectContent",
  "SelectGroup",
  "SelectItem",
  "SelectLabel",
  "SelectTrigger",
  "SelectValue",
  "Checkbox",
  "Alert",
  "AlertDescription",
  "AlertTitle",
  "AlertDialog",
  "AlertDialogAction",
  "AlertDialogCancel",
  "AlertDialogContent",
  "AlertDialogDescription",
  "AlertDialogFooter",
  "AlertDialogHeader",
  "AlertDialogTitle",
  "AlertDialogTrigger",
  "Sheet",
  "SheetClose",
  "SheetContent",
  "SheetDescription",
  "SheetFooter",
  "SheetHeader",
  "SheetTitle",
  "SheetTrigger",
  "DropdownMenu",
  "DropdownMenuContent",
  "DropdownMenuItem",
  "DropdownMenuLabel",
  "DropdownMenuSeparator",
  "DropdownMenuTrigger",
  "DropdownMenuGroup",
  "Avatar",
  "AvatarFallback",
  "AvatarImage",
  "Skeleton",
  "Progress",
  "Badge",
  "Dialog",
  "DialogContent",
  "DialogDescription",
  "DialogFooter",
  "DialogHeader",
  "DialogTitle",
  "DialogTrigger",
  "DialogClose",
  "Table",
  "TableBody",
  "TableCaption",
  "TableCell",
  "TableFooter",
  "TableHead",
  "TableHeader",
  "TableRow",
  "Textarea",
  "NavigationMenu",
  "NavigationMenuContent",
  "NavigationMenuIndicator",
  "NavigationMenuItem",
  "NavigationMenuLink",
  "NavigationMenuList",
  "NavigationMenuTrigger",
  "NavigationMenuViewport",
  "navigationMenuTriggerStyle",
  "HoverCard",
  "HoverCardContent",
  "HoverCardTrigger",
  "Carousel",
  "CarouselContent",
  "CarouselItem",
  "CarouselNext",
  "CarouselPrevious",
  "ErrorMessage",
  "ResizableHandle",
  "ResizablePanel",
  "ResizablePanelGroup",
  // Chart components
  "ChartContainer",
  "ChartTooltip",
  "ChartTooltipContent",
  "ChartLegend",
  "ChartLegendContent",
  "ChartStyle"
]

// Map of custom components to their actual paths
const customComponents = {
  "Spinner": "@/components/general/spinner/spinner",
  "BarProgress": "@/components/shop/bar-progress",
  "PriceWithPosibleDiscount":
    "@/components/shop-and-admin/price-data-with-posible-discount"
  // Loading components should use relative paths within the same folder
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      // Skip ui directory as we don't need to modify those
      if (!filePath.endsWith("ui")) {
        getAllFiles(filePath, fileList)
      }
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      fileList.push(filePath)
    }
  })
  return fileList
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8")
  const originalContent = content

  // Match imports from "@/components" that are on potentially multiple lines
  const importRegex = /import\s*\{([^}]+)\}\s*from\s*["']@\/components["']/gs

  let match
  while ((match = importRegex.exec(content)) !== null) {
    const importedItems = match[1]
      .split(",")
      .map((s) => s.trim().replace(/\n/g, " ").replace(/\s+/g, " "))

    const uiImports = []
    const customImports = {}
    const otherImports = []

    importedItems.forEach((item) => {
      // Clean up the item
      item = item.trim()
      if (!item) return

      // Check if it's a UI component
      const itemName = item.split(" as ")[0].trim()
      if (uiComponents.includes(itemName)) {
        uiImports.push(item)
      } else if (customComponents[itemName]) {
        const customPath = customComponents[itemName]
        if (!customImports[customPath]) {
          customImports[customPath] = []
        }
        customImports[customPath].push(item)
      } else {
        otherImports.push(item)
      }
    })

    // Build replacement imports
    let newImports = []

    // Add UI imports
    if (uiImports.length > 0) {
      // Group by UI module
      const buttonImports = uiImports.filter((i) =>
        ["Button", "buttonVariants"].includes(i.split(" as ")[0].trim())
      )
      const cardImports = uiImports.filter((i) =>
        [
          "Card",
          "CardContent",
          "CardDescription",
          "CardFooter",
          "CardHeader",
          "CardTitle"
        ].includes(i.split(" as ")[0].trim())
      )
      const inputImports = uiImports.filter((i) =>
        ["Input"].includes(i.split(" as ")[0].trim())
      )
      const labelImports = uiImports.filter((i) =>
        ["Label"].includes(i.split(" as ")[0].trim())
      )
      const selectImports = uiImports.filter((i) =>
        [
          "Select",
          "SelectContent",
          "SelectGroup",
          "SelectItem",
          "SelectLabel",
          "SelectTrigger",
          "SelectValue"
        ].includes(i.split(" as ")[0].trim())
      )
      const checkboxImports = uiImports.filter((i) =>
        ["Checkbox"].includes(i.split(" as ")[0].trim())
      )
      const alertImports = uiImports.filter((i) =>
        ["Alert", "AlertDescription", "AlertTitle"].includes(
          i.split(" as ")[0].trim()
        )
      )
      const alertDialogImports = uiImports.filter((i) =>
        i.split(" as ")[0].trim().startsWith("AlertDialog")
      )
      const sheetImports = uiImports.filter((i) =>
        i.split(" as ")[0].trim().startsWith("Sheet")
      )
      const dropdownImports = uiImports.filter((i) =>
        i.split(" as ")[0].trim().startsWith("DropdownMenu")
      )
      const avatarImports = uiImports.filter((i) =>
        i.split(" as ")[0].trim().startsWith("Avatar")
      )
      const skeletonImports = uiImports.filter((i) =>
        ["Skeleton"].includes(i.split(" as ")[0].trim())
      )
      const progressImports = uiImports.filter((i) =>
        ["Progress"].includes(i.split(" as ")[0].trim())
      )
      const badgeImports = uiImports.filter((i) =>
        ["Badge"].includes(i.split(" as ")[0].trim())
      )
      const dialogImports = uiImports.filter((i) =>
        i.split(" as ")[0].trim().startsWith("Dialog")
      )
      const tableImports = uiImports.filter((i) =>
        i.split(" as ")[0].trim().startsWith("Table")
      )
      const textareaImports = uiImports.filter((i) =>
        ["Textarea"].includes(i.split(" as ")[0].trim())
      )
      const navMenuImports = uiImports.filter(
        (i) =>
          i.split(" as ")[0].trim().includes("NavigationMenu") ||
          i.includes("navigationMenuTriggerStyle")
      )
      const hoverCardImports = uiImports.filter((i) =>
        i.split(" as ")[0].trim().startsWith("HoverCard")
      )
      const carouselImports = uiImports.filter((i) =>
        i.split(" as ")[0].trim().startsWith("Carousel")
      )
      const errorMessageImports = uiImports.filter((i) =>
        ["ErrorMessage"].includes(i.split(" as ")[0].trim())
      )
      const resizableImports = uiImports.filter((i) =>
        i.split(" as ")[0].trim().startsWith("Resizable")
      )
      const chartImports = uiImports.filter((i) =>
        i.split(" as ")[0].trim().startsWith("Chart")
      )

      if (buttonImports.length)
        newImports.push(
          `import { ${buttonImports.join(", ")} } from "@/components/ui/button"`
        )
      if (cardImports.length)
        newImports.push(
          `import { ${cardImports.join(", ")} } from "@/components/ui/card"`
        )
      if (inputImports.length)
        newImports.push(
          `import { ${inputImports.join(", ")} } from "@/components/ui/input"`
        )
      if (labelImports.length)
        newImports.push(
          `import { ${labelImports.join(", ")} } from "@/components/ui/label"`
        )
      if (selectImports.length)
        newImports.push(
          `import { ${selectImports.join(", ")} } from "@/components/ui/select"`
        )
      if (checkboxImports.length)
        newImports.push(
          `import { ${checkboxImports.join(", ")} } from "@/components/ui/checkbox"`
        )
      if (alertImports.length)
        newImports.push(
          `import { ${alertImports.join(", ")} } from "@/components/ui/alert"`
        )
      if (alertDialogImports.length)
        newImports.push(
          `import { ${alertDialogImports.join(", ")} } from "@/components/ui/alert-dialog"`
        )
      if (sheetImports.length)
        newImports.push(
          `import { ${sheetImports.join(", ")} } from "@/components/ui/sheet"`
        )
      if (dropdownImports.length)
        newImports.push(
          `import { ${dropdownImports.join(", ")} } from "@/components/ui/dropdown-menu"`
        )
      if (avatarImports.length)
        newImports.push(
          `import { ${avatarImports.join(", ")} } from "@/components/ui/avatar"`
        )
      if (skeletonImports.length)
        newImports.push(
          `import { ${skeletonImports.join(", ")} } from "@/components/ui/skeleton"`
        )
      if (progressImports.length)
        newImports.push(
          `import { ${progressImports.join(", ")} } from "@/components/ui/progress"`
        )
      if (badgeImports.length)
        newImports.push(
          `import { ${badgeImports.join(", ")} } from "@/components/ui/badge"`
        )
      if (dialogImports.length)
        newImports.push(
          `import { ${dialogImports.join(", ")} } from "@/components/ui/dialog"`
        )
      if (tableImports.length)
        newImports.push(
          `import { ${tableImports.join(", ")} } from "@/components/ui/table"`
        )
      if (textareaImports.length)
        newImports.push(
          `import { ${textareaImports.join(", ")} } from "@/components/ui/textarea"`
        )
      if (navMenuImports.length)
        newImports.push(
          `import { ${navMenuImports.join(", ")} } from "@/components/ui/navigation-menu"`
        )
      if (hoverCardImports.length)
        newImports.push(
          `import { ${hoverCardImports.join(", ")} } from "@/components/ui/hover-card"`
        )
      if (carouselImports.length)
        newImports.push(
          `import { ${carouselImports.join(", ")} } from "@/components/ui/carousel"`
        )
      if (errorMessageImports.length)
        newImports.push(
          `import { ${errorMessageImports.join(", ")} } from "@/components/ui/error-message"`
        )
      if (resizableImports.length)
        newImports.push(
          `import { ${resizableImports.join(", ")} } from "@/components/ui/resizable"`
        )
      if (chartImports.length)
        newImports.push(
          `import { ${chartImports.join(", ")} } from "@/components/ui/chart"`
        )
    }

    // Add custom component imports
    for (const [importPath, items] of Object.entries(customImports)) {
      newImports.push(`import { ${items.join(", ")} } from "${importPath}"`)
    }

    // Keep other imports if any
    if (otherImports.length > 0) {
      newImports.push(
        `import { ${otherImports.join(", ")} } from "@/components"`
      )
    }

    // Replace the original import
    if (newImports.length > 0) {
      content = content.replace(match[0], newImports.join("\n"))
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content)
    console.log(`Updated: ${filePath}`)
    return true
  }
  return false
}

// Main execution
console.log("Starting to fix circular imports in components...\n")

const files = getAllFiles(componentsDir)
let updatedCount = 0

files.forEach((file) => {
  try {
    if (processFile(file)) {
      updatedCount++
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message)
  }
})

console.log(`\nDone! Updated ${updatedCount} files.`)
