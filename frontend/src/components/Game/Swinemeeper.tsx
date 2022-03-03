import './Swinemeeper.css'
import { Row } from './Row/Row'

export const Swinemeeper = () => {
  
  const minimumSize: string = '24px'
  const maxSize: string = '56px'
  
  return (
    <div className='game__container'>
      <p>test</p>
      <div className='game__grid'>
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
    </div>
  )
}