import { FunctionComponent, SVGProps, memo } from 'react'

export const Hashtag: FunctionComponent<SVGProps<SVGSVGElement>> = memo(
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
          d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
        />
      </svg>
    )
  }
)
