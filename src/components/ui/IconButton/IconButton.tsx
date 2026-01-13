import type { PropsWithChildren, ComponentProps } from "react";
import './IconButton.scss';


export default function ({ children, ...props }: PropsWithChildren & ComponentProps<'button'>) {
  return (
    <button className="custom-icon-btn" {...props}>
      {children}
    </button>
  )
}
