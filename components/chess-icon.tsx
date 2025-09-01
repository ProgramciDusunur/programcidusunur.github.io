import type { LightbulbIcon as LucideProps } from "lucide-react"

export const ChessIcon = (props: LucideProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 16l-1.447.724a1 1 0 0 0-.553.894V20h12v-2.382a1 1 0 0 0-.553-.894L16 16" />
      <circle cx="12" cy="4" r="2" />
      <path d="M10.5 10h3l1.5 2L12 14l-3-2 1.5-2z" />
      <path d="M10 8v2" />
      <path d="M14 8v2" />
      <path d="M16 12v4" />
      <path d="M8 12v4" />
    </svg>
  )
}
