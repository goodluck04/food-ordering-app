import hero from "../assets/hero.png"
type Props = {}

export default function Hero({}: Props) {
  return (
    <div>
        <img src={hero} className='w-full max-h-[600px] object-cover' alt="" />
    </div>
  )
}