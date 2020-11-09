import { FunctionComponent, SVGProps, memo } from 'react'

export const ChevronDoubleRight: FunctionComponent<SVGProps<
  SVGSVGElement
>> = memo(props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 5l7 7-7 7M5 5l7 7-7 7"
      />
    </svg>
  )
})
