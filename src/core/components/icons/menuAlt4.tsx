import { FunctionComponent, SVGProps, memo } from 'react'

export const MenuAlt4: FunctionComponent<SVGProps<SVGSVGElement>> = memo(
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
          d="M4 8h16M4 16h16"
        />
      </svg>
    )
  }
)
