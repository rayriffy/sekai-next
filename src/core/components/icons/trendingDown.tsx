import { FunctionComponent, SVGProps, memo } from 'react'

export const TrendingDown: FunctionComponent<SVGProps<SVGSVGElement>> = memo(
  props => {
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
          d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
        />
      </svg>
    )
  }
)
