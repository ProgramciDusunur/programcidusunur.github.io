import Image from "next/image"

interface LogoContainerProps {
  size?: "small" | "medium" | "large"
}

export function LogoContainer({ size = "medium" }: LogoContainerProps) {
  const sizeMap = {
    small: {
      container: "h-10 w-10",
      padding: "p-0.5",
    },
    medium: {
      container: "h-32 w-32",
      padding: "p-1",
    },
    large: {
      container: "h-40 w-40",
      padding: "p-1.5",
    },
  }

  return (
    <div
      className={`relative ${sizeMap[size].container} overflow-hidden rounded-lg bg-[#0a1929] ${sizeMap[size].padding} shadow-md`}
    >
      <div className="relative h-full w-full overflow-hidden">
        <Image src="/images/potential_logo.png" alt="Potential Logo" fill className="object-contain" />
      </div>
    </div>
  )
}
