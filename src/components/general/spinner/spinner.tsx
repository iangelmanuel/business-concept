import style from '@/styles/spinner.module.css'

interface Props {
  className?: string
}

export const Spinner = ({ className = '' }: Props) => {
  return <div className={`${style.loader} ${className}`} />
}
